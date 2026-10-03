'use client';

import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Earth3D } from './Earth3D';

interface HeroSectionProps {
  dataSourceType?: 'LIVE' | 'CACHED' | 'ERROR';
  syncTimestamp?: string;
  onExploreClick: () => void;
  onHowItWorksClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  dataSourceType = 'LIVE',
  syncTimestamp = '2026-10-03 06:59:02 UTC',
  onExploreClick,
  onHowItWorksClick,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-between pt-24 sm:pt-28 pb-10 overflow-hidden bg-space-950 scroll-mt-28"
      data-purpose="hero-earth"
    >
      {/* 3D Atmospheric Earth Scene with Stars & Background Orbital Paths */}
      <Earth3D />

      {/* Main Hero Content (Positioned with generous negative space) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full flex-1 flex items-center my-auto">
        <div className="w-full lg:w-[48%] xl:w-[46%] space-y-7 pt-4 lg:pt-0">
          {/* Mission Capsule */}
          <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full glass-pill border-cyan-neon/30 text-xs font-mono tracking-widest text-cyan-ice">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow shadow-[0_0_8px_#00F0FF] animate-pulse" />
            <span>NEAR-EARTH OBJECT INTELLIGENCE</span>
          </div>

          {/* Main Editorial Headline (Bricolage Grotesque, refined solid cyan emphasis, no text gradients) */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-[5.4rem] font-extrabold tracking-[-0.035em] leading-[0.93] text-white">
            THE SPACE
            <br />
            AROUND US
            <br />
            ISN&apos;T <span className="text-cyan-glow">EMPTY.</span>
          </h1>

          {/* Scientific Subtitle (Instrument Sans) */}
          <p className="text-slate-300 text-base sm:text-lg md:text-xl font-sans font-normal leading-relaxed max-w-xl">
            Explore real Near-Earth Object observations through NASA data, orbital
            visualization and transparent machine-learning analysis.
          </p>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <a
              href="#live-radar"
              onClick={(e) => {
                e.preventDefault();
                onExploreClick();
              }}
              className="liquid-button-primary px-8 py-3.5 rounded-full text-xs font-semibold tracking-wider text-white uppercase flex items-center space-x-2.5 group font-sans cursor-pointer"
            >
              <span>EXPLORE NEOS</span>
              <ArrowRight className="w-4 h-4 text-cyan-glow transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#methodology"
              onClick={(e) => {
                e.preventDefault();
                onHowItWorksClick();
              }}
              className="liquid-button-ghost px-7 py-3.5 rounded-full text-xs font-medium tracking-wider text-slate-300 hover:text-white uppercase flex items-center space-x-2.5 font-sans cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-cyan-ice fill-current" />
              <span>HOW IT WORKS</span>
            </a>
          </div>

          {/* Transparent Provenance & Real Data Metadata Strip (No fake telemetry) */}
          <div className="pt-6 flex flex-wrap items-center justify-between border-t border-white/10 text-xs font-mono text-slate-400 gap-3 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
                <span className="text-slate-300 font-semibold">
                  {dataSourceType === 'LIVE' ? 'LIVE DATA' : 'CACHED FEED'}
                </span>
              </div>
              <span className="text-slate-600">//</span>
              <span className="text-slate-400">NASA NeoWs</span>
              <span className="text-slate-600">//</span>
              <span className="text-slate-400">
                UPDATED: <span className="text-slate-200">{syncTimestamp}</span>
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href="https://api.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-neon hover:text-white transition-colors flex items-center space-x-0.5"
              >
                <span>NASA NeoWs →</span>
              </a>
              <a
                href="https://ssd.jpl.nasa.gov/horizons/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors flex items-center space-x-0.5"
              >
                <span>JPL Horizons →</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator (Refined line indicator, no clunky mouse icon) */}
      <div className="relative z-10 hidden md:flex flex-col items-center space-y-1.5 pointer-events-none opacity-60">
        <span className="text-[9px] font-mono tracking-widest uppercase text-slate-400">
          SCROLL TO EXPLORE
        </span>
        <div className="w-px h-5 bg-gradient-to-b from-cyan-glow to-transparent" />
      </div>
    </section>
  );
};
