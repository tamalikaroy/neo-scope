'use client';

import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenSources: () => void;
  onOpenDataDictionary: () => void;
  onOpenMethodology: (stageIndex?: number) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSources,
  onOpenDataDictionary,
  onOpenMethodology,
}) => {
  const [utcTime, setUtcTime] = useState<string>('2026-10-03 06:59:02 UTC');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className="border-t border-white/10 bg-space-950 py-16 px-4 sm:px-6 lg:px-12 text-slate-400 text-xs font-sans select-none"
      data-purpose="scientific-footer"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left: Brand / Statement */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center space-x-2 text-white font-display font-extrabold tracking-[0.2em] text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-glow" />
              <span>NEO-SCOPE RESEARCH ARCHIVE</span>
            </div>
            <p className="text-slate-400 leading-relaxed font-sans text-xs">
              Open telemetry visualizer and machine learning risk observatory. Data courtesy of NASA
              JPL Center for Near-Earth Object Studies (CNEOS) and Minor Planet Center (MPC).
            </p>
            <div className="pt-2 flex items-center space-x-4 text-[11px] font-mono text-cyan-ice">
              <button onClick={onOpenSources} className="hover:text-white underline">
                Sources Hierarchy ↗
              </button>
              <button onClick={onOpenDataDictionary} className="hover:text-white underline">
                Data Dictionary ↗
              </button>
              <button onClick={() => onOpenMethodology(0)} className="hover:text-white underline">
                Methodology ↗
              </button>
            </div>
          </div>

          {/* Links Center */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-white font-sans font-semibold uppercase tracking-wider text-[11px]">
                Primary Sources
              </div>
              <ul className="space-y-1.5 text-slate-400 text-xs font-sans">
                <li>
                  <a
                    className="hover:text-cyan-glow transition-colors flex items-center space-x-1"
                    href="https://cneos.jpl.nasa.gov/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>NASA CNEOS API</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-cyan-glow transition-colors flex items-center space-x-1"
                    href="https://ssd.jpl.nasa.gov/horizons/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>JPL Horizons</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-cyan-glow transition-colors flex items-center space-x-1"
                    href="https://minorplanetcenter.net/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>Minor Planet Center</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-cyan-glow transition-colors flex items-center space-x-1"
                    href="https://api.nasa.gov/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>NASA Open APIs</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="text-white font-sans font-semibold uppercase tracking-wider text-[11px]">
                Platform Specs
              </div>
              <ul className="space-y-1.5 text-slate-400 text-xs font-mono">
                <li>Latency: 28 ms</li>
                <li>Epoch: J2000.0</li>
                <li>Ref: IAU WGNEO</li>
                <li>Model: RF 100 Trees</li>
              </ul>
            </div>
          </div>

          {/* Right: Health Status Indicator */}
          <div className="md:col-span-4 liquid-panel rounded-2xl p-4 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white font-sans font-semibold text-xs">SERVICE HEALTH</span>
              <span className="flex items-center space-x-1.5 text-hazard-emerald text-xs font-sans">
                <span className="w-2 h-2 rounded-full bg-hazard-emerald animate-pulse" />
                <span>ALL SYSTEMS NOMINAL</span>
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              POLLING INTERVAL: 10 MINUTE DELTAS
              <br />
              INGESTION: <span className="text-cyan-ice">{utcTime}</span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © 2026 NEO-SCOPE. Developed for scientific communication &amp; planetary defense awareness.
          </div>
          <div className="flex items-center space-x-6 text-slate-400">
            <button onClick={onOpenSources} className="hover:text-cyan-glow transition-colors">
              Observational Access Terms
            </button>
            <a
              className="hover:text-cyan-glow transition-colors"
              href="https://api.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NASA API Docs
            </a>
            <button onClick={onOpenDataDictionary} className="hover:text-cyan-glow transition-colors">
              Data Dictionary
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
