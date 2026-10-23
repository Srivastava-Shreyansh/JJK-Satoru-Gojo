import React, { useRef, useEffect } from 'react';

interface HeroSectionProps {
  onOpenDomain: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDomain }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Parallax & Physics refs for subtle cinematic camera drift
  const mousePosRef = useRef({ x: 0, y: 0 });
  const currentParallaxRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number | null>(null);

  // Ensure seamless continuous cinematic playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  // 60FPS Inertial 3D Parallax & Depth Drift
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      mousePosRef.current = { x: normX, y: normY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const touch = e.touches[0];
      const normX = (touch.clientX / window.innerWidth) * 2 - 1;
      const normY = (touch.clientY / window.innerHeight) * 2 - 1;
      mousePosRef.current = { x: normX, y: normY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Spring interpolation loop for smooth camera parallax
    const animate = () => {
      const targetX = -mousePosRef.current.x * 18; // subtle 18px drift
      const targetY = -mousePosRef.current.y * 12; // subtle 12px drift

      currentParallaxRef.current.x += (targetX - currentParallaxRef.current.x) * 0.06;
      currentParallaxRef.current.y += (targetY - currentParallaxRef.current.y) * 0.06;

      const video = videoRef.current;
      if (video) {
        video.style.transform = `scale(1.08) translate3d(${currentParallaxRef.current.x}px, ${currentParallaxRef.current.y}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end pb-14 pt-24 px-5 sm:px-8 md:px-12 overflow-hidden select-none">
      {/* 
        Full-Screen Video Background running in a continuous cinematic loop
      */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#05070B]">
        <video
          ref={videoRef}
          src="/assets/aistudio/mainframe-ai_4e401105.mp4"
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          className="w-full h-full object-cover pointer-events-none will-change-transform"
          style={{
            objectPosition: '70% center',
            transform: 'scale(1.08) translate3d(0, 0, 0)',
          }}
        />

        {/* Ambient atmospheric vignette scrim for pristine text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-[#05070B]/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070B]/95 via-[#05070B]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#53E8FF]/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-4xl space-y-6">
        {/* Calligraphy Tag & Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono tracking-widest text-[#53E8FF] uppercase px-3 py-1 rounded bg-[#101827]/80 border border-[#53E8FF]/30 backdrop-blur-sm">
            THE HONORED ONE · 五条 悟
          </span>
          <span className="text-sm font-kanji text-[#F4F8FF]/80">
            天上天下唯我独尊
          </span>
        </div>

        {/* Main Headline */}
        <div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black font-heading tracking-tight text-[#F4F8FF] leading-none mb-2">
            THE STRONGEST.
          </h1>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-light font-heading tracking-tight text-[#53E8FF] glow-cyan">
            BEYOND INFINITY.
          </h2>
        </div>

        {/* Editorial Subtitle */}
        <p className="max-w-xl text-sm sm:text-base text-[#B9C8DD] leading-relaxed">
          The natural equilibrium of the universe tilted upon his birth. Possessing the Six Eyes and the Limitless, Satoru Gojo is the pinnacle of modern sorcery — untouched, unmatched, and alone at the summit.
        </p>

        {/* Interactive Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onOpenDomain}
            className="px-6 py-3 rounded-full bg-[#53E8FF] text-[#05070B] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#00AFFF] hover:shadow-[0_0_25px_#53E8FF] transition-all cursor-pointer"
          >
            ENTER UNLIMITED VOID →
          </button>

          <a
            href="#limitless"
            className="px-6 py-3 rounded-full bg-[#101827]/80 border border-[#53E8FF]/40 text-[#F4F8FF] font-mono text-xs uppercase tracking-wider hover:bg-[#53E8FF]/10 transition-colors"
          >
            EXPLORE THE LIMITLESS
          </a>

          <a
            href="#six-eyes"
            className="px-6 py-3 rounded-full bg-transparent border border-white/20 text-[#B9C8DD] font-mono text-xs uppercase tracking-wider hover:border-[#53E8FF] hover:text-white transition-colors"
          >
            THE SIX EYES
          </a>
        </div>
      </div>

      {/* Bottom Coordinates & Stats Strip */}
      <div className="relative z-10 pt-10 mt-10 border-t border-[#101827] flex flex-col md:flex-row md:items-center justify-between text-xs font-mono text-[#B9C8DD]/60 gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div>BORN: <span className="text-[#F4F8FF]">DECEMBER 7, 1989</span></div>
          <div>STATUS: <span className="text-[#53E8FF]">SPECIAL GRADE · 特級呪術師</span></div>
          <div>LINEAGE: <span className="text-[#F4F8FF]">SUGAWARA NO MICHIZANE</span></div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>35°41&apos;22&quot;N · 139°41&apos;30&quot;E TOKYO</span>
        </div>
      </div>
    </section>
  );
};
