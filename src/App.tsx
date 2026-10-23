/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GenesisSection } from './components/GenesisSection';
import { SixEyesSection } from './components/SixEyesSection';
import { LimitlessLab } from './components/LimitlessLab';
import { BattleChronicles } from './components/BattleChronicles';
import { TributeSection } from './components/TributeSection';
import { DomainExpansionModal } from './components/DomainExpansionModal';

export default function App() {
  const [domainOpen, setDomainOpen] = useState(false);

  // Close domain with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && domainOpen) {
        setDomainOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [domainOpen]);

  return (
    <div className="relative min-h-screen bg-[#05070B] text-[#F4F8FF] font-body selection:bg-[#53E8FF] selection:text-[#05070B]">
      {/* Custom Desktop Cyan Cursor */}
      <CustomCursor />

      {/* Navigation Top Bar */}
      <Navbar onOpenDomain={() => setDomainOpen(true)} />

      {/* 1. Hero Section: Cinematic Scannable Gojo Experience */}
      <HeroSection onOpenDomain={() => setDomainOpen(true)} />

      {/* 2. Historical Genesis: The Birth that Shifted the World Balance */}
      <GenesisSection />

      {/* 3. The Six Eyes (六眼 - Rikugan): Atomic Perception */}
      <SixEyesSection />

      {/* 4. The Limitless (無下限) Interactive Laboratory */}
      <LimitlessLab />

      {/* 5. Battle Chronicles: Apex Engagements */}
      <BattleChronicles />

      {/* 6. Tribute & Memorial: The Honored One */}
      <TributeSection />

      {/* Domain Expansion Modal (Unlimited Void · 無量空処) */}
      <DomainExpansionModal
        isOpen={domainOpen}
        onClose={() => setDomainOpen(false)}
      />
    </div>
  );
}
