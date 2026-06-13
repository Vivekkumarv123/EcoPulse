"use client";

import Link from "next/link";

/**
 * `DashboardHeader` — renders the top-level dashboard heading and CTA.
 *
 * Extracted from `src/app/dashboard/page.tsx` to keep page markup clean
 * and focused on composition.
 */
export function DashboardHeader() {
  return (
    <header className="flex flex-col justify-between gap-4 border-b border-white/[0.04] pb-6 sm:flex-row sm:items-center">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-emerald-400">
          Telemetry Node // Console
        </span>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-white">Analytics Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/assessment"
          className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.05]"
        >
          + Update Assessment Logs
        </Link>
      </div>
    </header>
  );
}

/**
 * Default export wrapper for DashboardHeader.
 */

