'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  "INITIALIZING NEO-SCOPE",
  "ESTABLISHING NASA DATA LINK",
  "LOADING ORBITAL OBSERVATIONS",
  "CALIBRATING ANALYTICS",
  "SYSTEM READY"
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setTimeout(onComplete, 500);
          return prev;
        }
      });
    }, 450);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 5 : 100));
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] bg-space-950 flex flex-col items-center justify-center p-6 select-none"
    >
      {/* Background radial atmosphere */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-cyan-neon/10 blur-[160px] pointer-events-none" />

      {/* Center Instrument HUD */}
      <div className="relative z-10 flex flex-col items-center space-y-8 max-w-md w-full text-center">
        {/* Animated Reticle Beacon */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-neon/30 animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border border-dashed border-cyan-glow/40 animate-spin-reverse" />
          <div className="w-4 h-4 rounded-full bg-cyan-glow shadow-[0_0_20px_#00F0FF] animate-pulse" />
          <div className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-cyan-ice animate-ping" />
        </div>

        {/* Brand & Mission Tag */}
        <div className="space-y-1">
          <h1 className="font-display font-extrabold text-2xl tracking-[0.28em] text-white">
            NEO-SCOPE
          </h1>
          <p className="font-mono text-[10px] tracking-[0.24em] text-cyan-ice/70 uppercase">
            NEAR-EARTH OBJECT INTELLIGENCE
          </p>
        </div>

        {/* Dynamic Status Sequence */}
        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-center space-x-2.5 text-xs font-mono text-cyan-neon"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-ping" />
              <span className="tracking-widest">{STEPS[currentStepIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar & Telemetry Coordinates */}
        <div className="w-full max-w-xs space-y-2">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-neon to-cyan-glow shadow-[0_0_12px_#00F0FF]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
            <span>EPOCH: J2000.0</span>
            <span>{progress}%</span>
            <span>JPL CNEOS</span>
          </div>
        </div>

        {/* Quick Skip Button for instant inspection */}
        <button
          onClick={onComplete}
          className="text-[11px] font-mono text-slate-500 hover:text-cyan-ice transition-colors tracking-widest uppercase pt-2"
        >
          [SKIP INITIALIZATION →]
        </button>
      </div>
    </motion.div>
  );
};
