'use client';

import React, { useState } from 'react';
import { NearEarthObject } from '../types/neo';
import { REPRESENTATIVE_POPULATION, PopulationPoint } from '../data/catalog';
import { ExternalLink, Filter } from 'lucide-react';

interface TrajectoryAnalyticsProps {
  neos: NearEarthObject[];
  onSelectNeo: (neo: NearEarthObject) => void;
  onOpenSourceModal: (sourceId?: string) => void;
}

export const TrajectoryAnalytics: React.FC<TrajectoryAnalyticsProps> = ({
  neos,
  onSelectNeo,
  onOpenSourceModal,
}) => {
  const [filterMode, setFilterMode] = useState<'ALL' | 'PHA_ONLY' | 'CLOSE_PASS' | 'HIGH_VEL'>('ALL');
  const [hoveredPoint, setHoveredPoint] = useState<PopulationPoint | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Filter population points
  const filteredPoints = REPRESENTATIVE_POPULATION.filter((p) => {
    if (filterMode === 'PHA_ONLY') return p.isPha;
    if (filterMode === 'CLOSE_PASS') return p.missDistanceLd <= 5.0;
    if (filterMode === 'HIGH_VEL') return p.velocityKms >= 22.0;
    return true;
  });

  // Calculate coordinates on 800x400 SVG canvas:
  // X axis: Miss Distance 0 to 35 LD -> mapped from 40 to 760 px
  // Y axis: Velocity 5 to 40 km/s -> mapped from 370 down to 40 px
  const mapCoords = (missDistLd: number, velKms: number) => {
    const minX = 0;
    const maxX = 35;
    const clampedDist = Math.max(minX, Math.min(maxX, missDistLd));
    const cx = 50 + (clampedDist / maxX) * 700;

    const minY = 5;
    const maxY = 40;
    const clampedVel = Math.max(minY, Math.min(maxY, velKms));
    const cy = 370 - ((clampedVel - minY) / (maxY - minY)) * 320;

    return { cx, cy };
  };

  return (
    <section
      id="analytics"
      className="py-28 px-4 sm:px-6 lg:px-12 relative border-t border-white/5 bg-space-950 scroll-mt-28"
      data-purpose="data-analytics"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header with Large Summary Indicators */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-neon tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-glow" />
              <span>EPHEMERIS POPULATION DYNAMICS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              READ THE TRAJECTORY
            </h2>
            <p className="text-slate-400 text-base max-w-xl font-sans">
              Distribution of 34,812 cataloged bodies correlating relative approach velocity against
              miss distance in Lunar Distances.
            </p>
          </div>

          {/* Large Typographic Metrics */}
          <div className="flex flex-wrap items-center gap-8 sm:gap-12 border-l border-white/10 pl-6 lg:pl-10">
            <div>
              <div className="text-xs uppercase font-sans text-slate-400 tracking-wider">
                Cataloged Objects
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
                34,812
              </div>
            </div>
            <div>
              <div className="text-xs uppercase font-sans text-hazard-coral tracking-wider flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-hazard-red" />
                <span>Classified PHA</span>
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-bold text-hazard-red tracking-tight mt-1">
                2,419
              </div>
            </div>
            <div>
              <div className="text-xs uppercase font-sans text-cyan-ice tracking-wider">
                Active Feed Passes
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-bold text-cyan-glow tracking-tight mt-1">
                {neos.length}
              </div>
            </div>
          </div>
        </div>

        {/* DOMINANT SCIENTIFIC SCATTER FIELD: VELOCITY × MISS DISTANCE */}
        <div className="liquid-panel rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-white/10">
          {/* Top Bar with Title, Filters, and Legend */}
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="font-display font-bold text-lg text-white">
                VELOCITY × MISS DISTANCE (LUNAR DISTANCE)
              </span>
              <span className="font-mono text-xs text-cyan-ice ml-3 tracking-widest uppercase">
                // SCATTER PLOT REGRESSION
              </span>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 mr-1 flex items-center">
                <Filter className="w-3 h-3 mr-1" />
                FILTER:
              </span>
              <button
                onClick={() => setFilterMode('ALL')}
                className={`px-3 py-1 rounded-full border transition-colors ${
                  filterMode === 'ALL'
                    ? 'border-cyan-glow bg-cyan-glow/15 text-white'
                    : 'border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setFilterMode('PHA_ONLY')}
                className={`px-3 py-1 rounded-full border transition-colors ${
                  filterMode === 'PHA_ONLY'
                    ? 'border-hazard-red bg-hazard-red/20 text-hazard-red font-bold'
                    : 'border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                PHA ONLY
              </button>
              <button
                onClick={() => setFilterMode('CLOSE_PASS')}
                className={`px-3 py-1 rounded-full border transition-colors ${
                  filterMode === 'CLOSE_PASS'
                    ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                    : 'border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                NEAR (&lt;5 LD)
              </button>
              <button
                onClick={() => setFilterMode('HIGH_VEL')}
                className={`px-3 py-1 rounded-full border transition-colors ${
                  filterMode === 'HIGH_VEL'
                    ? 'border-cyan-ice bg-cyan-ice/20 text-cyan-ice'
                    : 'border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                HIGH VELOCITY (&gt;22 km/s)
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center space-x-6 text-xs font-mono text-slate-400">
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-ice" />
                <span className="font-sans">Nominal Flybys</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-hazard-red" />
                <span className="font-sans">PHA Critical Cluster</span>
              </span>
            </div>
          </div>

          {/* Scatter Canvas Field */}
          <div
            className="relative w-full h-[420px] sm:h-[480px] my-6 select-none"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
          >
            {/* Background Axis Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-15 pointer-events-none">
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-r border-cyan-neon" />
              <div className="border-b border-cyan-neon" />
              <div className="border-r border-cyan-neon" />
              <div className="border-r border-cyan-neon" />
              <div className="border-r border-cyan-neon" />
              <div className="border-r border-cyan-neon" />
              <div className="border-r border-cyan-neon" />
              <div />
            </div>

            {/* Constellation Scatter Vector Canvas */}
            <svg className="w-full h-full relative z-10" viewBox="0 0 800 400" preserveAspectRatio="none">
              {/* Shaded Hazard Boundary Polygon (LD <= 5.0, Velocity > 10 km/s) */}
              <polygon
                points="50,380 50,150 180,150 180,380"
                fill="rgba(244, 63, 94, 0.08)"
                stroke="rgba(244, 63, 94, 0.35)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text
                x="58"
                y="170"
                fill="#F43F5E"
                fontFamily="'IBM Plex Mono', monospace"
                fontSize="10"
                opacity="0.9"
              >
                CRITICAL INTERSECTION ZONE (LD &lt; 5.0)
              </text>

              {/* Non-linear Regression Trend Line */}
              <path
                d="M 50 340 Q 280 260, 520 180 T 750 90"
                fill="none"
                stroke="rgba(0, 240, 255, 0.4)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Render Population Points */}
              {filteredPoints.map((point) => {
                const { cx, cy } = mapCoords(point.missDistanceLd, point.velocityKms);
                const isHovered = hoveredPoint?.id === point.id;
                const r = Math.max(3.5, Math.min(8, Math.log10(Math.max(point.diameterMeters, 1)) * 2));

                return (
                  <g key={point.id}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? r * 1.8 : r}
                      fill={point.isPha ? '#F43F5E' : '#38BDF8'}
                      opacity={point.isPha ? 0.95 : 0.75}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredPoint(point)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      onClick={() => {
                        const match = neos.find((n) => n.id === point.id);
                        if (match) onSelectNeo(match);
                      }}
                    />
                    {point.isPha && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r + 3}
                        fill="none"
                        stroke="#F43F5E"
                        strokeWidth="1"
                        opacity={0.4}
                        className="animate-ping pointer-events-none"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Floating Liquid Inspect Tooltip */}
            {hoveredPoint && (
              <div
                style={{
                  top: `${Math.max(20, Math.min(300, mousePos.y - 120))}px`,
                  left: `${Math.max(20, Math.min(560, mousePos.x - 40))}px`,
                }}
                className="absolute liquid-panel-glow rounded-xl p-3.5 border border-cyan-glow/50 z-30 pointer-events-none shadow-2xl transition-all duration-75"
              >
                <div className="flex items-center space-x-2 text-[10px] font-mono text-cyan-ice pb-1 border-b border-white/10">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      hoveredPoint.isPha ? 'bg-hazard-red animate-ping' : 'bg-cyan-ice'
                    }`}
                  />
                  <span>TARGET: #{hoveredPoint.id}</span>
                  <span className="text-slate-500">//</span>
                  <span className={hoveredPoint.isPha ? 'text-hazard-red font-bold' : 'text-cyan-ice'}>
                    {hoveredPoint.isPha ? 'PHA' : 'NOMINAL'}
                  </span>
                </div>
                <div className="font-display font-bold text-xs text-white mt-1">
                  {hoveredPoint.name}
                </div>
                <div className="font-mono text-[11px] text-slate-300 mt-1 space-y-0.5">
                  <div>
                    Dist:{' '}
                    <span className="text-amber-300 font-semibold">
                      {hoveredPoint.missDistanceLd.toFixed(3)} LD
                    </span>{' '}
                    | Vel:{' '}
                    <span className="text-cyan-glow font-semibold">
                      {hoveredPoint.velocityKms.toFixed(2)} km/s
                    </span>
                  </div>
                  <div>
                    Diameter:{' '}
                    <span className="text-white font-semibold">~{hoveredPoint.diameterMeters} m</span>{' '}
                    | H: <span className="text-slate-200">{hoveredPoint.absoluteMagnitudeH}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scatter Coordinates Axis Footnote & Sub-density distribution curve */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-white/10 items-center">
            <div className="md:col-span-6 flex justify-between text-xs font-mono text-slate-400">
              <span>← 0.0 LD (EARTH PROXIMITY)</span>
              <span className="text-cyan-ice font-semibold">MISS DISTANCE (LUNAR DISTANCE)</span>
              <span>35.0 LD →</span>
            </div>

            {/* Absolute Magnitude H Density Curve */}
            <div className="md:col-span-6 flex items-center justify-end space-x-6 text-xs font-sans text-slate-300">
              <span className="text-slate-400">Absolute Magnitude H Density:</span>
              <div className="w-36 h-6 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 100 24">
                  <path
                    d="M 0 22 Q 35 22, 50 4 Q 65 22, 100 22"
                    fill="none"
                    stroke="#00F0FF"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>
              <span className="font-mono text-cyan-ice text-xs">Peak H = 21.8</span>
              <button
                onClick={() => onOpenSourceModal('jpl-cneos')}
                className="text-slate-400 hover:text-white flex items-center space-x-0.5 text-[10px] font-mono"
              >
                <span>DATA SOURCE</span>
                <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Supporting Analytics Distributions (Diameter & Velocity) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Diameter Distribution Bar Strip */}
          <div className="liquid-panel rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-sans font-medium text-white">Physical Diameter Distribution</span>
              <span className="font-mono text-slate-400">NASA CNEOS ARCHIVE</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-300">
                <span>&lt; 30 m (Small Bolides)</span>
                <span className="text-cyan-ice">62.4%</span>
              </div>
              <div className="w-full bg-space-950 rounded-full h-2 overflow-hidden border border-white/10">
                <div className="bg-cyan-ice h-full rounded-full" style={{ width: '62.4%' }} />
              </div>

              <div className="flex justify-between text-[11px] font-mono text-slate-300">
                <span>30 – 140 m (City-Scale Flybys)</span>
                <span className="text-cyan-neon">25.1%</span>
              </div>
              <div className="w-full bg-space-950 rounded-full h-2 overflow-hidden border border-white/10">
                <div className="bg-cyan-neon h-full rounded-full" style={{ width: '25.1%' }} />
              </div>

              <div className="flex justify-between text-[11px] font-mono text-slate-300">
                <span>140 – 1000 m (Regional Threat / PHA Benchmark)</span>
                <span className="text-amber-400">10.8%</span>
              </div>
              <div className="w-full bg-space-950 rounded-full h-2 overflow-hidden border border-white/10">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '10.8%' }} />
              </div>

              <div className="flex justify-between text-[11px] font-mono text-slate-300">
                <span>&gt; 1 km (Continental Scale)</span>
                <span className="text-hazard-red">1.7%</span>
              </div>
              <div className="w-full bg-space-950 rounded-full h-2 overflow-hidden border border-white/10">
                <div className="bg-hazard-red h-full rounded-full" style={{ width: '1.7%' }} />
              </div>
            </div>
          </div>

          {/* Velocity Spectrum */}
          <div className="liquid-panel rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-sans font-medium text-white">Relative Velocity Spectrum</span>
              <span className="font-mono text-slate-400">HELIOCENTRIC VECTOR</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Relative encounter velocities range from 4 km/s up to 45 km/s. Hypervelocity impacts (&gt;25 km/s) produce exponentially greater cratering volume due to the kinetic scaling law E = ½mv².
            </p>
            <div className="p-3 rounded-xl bg-space-950/80 border border-white/10 flex justify-between items-center font-mono text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">MEDIAN ENCOUNTER VELOCITY</span>
                <span className="text-white font-bold text-base">16.4 km/s</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[10px]">APOPHIS FLYBY VELOCITY</span>
                <span className="text-cyan-glow font-bold text-base">30.73 km/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
