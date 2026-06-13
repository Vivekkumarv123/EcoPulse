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
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-6">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Telemetry Node // Console</span>
        <h1 className="text-3xl font-black tracking-tight text-white mt-1">Analytics Dashboard</h1>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/assessment"
          className="px-4 py-2 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] text-slate-300 text-xs font-semibold rounded-lg transition"
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
export default DashboardHeader;
