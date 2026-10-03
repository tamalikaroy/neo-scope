'use client';

import React, { useState } from 'react';
import { NearEarthObject } from '../types/neo';
import { evaluateNeoFeatures } from '../lib/mlModel';
import { HelpCircle, ChevronRight, Info } from 'lucide-react';

interface ExplainabilityWaterfallProps {
  selectedNeo: NearEarthObject;
  neos: NearEarthObject[];
  onSelectNeo: (neo: NearEarthObject) => void;
  onOpenMethodology: (stageIndex?: number) => void;
}

export const ExplainabilityWaterfall: React.FC<ExplainabilityWaterfallProps> = ({
  selectedNeo,
  neos,
  onSelectNeo,
  onOpenMethodology,
}) => {
  const [inspectedFeatureIndex, setInspectedFeatureIndex] = useState<number | null>(null);

  // Compute live SHAP values for the selected NEO
  const approach = selectedNeo.close_approach_data[0];
  const velocityKms = parseFloat(approach?.relative_velocity?.kilometers_per_second || '28.5');
  const missDistLd = parseFloat(approach?.miss_distance?.lunar || '12.4');
  const missDistKm = parseFloat(approach?.miss_distance?.kilometers || '4760000');
  const diameterM = (selectedNeo.estimated_diameter.meters.min + selectedNeo.estimated_diameter.meters.max) / 2;
  const absMag = selectedNeo.absolute_magnitude_h;

  const inference = evaluateNeoFeatures({
    name: selectedNeo.name,
    missDistanceLd: missDistLd,
    missDistanceKm: missDistKm,
    relativeVelocityKms: velocityKms,
    estimatedDiameterMeters: diameterM,
    absoluteMagnitudeH: absMag,
  });

  return (
    <section
      id="explainability"
      className="py-28 px-4 sm:px-6 lg:px-12 relative border-t border-white/5 bg-space-950"
      data-purpose="shap-explainability"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-neon tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-glow" />
              <span>SHAPLEY FORCE VECTOR ANALYSIS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              WHY THIS OBJECT?
            </h2>
          </div>
          <p className="text-sm font-sans text-slate-300 max-w-lg leading-relaxed">
            The model does not simply label an object. It evaluates physical forces, kinematic
            uncertainty, and feature contribution weights via SHAP (SHapley Additive exPlanations).
          </p>
        </div>

        {/* Dynamic Object Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl liquid-panel border border-white/10 text-xs font-mono">
          <div className="flex items-center space-x-2 text-slate-400">
            <span className="text-cyan-ice">SELECT SPECIMEN TO EXPLAIN:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {neos.slice(0, 6).map((neo) => (
              <button
                key={neo.id}
                onClick={() => onSelectNeo(neo)}
                className={`px-3 py-1.5 rounded-full transition-colors ${
                  selectedNeo.id === neo.id
                    ? 'bg-cyan-glow text-black font-bold shadow-[0_0_12px_#00F0FF]'
                    : 'bg-space-950/80 border border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                {neo.name}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical AI Explainability Instrument */}
        <div className="liquid-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8">
          {/* Legend Strip */}
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-white/10 gap-3 text-xs">
            <span className="font-mono text-slate-300">
              SHAP ATTRIBUTION // TARGET:{' '}
              <span className="text-white font-bold">{selectedNeo.name}</span>
            </span>
            <div className="flex items-center space-x-6 font-sans">
              <span className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-hazard-coral" />
                <span className="text-slate-300">Increases Risk Score (+f(x))</span>
              </span>
              <span className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded bg-cyan-glow" />
                <span className="text-slate-300">Reduces Risk Score (-f(x))</span>
              </span>
            </div>
          </div>

          {/* Push-and-Pull Force Vectors */}
          <div className="space-y-6">
            {inference.shapAttributions.map((attr, idx) => {
              const isPositive = attr.shapValue >= 0;
              const isInspected = inspectedFeatureIndex === idx;

              return (
                <div
                  key={attr.feature}
                  onClick={() => setInspectedFeatureIndex(isInspected ? null : idx)}
                  className={`p-4 rounded-2xl transition-all cursor-pointer border ${
                    isInspected
                      ? 'bg-space-900/90 border-cyan-glow/60 shadow-[0_0_20px_rgba(0,240,255,0.15)]'
                      : 'bg-space-950/40 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs pb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-sans font-medium text-white">{attr.label}</span>
                      <HelpCircle className="w-3 h-3 text-slate-500 hover:text-cyan-ice" />
                    </div>
                    <span
                      className={`font-mono font-bold ${
                        isPositive ? 'text-hazard-coral' : 'text-cyan-glow'
                      }`}
                    >
                      {isPositive ? `+${attr.shapValue.toFixed(2)}` : attr.shapValue.toFixed(2)} SHAP
                    </span>
                  </div>

                  {/* Dual-Direction SHAP Progress Bar */}
                  <div className="w-full bg-space-950 rounded-full h-3.5 border border-white/10 overflow-hidden flex relative">
                    {/* Center neutral anchor line at 50% */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/20 z-10" />

                    {isPositive ? (
                      <>
                        <div className="w-1/2 bg-transparent" />
                        <div
                          className="h-full bg-gradient-to-r from-hazard-amber to-hazard-coral rounded-r-full transition-all duration-500"
                          style={{ width: `${Math.min(50, attr.directionPct / 2)}%` }}
                        />
                      </>
                    ) : (
                      <>
                        <div
                          className="h-full bg-transparent"
                          style={{ width: `${Math.max(0, 50 - attr.directionPct / 2)}%` }}
                        />
                        <div
                          className="h-full bg-gradient-to-r from-cyan-glow to-blue-500 rounded-l-full transition-all duration-500"
                          style={{ width: `${Math.min(50, attr.directionPct / 2)}%` }}
                        />
                      </>
                    )}
                  </div>

                  {/* Inspected Feature Detail Note */}
                  <div className="mt-2 flex justify-between items-center text-[11px] text-slate-400 font-sans">
                    <span>{attr.description}</span>
                    <span className="font-mono text-cyan-ice uppercase text-[10px]">
                      {attr.impact === 'increases_risk' ? 'HAZARD VECTOR' : 'MITIGATING FACTOR'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explainability Footer Calculation */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-4">
            <div className="space-y-1">
              <div>BASE PROBABILITY E[f(x)]: 0.068 (Historical PHA catalog prevalence)</div>
              <div className="text-[11px] font-sans text-slate-500">
                Formula: f(x) = E[f(x)] + ∑ φᵢ (Sum of additive marginal Shapley values)
              </div>
            </div>

            <div className="flex items-center space-x-3 text-white font-sans">
              <span>Predicted Risk Probability:</span>
              <span
                className={`px-3 py-1 rounded-full font-mono font-bold text-sm border ${
                  inference.isPha
                    ? 'bg-hazard-red/20 text-hazard-red border-hazard-red/40'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                }`}
              >
                {inference.predictedRiskProbability.toFixed(3)}{' '}
                {inference.isPha ? '(Critical)' : '(Nominal)'}
              </span>
            </div>
          </div>

          {/* Clarification Notice */}
          <div className="p-3 rounded-xl bg-space-950/60 border border-white/5 text-xs text-slate-400 font-sans flex items-center space-x-2">
            <Info className="w-4 h-4 text-cyan-glow shrink-0" />
            <span>
              This explanation describes the NEO-SCOPE educational model, not NASA/JPL&apos;s
              official planetary-defense impact-risk assessment.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
