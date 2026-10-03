'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NearEarthObject } from '../types/neo';
import { CURATED_NEOS } from '../data/catalog';
import { fetchLiveNeoFeed } from '../lib/nasaApi';

import { LoadingScreen } from '../components/LoadingScreen';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { ProximityObservatory } from '../components/ProximityObservatory';
import { TrajectoryAnalytics } from '../components/TrajectoryAnalytics';
import { RiskLab } from '../components/RiskLab';
import { ExplainabilityWaterfall } from '../components/ExplainabilityWaterfall';
import { DataPipeline } from '../components/DataPipeline';
import { CosmicScale } from '../components/CosmicScale';
import { ObjectComparison } from '../components/ObjectComparison';
import { ObjectDetailModal } from '../components/ObjectDetailModal';
import { SourceMethodologyModal } from '../components/SourceMethodologyModal';
import { DataDictionaryModal } from '../components/DataDictionaryModal';
import { SearchModal } from '../components/SearchModal';
import { Footer } from '../components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [neos, setNeos] = useState<NearEarthObject[]>(CURATED_NEOS);
  const [selectedNeo, setSelectedNeo] = useState<NearEarthObject>(CURATED_NEOS[0]);
  const [detailNeo, setDetailNeo] = useState<NearEarthObject | null>(null);

  // Live NASA API Status
  const [dataSourceType, setDataSourceType] = useState<'LIVE' | 'CACHED' | 'ERROR'>('LIVE');
  const [syncTimestamp, setSyncTimestamp] = useState<string>('2026-10-03 06:59:02 UTC');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals & Drawers state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [selectedSourceId, setSelectedSourceId] = useState<string | null>(null);
  const [isDataDictionaryOpen, setIsDataDictionaryOpen] = useState(false);

  // Initial fetch from NASA NeoWs
  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchLiveNeoFeed();
        setNeos(result.neos);
        setDataSourceType(result.sourceType);
        setSyncTimestamp(result.syncTimestamp);
        if (result.neos.length > 0) {
          // Keep Apophis or first as default selected
          const apophis = result.neos.find((n) => n.id === '2099942') || result.neos[0];
          setSelectedNeo(apophis);
        }
      } catch (err) {
        console.warn('Initial live sync error, using verified cached catalog:', err);
        setDataSourceType('CACHED');
      }
    }
    loadData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const result = await fetchLiveNeoFeed();
      setNeos(result.neos);
      setDataSourceType(result.sourceType);
      setSyncTimestamp(result.syncTimestamp);
    } catch {
      setDataSourceType('CACHED');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleOpenSourceModal = (sourceId?: string) => {
    setSelectedSourceId(sourceId || null);
    setIsSourcesOpen(true);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -96;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Space Observation Initialization Loading Sequence */}
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="relative min-h-screen bg-space-950 text-slate-200">
        {/* Floating Top Navigation */}
        <Navbar
          dataSourceType={dataSourceType}
          syncTimestamp={syncTimestamp}
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenSources={() => handleOpenSourceModal()}
          onOpenDataDictionary={() => setIsDataDictionaryOpen(true)}
        />

        {/* Cinematic Earth Hero Section */}
        <HeroSection
          dataSourceType={dataSourceType}
          syncTimestamp={syncTimestamp}
          onExploreClick={() => handleScrollTo('live-radar')}
          onHowItWorksClick={() => handleScrollTo('methodology')}
        />

        {/* Page 01: Proximity Observatory (What's Passing By?) */}
        <ProximityObservatory
          neos={neos}
          selectedNeo={selectedNeo}
          syncTimestamp={syncTimestamp}
          dataSourceType={dataSourceType}
          onSelectNeo={(neo) => setSelectedNeo(neo)}
          onOpenSourceModal={handleOpenSourceModal}
          onOpenDetailModal={(neo) => setDetailNeo(neo)}
          onGoToRiskLab={(neo) => {
            setSelectedNeo(neo);
            handleScrollTo('risk-lab');
          }}
        />

        {/* Page 02: Read the Trajectory (Population Dynamics & Analytics) */}
        <TrajectoryAnalytics
          neos={neos}
          onSelectNeo={(neo) => {
            setSelectedNeo(neo);
            handleScrollTo('live-radar');
          }}
          onOpenSourceModal={handleOpenSourceModal}
        />

        {/* Page 03: Risk Lab (When Does an Object Become a Signal?) */}
        <RiskLab
          selectedNeo={selectedNeo}
          neos={neos}
          onSelectNeo={(neo) => setSelectedNeo(neo)}
          onOpenMethodology={() => handleScrollTo('methodology')}
          onOpenSourceModal={handleOpenSourceModal}
        />

        {/* Page 04: Why This Object? (SHAP Explainability Waterfall) */}
        <ExplainabilityWaterfall
          selectedNeo={selectedNeo}
          neos={neos}
          onSelectNeo={(neo) => setSelectedNeo(neo)}
          onOpenMethodology={() => handleScrollTo('methodology')}
        />

        {/* NEW FEATURE: Cosmic Scale (How Small Are We? / Perspective) */}
        <CosmicScale currentNeo={selectedNeo} />

        {/* Object Comparison Mode */}
        <ObjectComparison onOpenSourceModal={handleOpenSourceModal} />

        {/* Page 05: From Data to Signal (5-Stage Transformation Pipeline) */}
        <DataPipeline onOpenSourceModal={handleOpenSourceModal} />

        {/* Scientific Archive Footer */}
        <Footer
          onOpenSources={() => handleOpenSourceModal()}
          onOpenDataDictionary={() => setIsDataDictionaryOpen(true)}
          onOpenMethodology={() => handleScrollTo('methodology')}
        />

        {/* Modals & Drawers */}
        {detailNeo && (
          <ObjectDetailModal
            neo={detailNeo}
            onClose={() => setDetailNeo(null)}
            onOpenSourceModal={handleOpenSourceModal}
          />
        )}

        {isSourcesOpen && (
          <SourceMethodologyModal
            initialSourceId={selectedSourceId}
            onClose={() => setIsSourcesOpen(false)}
          />
        )}

        {isDataDictionaryOpen && (
          <DataDictionaryModal onClose={() => setIsDataDictionaryOpen(false)} />
        )}

        {isSearchOpen && (
          <SearchModal
            neos={neos}
            onSelectNeo={(neo) => {
              setSelectedNeo(neo);
              handleScrollTo('live-radar');
            }}
            onClose={() => setIsSearchOpen(false)}
          />
        )}
      </div>
    </>
  );
}
