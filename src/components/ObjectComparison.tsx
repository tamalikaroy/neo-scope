'use client';

import React, { useState } from 'react';
import { NearEarthObject } from '../types/neo';
import { CURATED_NEOS } from '../data/catalog';
import { ExternalLink, ArrowRightLeft, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ObjectComparisonProps {
  onOpenSourceModal: (sourceId?: string) => void;
}

interface ComparableEntity {
  id: string;
  name: string;
  designation: string;
  diameterM: number;
  diameterDisplay: string;
  massKg: string;
  velocityKms: string;
  missDistanceDisplay: string;
  isPha: boolean;
  modelStatus: string;
  type: 'ASTEROID' | 'PLANET' | 'SATELLITE';
  sourceUrl: string;
}

const COMPARISON_ENTITIES: ComparableEntity[] = [
  {
    id: "2099942",
    name: "99942 Apophis",
    designation: "2004 MN4",
    diameterM: 340,
    diameterDisplay: "340 m",
    massKg: "4.1 × 10¹⁰ kg (~41 Million Metric Tons)",
    velocityKms: "30.73 km/s",
    missDistanceDisplay: "31,600 km (0.082 LD)",
    isPha: true,
    modelStatus: "POTENTIALLY HAZARDOUS",
    type: "ASTEROID",
    sourceUrl: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=99942"
  },
  {
    id: "2101955",
    name: "101955 Bennu",
    designation: "1999 RQ36",
    diameterM: 492,
    diameterDisplay: "492 m",
    massKg: "7.3 × 10¹⁰ kg (~73 Million Metric Tons)",
    velocityKms: "27.80 km/s",
    missDistanceDisplay: "750,000 km (1.95 LD)",
    isPha: true,
    modelStatus: "POTENTIALLY HAZARDOUS",
    type: "ASTEROID",
    sourceUrl: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=101955"
  },
  {
    id: "2004179",
    name: "4179 Toutatis",
    designation: "1989 AC",
    diameterM: 5400,
    diameterDisplay: "5,400 m (5.4 km)",
    massKg: "5.0 × 10¹³ kg (~50 Billion Metric Tons)",
    velocityKms: "37.50 km/s",
    missDistanceDisplay: "6.9M km (18.0 LD)",
    isPha: true,
    modelStatus: "POTENTIALLY HAZARDOUS",
    type: "ASTEROID",
    sourceUrl: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=4179"
  },
  {
    id: "54425624",
    name: "2024 BX1",
    designation: "Sar2736",
    diameterM: 1.2,
    diameterDisplay: "1.2 m",
    massKg: "~2,500 kg (2.5 Metric Tons)",
    velocityKms: "15.20 km/s",
    missDistanceDisplay: "0.0 km (Disintegrated in Atmosphere)",
    isPha: false,
    modelStatus: "NOMINAL BOLIDE",
    type: "ASTEROID",
    sourceUrl: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=2024+BX1"
  },
  {
    id: "54341991",
    name: "2023 DZ2",
    designation: "2023 DZ2",
    diameterM: 65,
    diameterDisplay: "65 m",
    massKg: "~3.8 × 10⁸ kg (~380,000 Metric Tons)",
    velocityKms: "7.78 km/s",
    missDistanceDisplay: "174,750 km (0.455 LD)",
    isPha: false,
    modelStatus: "NOMINAL PASS",
    type: "ASTEROID",
    sourceUrl: "https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=2023+DZ2"
  },
  {
    id: "earth",
    name: "Planet Earth",
    designation: "Terra (Home Body)",
    diameterM: 12742000,
    diameterDisplay: "12,742 km",
    massKg: "5.972 × 10²⁴ kg",
    velocityKms: "29.78 km/s (Orbital Mean)",
    missDistanceDisplay: "0.0 LD (Center of Mass)",
    isPha: false,
    modelStatus: "N/A (TARGET PLANET)",
    type: "PLANET",
    sourceUrl: "https://solarsystem.nasa.gov/planets/earth/overview/"
  },
  {
    id: "moon",
    name: "The Moon",
    designation: "Luna",
    diameterM: 3474800,
    diameterDisplay: "3,474.8 km",
    massKg: "7.342 × 10²² kg",
    velocityKms: "1.02 km/s (Orbital)",
    missDistanceDisplay: "1.000 LD (384,400 km)",
    isPha: false,
    modelStatus: "N/A (SATELLITE)",
    type: "SATELLITE",
    sourceUrl: "https://solarsystem.nasa.gov/moons/earths-moon/overview/"
  }
];

export const ObjectComparison: React.FC<ObjectComparisonProps> = ({ onOpenSourceModal }) => {
  const [entityAId, setEntityAId] = useState<string>("2099942"); // Apophis
  const [entityBId, setEntityBId] = useState<string>("2101955"); // Bennu

  const entityA = COMPARISON_ENTITIES.find((e) => e.id === entityAId) || COMPARISON_ENTITIES[0];
  const entityB = COMPARISON_ENTITIES.find((e) => e.id === entityBId) || COMPARISON_ENTITIES[1];

  // Calculate visual relative scale
  const maxDiam = Math.max(entityA.diameterM, entityB.diameterM);
  const ratioA = Math.max(15, Math.min(100, Math.sqrt(entityA.diameterM / maxDiam) * 100));
  const ratioB = Math.max(15, Math.min(100, Math.sqrt(entityB.diameterM / maxDiam) * 100));

  return (
    <section
      id="compare"
      className="py-28 px-4 sm:px-6 lg:px-12 relative border-t border-white/5 bg-space-950 scroll-mt-28"
      data-purpose="object-comparison"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-neon tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-glow" />
              <span>DIAGNOSTIC MATRIX</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              OBJECT COMPARISON MODE
            </h2>
          </div>
          <p className="text-sm font-sans text-slate-400 max-w-md leading-relaxed">
            Side-by-side quantitative and geometric comparison across discovered near-Earth asteroids,
            planetary bodies, and lunar standards.
          </p>
        </div>

        {/* Comparison Dashboard Stage */}
        <div className="liquid-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8">
          {/* Selectors Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-white/10 pb-6">
            {/* Entity A Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-cyan-glow uppercase tracking-wider block">
                OBJECT A (PRIMARY TARGET):
              </label>
              <select
                value={entityAId}
                onChange={(e) => setEntityAId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-space-950 border border-cyan-glow/40 text-white font-mono text-sm focus:outline-none focus:border-cyan-glow"
              >
                {COMPARISON_ENTITIES.map((ent) => (
                  <option key={ent.id} value={ent.id}>
                    {ent.name} ({ent.diameterDisplay})
                  </option>
                ))}
              </select>
            </div>

            {/* Entity B Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-cyan-neon uppercase tracking-wider block">
                OBJECT B (BENCHMARK TARGET):
              </label>
              <select
                value={entityBId}
                onChange={(e) => setEntityBId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-space-950 border border-cyan-neon/40 text-white font-mono text-sm focus:outline-none focus:border-cyan-neon"
              >
                {COMPARISON_ENTITIES.map((ent) => (
                  <option key={ent.id} value={ent.id}>
                    {ent.name} ({ent.diameterDisplay})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Visual Silhouettes Stage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 items-center">
            {/* Object A Silhouette */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-space-950/60 border border-white/5 space-y-4">
              <div className="h-44 flex items-center justify-center">
                <div
                  className="rounded-full bg-gradient-to-tr from-cyan-950 via-slate-900 to-cyan-800 border-2 border-cyan-glow shadow-[0_0_30px_rgba(0,240,255,0.3)] flex items-center justify-center transition-all duration-500"
                  style={{
                    width: `${Math.max(40, Math.min(160, ratioA * 1.5))}px`,
                    height: `${Math.max(40, Math.min(160, ratioA * 1.5))}px`,
                  }}
                >
                  <span className="text-[10px] font-mono text-cyan-ice font-bold text-center px-1">
                    {entityA.diameterDisplay}
                  </span>
                </div>
              </div>
              <div className="text-center space-y-1">
                <h4 className="font-display font-extrabold text-xl text-white">{entityA.name}</h4>
                <span className="text-xs font-mono text-slate-400">{entityA.designation}</span>
              </div>
            </div>

            {/* Object B Silhouette */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-space-950/60 border border-white/5 space-y-4">
              <div className="h-44 flex items-center justify-center">
                <div
                  className="rounded-full bg-gradient-to-tr from-blue-950 via-slate-900 to-indigo-800 border-2 border-cyan-neon shadow-[0_0_30px_rgba(56,189,248,0.3)] flex items-center justify-center transition-all duration-500"
                  style={{
                    width: `${Math.max(40, Math.min(160, ratioB * 1.5))}px`,
                    height: `${Math.max(40, Math.min(160, ratioB * 1.5))}px`,
                  }}
                >
                  <span className="text-[10px] font-mono text-cyan-ice font-bold text-center px-1">
                    {entityB.diameterDisplay}
                  </span>
                </div>
              </div>
              <div className="text-center space-y-1">
                <h4 className="font-display font-extrabold text-xl text-white">{entityB.name}</h4>
                <span className="text-xs font-mono text-slate-400">{entityB.designation}</span>
              </div>
            </div>
          </div>

          {/* Comparative Metrics Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-sans text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-3 px-4">PARAMETER</th>
                  <th className="py-3 px-4 text-cyan-glow">{entityA.name}</th>
                  <th className="py-3 px-4 text-cyan-neon">{entityB.name}</th>
                  <th className="py-3 px-4">DIAGNOSTIC RATIO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans">Physical Diameter</td>
                  <td className="py-3 px-4 text-white font-bold">{entityA.diameterDisplay}</td>
                  <td className="py-3 px-4 text-white font-bold">{entityB.diameterDisplay}</td>
                  <td className="py-3 px-4 text-cyan-ice">
                    {(entityA.diameterM / entityB.diameterM).toFixed(2)}×
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans">Estimated Mass</td>
                  <td className="py-3 px-4 text-slate-200">{entityA.massKg}</td>
                  <td className="py-3 px-4 text-slate-200">{entityB.massKg}</td>
                  <td className="py-3 px-4 text-slate-400">Physical Density Albedo Model</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans">Relative Encounter Velocity</td>
                  <td className="py-3 px-4 text-cyan-glow font-bold">{entityA.velocityKms}</td>
                  <td className="py-3 px-4 text-cyan-neon font-bold">{entityB.velocityKms}</td>
                  <td className="py-3 px-4 text-slate-400">Heliocentric Vector</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans">Miss Distance</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">{entityA.missDistanceDisplay}</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">{entityB.missDistanceDisplay}</td>
                  <td className="py-3 px-4 text-slate-400">Geocentric Proximity</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans">NASA PHA Status</td>
                  <td className="py-3 px-4">
                    {entityA.isPha ? (
                      <span className="text-hazard-red font-bold flex items-center space-x-1">
                        <ShieldAlert className="w-3 h-3 inline mr-1" />
                        POTENTIALLY HAZARDOUS
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 inline mr-1" />
                        NOMINAL (SAFE)
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {entityB.isPha ? (
                      <span className="text-hazard-red font-bold flex items-center space-x-1">
                        <ShieldAlert className="w-3 h-3 inline mr-1" />
                        POTENTIALLY HAZARDOUS
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 inline mr-1" />
                        NOMINAL (SAFE)
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-400">NASA/JPL CNEOS Standard</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans">Educational Model Status</td>
                  <td className="py-3 px-4 text-cyan-ice">{entityA.modelStatus}</td>
                  <td className="py-3 px-4 text-cyan-ice">{entityB.modelStatus}</td>
                  <td className="py-3 px-4 text-slate-400">Scikit-Learn Classifier</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300 font-sans">Authoritative Source Link</td>
                  <td className="py-3 px-4">
                    <a
                      href={entityA.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-ice hover:text-white underline inline-flex items-center space-x-1"
                    >
                      <span>NASA SBDB ↗</span>
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={entityB.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-ice hover:text-white underline inline-flex items-center space-x-1"
                    >
                      <span>NASA SBDB ↗</span>
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onOpenSourceModal('jpl-sbdb')}
                      className="text-slate-400 hover:text-white underline"
                    >
                      Source Lineage
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
