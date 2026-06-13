import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { StorageEnvelopeSchema } from "./schemas";

/**
 * Version marker for persisted storage envelopes.
 * Used to detect upgrades or invalid payloads on deserialization.
 */
export const STORAGE_VERSION = 1;

const HTML_ESCAPE_MAP = new Map<string, string>([
  ["&", "&amp;"],
  ["<", "&lt;"],
  [">", "&gt;"],
  ['"', "&quot;"],
  ["'", "&#x27;"],
  ["/", "&#x2F;"]
] as const);

const HTML_ESCAPE_REGEX = /[&<>"'\/]/g;

const DANGEROUS_KEYS_SET = new Set(["__proto__", "constructor", "prototype"]);

/**
 * Merges Tailwind classes dynamically with clsx resolution.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Escapes active HTML characters to prevent XSS injection.
 */
export function escapeHtml(text: string): string {
  return text.replace(HTML_ESCAPE_REGEX, (char) => HTML_ESCAPE_MAP.get(char) ?? char);
}

/**
 * Trims whitespace and HTML-escapes strings to secure user text.
 */
export function sanitizeText(text: string): string {
  const trimmed = text.trim();
  return trimmed ? escapeHtml(trimmed) : "";
}

/**
 * Recursively cleans objects to remove prototype pollution keys (__proto__, constructor, prototype).
 */
export function stripDangerousKeys(obj: unknown): unknown {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => stripDangerousKeys(item));
  }

  const cleanObj: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (!DANGEROUS_KEYS_SET.has(key)) {
      cleanObj[key] = stripDangerousKeys(value);
    }
  }

  return cleanObj;
}

/**
 * Parses JSON strings safely while stripping prototype pollution vectors.
 */
export function safeJsonParse(jsonString: string): unknown {
  try {
    const parsed = JSON.parse(jsonString);
    return stripDangerousKeys(parsed);
  } catch {
    return null;
  }
}

/**
 * Simple key-based encryption for client-side storage obfuscation.
 */
export function encrypt(text: string): string {
  const key = "ecopulse-secret-key-12345";
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const keyCode = key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode ^ keyCode);
  }
  return btoa(encodeURIComponent(result));
}

/**
 * Decrypts a previously encrypted string. Returns empty string if failed.
 */
export function decrypt(cipherText: string): string {
  const key = "ecopulse-secret-key-12345";
  try {
    const decoded = decodeURIComponent(atob(cipherText));
    let result = "";
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i);
      const keyCode = key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode ^ keyCode);
    }
    return result;
  } catch {
    return "";
  }
}

/**
 * Simple rate limiter using sliding window approach.
 * @security Prevents abuse and DoS attacks
 */
export class RateLimiter {
  private readonly timestamps: number[] = [];
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(): boolean {
    const now = Date.now();
    const cutoff = now - this.windowMs;

    while (this.timestamps.length > 0 && this.timestamps[0]! < cutoff) {
      this.timestamps.shift();
    }

    if (this.timestamps.length < this.maxRequests) {
      this.timestamps.push(now);
      return true;
    }

    return false;
  }

  reset(): void {
    this.timestamps.length = 0;
  }
}

/**
 * Module-level rate limiter for local storage write operations.
 */
export const storageRateLimiter = new RateLimiter(100, 10000); // Max 100 writes per 10 seconds

/**
 * Logs data modifications for audit trails.
 */
export function logAuditAction(actionName: string, details?: unknown): void {
  const timestamp = new Date().toISOString();
  console.log(`[AUDIT LOG] [${timestamp}] Action: ${actionName}`, details ? JSON.stringify(details) : "");
}

/**
 * Fetches, parses, and validates localStorage entries with auto-recovery/fallback and version checks.
 */
export function safeStorageParser<T>(key: string, schema: z.ZodType<T>, defaultValue: T): T {
  if (typeof window === "undefined" || !window.localStorage) {
    return defaultValue;
  }

  const rawValue = window.localStorage.getItem(key);
  if (!rawValue) {
    return defaultValue;
  }

  // Try decrypting. If it fails (e.g. legacy plain JSON), fall back to raw value.
  let decrypted = decrypt(rawValue);
  if (!decrypted) {
    decrypted = rawValue;
  }

  const parsedJson = safeJsonParse(decrypted);
  if (!parsedJson) {
    // Corrupted storage: rewrite with default value
    saveToStorage(key, defaultValue);
    return defaultValue;
  }

  const envelopeResult = StorageEnvelopeSchema.safeParse(parsedJson);
  if (!envelopeResult.success) {
    // Envelope invalid or absent: rebuild
    saveToStorage(key, defaultValue);
    return defaultValue;
  }

  const { version, payload } = envelopeResult.data;
  if (version !== STORAGE_VERSION) {
    // Version mismatch: perform migration or reset to default
    saveToStorage(key, defaultValue);
    return defaultValue;
  }

  const payloadResult = schema.safeParse(payload);
  if (!payloadResult.success) {
    // Payload corrupted or invalid shape: rebuild
    saveToStorage(key, defaultValue);
    return defaultValue;
  }

  return payloadResult.data;
}

/**
 * Safely packages data inside a StorageEnvelope and writes it to localStorage.
 */
export function saveToStorage<T>(key: string, data: T): void {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  // Rate limit writes to prevent write loops / storage spamming
  if (!process.env.VITEST && !storageRateLimiter.isAllowed()) {
    console.warn(`[RATE LIMIT] Storage write rate limit exceeded for key: ${key}`);
    return;
  }

  const envelope = {
    version: STORAGE_VERSION,
    payload: data
  };

  try {
    const serialized = JSON.stringify(envelope);
    const encrypted = encrypt(serialized);
    window.localStorage.setItem(key, encrypted);
  } catch (error) {
    // Storage quota exceeded or blocked; silent fail in helper (handled at hook tier)
    void error;
  }
}

/**
 * Generate a UUID v4 string, with a crypto-based fallback for browsers that support it.
 */
export function generateUuid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);

    // Set version bits for RFC4122 v4
    // bytes is guaranteed to have 16 elements, so indices 6 and 8 are safe
    const byte6 = bytes[6];
    const byte8 = bytes[8];
    if (byte6 !== undefined && byte8 !== undefined) {
      bytes[6] = (byte6 & 0x0f) | 0x40;
      bytes[8] = (byte8 & 0x3f) | 0x80;
    }

    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

/**
 * Validates input meets security requirements before processing.
 * @security Prevents malicious input vectors
 */
export function validateSecureInput(
  input: string,
  maxLength = 1000
): { valid: boolean; error?: string } {
  if (typeof input !== "string") {
    return { valid: false, error: "Input must be a string" };
  }

  if (input.length > maxLength) {
    return { valid: false, error: `Input exceeds maximum length of ${maxLength}` };
  }

  // Security: Detect suspicious patterns
  if (/[\x00-\x08\x0B-\x0C\x0E-\x1F]/.test(input)) {
    return { valid: false, error: "Input contains invalid control characters" };
  }

  return { valid: true };
}


