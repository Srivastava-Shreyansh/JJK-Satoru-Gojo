import React, { useState } from 'react';

export const SixEyesSection: React.FC = () => {
  const [sixEyesMode, setSixEyesMode] = useState(true);

  return (
    <section id="six-eyes" className="py-24 px-5 sm:px-8 md:px-12 bg-[#05070B] border-t border-[#101827]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-[#53E8FF] uppercase tracking-widest">
                OCULAR PHENOMENON · 六眼
              </span>
              <span className="text-[#53E8FF]">/</span>
              <span className="text-xs font-mono text-[#B9C8DD]/60">ONE IN 400 YEARS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F4F8FF] font-heading">
              The Six Eyes. <span className="text-[#53E8FF]">Rikugan</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#B9C8DD] leading-relaxed">
            The hereditary ocular trait of the Gojo family. It provides incomprehensible processing power and unlocks the true, full potential of the Limitless.
          </p>
        </div>

        {/* Interactive Mode Toggle Bar */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#080E1A] border border-[#101827] mb-8">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#B9C8DD]/70 uppercase">Perception Matrix:</span>
            <div className="inline-flex rounded-lg p-1 bg-[#101827] border border-[#53E8FF]/20">
              <button
                type="button"
                onClick={() => setSixEyesMode(false)}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                  !sixEyesMode
                    ? 'bg-[#53E8FF] text-[#05070B] font-bold'
                    : 'text-[#B9C8DD] hover:text-white'
                }`}
              >
                Standard Vision
              </button>
              <button
                type="button"
                onClick={() => setSixEyesMode(true)}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                  sixEyesMode
                    ? 'bg-[#53E8FF] text-[#05070B] font-bold shadow-[0_0_15px_#53E8FF]'
                    : 'text-[#B9C8DD] hover:text-white'
                }`}
              >
                Six Eyes Quantum Mode
              </button>
            </div>
          </div>

          <span className="text-xs font-mono text-[#53E8FF] hidden sm:inline-block">
            {sixEyesMode ? 'ATOMIC RESOLUTION: 10⁻¹² m' : 'MACROSCOPIC ONLY'}
          </span>
        </div>

        {/* Visualizer Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Visual Simulation Frame */}
          <div
            className={`lg:col-span-6 rounded-2xl border p-6 flex flex-col justify-between relative overflow-hidden min-h-[380px] transition-all duration-500 ${
              sixEyesMode
                ? 'bg-gradient-to-br from-[#080E1A] via-[#101827] to-[#05070B] border-[#53E8FF]/40 shadow-[0_0_30px_rgba(83,232,255,0.12)]'
                : 'bg-[#080E1A] border-[#101827]'
            }`}
          >
            {/* Six Eyes Overlay HUD */}
            {sixEyesMode ? (
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start text-[11px] font-mono text-[#53E8FF]">
                  <div>
                    <span className="block">CURSED RESIDUALS: DETECTED</span>
                    <span className="text-[#B9C8DD]/60">ENERGY VARIANCE: 0.000001%</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-emerald-400">EFFICIENCY: ASYMPTOTIC (ZERO LOSS)</span>
                    <span className="text-[#B9C8DD]/60">SPECTRUM: ULTRAVIOLET / CURSED</span>
                  </div>
                </div>

                {/* Central Six Eyes Iris Graphics */}
                <div className="my-auto py-10 flex flex-col items-center justify-center">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    {/* Glowing outer rings */}
                    <div className="absolute inset-0 rounded-full border border-[#53E8FF] animate-ping opacity-25" />
                    <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#00AFFF] animate-spin" style={{ animationDuration: '20s' }} />
                    <div className="absolute inset-6 rounded-full border border-[#53E8FF]/60" />
                    
                    {/* Deep Blue Piercing Iris */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#00AFFF] via-[#53E8FF] to-[#F4F8FF] shadow-[0_0_35px_#00AFFF] flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-[#05070B] border border-[#53E8FF]" />
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#53E8FF] mt-4 tracking-widest uppercase">
                    六眼 · THE EYE THAT SEES THE INFINITE
                  </span>
                </div>

                <div className="text-[11px] font-mono text-[#B9C8DD]/60 flex justify-between">
                  <span>TARGET: QUANTUM LATTICE</span>
                  <span>OCULAR WEAR: BLINDFOLD REQUIRED</span>
                </div>
              </div>
            ) : (
              <div className="relative z-10 h-full flex flex-col justify-between items-center text-center py-16">
                <div className="text-sm font-mono text-[#B9C8DD]/40">STANDARD VISUAL SPECTRUM</div>
                <div className="max-w-xs space-y-2">
                  <p className="text-base text-[#F4F8FF] font-medium">Standard Human Senses</p>
                  <p className="text-xs text-[#B9C8DD]/60 leading-relaxed">
                    Without the Six Eyes, cursed energy is invisible to non-sorcerers and appears merely as crude vapor to ordinary sorcerers.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#53E8FF]">TOGGLE MODE ABOVE TO ACTIVATE RIKUGAN</div>
              </div>
            )}
          </div>

          {/* Core Six Eyes Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="p-5 rounded-xl bg-[#080E1A] border border-[#101827]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#53E8FF]" />
                <h4 className="font-heading font-semibold text-base text-[#F4F8FF]">
                  Infinitesimal Energy Consumption
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#B9C8DD] leading-relaxed">
                The Six Eyes reduce the cursed energy lost when activating techniques to an infinitesimally small amount approaching zero. In practical combat, Gojo will never run out of cursed energy, even in prolonged warfare.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#080E1A] border border-[#101827]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00AFFF]" />
                <h4 className="font-heading font-semibold text-base text-[#F4F8FF]">
                  Atomic-Scale Perception
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#B9C8DD] leading-relaxed">
                Enables microscopic tracking of cursed energy down to individual atoms. Gojo can deduce an opponent&apos;s innate technique, cursed flow vectors, and psychological intent simply by looking at them for a fraction of a second.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#080E1A] border border-[#101827]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BA55D3]" />
                <h4 className="font-heading font-semibold text-base text-[#F4F8FF]">
                  The Blindfold Necessity
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#B9C8DD] leading-relaxed">
                Even with his eyes covered by opaque cloth or dark sunglasses, the Six Eyes see with high-definition thermographic precision. He covers his eyes not because he cannot see, but to spare his brain from constant, unbearable sensory overload.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
