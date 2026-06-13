"use client";

/**
 * Home page — marketing and quick links into the assessment and dashboard flows.
 * Lightweight static content; intentionally presentation-only.
 */
import Link from "next/link";

export default function Home() {
  const operationalPipeline = [
    {
      index: "01",
      phase: "Assess",
      subtitle: "Granular Ingestion",
      details:
        "Execute rapid telemetry scans across public utility grids, travel vectors, and supply chains to isolate baseline variables.",
      icon: (
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      )
    },
    {
      index: "02",
      phase: "Track",
      subtitle: "Time-Series Ledger",
      details:
        "Log anomalies inside continuous environmental analytics dashboards, recording real-time programmatic trend shifts.",
      icon: (
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      )
    },
    {
      index: "03",
      phase: "Improve",
      subtitle: "Prescriptive Mitigation",
      details:
        "Deploy algorithmic recommendations to dynamically lower carbon exposure coefficients without throttling operational velocity.",
      icon: (
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      )
    }
  ];

  return (
    <main id="main-content" className="fade-in mx-auto w-full max-w-7xl space-y-28 px-6 py-12 md:py-20">
      {/* Premium Hero Interface Section */}
      <section className="card group relative overflow-hidden p-8 md:p-14">
        {/* Vector ambient light orb */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[rgb(var(--accent))]/10 blur-[120px] transition-all duration-700 group-hover:bg-[rgb(var(--accent))]/15" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Hero Context Text Block */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]"></span>
              Optimization Engine Active
            </div>

            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white md:text-6xl">
              EcoPulse <br />
              <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                Carbon Intelligence.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-400 md:text-base">
              Deconstruct, model, and mitigate systemic carbon outputs. Leverage deep historical
              tracking data points and prescriptive machine curves to optimize enterprise and
              lifestyle environmental margins.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-6 py-3 text-xs font-bold text-slate-950 shadow-[0_0_24px_rgba(16,185,129,0.2)] transition-all duration-200 hover:bg-emerald-300 hover:shadow-[0_0_32px_rgba(16,185,129,0.4)] active:scale-[0.98]"
              >
                Initialize Assessment
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-6 py-3 text-xs font-bold text-slate-200 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.05]"
              >
                Launch Console
              </Link>
            </div>
          </div>

          {/* Graphical Micro-Telemetry Monitor Block */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative flex aspect-[4/3] w-full flex-col justify-between rounded-2xl border border-white/[0.05] bg-gradient-to-br from-white/[0.03] to-transparent p-6 shadow-inner">
              <div className="flex items-start justify-between">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Emissions Target Index
                  </span>
                  <span className="mt-1 block font-mono text-2xl font-black text-white">
                    3.14 <span className="text-xs font-normal text-slate-400">MT CO₂e</span>
                  </span>
                </div>
                <span className="rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                  STABLE RUNTIME
                </span>
              </div>

              {/* Dynamic bar charts displaying telemetry curves */}
              <div className="flex h-24 w-full items-end gap-1.5 px-2 opacity-30 transition-opacity duration-500 group-hover:opacity-60">
                {[35, 20, 60, 45, 90, 40, 55, 30, 95, 50, 65, 75, 40, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500 to-teal-400 transition-all duration-500"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.04] pt-4 text-[11px] font-medium text-slate-500">
                <span>Data Pipelines: Synchronized</span>
                <span className="font-mono text-xs text-slate-400">0.0024s response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Infrastructure Step Section */}
      <section className="space-y-8">
        <div className="flex flex-col justify-between gap-4 border-b border-white/[0.04] pb-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              System Pipeline
            </span>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-white md:text-3xl">
              Processing Architecture
            </h2>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-slate-500">
            Raw environment logs scale across automated analytical models to generate high-fidelity,
            actionable mitigation insights.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {operationalPipeline.map((item) => (
            <div
              key={item.index}
              className="card group flex min-h-[250px] flex-col justify-between transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.02]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/[0.02]">
                    {item.icon}
                  </div>
                  <span className="font-mono text-sm font-black tracking-tighter text-slate-700 transition-colors group-hover:text-emerald-500/20">
                    {item.index}
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="text-base font-bold tracking-tight text-white">{item.phase}</h3>
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              <p className="mt-5 border-t border-white/[0.02] pt-4 text-xs leading-relaxed text-slate-400 transition-colors group-hover:border-white/[0.04]">
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Simulator Widget Embed Block */}
      <section className="space-y-6">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Telemetry Evaluation
          </span>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-white">
            Impact Scenario Matrix
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            Adjust the micro-variable coefficient models inside the interactive matrix workspace
            below to run automated predictive runtime carbon trajectories.
          </p>
        </div>

        <div className="rounded-3xl border border-white/[0.03] bg-white/[0.01] p-1.5">
          <div className="overflow-hidden rounded-[22px] bg-[rgb(var(--bg))]"></div>
        </div>
      </section>
    </main>
  );
}
