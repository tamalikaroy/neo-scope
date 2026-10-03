'use client';

import React, { useState } from 'react';
import { OFFICIAL_SOURCES } from '../data/sourcesData';
import { X, ExternalLink, ShieldCheck, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface SourceMethodologyModalProps {
  initialSourceId?: string | null;
  onClose: () => void;
}

export const SourceMethodologyModal: React.FC<SourceMethodologyModalProps> = ({
  initialSourceId,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'NASA DATA', 'JPL / CNEOS', 'RESEARCH', 'MODEL'];

  const filteredSources = OFFICIAL_SOURCES.filter(
    (s) => selectedCategory === 'ALL' || s.category === selectedCategory
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 select-none">
      <div className="relative w-full max-w-4xl rounded-3xl liquid-panel-glow border border-cyan-glow/40 p-6 sm:p-8 max-h-[92vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-glow uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>TRANSPARENCY & SCIENTIFIC CITATION LEDGER</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              SOURCES & METHODOLOGY
            </h2>
            <p className="text-xs font-sans text-slate-400">
              Authoritative data provenance, retrieval timestamps, derivation methods, and analytical limitations.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Close sources modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full border transition-colors ${
                selectedCategory === cat
                  ? 'border-cyan-glow bg-cyan-glow/20 text-white font-bold'
                  : 'border-white/10 bg-space-950/60 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Source Cards Grid */}
        <div className="space-y-4">
          {filteredSources.map((source) => (
            <div
              key={source.id}
              className="p-5 rounded-2xl liquid-panel border border-white/10 space-y-4 hover:border-cyan-glow/40 transition-colors"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-neon/15 text-cyan-ice border border-cyan-neon/30 uppercase">
                      {source.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{source.organization}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mt-1">
                    {source.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-cyan-glow" />
                    <span>{source.retrievalTimestamp}</span>
                  </span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-full border border-cyan-neon/30 text-cyan-ice hover:text-white hover:border-cyan-neon flex items-center space-x-1 transition-colors"
                  >
                    <span>OPEN SOURCE</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* What We Obtained */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-cyan-ice uppercase">WHAT WE USED IT FOR:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-sans text-slate-300">
                  {source.usedFor.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-neon shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculation & Limitations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans">
                <div className="p-3 rounded-xl bg-space-950/80 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    METHODOLOGY & RETRIEVAL TYPE
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {source.methodologyNotes}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-space-950/80 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-amber-300 uppercase">
                    SCIENTIFIC LIMITATIONS
                  </span>
                  <p className="text-slate-400 leading-relaxed">
                    {source.limitations}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Notice */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-sans gap-2">
          <span>NEO-SCOPE complies with NASA Open Data Policy & IAU Planetary Science Standards.</span>
          <span className="font-mono text-slate-400">EPOCH: J2000.0 HELIOCENTRIC</span>
        </div>
      </div>
    </div>
  );
};
