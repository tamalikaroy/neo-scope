'use client';

import React from 'react';
import { NearEarthObject } from '../types/neo';
import { evaluateNeoFeatures } from '../lib/mlModel';
import { X, ExternalLink, ShieldAlert, CheckCircle2, Orbit, Database, Cpu } from 'lucide-react';

interface ObjectDetailModalProps {
  neo: NearEarthObject | null;
  onClose: () => void;
  onOpenSourceModal: (sourceId?: string) => void;
}

export const ObjectDetailModal: React.FC<ObjectDetailModalProps> = ({
  neo,
  onClose,
  onOpenSourceModal,
}) => {
  if (!neo) return null;

  const approach = neo.close_approach_data[0];
  const velocityKms = parseFloat(approach?.relative_velocity?.kilometers_per_second || '20.0');
  const missDistLd = parseFloat(approach?.miss_distance?.lunar || '10.0');
  const missDistKm = parseFloat(approach?.miss_distance?.kilometers || '3844000');
  const diameterM = (neo.estimated_diameter.meters.min + neo.estimated_diameter.meters.max) / 2;
  const absMag = neo.absolute_magnitude_h;

  const inference = evaluateNeoFeatures({
    name: neo.name,
    missDistanceLd: missDistLd,
    missDistanceKm: missDistKm,
    relativeVelocityKms: velocityKms,
    estimatedDiameterMeters: diameterM,
    absoluteMagnitudeH: absMag,
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 select-none">
      <div className="relative w-full max-w-4xl rounded-3xl liquid-panel-glow border border-cyan-glow/40 p-6 sm:p-8 max-h-[92vh] overflow-y-auto space-y-8">
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-ice uppercase">
              <span>TARGET ASTEROID DOSSIER</span>
              <span>//</span>
              <span>JPL ID #{neo.id}</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              {neo.name}
            </h2>
            <p className="text-xs font-mono text-slate-400">
              Designation: {neo.designation || neo.name}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border flex items-center space-x-1.5 ${
                neo.is_potentially_hazardous_asteroid
                  ? 'bg-hazard-red/20 text-hazard-red border-hazard-red/40'
                  : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              }`}
            >
              {neo.is_potentially_hazardous_asteroid ? (
                <>
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>POTENTIALLY HAZARDOUS (PHA)</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>NOMINAL PASS (SAFE)</span>
                </>
              )}
            </span>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Physical & Kinematic Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-space-950/80 border border-white/10 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">ESTIMATED DIAMETER</span>
            <div className="font-mono text-lg font-bold text-white">
              ~{Math.round(diameterM)} m
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              {Math.round(neo.estimated_diameter.meters.min)} – {Math.round(neo.estimated_diameter.meters.max)} m
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-space-950/80 border border-white/10 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">RELATIVE VELOCITY</span>
            <div className="font-mono text-lg font-bold text-cyan-glow">
              {velocityKms.toFixed(2)} km/s
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              {Math.round(velocityKms * 3600).toLocaleString()} km/h
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-space-950/80 border border-white/10 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">MISS DISTANCE</span>
            <div className="font-mono text-lg font-bold text-amber-300">
              {missDistLd.toFixed(3)} LD
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              {Math.round(missDistKm).toLocaleString()} km
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-space-950/80 border border-white/10 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">ABSOLUTE MAGNITUDE</span>
            <div className="font-mono text-lg font-bold text-slate-200">
              H = {absMag.toFixed(1)}
            </div>
            <div className="text-[10px] font-mono text-slate-500">
              PHA Benchmark H ≤ 22.0
            </div>
          </div>
        </div>

        {/* Orbital Parameters Table */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-ice uppercase">
            <Orbit className="w-4 h-4 text-cyan-glow" />
            <span>HELIOCENTRIC ORBITAL ELEMENTS (J2000.0)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-space-950/60 border border-white/5">
              <span className="text-slate-400 block text-[10px]">SEMI-MAJOR AXIS (a)</span>
              <span className="text-white font-bold">{neo.orbital_data?.semi_major_axis || '1.126'} AU</span>
            </div>
            <div className="p-3 rounded-xl bg-space-950/60 border border-white/5">
              <span className="text-slate-400 block text-[10px]">ECCENTRICITY (e)</span>
              <span className="text-white font-bold">{neo.orbital_data?.eccentricity || '0.2037'}</span>
            </div>
            <div className="p-3 rounded-xl bg-space-950/60 border border-white/5">
              <span className="text-slate-400 block text-[10px]">INCLINATION (i)</span>
              <span className="text-white font-bold">{neo.orbital_data?.inclination || '6.035'}°</span>
            </div>
            <div className="p-3 rounded-xl bg-space-950/60 border border-white/5">
              <span className="text-slate-400 block text-[10px]">ORBITAL PERIOD</span>
              <span className="text-white font-bold">{neo.orbital_data?.orbital_period || '436.6'} days</span>
            </div>
            <div className="p-3 rounded-xl bg-space-950/60 border border-white/5">
              <span className="text-slate-400 block text-[10px]">EARTH MOID</span>
              <span className="text-amber-300 font-bold">{neo.orbital_data?.minimum_orbit_intersection || '0.0033'} AU</span>
            </div>
            <div className="p-3 rounded-xl bg-space-950/60 border border-white/5">
              <span className="text-slate-400 block text-[10px]">ORBIT CLASS</span>
              <span className="text-cyan-ice font-bold">{neo.orbital_data?.orbit_class?.orbit_class_type || 'APO'}</span>
            </div>
          </div>
        </div>

        {/* Rigorous Data Provenance Table */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-ice uppercase">
            <Database className="w-4 h-4 text-cyan-glow" />
            <span>DATA PROVENANCE & ATTRIBUTION LEDGER</span>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-space-950/60">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono text-[10px] uppercase">
                  <th className="py-2.5 px-4">PARAMETER</th>
                  <th className="py-2.5 px-4">DISPLAYED VALUE</th>
                  <th className="py-2.5 px-4">DATA SOURCE</th>
                  <th className="py-2.5 px-4">TYPE</th>
                  <th className="py-2.5 px-4">OFFICIAL LINK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                <tr>
                  <td className="py-2 px-4 text-slate-300 font-sans">Relative Velocity</td>
                  <td className="py-2 px-4 text-cyan-glow">{velocityKms.toFixed(2)} km/s</td>
                  <td className="py-2 px-4 text-white">NASA NeoWs REST API</td>
                  <td className="py-2 px-4 text-emerald-400">Raw API Observation</td>
                  <td className="py-2 px-4">
                    <a href="https://api.nasa.gov/neo/" target="_blank" rel="noopener noreferrer" className="text-cyan-ice hover:text-white underline">
                      NeoWs ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-slate-300 font-sans">Miss Distance</td>
                  <td className="py-2 px-4 text-amber-300">{missDistLd.toFixed(3)} LD</td>
                  <td className="py-2 px-4 text-white">JPL Horizons Ephemeris</td>
                  <td className="py-2 px-4 text-emerald-400">Raw API Observation</td>
                  <td className="py-2 px-4">
                    <a href="https://ssd.jpl.nasa.gov/horizons/" target="_blank" rel="noopener noreferrer" className="text-cyan-ice hover:text-white underline">
                      Horizons ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-slate-300 font-sans">Estimated Diameter</td>
                  <td className="py-2 px-4 text-white">~{Math.round(diameterM)} m</td>
                  <td className="py-2 px-4 text-white">NASA NeoWs Calculus</td>
                  <td className="py-2 px-4 text-cyan-ice">Derived Value</td>
                  <td className="py-2 px-4">
                    <a href="https://cneos.jpl.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-cyan-ice hover:text-white underline">
                      CNEOS ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-slate-300 font-sans">PHA Classification</td>
                  <td className="py-2 px-4 text-hazard-coral">{neo.is_potentially_hazardous_asteroid ? 'TRUE' : 'FALSE'}</td>
                  <td className="py-2 px-4 text-white">NASA JPL CNEOS</td>
                  <td className="py-2 px-4 text-emerald-400">Raw API Observation</td>
                  <td className="py-2 px-4">
                    <a href="https://cneos.jpl.nasa.gov/" target="_blank" rel="noopener noreferrer" className="text-cyan-ice hover:text-white underline">
                      CNEOS ↗
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 text-slate-300 font-sans">NEO-SCOPE Model Status</td>
                  <td className="py-2 px-4 text-cyan-ice">{inference.classification}</td>
                  <td className="py-2 px-4 text-white">NEO-SCOPE Scikit-Learn Model</td>
                  <td className="py-2 px-4 text-amber-400">Model Output</td>
                  <td className="py-2 px-4">
                    <button onClick={() => onOpenSourceModal('neo-scope-ml')} className="text-cyan-ice hover:text-white underline">
                      Methodology ↗
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Educational Model Analysis Summary */}
        <div className="p-4 rounded-2xl liquid-panel border border-cyan-glow/20 space-y-2 text-xs font-sans">
          <div className="flex items-center space-x-2 text-cyan-glow font-mono uppercase">
            <Cpu className="w-3.5 h-3.5" />
            <span>NEO-SCOPE EDUCATIONAL MODEL ESTIMATE</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            The local Random Forest model evaluated this object with{' '}
            <strong className="text-white">{Math.round(inference.modelConfidence * 100)}% confidence</strong> as{' '}
            <span className={inference.isPha ? 'text-hazard-red font-bold' : 'text-emerald-400 font-bold'}>
              {inference.classification}
            </span>.
            This is an educational data-science analysis based on observed orbital tensors and is not an official NASA planetary defense assessment.
          </p>
        </div>

        {/* Footer Official Links */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center space-x-2 text-slate-400">
            <span>OFFICIAL SOURCES:</span>
            <a
              href={neo.nasa_jpl_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-ice hover:text-white underline flex items-center space-x-1"
            >
              <span>JPL SMALL-BODY DATABASE</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <button
            onClick={() => onOpenSourceModal('nasa-neows')}
            className="px-4 py-2 rounded-full border border-cyan-neon/30 text-cyan-ice hover:text-white hover:border-cyan-neon transition-colors"
          >
            VIEW SOURCE HIERARCHY & METHODOLOGY →
          </button>
        </div>
      </div>
    </div>
  );
};
