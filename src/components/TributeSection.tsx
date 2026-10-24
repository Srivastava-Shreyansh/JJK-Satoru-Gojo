import React, { useState } from 'react';
import { gojoAudio } from '../utils/audio';

export const TributeSection: React.FC = () => {
  const [offerings, setOfferings] = useState<number>(23687);
  const [particles, setParticles] = useState<Array<{ id: number; left: number }>>([]);

  const handleMakeOffering = () => {
    setOfferings((prev) => prev + 1);
    gojoAudio.playOffering();

    const newId = Date.now() + Math.random();
    const newLeft = Math.floor(Math.random() * 80) + 10;
    setParticles((prev) => [...prev, { id: newId, left: newLeft }]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newId));
    }, 2000);
  };

  return (
    <footer id="tribute" className="py-24 px-5 sm:px-8 md:px-12 bg-[#05070B] border-t border-[#101827] relative overflow-hidden">
      {/* Floating offering soul wisps */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-20 w-3 h-3 rounded-full bg-[#53E8FF] shadow-[0_0_15px_#53E8FF] pointer-events-none animate-bounce"
          style={{
            left: `${p.left}%`,
            transition: 'all 2s ease-out',
            transform: 'translateY(-200px) scale(0.2)',
            opacity: 0,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
        {/* Japanese Calligraphy Large Heading */}
        <div className="space-y-3">
          <span className="text-xs font-mono text-[#53E8FF] uppercase tracking-widest block">
            THE ETERNAL EPITAPH
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-kanji text-[#F4F8FF] tracking-wider glow-cyan">
            天上天下唯我独尊
          </h2>
          <p className="text-sm sm:text-base font-mono text-[#B9C8DD]/80">
            &quot;Throughout Heaven and Earth, I Alone Am The Honored One.&quot;
          </p>
        </div>

        {/* Curated Quotes Carousel / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="p-5 rounded-xl bg-[#080E1A] border border-[#101827]">
            <p className="text-xs sm:text-sm text-[#F4F8FF] italic mb-3">
              &quot;Dying to win and risking death to win are completely different, Megumi.&quot;
            </p>
            <span className="text-[10px] font-mono text-[#53E8FF] uppercase">— Mentorship to Fushiguro</span>
          </div>

          <div className="p-5 rounded-xl bg-[#080E1A] border border-[#101827]">
            <p className="text-xs sm:text-sm text-[#F4F8FF] italic mb-3">
              &quot;It&apos;s going to be alright. I&apos;m the strongest, after all.&quot;
            </p>
            <span className="text-[10px] font-mono text-[#53E8FF] uppercase">— Reassurance to Itadori</span>
          </div>

          <div className="p-5 rounded-xl bg-[#080E1A] border border-[#101827]">
            <p className="text-xs sm:text-sm text-[#F4F8FF] italic mb-3">
              &quot;My best friend. My one and only.&quot;
            </p>
            <span className="text-[10px] font-mono text-[#53E8FF] uppercase">— Memorial for Suguru Geto</span>
          </div>
        </div>

        {/* Interactive Altar of Cursed Energy */}
        <div className="p-8 rounded-2xl bg-[#080E1A] border border-[#53E8FF]/20 max-w-xl mx-auto space-y-4">
          <span className="text-xs font-mono text-[#B9C8DD]/70 uppercase block">
            MEMORIAL ALTAR · 魂の祈り
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#F4F8FF]">
            Offer Cursed Energy to the Strongest
          </h3>
          <p className="text-xs sm:text-sm text-[#B9C8DD] leading-relaxed">
            Click to release a harmonic soul spark into the infinite void.
          </p>

          <div className="pt-2">
            <button
              onClick={handleMakeOffering}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00AFFF] to-[#53E8FF] text-[#05070B] font-mono font-bold text-sm hover:shadow-[0_0_30px_#53E8FF] transition-all cursor-pointer transform active:scale-95"
            >
              SEND OFFERING ✳︎ ({offerings.toLocaleString()})
            </button>
          </div>
        </div>

        {/* Quiet Colophon / Legal Disclaimer */}
        <div className="pt-12 border-t border-[#101827] flex flex-col sm:flex-row items-center justify-between text-xs text-[#B9C8DD]/50 font-mono gap-4">
          <div>
            SATORU GOJO DIGITAL TRIBUTE · 1989 — FOREVER
          </div>
          <div>
            Non-commercial fan tribute to Jujutsu Kaisen by SENSEI_SS &hearts;
          </div>
        </div>
      </div>
    </footer>
  );
};
