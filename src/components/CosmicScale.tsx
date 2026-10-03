'use client';

import React, { useState } from 'react';
import { NearEarthObject } from '../types/neo';
import { CURATED_NEOS } from '../data/catalog';
import { Ruler, Globe, Maximize2, Layers, CheckCircle2 } from 'lucide-react';

interface CosmicScaleProps {
  currentNeo?: NearEarthObject;
}

interface BenchmarkItem {
  id: string;
  category: string;
  label: string;
  meters: number;
  display: string;
  sciNotation: string;
  notes: string;
}

export const CosmicScale: React.FC<CosmicScaleProps> = ({ currentNeo }) => {
  const [selectedNeoId, setSelectedNeoId] = useState<string>(currentNeo?.id || '2099942');
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState<string>('asteroid');

  const activeNeo = CURATED_NEOS.find((n) => n.id === selectedNeoId) || CURATED_NEOS[0];
  const asteroidDiameterM = Math.round(
    (activeNeo.estimated_diameter.meters.min + activeNeo.estimated_diameter.meters.max) / 2
  );
  const asteroidDiameterKm = (asteroidDiameterM / 1000).toFixed(3);

  // Benchmarks list with active asteroid injected dynamically
  const benchmarks: BenchmarkItem[] = [
    {
      id: 'human',
      category: 'BIOLOGICAL REFERENCE',
      label: 'Human Height Standard',
      meters: 1.7,
      display: '1.7 m',
      sciNotation: '1.7 × 10⁰ m',
      notes: 'Global adult human mean height',
    },
    {
      id: 'car',
      category: 'TERRESTRIAL OBJECT',
      label: 'Passenger Automobile',
      meters: 4.5,
      display: '4.5 m',
      sciNotation: '4.5 × 10⁰ m',
      notes: 'Standard passenger vehicle length',
    },
    {
      id: 'aircraft',
      category: 'AERONAUTICAL REFERENCE',
      label: 'Commercial Jetliner (Boeing 747-8)',
      meters: 76.3,
      display: '76.3 m',
      sciNotation: '7.6 × 10¹ m',
      notes: 'Long-range wide-body commercial airliner',
    },
    {
      id: 'liberty',
      category: 'CIVIL ARCHITECTURE',
      label: 'Statue of Liberty',
      meters: 93,
      display: '93 m',
      sciNotation: '9.3 × 10¹ m',
      notes: 'Pedestal base to torch tip',
    },
    {
      id: 'asteroid',
      category: 'TARGET OBJECT',
      label: `${activeNeo.name} (Estimated Diameter)`,
      meters: asteroidDiameterM,
      display: asteroidDiameterM >= 1000 ? `${asteroidDiameterKm} km` : `${asteroidDiameterM} m`,
      sciNotation:
        asteroidDiameterM >= 1000
          ? `${(asteroidDiameterM / 1000).toFixed(2)} × 10³ m`
          : `${(asteroidDiameterM / 100).toFixed(2)} × 10² m`,
      notes: activeNeo.is_potentially_hazardous_asteroid
        ? 'Potentially Hazardous Asteroid specimen'
        : 'Near-Earth Object catalog specimen',
    },
    {
      id: 'everest',
      category: 'TOPOGRAPHICAL RELIEF',
      label: 'Mount Everest Elevation',
      meters: 8849,
      display: '8,849 m',
      sciNotation: '8.8 × 10³ m',
      notes: 'Highest terrestrial surface elevation above sea level',
    },
    {
      id: 'earth',
      category: 'PLANETARY REFERENCE BODY',
      label: 'Planet Earth (Equatorial Diameter)',
      meters: 12742000,
      display: '12,742 km',
      sciNotation: '1.27 × 10⁷ m',
      notes: 'Geodetic mean equatorial diameter of Earth',
    },
  ];

  // Mathematical ratios
  const humanRatio = Math.round(asteroidDiameterM / 1.7);
  const earthDiameterM = 12742000;
  const earthFraction = asteroidDiameterM / earthDiameterM;
  const earthRatioPct = (earthFraction * 100).toFixed(5);
  const earthRatioDenominator = Math.round(earthDiameterM / asteroidDiameterM).toLocaleString();

  // Selected benchmark details
  const currentBenchmark = benchmarks.find((b) => b.id === selectedBenchmarkId) || benchmarks[4];

  return (
    <section
      id="cosmic-scale"
      className="py-28 px-4 sm:px-6 lg:px-12 relative border-t border-white/5 bg-space-950 overflow-hidden scroll-mt-28"
      data-purpose="cosmic-scale-perspectives"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-neon tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-glow" />
            <span>PHYSICAL SCALE & PERSPECTIVE</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            PUT IT IN PERSPECTIVE.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-sans leading-relaxed">
            An asteroid can be enormous by human standards and still be tiny on a planetary scale.
          </p>
        </div>

        {/* Specimen Switcher Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
          <span className="text-slate-500 mr-2 uppercase tracking-wider text-[11px]">SELECT NEO:</span>
          {CURATED_NEOS.slice(0, 5).map((neo) => {
            const isSelected = selectedNeoId === neo.id;
            const meanDiam = Math.round(
              (neo.estimated_diameter.meters.min + neo.estimated_diameter.meters.max) / 2
            );
            return (
              <button
                key={neo.id}
                onClick={() => setSelectedNeoId(neo.id)}
                className={`px-3.5 py-1.5 rounded-full border transition-all ${
                  isSelected
                    ? 'border-cyan-glow bg-cyan-glow/15 text-white font-bold shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                    : 'border-white/10 bg-space-900/60 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {neo.name} ({meanDiam >= 1000 ? `${(meanDiam / 1000).toFixed(1)} km` : `${meanDiam} m`})
              </button>
            );
          })}
        </div>

        {/* Main Scale Instrument Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 7-Order-of-Magnitude Logarithmic Scale Ruler (7 Cols) */}
          <div className="lg:col-span-7 liquid-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-neon">
                  LOGARITHMIC DIMENSIONAL SPECTRUM
                </span>
                <h3 className="font-display text-lg font-bold text-white">
                  Orders of Magnitude (10⁰ m to 10⁷ m)
                </h3>
              </div>
              <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-400">
                <Ruler className="w-3.5 h-3.5 text-cyan-glow" />
                <span>Base 10</span>
              </div>
            </div>

            {/* Logarithmic Axis Markings */}
            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-[10px] font-mono text-slate-400 px-1">
                <span>10⁰ m (1 m)</span>
                <span>10² m (100 m)</span>
                <span>10⁴ m (10 km)</span>
                <span>10⁶ m (1,000 km)</span>
                <span>10⁷ m (10,000 km)</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full flex justify-between px-1">
                <span className="w-0.5 h-2 bg-white/30 -mt-0.5" />
                <span className="w-0.5 h-2 bg-white/30 -mt-0.5" />
                <span className="w-0.5 h-2 bg-white/30 -mt-0.5" />
                <span className="w-0.5 h-2 bg-white/30 -mt-0.5" />
                <span className="w-0.5 h-2 bg-white/30 -mt-0.5" />
              </div>
            </div>

            {/* Benchmark Item Bars */}
            <div className="space-y-3 pt-2">
              {benchmarks.map((item) => {
                const logVal = Math.log10(item.meters);
                // Map log range [0, 7.10] to percentage [5%, 100%]
                const pct = Math.max(5, Math.min(100, (logVal / 7.105) * 100));
                const isTarget = item.id === 'asteroid';
                const isSelected = selectedBenchmarkId === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedBenchmarkId(item.id)}
                    className={`w-full text-left p-3 rounded-2xl transition-all border ${
                      isTarget
                        ? 'bg-cyan-glow/10 border-cyan-glow/40 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                        : isSelected
                        ? 'bg-white/5 border-white/30'
                        : 'bg-space-950/40 border-white/5 hover:border-white/15 hover:bg-space-900/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isTarget
                              ? 'bg-cyan-glow animate-pulse'
                              : item.id === 'earth'
                              ? 'bg-blue-400'
                              : item.id === 'human'
                              ? 'bg-amber-400'
                              : 'bg-slate-400'
                          }`}
                        />
                        <span
                          className={`font-mono text-[11px] font-semibold ${
                            isTarget ? 'text-cyan-glow' : 'text-slate-200'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 font-mono">
                        <span className="text-white font-bold">{item.display}</span>
                        <span className="text-[10px] text-slate-400">({item.sciNotation})</span>
                      </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full bg-space-950/80 rounded-full h-2.5 overflow-hidden border border-white/10">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isTarget
                            ? 'bg-gradient-to-r from-cyan-neon to-cyan-glow shadow-[0_0_12px_#00F0FF]'
                            : item.id === 'earth'
                            ? 'bg-blue-500'
                            : item.id === 'human'
                            ? 'bg-amber-400/80'
                            : 'bg-slate-600'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] font-mono text-slate-400 border-t border-white/5 pt-3 flex items-center justify-between">
              <span>AXIS METRIC: LOG₁₀(METERS)</span>
              <span>SPAN: 7.10 ORDERS OF MAGNITUDE</span>
            </div>
          </div>

          {/* RIGHT: PERSPECTIVE ANALYSIS & PROPORTION METRICS (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: Familiar Scale Reference */}
            <div className="liquid-panel rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                  FAMILIAR SCALE REFERENCE
                </span>
                <span className="text-xs font-mono text-slate-400">Human Standard (1.7 m)</span>
              </div>

              <div className="space-y-1">
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {humanRatio.toLocaleString()}×
                </div>
                <div className="text-xs font-mono text-cyan-ice">
                  Height multiplier relative to an adult human (1.7 m)
                </div>
              </div>

              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                By terrestrial metrics, <strong className="text-white font-medium">{activeNeo.name}</strong>{' '}
                spans <span className="font-mono text-cyan-glow font-medium">{asteroidDiameterM} meters</span>.
                Placed alongside civil architecture, it equals approximately{' '}
                <span className="font-mono text-white font-medium">
                  {(asteroidDiameterM / 93).toFixed(1)} Statues of Liberty
                </span>{' '}
                stacked vertically.
              </p>

              {/* Graphic Ratio Indicator */}
              <div className="p-3.5 rounded-2xl bg-space-950/80 border border-white/5 text-[11px] font-mono flex items-center justify-between">
                <span className="text-slate-400">1.7 m (Human)</span>
                <span className="text-amber-400 font-bold">1 : {humanRatio.toLocaleString()}</span>
                <span className="text-cyan-glow">{asteroidDiameterM} m ({activeNeo.name})</span>
              </div>
            </div>

            {/* Card 2: Planetary Scale Reference */}
            <div className="liquid-panel rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-neon">
                  PLANETARY SCALE REFERENCE
                </span>
                <span className="text-xs font-mono text-slate-400">Earth Diameter (12,742 km)</span>
              </div>

              <div className="space-y-1">
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-cyan-glow tracking-tight">
                  {earthRatioPct}%
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Fraction of Earth&apos;s equatorial diameter
                </div>
              </div>

              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                Against Earth&apos;s <span className="font-mono text-white font-medium">12,742 km</span> planetary
                bulk, this asteroid represents only{' '}
                <span className="font-mono text-cyan-ice font-medium">1 in {earthRatioDenominator}</span> parts of
                the planet&apos;s physical span.
              </p>

              {/* Graphic Ratio Indicator */}
              <div className="p-3.5 rounded-2xl bg-space-950/80 border border-white/5 text-[11px] font-mono flex items-center justify-between">
                <span className="text-cyan-glow">{asteroidDiameterM} m (NEO)</span>
                <span className="text-cyan-ice font-bold">1 : {earthRatioDenominator}</span>
                <span className="text-blue-400">12,742 km (Earth)</span>
              </div>
            </div>

            {/* Card 3: Selected Benchmark Context */}
            <div className="liquid-panel rounded-3xl p-6 border border-white/10 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                <Layers className="w-3.5 h-3.5 text-cyan-glow" />
                <span className="uppercase tracking-wider">{currentBenchmark.category}</span>
              </div>
              <div className="font-sans font-semibold text-white text-sm">
                {currentBenchmark.label} ({currentBenchmark.display})
              </div>
              <p className="text-xs font-sans text-slate-300 leading-relaxed">
                {currentBenchmark.notes}. On a linear diagram where Earth is 1 meter across, an object of this
                size would be{' '}
                <span className="font-mono text-cyan-glow">
                  {((currentBenchmark.meters / 12742000) * 1000).toFixed(4)} millimeters
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Emotional Scientific Statement Anchor */}
        <div className="pt-10 border-t border-white/10 text-center space-y-3 max-w-xl mx-auto">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-widest text-white uppercase leading-snug">
            WE ARE SMALL.
            <br />
            <span className="text-cyan-glow">THE DATA IS NOT.</span>
          </h3>
          <p className="text-xs font-mono text-slate-400 tracking-wider">
            HUMAN (1.7 m) &nbsp;·&nbsp; {activeNeo.name.toUpperCase()} ({asteroidDiameterM} m) &nbsp;·&nbsp; EARTH (12,742 km)
          </p>
        </div>
      </div>
    </section>
  );
};
