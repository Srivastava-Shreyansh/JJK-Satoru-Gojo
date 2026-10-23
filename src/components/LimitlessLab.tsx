import React, { useState, useRef, useEffect } from 'react';
import { gojoAudio } from '../utils/audio';

type Technique = 'neutral' | 'blue' | 'red' | 'purple';

export const LimitlessLab: React.FC = () => {
  const [activeTech, setActiveTech] = useState<Technique>('neutral');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States for interactive Neutral Infinity
  const [distance, setDistance] = useState(100);
  const [velocity, setVelocity] = useState(100);

  // Purple collision state
  const [purpleFired, setPurpleFired] = useState(false);

  // Canvas particle engine for Blue/Red/Purple simulations
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const rect = canvas.getBoundingClientRect();
    const width = (canvas.width = rect.width || 600);
    const height = (canvas.height = 360);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }> = [];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 90; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          radius: Math.random() * 2.5 + 1,
          color:
            activeTech === 'blue'
              ? '#00AFFF'
              : activeTech === 'red'
              ? '#FF3B30'
              : activeTech === 'purple'
              ? '#BA55D3'
              : '#53E8FF',
          alpha: Math.random() * 0.7 + 0.3,
        });
      }
    };

    initParticles();

    const centerX = width / 2;
    const centerY = height / 2;

    const render = () => {
      ctx.fillStyle = 'rgba(8, 14, 26, 0.3)';
      ctx.fillRect(0, 0, width, height);

      // Render center barrier or core depending on technique
      if (activeTech === 'neutral') {
        // Gojo barrier
        ctx.strokeStyle = '#53E8FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 45, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(83, 232, 255, 0.15)';
        ctx.fill();

        ctx.fillStyle = '#F4F8FF';
        ctx.font = '11px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('INFINITY BARRIER', centerX, centerY + 4);
      } else if (activeTech === 'blue') {
        // Attractive singularity
        const grad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 60);
        grad.addColorStop(0, '#00AFFF');
        grad.addColorStop(0.4, 'rgba(0, 175, 255, 0.4)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
        ctx.fill();
      } else if (activeTech === 'red') {
        // Repulsive divergence ring
        ctx.strokeStyle = '#FF3B30';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 55, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 59, 48, 0.15)';
        ctx.fill();
      } else if (activeTech === 'purple') {
        // Hollow purple imaginary mass core
        const grad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, 70);
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(0.3, '#BA55D3');
        grad.addColorStop(0.7, '#00AFFF');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update particles
      particles.forEach((p) => {
        if (activeTech === 'neutral') {
          // Normal Brownian motion
          p.x += p.vx;
          p.y += p.vy;

          // Prevent particles from entering Infinity barrier
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 48) {
            p.vx = (dx / dist) * 1.5;
            p.vy = (dy / dist) * 1.5;
          }
        } else if (activeTech === 'blue') {
          // Gravitational suction toward center
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 20);
          const force = 350 / (dist * dist);
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
        } else if (activeTech === 'red') {
          // Explosive divergence away from center
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 10);
          const force = 400 / (dist * dist);
          p.vx += (dx / dist) * force * 1.8;
          p.vy += (dy / dist) * force * 1.8;
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.98;
          p.vy *= 0.98;
        } else if (activeTech === 'purple') {
          // Imaginary mass vortex
          const dx = centerX - p.x;
          const dy = centerY - p.y;
          p.vx += -dy * 0.05 + dx * 0.02;
          p.vy += dx * 0.05 + dy * 0.02;
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;
        }

        // Boundary wrapping
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeTech]);

  // Handler for technique switch with audio synthesis
  const handleSelectTech = (tech: Technique) => {
    setActiveTech(tech);
    if (tech === 'blue') gojoAudio.playBlue();
    if (tech === 'red') gojoAudio.playRed();
    if (tech === 'purple') gojoAudio.playHollowPurple();
  };

  // Achilles slider for Neutral Infinity
  const handleDistanceSlider = (val: number) => {
    // As input approaches 0, velocity drops exponentially
    setDistance(val);
    const calculatedSpeed = Math.pow(val / 100, 3) * 100;
    setVelocity(calculatedSpeed);
  };

  const fireHollowPurple = () => {
    setPurpleFired(true);
    gojoAudio.playHollowPurple();
    setTimeout(() => {
      setPurpleFired(false);
    }, 1200);
  };

  return (
    <section id="limitless" className="py-24 px-5 sm:px-8 md:px-12 bg-[#080E1A] border-t border-[#101827]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-[#53E8FF] uppercase tracking-widest">
                INHERITED JUJUTSU · 術式
              </span>
              <span className="text-[#53E8FF]">/</span>
              <span className="text-xs font-mono text-[#B9C8DD]/60">SPATIAL MANIPULATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F4F8FF] font-heading">
              The Limitless. <span className="text-[#53E8FF]">無下限咒術</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#B9C8DD] leading-relaxed">
            Derived from the concept that any finite number can be divided infinitely. Gojo brings the mathematical paradox of convergence into tangible reality.
          </p>
        </div>

        {/* 4 Technique Tab Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
          {[
            { id: 'neutral', name: 'Infinity (不可侵)', tag: 'Convergence', color: 'border-[#53E8FF]' },
            { id: 'blue', name: 'Lapse: Blue (蒼)', tag: 'Attractive Vacuum', color: 'border-[#00AFFF]' },
            { id: 'red', name: 'Reversal: Red (赫)', tag: 'Repulsive Divergence', color: 'border-[#FF3B30]' },
            { id: 'purple', name: 'Hollow: Purple (茈)', tag: 'Imaginary Mass', color: 'border-[#BA55D3]' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleSelectTech(tab.id as Technique)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeTech === tab.id
                  ? 'bg-[#101827] border-[#53E8FF] shadow-[0_0_20px_rgba(83,232,255,0.15)]'
                  : 'bg-[#101827]/40 border-[#101827] hover:border-[#53E8FF]/40 text-[#B9C8DD]'
              }`}
            >
              <span className="text-[10px] font-mono text-[#53E8FF] uppercase block mb-1">
                {tab.tag}
              </span>
              <h4 className="font-heading font-semibold text-sm sm:text-base text-[#F4F8FF]">
                {tab.name}
              </h4>
            </button>
          ))}
        </div>

        {/* Interactive Lab Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Canvas Simulation Viewport */}
          <div className="lg:col-span-7 bg-[#05070B] rounded-2xl border border-[#101827] p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-[#101827] text-xs font-mono text-[#B9C8DD]/60">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#53E8FF] animate-pulse" />
                SIMULATION: {activeTech.toUpperCase()} FIELD
              </span>
              <span>60 FPS · REALTIME PHYSICS</span>
            </div>

            {/* Canvas */}
            <div className="relative my-4 rounded-xl overflow-hidden bg-[#080E1A]/80 border border-[#101827]/50">
              <canvas ref={canvasRef} className="w-full h-[320px] block" />
              {purpleFired && (
                <div className="absolute inset-0 bg-[#BA55D3]/20 animate-ping pointer-events-none" />
              )}
            </div>

            {/* Control Bar inside Viewport */}
            <div className="pt-2">
              {activeTech === 'neutral' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#B9C8DD]">PROXIMITY TO GOJO:</span>
                    <span className="text-[#53E8FF] font-bold">
                      {distance === 0 ? '0.0000000001 mm (NEVER TOUCHES)' : `${distance}%`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={distance}
                    onChange={(e) => handleDistanceSlider(Number(e.target.value))}
                    className="w-full accent-[#53E8FF] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-[#B9C8DD]/60">
                    <span>Target Impact Velocity: {velocity.toFixed(3)} m/s</span>
                    <span>Asymptotic Barrier: ACTIVE</span>
                  </div>
                </div>
              )}

              {activeTech === 'blue' && (
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#B9C8DD]">Gravitational Potential: -∞</span>
                  <button
                    onClick={() => gojoAudio.playBlue()}
                    className="px-3.5 py-1.5 rounded-full bg-[#00AFFF]/20 text-[#00AFFF] border border-[#00AFFF]/40 hover:bg-[#00AFFF] hover:text-[#05070B] transition-colors cursor-pointer"
                  >
                    Pulse Negative Singularity
                  </button>
                </div>
              )}

              {activeTech === 'red' && (
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#B9C8DD]">Divergence Power: 2× Blue (Positive Energy)</span>
                  <button
                    onClick={() => gojoAudio.playRed()}
                    className="px-3.5 py-1.5 rounded-full bg-[#FF3B30]/20 text-[#FF3B30] border border-[#FF3B30]/40 hover:bg-[#FF3B30] hover:text-white transition-colors cursor-pointer"
                  >
                    Unleash Repulsive Blast
                  </button>
                </div>
              )}

              {activeTech === 'purple' && (
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#B9C8DD]">Imaginary Mass: Singularity Eradication</span>
                  <button
                    onClick={fireHollowPurple}
                    className="px-4 py-2 rounded-full bg-[#BA55D3] text-white font-bold hover:shadow-[0_0_25px_#BA55D3] transition-all cursor-pointer"
                  >
                    COLLIDE: HOLLOW PURPLE
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Technical Dossier & Mathematical Explanation */}
          <div className="lg:col-span-5 bg-[#101827] rounded-2xl border border-[#101827] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#53E8FF] uppercase tracking-widest block mb-2">
                THEORY OF OPERATION
              </span>

              {activeTech === 'neutral' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold font-heading text-[#F4F8FF]">
                    Neutral Infinity: Achilles and the Tortoise
                  </h3>
                  <p className="text-sm text-[#B9C8DD] leading-relaxed">
                    Infinity is the base state of the Limitless. It does not stop incoming attacks; rather, it makes the space between Gojo and the target endlessly divisible.
                  </p>
                  <div className="p-4 rounded-xl bg-[#05070B]/60 border border-[#53E8FF]/20 space-y-2 text-xs font-mono text-[#B9C8DD]">
                    <p className="text-[#53E8FF] font-semibold">FORMULA: lim(x → 0) Δd = 0</p>
                    <p>
                      The closer an object gets, the slower it moves. An infinite series of subdivisions prevents physical contact entirely.
                    </p>
                  </div>
                </div>
              )}

              {activeTech === 'blue' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold font-heading text-[#00AFFF]">
                    Cursed Technique Lapse: Blue (蒼)
                  </h3>
                  <p className="text-sm text-[#B9C8DD] leading-relaxed">
                    By infusing the Limitless with negative cursed energy, Gojo manifests negative distance into physical space. Nature attempts to correct this impossibility by violently pulling surrounding matter inward.
                  </p>
                  <div className="p-4 rounded-xl bg-[#05070B]/60 border border-[#00AFFF]/20 space-y-2 text-xs font-mono text-[#B9C8DD]">
                    <p className="text-[#00AFFF] font-semibold">EFFECT: Gravitational Singularity</p>
                    <p>
                      Used for high-speed spatial teleportation, crushing reinforced curses, and magnetic terrain annihilation.
                    </p>
                  </div>
                </div>
              )}

              {activeTech === 'red' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold font-heading text-[#FF3B30]">
                    Cursed Technique Reversal: Red (赫)
                  </h3>
                  <p className="text-sm text-[#B9C8DD] leading-relaxed">
                    The reverse of Blue. By multiplying negative cursed energy with itself to generate positive energy via Reverse Cursed Technique (RCT), the convergence of Infinity is flipped into pure divergence.
                  </p>
                  <div className="p-4 rounded-xl bg-[#05070B]/60 border border-[#FF3B30]/20 space-y-2 text-xs font-mono text-[#B9C8DD]">
                    <p className="text-[#FF3B30] font-semibold">OUTPUT: 200% of Blue Output</p>
                    <p>
                      Unleashes an explosive repulsive shockwave that disintegrates physical matter and sends opponents flying through reinforced skyscrapers.
                    </p>
                  </div>
                </div>
              )}

              {activeTech === 'purple' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold font-heading text-[#BA55D3]">
                    Hollow Technique: Purple (茈)
                  </h3>
                  <p className="text-sm text-[#B9C8DD] leading-relaxed">
                    An esoteric secret passed down exclusively through the Gojo Clan. By colliding the attractive convergence of Blue with the repulsive divergence of Red, an imaginary mass is brought forth.
                  </p>
                  <div className="p-4 rounded-xl bg-[#05070B]/60 border border-[#BA55D3]/20 space-y-2 text-xs font-mono text-[#B9C8DD]">
                    <p className="text-[#BA55D3] font-semibold">MECHANISM: Absolute Erasure</p>
                    <p>
                      The imaginary mass erases everything in its path down to the subatomic layer, carving chasms through entire cities.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-[#101827] flex items-center justify-between text-xs text-[#B9C8DD]/50 font-mono">
              <span>GOJO CLAN CODEX · VOLUME IV</span>
              <span>SPECIAL GRADE RESTRICTION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
