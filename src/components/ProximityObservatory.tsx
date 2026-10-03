'use client';

import React, { useState } from 'react';
import { NearEarthObject } from '../types/neo';
import { OrbitalRadar3D } from './OrbitalRadar3D';
import {
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  ChevronRight,
  Info,
  HelpCircle,
  X,
  Orbit,
} from 'lucide-react';

interface ProximityObservatoryProps {
  neos: NearEarthObject[];
  selectedNeo: NearEarthObject;
  syncTimestamp?: string;
  dataSourceType?: 'LIVE' | 'CACHED' | 'ERROR';
  onSelectNeo: (neo: NearEarthObject) => void;
  onOpenSourceModal: (sourceId?: string) => void;
  onOpenDetailModal: (neo: NearEarthObject) => void;
  onGoToRiskLab: (neo: NearEarthObject) => void;
}

export const ProximityObservatory: React.FC<ProximityObservatoryProps> = ({
  neos,
  selectedNeo,
  syncTimestamp = '2026-10-03 06:59:02 UTC',
  dataSourceType = 'LIVE',
  onSelectNeo,
  onOpenSourceModal,
  onOpenDetailModal,
  onGoToRiskLab,
}) => {
  const [hoveredNeoId, setHoveredNeoId] = useState<string | null>(null);
  const [isEarthSelected, setIsEarthSelected] = useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);

  // Selected NEO Telemetry
  const approach = selectedNeo.close_approach_data[0];
  const velocityKms = approach?.relative_velocity?.kilometers_per_second || '28.5';
  const missDistLd = approach?.miss_distance?.lunar || '12.4';
  const missDistKm = approach?.miss_distance?.kilometers
    ? parseInt(approach.miss_distance.kilometers).toLocaleString()
    : '4,760,000';
  const dateEpoch = approach?.close_approach_date_full || approach?.close_approach_date || '2026-10-04';
  const diameterMin = Math.round(selectedNeo.estimated_diameter.meters.min);
  const diameterMax = Math.round(selectedNeo.estimated_diameter.meters.max);
  const diameterAvg = Math.round((diameterMin + diameterMax) / 2);

  const handleSelectNeo = (neo: NearEarthObject) => {
    setIsEarthSelected(false);
    onSelectNeo(neo);
  };

  const handleSelectEarth = () => {
    setIsEarthSelected(true);
  };

  return (
    <section
      id="live-radar"
      className="py-24 px-4 sm:px-6 lg:px-12 relative border-t border-white/5 bg-space-950 overflow-hidden scroll-mt-28"
      data-purpose="live-neo-explorer"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-neon tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-glow" />
              <span>PROXIMITY OBSERVATORY</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase">
              WHAT&apos;S PASSING BY?
            </h2>
          </div>
          <p className="text-sm font-sans text-slate-400 max-w-md leading-relaxed">
            Earth-centered relative orbital visualization projecting Near-Earth Object close approaches,
            inclinations, and miss distances relative to Earth.
          </p>
        </div>

        {/* Full-Width Immersive 3D Orbital Field Stage */}
        <div className="relative w-full rounded-3xl liquid-panel border border-white/10 min-h-[700px] overflow-hidden flex flex-col justify-between">
          {/* Top HUD Status Bar */}
          <div className="relative z-20 p-6 pb-0 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            {/* Coordinate System Tag & Transparent Disclosure Button */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-space-950/85 border border-white/15 text-cyan-ice">
                EARTH-RELATIVE VIEW
              </span>
              <span className="px-3 py-1 rounded-full bg-space-950/85 border border-white/10 text-slate-400 hidden sm:inline">
                REFERENCE EPOCH: J2000.0
              </span>
              <button
                onClick={() => setShowAboutModal(true)}
                className="px-3 py-1 rounded-full bg-space-950/85 border border-cyan-neon/30 text-cyan-neon hover:text-white hover:border-cyan-neon flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-glow" />
                <span>ⓘ About this visualization</span>
              </button>
            </div>

            {/* Scientific Legend */}
            <div className="flex items-center space-x-4 bg-space-950/80 px-4 py-1.5 rounded-full border border-white/10">
              <button
                onClick={handleSelectEarth}
                className="flex items-center space-x-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_6px_#38BDF8]" />
                <span className="text-slate-300 font-sans text-xs">Reference Body (Earth)</span>
              </button>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-hazard-red" />
                <span className="text-slate-300 font-sans text-xs">Potentially Hazardous (PHA)</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-ice" />
                <span className="text-slate-300 font-sans text-xs">Nominal Specimen</span>
              </span>
            </div>
          </div>

          {/* Real Three.js WebGL Interactive 3D Canvas */}
          <div className="relative w-full h-[640px] my-2">
            <OrbitalRadar3D
              neos={neos}
              selectedNeo={selectedNeo}
              isEarthSelected={isEarthSelected}
              onSelectNeo={handleSelectNeo}
              onSelectEarth={handleSelectEarth}
              hoveredNeoId={hoveredNeoId}
              setHoveredNeoId={setHoveredNeoId}
            />

            {/* Single Floating Liquid-Glass Information Panel (Left Docked) */}
            <div className="absolute left-4 top-4 sm:left-8 sm:top-6 w-full max-w-sm sm:max-w-md z-30 pointer-events-auto">
              {!isEarthSelected ? (
                /* NEO Specimen Dossier (Restrained and compact) */
                <div className="liquid-panel rounded-2xl p-5 space-y-4 border border-cyan-glow/30 shadow-2xl backdrop-blur-2xl">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-ice">
                      SPECIMEN DOSSIER
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono rounded font-medium uppercase tracking-wide border flex items-center space-x-1 ${
                        selectedNeo.is_potentially_hazardous_asteroid
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                      }`}
                    >
                      {selectedNeo.is_potentially_hazardous_asteroid ? (
                        <>
                          <ShieldAlert className="w-3 h-3" />
                          <span>POTENTIALLY HAZARDOUS (PHA)</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>NOMINAL PASS</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Title & Designation */}
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-white tracking-tight">
                      {selectedNeo.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 mt-0.5">
                      Designation: {selectedNeo.designation || selectedNeo.name} · CNEOS #{selectedNeo.id}
                    </p>
                  </div>

                  {/* Metrics Grid */}
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-space-950/80 border border-white/10 flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-sans">Estimated Diameter</span>
                      <div className="text-right">
                        <span className="font-mono text-xs sm:text-sm font-semibold text-white">
                          ~{diameterAvg} m
                        </span>
                        <span className="block text-[9px] font-mono text-slate-500">
                          ({diameterMin} – {diameterMax} m)
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-space-950/80 border border-white/10 flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-sans">Relative Velocity</span>
                      <div className="text-right">
                        <span className="font-mono text-xs sm:text-sm font-semibold text-cyan-glow">
                          {parseFloat(velocityKms).toFixed(2)} km/s
                        </span>
                        <span className="block text-[9px] font-mono text-slate-500">
                          ~{(parseFloat(velocityKms) * 3600).toLocaleString()} km/h
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-space-950/80 border border-white/10 flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-sans">Miss Distance</span>
                      <div className="text-right">
                        <span className="font-mono text-xs sm:text-sm font-semibold text-amber-300">
                          {parseFloat(missDistLd).toFixed(3)} LD
                        </span>
                        <span className="block text-[9px] font-mono text-slate-500">
                          {missDistKm} km
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-space-950/80 border border-white/10 flex justify-between items-center">
                      <span className="text-xs text-slate-400 font-sans">Close Approach Epoch</span>
                      <span className="font-mono text-xs font-semibold text-slate-200">
                        {dateEpoch}
                      </span>
                    </div>
                  </div>

                  {/* Provenance & Source Information */}
                  <div className="p-2.5 rounded-xl bg-space-950/80 border border-white/10 flex items-center justify-between text-[11px] font-mono">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 uppercase block">SOURCE</span>
                      <span className="text-slate-300">NASA NeoWs</span>
                    </div>
                    <button
                      onClick={() => onOpenSourceModal('nasa-neows')}
                      className="text-cyan-neon hover:text-white transition-colors cursor-pointer"
                    >
                      VIEW SOURCE →
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2 pt-0.5">
                    <button
                      onClick={() => onGoToRiskLab(selectedNeo)}
                      className="w-full liquid-button-primary py-2.5 rounded-xl text-xs font-sans font-semibold tracking-wider uppercase text-center block text-white flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>Analyze With Risk Lab Classifier</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onOpenDetailModal(selectedNeo)}
                        className="flex-1 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-cyan-ice transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>FULL DOSSIER</span>
                      </button>

                      <a
                        href={selectedNeo.nasa_jpl_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center space-x-1"
                        title="Open official NASA JPL Small-Body Database record"
                      >
                        <span>NASA SBDB</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                /* REDESIGNED EARTH REFERENCE BODY PANEL (Compact & Restrained) */
                <div className="liquid-panel rounded-2xl p-5 space-y-4 border border-blue-400/30 shadow-2xl backdrop-blur-2xl">
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-neon">
                      REFERENCE BODY
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      GEOCENTER
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-white tracking-tight">
                      EARTH
                    </h3>
                    <div className="mt-1 font-mono text-sm text-slate-200">
                      12,742 km <span className="text-xs text-slate-400 font-sans">mean diameter</span>
                    </div>
                  </div>

                  <p className="text-xs font-sans text-slate-300 leading-relaxed">
                    All displayed close-approach distances are referenced to Earth.
                  </p>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                    <div className="space-y-0.5">
                      <span className="text-[10px] text-slate-500 uppercase block">SOURCE</span>
                      <span className="text-slate-300">NASA / JPL</span>
                    </div>
                    <button
                      onClick={() => onOpenSourceModal('nasa-jpl')}
                      className="text-cyan-neon hover:text-white transition-colors text-xs font-mono flex items-center space-x-1 cursor-pointer"
                    >
                      <span>VIEW EARTH DATA →</span>
                    </button>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => setIsEarthSelected(false)}
                      className="w-full py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>← Back to Selected Specimen ({selectedNeo.name})</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Guidance & Source Strip */}
          <div className="relative z-20 px-6 py-4 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 border-t border-white/10 gap-2 bg-space-950/60 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-3">
              <span>SOURCE: NASA NeoWs / JPL HORIZONS EPHEMERIS</span>
              <button
                onClick={() => onOpenSourceModal('nasa-neows')}
                className="text-cyan-neon hover:text-white underline text-[11px] flex items-center space-x-0.5 cursor-pointer"
              >
                <span>[View Source ↗]</span>
              </button>
              <span className="text-slate-500 hidden md:inline">|</span>
              <span className="text-slate-400 hidden md:inline">
                DATA UPDATED: <span className="text-slate-200">{syncTimestamp}</span>
              </span>
            </div>
            <span className="text-slate-400">
              CLICK ANY ORBITAL PIN OR EARTH TO INSPECT TELEMETRY
            </span>
          </div>
        </div>
      </div>

      {/* Educational Scale Disclosure Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 select-none">
          <div className="relative w-full max-w-xl rounded-3xl liquid-panel-glow border border-cyan-glow/40 p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-mono text-cyan-glow uppercase tracking-wider">
                  <Orbit className="w-4 h-4" />
                  <span>ASTRONOMICAL SCALE CONTEXT</span>
                </div>
                <h3 className="font-display font-extrabold text-2xl text-white">
                  About this visualization
                </h3>
              </div>
              <button
                onClick={() => setShowAboutModal(false)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans text-slate-300 leading-relaxed">
              <div className="p-3.5 rounded-2xl bg-space-950/80 border border-cyan-glow/30 space-y-1">
                <p className="text-white font-medium">
                  &quot;This is an educational relative orbital visualization. Trajectories and positions are derived from available NASA/JPL data and are presented for spatial understanding rather than literal astronomical scale.&quot;
                </p>
              </div>

              <p>
                In literal physical space, <strong>Earth&apos;s physical diameter is 12,742 km</strong>, whereas 1 Astronomical Unit is approximately <strong>149,597,870 km</strong> (~11,740 Earth diameters), and the Moon orbits at 384,400 km (~30 Earth diameters).
              </p>
              <p>
                If this visualization were rendered at a 1:1 physical ratio on your computer display:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li>Earth would be smaller than a <strong>0.05-pixel microscopic dot</strong>.</li>
                <li>Close-approach trajectories would be imperceptible.</li>
                <li>The physical inclination and orientation relative to Earth would be impossible to interpret.</li>
              </ul>
              <p>
                This observatory uses an Earth-relative conformal projection. Trajectory inclinations, periapsis orientations, and relative miss distances are mathematically preserved to help viewers understand spatial relationships and orbital mechanics without losing Earth as the visual anchor.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowAboutModal(false)}
                className="px-5 py-2 rounded-full liquid-button-primary text-xs font-mono text-white uppercase tracking-wider cursor-pointer"
              >
                UNDERSTOOD
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
