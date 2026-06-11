"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Assessment", href: "/assessment" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Community", href: "/" },
  ];

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-white/[0.04] bg-[rgb(var(--bg))]/70 backdrop-blur-md transition-all duration-300"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo Identity */}
        <Link href="/" className="group flex items-center gap-3.5 transition-opacity duration-200 hover:opacity-90">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] flex items-center justify-center transition-all duration-300 group-hover:border-emerald-500/40 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            {/* Ambient glow inner accent */}
            <div className="absolute inset-0 rounded-xl bg-[rgb(var(--accent))]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-sm font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-400">
              EP
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-md font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-200">
              EcoPulse
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-slate-500">
              Sustain • Scale
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.04] p-1.5 rounded-full backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`px-5 py-2 text-xs font-semibold tracking-wide rounded-full transition-all duration-200 block ${
                      isActive
                        ? "bg-white/[0.06] text-white shadow-[0_1px_0_rgba(255,255,255,0.1)_inset] border border-white/[0.04]"
                        : "text-slate-400 hover:text-slate-200 border border-transparent"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Premium CTA Actions */}
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="hidden sm:inline-block text-xs font-semibold text-slate-400 hover:text-white transition duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/assessment"
            className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.2),0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.45)] active:scale-[0.98]"
          >
            Launch Platform
          </Link>
        </div>

      </div>
    </header>
  );
}