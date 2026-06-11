"use client";

import React from "react";
import { useFootprint } from "@/hooks/useFootprint";
import Link from "next/link";
import { GoalsPanel } from "@/components/goals/GoalsPanel";
import { ChallengesPanel } from "@/components/challenges/ChallengesPanel";

export default function DashboardPage() {
  const { breakdown, insights, entries, targets, goals, challenges } = useFootprint();

  // Normalize metrics safely for chart distributions or calculate fallback metrics
  const totalWeight = breakdown.total || 1;
  const metrics = [
    { label: "Transport", value: breakdown.transport || 0, color: "bg-emerald-500", text: "text-emerald-400" },
    { label: "Food", value: breakdown.food || 0, color: "bg-teal-500", text: "text-teal-400" },
    { label: "Energy", value: breakdown.energy || 0, color: "bg-cyan-500", text: "text-cyan-400" },
    { label: "Waste", value: breakdown.waste || 0, color: "bg-indigo-500", text: "text-indigo-400" },
  ];

  return (
    <main className="w-full max-w-7xl mx-auto px-6 py-10 space-y-8 fade-in">
      
      {/* Console Subheader Branding */}
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

      {/* Primary Analytical Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Metrics & Graph Rings */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Carbon Score Primary Node Card */}
          <section aria-labelledby="score" className="card relative overflow-hidden group p-6">
            <div className="absolute -right-16 -top-16 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
            <span id="score" className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
              Aggregate Carbon Footprint Index
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl font-mono font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
                {breakdown.total.toLocaleString()}
              </span>
              <span className="text-sm font-bold text-slate-400 tracking-wide">kg CO₂e / period</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 border-t border-white/[0.03] pt-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-time time-series logging operational layer</span>
            </div>
          </section>

          {/* Breakdown Vector Grid Card */}
          <section aria-labelledby="breakdown" className="card p-6">
            <h2 id="breakdown" className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-white/[0.03] pb-3">
              Emission Mass Allocation
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
              
              {/* Dynamic Interactive Ring Model */}
              <div role="figure" aria-labelledby="breakdown-visual" className="sm:col-span-5 flex justify-center">
                <h3 id="breakdown-visual" className="sr-only">Category allocation ring distribution</h3>
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90 transform" role="img">
                    <circle r="14" cx="16" cy="16" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="4" />
                    {/* Simplified stacked progress mapping lines */}
                    <circle r="14" cx="16" cy="16" fill="none" stroke="rgba(16,185,129,0.8)" strokeWidth="4" strokeDasharray="88 88" strokeDashoffset="20" strokeLinecap="round" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">Mass Matrix</span>
                    <span className="text-sm font-mono font-bold text-white">100% Verified</span>
                  </div>
                </div>
              </div>
              
              {/* Quantized Allocation Bars */}
              <ul className="sm:col-span-7 space-y-4">
                {metrics.map((metric) => {
                  const percentage = Math.min(Math.round((metric.value / totalWeight) * 100), 100) || 0;
                  return (
                    <li key={metric.label} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium tracking-wide">
                        <span className="text-slate-300">{metric.label}</span>
                        <span className={`font-mono font-bold ${metric.text}`}>
                          {metric.value} kg <span className="text-slate-600 text-[10px]">({percentage}%)</span>
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-white/[0.02] border border-white/[0.04] rounded-full overflow-hidden">
                        <div className={`h-full ${metric.color} rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>

            </div>
          </section>
        </div>

        {/* Right Column: AI Engine Diagnostics & System Insights */}
        <div className="lg:col-span-5">
          <section aria-labelledby="insights" className="card p-6 h-full flex flex-col">
            <h2 id="insights" className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-white/[0.03] pb-3">
              AI Optimization Engine Insights
            </h2>
            
            <ul className="space-y-3 overflow-y-auto flex-1">
              {insights.map((i) => (
                <li 
                  key={i.id} 
                  className="p-4 bg-white/[0.01] hover:bg-white/[0.02] border border-white/[0.04] rounded-xl transition duration-200 flex gap-3.5 items-start"
                >
                  <div className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 text-xs mt-0.5">
                    ✦
                  </div>
                  <div className="space-y-1">
                    <strong className="text-xs font-bold text-white tracking-tight block">{i.title}</strong>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{i.message}</p>
                  </div>
                </li>
              ))}
              {insights.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-500 font-medium">No behavioral diagnostics reported yet.</div>
              )}
            </ul>
          </section>
        </div>

      </div>

      <section aria-labelledby="dashboard-summary" className="card p-6">
        <h2 id="dashboard-summary" className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-white/[0.03] pb-3">
          Dashboard Summary
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Active Goals</p>
            <p className="text-2xl font-bold text-white">{goals.filter((g) => g.active).length}</p>
            <p className="mt-2 text-xs text-slate-500">of {goals.length}</p>
          </div>
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Goal Progress</p>
            <p className="text-2xl font-bold text-white">{goals.length ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length) : 0}%</p>
            <p className="mt-2 text-xs text-slate-500">average completion</p>
          </div>
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Challenges Completed</p>
            <p className="text-2xl font-bold text-white">{challenges.filter((c) => c.completed).length}</p>
            <p className="mt-2 text-xs text-slate-500">of {challenges.length}</p>
          </div>
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Target Nodes</p>
            <p className="text-2xl font-bold text-white">{targets.length}</p>
            <p className="mt-2 text-xs text-slate-500">categories monitored</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="targets" className="card p-6">
        <h2 id="targets" className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 border-b border-white/[0.03] pb-3">
          Target Summary
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {targets.map((target) => (
            <div key={`${target.category}-${target.interval}`} className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">{target.category}</p>
              <p className="text-2xl font-bold text-white">{target.targetValue}</p>
              <p className="mt-2 text-xs text-slate-500">{target.interval} target</p>
            </div>
          ))}
        </div>
      </section>

      {/* Middle Grid Panels: Goals & System Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-1.5 border-white/[0.03] bg-white/[0.005] rounded-3xl">
          <GoalsPanel />
        </div>
        <div className="card p-1.5 border-white/[0.03] bg-white/[0.005] rounded-3xl">
          <ChallengesPanel />
        </div>
      </div>

      {/* Lower Row Ledger Component: Time-Series Actions */}
      <section aria-labelledby="recent" className="card p-6">
        <div className="flex items-center justify-between border-b border-white/[0.03] pb-4 mb-4">
          <h2 id="recent" className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Historical Activity Ledger
          </h2>
          <span className="text-[10px] font-mono text-slate-600 uppercase">showing latest 10 sequences</span>
        </div>
        
        <div className="overflow-x-auto">
          <ul className="divide-y divide-white/[0.03] min-w-[500px]">
            {entries.slice(0, 10).map((e) => (
              <li key={e.id} className="py-3.5 flex justify-between items-center group hover:bg-white/[0.005] px-2 -mx-2 rounded-lg transition-colors">
                <div className="flex items-center gap-4">
                  <div className="px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/[0.05] text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wide group-hover:border-emerald-500/30 transition-colors">
                    {e.category}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200 tracking-tight">{e.description}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{new Date(e.date).toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-xs font-mono font-black text-white">{e.carbonValue} kg CO₂e</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">{e.value} units</div>
                </div>
              </li>
            ))}
            {entries.length === 0 && (
              <li className="py-8 text-center text-xs text-slate-500 font-medium">
                No telemetry sequences detected. Initialize standard carbon calculation matrices to populate database rows.
              </li>
            )}
          </ul>
        </div>
      </section>

    </main>
  );
}