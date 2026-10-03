'use client';

import React, { useState } from 'react';
import { Search, RefreshCw, BookOpen, Layers, ExternalLink } from 'lucide-react';

interface NavbarProps {
  dataSourceType: 'LIVE' | 'CACHED' | 'ERROR';
  syncTimestamp: string;
  isRefreshing?: boolean;
  onRefresh: () => void;
  onOpenSearch: () => void;
  onOpenSources: () => void;
  onOpenDataDictionary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  dataSourceType,
  syncTimestamp,
  isRefreshing = false,
  onRefresh,
  onOpenSearch,
  onOpenSources,
  onOpenDataDictionary,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full liquid-panel border border-white/10 backdrop-blur-2xl">
        {/* Brand / Logomark */}
        <a className="flex items-center space-x-3.5 group" href="#hero">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-cyan-neon/35 animate-spin-slow" />
            <div className="w-3 h-3 rounded-full bg-cyan-glow shadow-[0_0_14px_#00F0FF]" />
            <div className="absolute -top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-ice animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-sm tracking-[0.24em] text-white group-hover:text-cyan-ice transition-colors">
              NEO-SCOPE
            </span>
            <span className="font-mono text-[9px] tracking-widest text-cyan-neon/60 -mt-0.5 uppercase">
              ORBITAL INTEL
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden xl:flex items-center space-x-8 text-xs tracking-wider uppercase font-medium text-slate-300">
          <a className="text-white hover:text-cyan-glow transition-colors relative py-1" href="#hero">
            Explore
          </a>
          <a className="hover:text-cyan-glow transition-colors text-slate-400" href="#live-radar">
            Live Radar
          </a>
          <a className="hover:text-cyan-glow transition-colors text-slate-400" href="#analytics">
            Analytics
          </a>
          <a className="hover:text-cyan-glow transition-colors text-slate-400" href="#risk-lab">
            Risk Lab
          </a>
          <a className="hover:text-cyan-glow transition-colors text-slate-400" href="#cosmic-scale">
            Scale
          </a>
          <a className="hover:text-cyan-glow transition-colors text-slate-400" href="#compare">
            Compare
          </a>
          <a className="hover:text-cyan-glow transition-colors text-slate-400" href="#methodology">
            Methodology
          </a>
        </nav>

        {/* Right Controls: Live Status, Search, Dictionary & Sources */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Live Data Pill */}
          <div
            title={`Last sync: ${syncTimestamp}`}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-pill border text-xs font-sans transition-colors ${
              dataSourceType === 'LIVE'
                ? 'border-emerald-500/25 bg-emerald-500/5'
                : 'border-amber-500/25 bg-amber-500/5'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                dataSourceType === 'LIVE'
                  ? 'bg-hazard-emerald shadow-[0_0_8px_#10B981] animate-pulse'
                  : 'bg-hazard-amber shadow-[0_0_8px_#F59E0B]'
              }`}
            />
            <span className="text-slate-300 font-medium tracking-tight hidden sm:inline">
              {dataSourceType === 'LIVE' ? (
                <>
                  LIVE DATA <span className="text-slate-600">//</span>{' '}
                  <span className="font-mono text-[11px] text-cyan-ice">NASA NeoWs</span>
                </>
              ) : (
                <>
                  CACHED DATA <span className="text-slate-600">//</span>{' '}
                  <span className="font-mono text-[11px] text-amber-300">FALLBACK</span>
                </>
              )}
            </span>
            <span className="text-slate-300 font-medium tracking-tight sm:hidden text-[10px] font-mono">
              {dataSourceType === 'LIVE' ? 'LIVE' : 'CACHED'}
            </span>

            {/* Manual Refresh Trigger */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              aria-label="Refresh NASA Live Stream"
              className="ml-1 text-slate-400 hover:text-cyan-glow disabled:opacity-40 transition-colors p-0.5"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-cyan-glow' : ''}`} />
            </button>
          </div>

          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search NEO Catalog"
            className="w-9 h-9 rounded-full glass-pill flex items-center justify-center text-slate-400 hover:text-cyan-glow hover:border-cyan-neon/40 transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Data Dictionary Button */}
          <button
            onClick={onOpenDataDictionary}
            title="Data Dictionary"
            aria-label="Open Data Dictionary"
            className="hidden md:flex w-9 h-9 rounded-full glass-pill items-center justify-center text-slate-400 hover:text-cyan-glow hover:border-cyan-neon/40 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>

          {/* Sources & Methodology Drawer Button */}
          <button
            onClick={onOpenSources}
            title="Sources & Transparency Hierarchy"
            aria-label="Open Source & Methodology Hierarchy"
            className="hidden md:flex items-center space-x-1 px-3 py-1.5 rounded-full glass-pill text-xs font-mono text-cyan-ice hover:text-white hover:border-cyan-neon/50 transition-colors"
          >
            <span>SOURCES</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-full glass-pill flex items-center justify-center text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            <Layers className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-2 mx-auto max-w-md rounded-2xl liquid-panel border border-white/10 p-5 space-y-4 backdrop-blur-2xl">
          <div className="grid grid-cols-2 gap-3 text-xs uppercase font-medium">
            <a onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-space-950/60 hover:text-cyan-glow text-white" href="#hero">
              Explore
            </a>
            <a onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-space-950/60 hover:text-cyan-glow text-white" href="#live-radar">
              Live Radar
            </a>
            <a onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-space-950/60 hover:text-cyan-glow text-white" href="#analytics">
              Analytics
            </a>
            <a onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-space-950/60 hover:text-cyan-glow text-white" href="#risk-lab">
              Risk Lab
            </a>
            <a onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-space-950/60 hover:text-cyan-glow text-white" href="#cosmic-scale">
              Cosmic Scale
            </a>
            <a onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-space-950/60 hover:text-cyan-glow text-white" href="#compare">
              Object Compare
            </a>
            <a onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-lg bg-space-950/60 hover:text-cyan-glow text-white col-span-2" href="#methodology">
              Data Science Methodology
            </a>
          </div>
          <div className="pt-2 border-t border-white/10 flex justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDataDictionary();
              }}
              className="text-xs font-mono text-cyan-ice flex items-center space-x-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>DATA DICTIONARY</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSources();
              }}
              className="text-xs font-mono text-cyan-neon flex items-center space-x-1"
            >
              <span>ALL SOURCES</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
