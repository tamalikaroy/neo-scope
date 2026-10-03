'use client';

import React, { useState } from 'react';
import { DATA_DICTIONARY } from '../data/dataDictionary';
import { DataDictionaryEntry } from '../types/neo';
import { X, ExternalLink, BookOpen, Search, Check, Minus } from 'lucide-react';

interface DataDictionaryModalProps {
  onClose: () => void;
}

export const DataDictionaryModal: React.FC<DataDictionaryModalProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredEntries = DATA_DICTIONARY.filter((entry) => {
    const matchesSearch =
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || entry.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 select-none">
      <div className="relative w-full max-w-4xl rounded-3xl liquid-panel-glow border border-cyan-glow/40 p-6 sm:p-8 max-h-[92vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-glow uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>DATA SCIENCE DOCUMENTATION</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              DATA DICTIONARY & VARIABLE LEDGER
            </h2>
            <p className="text-xs font-sans text-slate-400">
              Precise physical definitions, scientific units, raw vs. derived status, and model feature weights.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Close data dictionary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search variables or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-space-950 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-glow"
            />
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono w-full sm:w-auto">
            {['ALL', 'Raw API Observation', 'Derived Value', 'Model Output', 'Orbital Element'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-full border transition-colors ${
                  filterType === t
                    ? 'border-cyan-glow bg-cyan-glow/20 text-white font-bold'
                    : 'border-white/10 bg-space-950/60 text-slate-400 hover:text-white'
                }`}
              >
                {t === 'Raw API Observation' ? 'Raw' : t === 'Derived Value' ? 'Derived' : t === 'Model Output' ? 'Model' : t === 'Orbital Element' ? 'Orbital' : 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Dictionary Entries List */}
        <div className="space-y-4">
          {filteredEntries.map((entry) => (
            <div
              key={entry.name}
              className="p-5 rounded-2xl liquid-panel border border-white/10 space-y-3 hover:border-cyan-glow/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm font-bold text-white bg-space-950 px-2 py-0.5 rounded border border-white/15">
                    {entry.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase border ${
                      entry.type === 'Raw API Observation'
                        ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                        : entry.type === 'Derived Value'
                        ? 'border-cyan-ice/30 text-cyan-ice bg-cyan-ice/10'
                        : entry.type === 'Model Output'
                        ? 'border-amber-500/30 text-amber-300 bg-amber-500/10'
                        : 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                    }`}
                  >
                    {entry.type}
                  </span>
                </div>

                <div className="flex items-center space-x-4 text-xs font-mono text-slate-400">
                  <span>
                    UNIT: <strong className="text-cyan-glow">{entry.unit}</strong>
                  </span>
                  <a
                    href={entry.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-ice hover:text-white underline flex items-center space-x-0.5"
                  >
                    <span>SOURCE ↗</span>
                  </a>
                </div>
              </div>

              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                {entry.definition}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] font-mono text-slate-400">
                <div className="flex items-center space-x-2">
                  <span>USED BY MODEL:</span>
                  {entry.usedByModel ? (
                    <span className="text-cyan-ice font-bold flex items-center">
                      <Check className="w-3 h-3 mr-1 text-cyan-glow" /> YES{' '}
                      {entry.modelWeight && `(${entry.modelWeight})`}
                    </span>
                  ) : (
                    <span className="text-slate-500 flex items-center">
                      <Minus className="w-3 h-3 mr-1" /> NO (Informational)
                    </span>
                  )}
                </div>

                <span className="text-slate-500">PROVIDER: {entry.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
