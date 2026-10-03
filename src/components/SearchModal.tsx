'use client';

import React, { useState } from 'react';
import { NearEarthObject } from '../types/neo';
import { Search, X, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  neos: NearEarthObject[];
  onSelectNeo: (neo: NearEarthObject) => void;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  neos,
  onSelectNeo,
  onClose,
}) => {
  const [query, setQuery] = useState('');

  const filteredNeos = neos.filter(
    (neo) =>
      neo.name.toLowerCase().includes(query.toLowerCase()) ||
      neo.id.includes(query) ||
      (neo.designation && neo.designation.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-28 select-none">
      <div className="relative w-full max-w-2xl rounded-3xl liquid-panel-glow border border-cyan-glow/40 p-6 space-y-4">
        {/* Search Input Box */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-3 flex-1">
            <Search className="w-5 h-5 text-cyan-glow" />
            <input
              type="text"
              autoFocus
              placeholder="Search by object name, designation, or JPL ID (e.g. Apophis, Bennu, 2024)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-white font-sans text-sm focus:outline-none placeholder-slate-500"
            />
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-slate-400 hover:text-white"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto space-y-2 pr-1">
          {filteredNeos.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-slate-500">
              NO NEAR-EARTH OBJECTS MATCHING &quot;{query}&quot;
            </div>
          ) : (
            filteredNeos.map((neo) => {
              const approach = neo.close_approach_data[0];
              const vel = approach?.relative_velocity?.kilometers_per_second
                ? `${parseFloat(approach.relative_velocity.kilometers_per_second).toFixed(1)} km/s`
                : '22 km/s';
              const dist = approach?.miss_distance?.lunar
                ? `${parseFloat(approach.miss_distance.lunar).toFixed(2)} LD`
                : '12 LD';
              const diam = Math.round(
                (neo.estimated_diameter.meters.min + neo.estimated_diameter.meters.max) / 2
              );

              return (
                <div
                  key={neo.id}
                  onClick={() => {
                    onSelectNeo(neo);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-space-950/60 border border-white/10 hover:border-cyan-glow/50 hover:bg-space-900 cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-display font-bold text-sm text-white group-hover:text-cyan-ice">
                        {neo.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        #{neo.id}
                      </span>
                      {neo.is_potentially_hazardous_asteroid ? (
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-hazard-red/20 text-hazard-red border border-hazard-red/40">
                          PHA
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-ice/20 text-cyan-ice border border-cyan-ice/40">
                          NOMINAL
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400">
                      Diameter: <span className="text-slate-200">~{diam} m</span> | Vel:{' '}
                      <span className="text-cyan-glow">{vel}</span> | Miss:{' '}
                      <span className="text-amber-300">{dist}</span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-glow group-hover:translate-x-1 transition-all" />
                </div>
              );
            })
          )}
        </div>

        <div className="pt-2 border-t border-white/5 flex justify-between text-[10px] font-mono text-slate-500">
          <span>DATA COURTESY OF NASA NEOWS / JPL HORIZONS</span>
          <span>PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};
