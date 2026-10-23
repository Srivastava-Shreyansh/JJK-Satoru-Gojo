import React, { useState } from 'react';
import { gojoAudio } from '../utils/audio';

interface NavbarProps {
  onOpenDomain: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDomain }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  const toggleSound = () => {
    if (!isAudioActive) {
      gojoAudio.startAmbient();
      gojoAudio.setMuted(false);
      setIsAudioActive(true);
    } else {
      const isMuted = gojoAudio.toggleMute();
      setIsAudioActive(!isMuted);
    }
  };

  const navLinks = [
    { label: 'Genesis', href: '#genesis' },
    { label: 'Six Eyes', href: '#six-eyes' },
    { label: 'Limitless', href: '#limitless' },
    { label: 'Chronicles', href: '#chronicles' },
    { label: 'Tribute', href: '#tribute' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full px-5 sm:px-8 py-4 sm:py-5 bg-[#05070B]/80 backdrop-blur-md border-b border-[#101827] flex justify-between items-center transition-all">
      {/* Brand Zone */}
      <div className="flex items-center gap-3">
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-xl sm:text-2xl font-black font-heading tracking-tight text-[#F4F8FF] group-hover:text-[#53E8FF] transition-colors">
            GOJO SATORU
          </span>
          <span className="text-base font-kanji text-[#53E8FF] font-bold">五条 悟</span>
        </a>
        <span className="hidden lg:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#101827] border border-[#53E8FF]/30 text-[#53E8FF]">
          SPECIAL GRADE · 特級
        </span>
      </div>

      {/* Center Nav Links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[#B9C8DD]">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hover:text-[#53E8FF] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Right Action Zone: Sound & Domain Expansion */}
      <div className="hidden sm:flex items-center gap-3">
        {/* Audio Ambiance Toggle */}
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#101827] bg-[#080E1A] hover:border-[#53E8FF]/40 text-xs font-mono text-[#B9C8DD] transition-colors cursor-pointer"
          title="Toggle Ambient Audio"
        >
          <div className="flex items-end gap-[2px] h-3 w-3">
            <span
              className={`w-[2px] bg-[#53E8FF] rounded-full transition-all ${
                isAudioActive ? 'h-3 animate-pulse' : 'h-1'
              }`}
            />
            <span
              className={`w-[2px] bg-[#53E8FF] rounded-full transition-all ${
                isAudioActive ? 'h-2 animate-bounce' : 'h-1'
              }`}
            />
            <span
              className={`w-[2px] bg-[#53E8FF] rounded-full transition-all ${
                isAudioActive ? 'h-3.5 animate-pulse' : 'h-1'
              }`}
            />
          </div>
          <span>{isAudioActive ? 'INFINITY AUDIO ON' : 'AUDIO OFF'}</span>
        </button>

        {/* Domain Expansion CTA Button */}
        <button
          onClick={onOpenDomain}
          className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00AFFF] to-[#53E8FF] text-[#05070B] text-xs font-mono font-bold tracking-wider hover:shadow-[0_0_20px_#53E8FF] transition-all cursor-pointer"
        >
          EXPAND DOMAIN · 領域展開
        </button>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none cursor-pointer z-50"
        aria-label="Toggle navigation menu"
      >
        <span
          className={`w-6 h-[2px] bg-[#F4F8FF] block transition-all duration-300 ${
            mobileOpen ? 'rotate-45 translate-y-[7px] bg-[#53E8FF]' : ''
          }`}
        />
        <span
          className={`w-6 h-[2px] bg-[#F4F8FF] block transition-all duration-300 ${
            mobileOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`w-6 h-[2px] bg-[#F4F8FF] block transition-all duration-300 ${
            mobileOpen ? '-rotate-45 -translate-y-[7px] bg-[#53E8FF]' : ''
          }`}
        />
      </button>

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#05070B]/98 backdrop-blur-xl flex flex-col justify-center items-start px-8 gap-8 transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span className="text-xs font-mono text-[#53E8FF] tracking-widest uppercase">
          JUJUTSU HIGH CLASSIFIED ARCHIVE
        </span>

        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-2xl font-bold font-heading text-[#F4F8FF] hover:text-[#53E8FF] transition-colors"
          >
            {link.label}
          </a>
        ))}

        <div className="pt-4 flex flex-col gap-3 w-full">
          <button
            onClick={() => {
              setMobileOpen(false);
              onOpenDomain();
            }}
            className="w-full py-3 rounded-full bg-[#53E8FF] text-[#05070B] font-mono font-bold text-sm tracking-wider uppercase text-center"
          >
            EXPAND DOMAIN · 領域展開
          </button>

          <button
            onClick={toggleSound}
            className="w-full py-2.5 rounded-full border border-[#101827] text-xs font-mono text-[#B9C8DD] text-center"
          >
            {isAudioActive ? 'MUTED AMBIENT SOUND' : 'ACTIVATE AMBIENT SOUND'}
          </button>
        </div>
      </div>
    </header>
  );
};
