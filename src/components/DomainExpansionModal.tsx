import React, { useEffect, useRef, useState } from 'react';
import { gojoAudio } from '../utils/audio';

interface DomainExpansionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DomainExpansionModal: React.FC<DomainExpansionModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataCount, setDataCount] = useState(0);
  const [is02SecRunning, setIs02SecRunning] = useState(false);
  const [frozenCount, setFrozenCount] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    gojoAudio.playDomainExpansion();

    // Data deluge counter
    const interval = setInterval(() => {
      setDataCount((prev) => prev + Math.floor(Math.random() * 850 + 400));
    }, 80);

    // Cosmic Canvas Engine
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles: Array<{
      angle: number;
      radius: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const colors = ['#53E8FF', '#00AFFF', '#F4F8FF', '#293D8F', '#BA55D3'];
    for (let i = 0; i < 400; i++) {
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * (Math.max(width, height) * 0.7) + 50,
        speed: (Math.random() * 0.004 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2.2 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    const centerX = width / 2;
    const centerY = height / 2;

    const render = () => {
      ctx.fillStyle = 'rgba(5, 7, 11, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Central gravitational eye
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        Math.min(width, height) * 0.45
      );
      gradient.addColorStop(0, 'rgba(83, 232, 255, 0.4)');
      gradient.addColorStop(0.2, 'rgba(0, 175, 255, 0.2)');
      gradient.addColorStop(0.6, 'rgba(41, 61, 143, 0.15)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(width, height) * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Cosmic event horizon ring
      ctx.strokeStyle = 'rgba(83, 232, 255, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Spiraling particles
      particles.forEach((p) => {
        p.angle += p.speed;
        p.radius -= 0.3;
        if (p.radius < 40) {
          p.radius = Math.max(width, height) * 0.65;
        }

        const x = centerX + Math.cos(p.angle) * p.radius;
        const y = centerY + Math.sin(p.angle) * p.radius;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, [isOpen]);

  // Trigger 0.2-second domain activation
  const handle02SecTrigger = () => {
    if (is02SecRunning) return;
    setIs02SecRunning(true);
    setFrozenCount(0);
    gojoAudio.playDomainExpansion();

    // Count 1000 transfigured curses neutralized
    const timer = setInterval(() => {
      setFrozenCount((prev) => {
        if (prev >= 1000) {
          clearInterval(timer);
          return 1000;
        }
        return prev + 125;
      });
    }, 25);

    setTimeout(() => {
      setIs02SecRunning(false);
    }, 1400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070B] overflow-hidden">
      {/* Background Cosmic Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Screen flash on 0.2s domain trigger */}
      {is02SecRunning && (
        <div className="absolute inset-0 bg-[#53E8FF] opacity-30 animate-pulse pointer-events-none" />
      )}

      {/* Domain HUD Controls */}
      <div className="relative z-10 w-full max-w-5xl px-6 py-8 flex flex-col justify-between h-full pointer-events-none">
        {/* Top Header */}
        <div className="flex items-center justify-between pointer-events-auto border-b border-[#53E8FF]/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#53E8FF] uppercase tracking-widest px-2.5 py-1 rounded bg-[#101827]/80 border border-[#53E8FF]/30">
              DOMAIN EXPANSION
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F4F8FF] font-heading">
              無量空処 <span className="text-sm font-normal text-[#B9C8DD]/60 font-body">· Unlimited Void</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full border border-[#53E8FF]/40 text-[#F4F8FF] text-xs font-mono tracking-wider hover:bg-[#53E8FF] hover:text-[#05070B] transition-colors cursor-pointer"
          >
            DISPEL DOMAIN [ ESC ]
          </button>
        </div>

        {/* Center Philosophy & Real-Time Telemetry */}
        <div className="my-auto max-w-2xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-mono text-[#53E8FF] tracking-widest uppercase">
              COGNITIVE DELUGE IN PROGRESS
            </p>
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F4F8FF] font-heading">
              Everything is given.
              <br />
              <span className="text-[#53E8FF]">Nothing can be done.</span>
            </h3>
            <p className="text-sm text-[#B9C8DD] max-w-lg mx-auto leading-relaxed pt-2">
              Inside Unlimited Void, actions and thoughts are repeated an infinite number of times. The target receives an unbounded deluge of sensory and conceptual data, freezing synaptic processing entirely.
            </p>
          </div>

          {/* Real-time telemetry cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
            <div className="p-3 rounded-lg bg-[#101827]/80 border border-[#53E8FF]/20 text-left">
              <span className="text-[10px] font-mono text-[#B9C8DD]/60 block uppercase">
                Synaptic Influx
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-[#53E8FF]">
                {(dataCount / 1024).toFixed(2)} TB
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#101827]/80 border border-[#53E8FF]/20 text-left">
              <span className="text-[10px] font-mono text-[#B9C8DD]/60 block uppercase">
                Time Dilation
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-[#F4F8FF]">
                0.2s = 6 Mo.
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#101827]/80 border border-[#53E8FF]/20 text-left col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono text-[#B9C8DD]/60 block uppercase">
                Sure-Hit Status
              </span>
              <span className="text-base sm:text-lg font-mono font-bold text-emerald-400">
                ABSOLUTE
              </span>
            </div>
          </div>

          {/* Interactive Shibuya 0.2s Gambit Trigger */}
          <div className="pt-4 pointer-events-auto">
            <button
              onClick={handle02SecTrigger}
              disabled={is02SecRunning}
              className="px-6 py-3 rounded-full bg-[#00AFFF] text-[#05070B] font-mono font-bold text-sm tracking-wider uppercase hover:bg-[#53E8FF] transition-all hover:shadow-[0_0_25px_#53E8FF] cursor-pointer disabled:opacity-50"
            >
              {is02SecRunning ? 'EXECUTING 0.2s DOMAIN...' : 'TRIGGER 0.2-SECOND DOMAIN GAMBIT'}
            </button>
            {frozenCount > 0 && (
              <p className="text-xs font-mono text-emerald-400 mt-2">
                ✓ {frozenCount} Transfigured curses incapacitated in Shibuya B5F without human casualties
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar Info */}
        <div className="border-t border-[#53E8FF]/20 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#B9C8DD]/60 font-mono">
          <span>COGNITIVE TRANSMISSION RATE: ∞ / SEC</span>
          <span>TOKYO JUJUTSU HIGH · ARCHIVE CLASSIFIED</span>
        </div>
      </div>
    </div>
  );
};
