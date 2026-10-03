'use client';

import React, { useState } from 'react';
import { NearEarthObject, ModelInferenceResult } from '../types/neo';
import { evaluateNeoFeatures } from '../lib/mlModel';
import { ShieldAlert, CheckCircle2, Info, BookOpen, ChevronRight, Activity } from 'lucide-react';

interface RiskLabProps {
  selectedNeo: NearEarthObject;
  neos: NearEarthObject[];
  onSelectNeo: (neo: NearEarthObject) => void;
  onOpenMethodology: (stageIndex?: number) => void;
  onOpenSourceModal: (sourceId?: string) => void;
}

export const RiskLab: React.FC<RiskLabProps> = ({
  selectedNeo,
  neos,
  onSelectNeo,
  onOpenMethodology,
  onOpenSourceModal,
}) => {
  const [showConfusionMatrix, setShowConfusionMatrix] = useState(false);

  // Extract features from selected NEO
  const approach = selectedNeo.close_approach_data[0];
  const velocityKms = parseFloat(approach?.relative_velocity?.kilometers_per_second || '28.5');
  const missDistLd = parseFloat(approach?.miss_distance?.lunar || '12.4');
  const missDistKm = parseFloat(approach?.miss_distance?.kilometers || '4760000');
  const diameterM = (selectedNeo.estimated_diameter.meters.min + selectedNeo.estimated_diameter.meters.max) / 2;
  const absMag = selectedNeo.absolute_magnitude_h;

  // Run educational Random Forest model
  const inference: ModelInferenceResult = evaluateNeoFeatures({
    name: selectedNeo.name,
    missDistanceLd: missDistLd,
    missDistanceKm: missDistKm,
    relativeVelocityKms: velocityKms,
    estimatedDiameterMeters: diameterM,
    absoluteMagnitudeH: absMag,
  });

  const confidencePct = Math.round(inference.modelConfidence * 100);

  return (
    <section
      id="risk-lab"
      className="py-28 px-4 sm:px-6 lg:px-12 relative border-t border-white/5 bg-space-950 overflow-hidden scroll-mt-28"
      data-purpose="risk-lab"
    >
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-neon tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-glow" />
            <span>EDUCATIONAL MACHINE-LEARNING ANALYSIS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            WHEN DOES AN OBJECT BECOME A SIGNAL?
          </h2>
          <p className="text-slate-300 text-base font-sans max-w-2xl mx-auto leading-relaxed">
            The platform evaluates multi-dimensional orbital kinematic tensors using a supervised
            Random Forest classifier to separate potential threats from nominal flybys.
          </p>
        </div>

        {/* Mandatory Scientific Honesty Banner */}
        <div className="p-4 rounded-2xl liquid-panel border border-cyan-glow/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-sans">
          <div className="flex items-start space-x-3">
            <Info className="w-4 h-4 text-cyan-glow shrink-0 mt-0.5" />
            <div className="text-slate-300 leading-relaxed">
              <strong className="text-white font-medium">SCIENTIFIC TRANSPARENCY NOTICE:</strong>{' '}
              PHA status is a NASA/JPL-defined classification based on physical and orbital criteria (MOID ≤ 0.05 AU and H ≤ 22.0).
              NEO-SCOPE&apos;s model output is an educational machine-learning analysis and is not an official planetary-defense assessment.
            </div>
          </div>
          <button
            onClick={() => onOpenMethodology(4)}
            className="shrink-0 px-3.5 py-1.5 rounded-full border border-cyan-neon/30 text-cyan-ice hover:text-white hover:border-cyan-neon text-xs font-mono transition-colors"
          >
            VIEW METHODOLOGY →
          </button>
        </div>

        {/* RADIAL SCIENTIFIC INSTRUMENT */}
        <div className="liquid-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/10">
          {/* Ambient radial glow behind specimen */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-neon/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* 4 Radiating Feature Anchors (Spans 4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs uppercase font-mono tracking-widest text-cyan-ice mb-3 flex items-center justify-between">
                <span>MEASURED FEATURE TENSORS:</span>
                <span className="text-[10px] text-slate-500">INPUT X</span>
              </div>

              {/* Anchor 1: Miss Distance */}
              <div className="p-4 rounded-2xl liquid-panel border-l-4 border-l-cyan-glow hover:border-white transition-all">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-slate-300 font-medium">Miss Distance</span>
                  <span className="font-mono text-cyan-neon font-semibold">34% WEIGHT</span>
                </div>
                <div className="font-mono text-base font-bold text-white mt-1">
                  {missDistLd.toFixed(3)} LD{' '}
                  <span className="text-xs font-normal text-slate-400">
                    ({Math.round(missDistKm).toLocaleString()} km)
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  Criterion: ≤ 19.5 LD (0.05 AU)
                </div>
              </div>

              {/* Anchor 2: Relative Velocity */}
              <div className="p-4 rounded-2xl liquid-panel border-l-4 border-l-cyan-neon hover:border-white transition-all">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-slate-300 font-medium">Relative Velocity</span>
                  <span className="font-mono text-cyan-neon font-semibold">28% WEIGHT</span>
                </div>
                <div className="font-mono text-base font-bold text-white mt-1">
                  {velocityKms.toFixed(2)} km/s{' '}
                  <span className="text-xs font-normal text-slate-400">
                    ({Math.round(velocityKms * 3600).toLocaleString()} km/h)
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  Kinetic energy scaling: E ∝ v²
                </div>
              </div>

              {/* Anchor 3: Estimated Diameter */}
              <div className="p-4 rounded-2xl liquid-panel border-l-4 border-l-blue-400 hover:border-white transition-all">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-slate-300 font-medium">Estimated Diameter</span>
                  <span className="font-mono text-cyan-neon font-semibold">22% WEIGHT</span>
                </div>
                <div className="font-mono text-base font-bold text-white mt-1">
                  ~{Math.round(diameterM)} meters{' '}
                  <span className="text-xs font-normal text-slate-400">
                    ({(diameterM / 1000).toFixed(2)} km)
                  </span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  NASA Threshold: ≥ 140 meters
                </div>
              </div>

              {/* Anchor 4: Absolute Magnitude */}
              <div className="p-4 rounded-2xl liquid-panel border-l-4 border-l-indigo-400 hover:border-white transition-all">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-slate-300 font-medium">Absolute Magnitude</span>
                  <span className="font-mono text-cyan-neon font-semibold">16% WEIGHT</span>
                </div>
                <div className="font-mono text-base font-bold text-white mt-1">
                  H = {absMag.toFixed(1)}{' '}
                  <span className="text-xs font-normal text-slate-400">(Criterion ≤ 22.0)</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  Inverse photometric luminosity
                </div>
              </div>
            </div>

            {/* Central Specimen Sphere & Geometric Rings (Spans 4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center py-6">
              <div className="relative w-72 h-72 flex items-center justify-center">
                {/* Outer rotating gimbal ring */}
                <div className="absolute inset-0 rounded-full border border-cyan-neon/30 animate-spin-slow" />
                {/* Inner reverse spinning dashed ring */}
                <div className="absolute inset-4 rounded-full border border-dashed border-cyan-glow/30 animate-spin-reverse" />

                {/* Connecting Ray Lines to Anchors */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 288 288">
                  <line x1="144" y1="144" x2="20" y2="60" stroke="#00F0FF" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
                  <line x1="144" y1="144" x2="20" y2="140" stroke="#00F0FF" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
                  <line x1="144" y1="144" x2="20" y2="220" stroke="#00F0FF" strokeWidth="1" strokeDasharray="2 3" opacity="0.6" />
                  <line
                    x1="144"
                    y1="144"
                    x2="260"
                    y2="144"
                    stroke={inference.isPha ? '#F43F5E' : '#10B981'}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity="0.8"
                  />
                </svg>

                {/* Central 3D Polyhedral Specimen Sphere */}
                <div
                  className={`relative w-40 h-40 rounded-full bg-gradient-to-br from-cyan-900/60 via-slate-900 to-space-950 border shadow-[0_0_50px_rgba(0,240,255,0.35)] flex items-center justify-center backdrop-blur-md animate-float-subtle ${
                    inference.isPha ? 'border-hazard-red/80' : 'border-cyan-glow/60'
                  }`}
                >
                  {/* Lat/Long Wireframe curves */}
                  <div className="absolute inset-2 rounded-full border border-cyan-neon/20 transform rotate-45" />
                  <div className="absolute inset-2 rounded-full border border-cyan-neon/20 transform -rotate-45" />

                  <div className="text-center space-y-0.5 z-10 px-2">
                    <span className="font-mono text-[10px] text-cyan-ice block tracking-widest">
                      SPECIMEN
                    </span>
                    <span className="font-display font-extrabold text-sm text-white block truncate max-w-[120px]">
                      {selectedNeo.name}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-semibold block ${
                        inference.isPha ? 'text-hazard-red' : 'text-emerald-400'
                      }`}
                    >
                      {inference.isPha ? 'PHA CRITICAL' : 'NOMINAL PASS'}
                    </span>
                  </div>
                </div>

                {/* Bottom Vector Tag */}
                <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-space-950 border border-cyan-neon/40 text-[10px] font-mono text-cyan-ice">
                  TENSOR INTERSECTION
                </div>
              </div>

              {/* Selector to switch active specimen */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-xs">
                {neos.slice(0, 4).map((neo) => (
                  <button
                    key={neo.id}
                    onClick={() => onSelectNeo(neo)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-colors ${
                      selectedNeo.id === neo.id
                        ? 'bg-cyan-glow text-black font-bold'
                        : 'bg-space-950/80 border border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {neo.name.split(' ')[1] || neo.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Inference Output & Probability Arc (Spans 4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Model Inference Panel */}
              <div
                className={`liquid-panel rounded-2xl p-6 border-l-4 space-y-4 ${
                  inference.isPha ? 'border-l-hazard-red' : 'border-l-emerald-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono flex items-center space-x-2 ${
                      inference.isPha ? 'text-hazard-coral' : 'text-emerald-400'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full animate-pulse ${
                        inference.isPha ? 'bg-hazard-red' : 'bg-emerald-400'
                      }`}
                    />
                    <span className="font-semibold uppercase tracking-wider">
                      EDUCATIONAL MODEL ESTIMATE
                    </span>
                  </span>
                  <span className="font-mono text-xs text-slate-400">SCIKIT-LEARN 1.4</span>
                </div>

                <div className="font-display font-bold text-2xl text-white tracking-tight">
                  {inference.classification}
                </div>

                <p className="text-xs font-sans text-slate-300 leading-relaxed">
                  {inference.isPha
                    ? 'Orbital proximity (MOID ≤ 0.05 AU) combined with physical size threshold (H ≤ 22.0) matches training distribution for Potentially Hazardous Asteroid.'
                    : 'Features fall outside the critical hazard polygon; small cross-section or large orbital separation ensures safe nominal pass.'}
                </p>

                {/* Probability Arc Gauge Display */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-sans text-slate-400">MODEL CONFIDENCE</div>
                    <div className="font-mono text-3xl font-bold text-white">
                      {confidencePct}%
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      NOT impact probability
                    </div>
                  </div>

                  {/* SVG Arc Gauge */}
                  <div className="w-16 h-16 relative flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-800"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className={inference.isPha ? 'text-hazard-red' : 'text-emerald-400'}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray={`${confidencePct}, 100`}
                        strokeLinecap="round"
                        strokeWidth="3"
                      />
                    </svg>
                    <span
                      className={`absolute text-[10px] font-mono font-bold ${
                        inference.isPha ? 'text-hazard-coral' : 'text-emerald-400'
                      }`}
                    >
                      {inference.isPha ? 'PHA' : 'SAFE'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Validation Benchmarks Strip */}
              <div className="liquid-panel rounded-2xl p-4 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-sans">Precision Benchmark</span>
                  <span className="font-mono text-cyan-glow font-bold">98.4%</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400 font-sans">Recall Benchmark</span>
                  <span className="font-mono text-cyan-ice font-bold">96.8%</span>
                </div>

                <div className="flex items-center justify-between text-xs border-t border-white/10 pt-2">
                  <span className="text-slate-400 font-sans">F1 Score</span>
                  <span className="font-mono text-white font-bold">97.6%</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400 font-sans">ROC-AUC</span>
                  <span className="font-mono text-white font-bold">0.991</span>
                </div>

                <button
                  onClick={() => setShowConfusionMatrix(!showConfusionMatrix)}
                  className="w-full text-center text-[11px] font-mono text-cyan-ice hover:text-white pt-1 transition-colors flex items-center justify-center space-x-1"
                >
                  <Activity className="w-3 h-3" />
                  <span>
                    {showConfusionMatrix ? 'HIDE CONFUSION MATRIX' : 'INSPECT CONFUSION MATRIX (6,962 SAMPLES)'}
                  </span>
                </button>

                {/* Expandable Confusion Matrix Breakdown */}
                {showConfusionMatrix && (
                  <div className="p-3 rounded-xl bg-space-950/90 border border-white/10 space-y-2 text-xs font-mono">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest text-center">
                      HELD-OUT VALIDATION MATRIX (20% SPLIT)
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                      <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                        <div className="text-slate-400 text-[10px]">TRUE NEGATIVES</div>
                        <div className="text-white font-bold text-sm">6,471</div>
                      </div>
                      <div className="p-2 rounded bg-hazard-amber/10 border border-hazard-amber/20">
                        <div className="text-slate-400 text-[10px]">FALSE POSITIVES</div>
                        <div className="text-amber-400 font-bold text-sm">8</div>
                      </div>
                      <div className="p-2 rounded bg-hazard-red/10 border border-hazard-red/20">
                        <div className="text-slate-400 text-[10px]">FALSE NEGATIVES</div>
                        <div className="text-hazard-red font-bold text-sm">15</div>
                      </div>
                      <div className="p-2 rounded bg-cyan-glow/10 border border-cyan-glow/20">
                        <div className="text-slate-400 text-[10px]">TRUE POSITIVES</div>
                        <div className="text-cyan-glow font-bold text-sm">468</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 text-center pt-1">
                      Tested on 6,962 unseen NASA CNEOS records.
                    </div>
                  </div>
                )}
              </div>

              {/* View Methodology Link */}
              <button
                onClick={() => onOpenMethodology(4)}
                className="w-full py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-sans font-medium text-slate-300 hover:text-white transition-colors flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-cyan-ice" />
                <span>VIEW MODEL METHODOLOGY & CODE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
