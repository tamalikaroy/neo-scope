'use client';

import React, { useState } from 'react';
import { METHODOLOGY_STAGES, PipelineStageInfo } from '../data/methodologyData';
import { ExternalLink, Code2, Database, ArrowRight, X, CheckCircle2 } from 'lucide-react';

interface DataPipelineProps {
  onOpenSourceModal: (sourceId?: string) => void;
}

export const DataPipeline: React.FC<DataPipelineProps> = ({ onOpenSourceModal }) => {
  const [selectedStage, setSelectedStage] = useState<PipelineStageInfo | null>(null);

  return (
    <section
      id="methodology"
      className="py-28 px-4 sm:px-6 lg:px-12 relative border-t border-white/5 bg-space-950 scroll-mt-28"
      data-purpose="methodology-pipeline"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-neon tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-glow" />
            <span>TRANSFORMATION PIPELINE</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            FROM DATA TO SIGNAL
          </h2>
          <p className="text-slate-300 text-base font-sans leading-relaxed">
            Continuous ingestion from NASA Jet Propulsion Laboratory to transparent real-time browser inference.
          </p>
        </div>

        {/* CONTINUOUS HORIZONTAL DATA CONDUIT */}
        <div className="relative py-8" data-purpose="continuous-data-conduit">
          {/* Connecting Luminous Conduit Beam */}
          <div className="hidden md:block absolute top-[52px] left-8 right-8 h-[2px] pipeline-beam rounded-full z-0" />

          {/* 5 Continuous Interactive Stages */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {METHODOLOGY_STAGES.slice(0, 5).map((stage, idx) => {
              const colors = [
                'border-cyan-glow/50 text-cyan-glow shadow-[0_0_16px_rgba(0,240,255,0.25)]',
                'border-cyan-neon/50 text-cyan-neon shadow-[0_0_16px_rgba(56,189,248,0.25)]',
                'border-cyan-ice/50 text-cyan-ice shadow-[0_0_16px_rgba(125,211,252,0.25)]',
                'border-blue-400/50 text-blue-400 shadow-[0_0_16px_rgba(96,165,250,0.25)]',
                'border-emerald-400/50 text-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.25)]',
              ];

              return (
                <div
                  key={stage.step}
                  onClick={() => setSelectedStage(stage)}
                  className="space-y-4 text-left group cursor-pointer p-4 rounded-2xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/10"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-2xl liquid-panel border flex items-center justify-center font-mono font-bold text-sm group-hover:scale-110 transition-transform ${
                        colors[idx % colors.length]
                      }`}
                    >
                      {stage.step}
                    </div>
                    <span className="font-mono text-[10px] text-cyan-ice uppercase tracking-wider block md:hidden">
                      {stage.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-white uppercase tracking-tight group-hover:text-cyan-glow transition-colors">
                      {stage.title}
                    </h3>
                    <p className="text-xs font-sans text-slate-400 mt-1 leading-relaxed">
                      {stage.whatHappens.substring(0, 85)}...
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-neon/80 uppercase">
                    <span>{stage.tooling.split('/')[0]}</span>
                    <span className="text-slate-500 group-hover:text-white flex items-center">
                      INSPECT →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Extended Methodology Guidance Box */}
        <div className="p-6 rounded-3xl liquid-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-display font-bold text-white text-base">
              DATA SCIENCE TRANSPARENCY & METHODOLOGY LEDGER
            </h4>
            <p className="text-xs text-slate-400 font-sans">
              Review full data dictionary, mathematical formulas, train/test split, and validation metrics.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedStage(METHODOLOGY_STAGES[4])}
              className="px-5 py-2.5 rounded-full liquid-button-primary text-xs font-semibold text-white uppercase tracking-wider"
            >
              EXPLORE STAGE CODE
            </button>
            <button
              onClick={() => onOpenSourceModal('nasa-neows')}
              className="px-5 py-2.5 rounded-full liquid-button-ghost text-xs font-medium text-slate-300 hover:text-white uppercase tracking-wider"
            >
              ALL SOURCES ↗
            </button>
          </div>
        </div>
      </div>

      {/* Stage Detail Modal */}
      {selectedStage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6">
          <div className="relative w-full max-w-3xl rounded-3xl liquid-panel-glow border border-cyan-glow/40 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-mono text-cyan-glow uppercase">
                  <span>{selectedStage.number}</span>
                  <span>//</span>
                  <span>{selectedStage.tooling}</span>
                </div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {selectedStage.title}: {selectedStage.subtitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStage(null)}
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Close stage details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* WHAT HAPPENS HERE? */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-cyan-ice uppercase tracking-wider">
                WHAT HAPPENS HERE?
              </div>
              <p className="text-sm font-sans text-slate-300 leading-relaxed">
                {selectedStage.whatHappens}
              </p>
            </div>

            {/* Inputs & Outputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-space-950/80 border border-white/10 space-y-1">
                <div className="text-xs font-mono text-cyan-neon uppercase">INPUT SPECIFICATION</div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {selectedStage.inputSpec}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-space-950/80 border border-white/10 space-y-1">
                <div className="text-xs font-mono text-emerald-400 uppercase">OUTPUT SPECIFICATION</div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {selectedStage.outputSpec}
                </p>
              </div>
            </div>

            {/* PROCESS SPECIFICATION */}
            <div className="p-4 rounded-2xl bg-space-950/80 border border-white/10 space-y-1">
              <div className="text-xs font-mono text-amber-300 uppercase">PROCESS & MATHEMATICAL FORMULATION</div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {selectedStage.processSpec}
              </p>
            </div>

            {/* CODE SNIPPET */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center space-x-1.5 text-cyan-ice">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>SOURCE / CODE REFERENCE</span>
                </span>
                <span>PYTHON / TYPESCRIPT</span>
              </div>
              <pre className="p-4 rounded-2xl bg-space-950 border border-white/10 overflow-x-auto text-xs font-mono text-cyan-ice leading-relaxed">
                <code>{selectedStage.codeSnippet}</code>
              </pre>
            </div>

            {/* Footer with Source Link */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="font-mono text-slate-400">
                REFERENCE: <span className="text-white">{selectedStage.sourceRef}</span>
              </div>
              <a
                href={selectedStage.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-cyan-neon/40 text-cyan-ice hover:text-white hover:border-cyan-neon font-mono flex items-center space-x-1.5 transition-colors"
              >
                <span>OPEN OFFICIAL DOCUMENTATION</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
