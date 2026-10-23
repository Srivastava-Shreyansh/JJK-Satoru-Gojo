import React, { useState } from 'react';

export const GenesisSection: React.FC = () => {
  const [balanceFactor, setBalanceFactor] = useState(50);

  return (
    <section id="genesis" className="py-24 px-5 sm:px-8 md:px-12 bg-[#05070B] border-t border-[#101827]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-[#53E8FF] uppercase tracking-widest">
                THE HISTORICAL GENESIS · 誕生
              </span>
              <span className="text-[#53E8FF]">/</span>
              <span className="text-xs font-mono text-[#B9C8DD]/60">DECEMBER 7, 1989</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F4F8FF] font-heading">
              The Balance Shift. <span className="text-[#53E8FF]">世界を変えた男</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#B9C8DD] leading-relaxed">
            When Satoru Gojo entered this world, cursed energy across Japan surged. To compensate for his sheer existence, the natural order forced modern curses to mutate into terrifying disaster incarnations.
          </p>
        </div>

        {/* Interactive World Equilibrium Gauge */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#080E1A] border border-[#101827] mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono text-[#53E8FF] uppercase block mb-1">
                EQUILIBRIUM SIMULATOR
              </span>
              <h3 className="text-lg font-bold text-[#F4F8FF] font-heading">
                World Cursed Energy Distribution
              </h3>
            </div>
            <div className="text-xs font-mono text-[#B9C8DD]/70">
              Gojo Presence: <span className="text-[#53E8FF] font-bold">{balanceFactor}%</span>
            </div>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="10"
            max="100"
            value={balanceFactor}
            onChange={(e) => setBalanceFactor(Number(e.target.value))}
            className="w-full accent-[#53E8FF] mb-6 cursor-pointer"
          />

          {/* Dynamic Visual Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#101827] border border-[#101827]">
              <span className="text-[10px] font-mono text-[#B9C8DD]/60 block uppercase">
                Sorcerer Apex
              </span>
              <h4 className="text-base font-bold text-[#53E8FF] mt-1 font-heading">
                Satoru Gojo
              </h4>
              <p className="text-xs text-[#B9C8DD]/70 mt-2 leading-relaxed">
                Represents 99.9% of the deterrent against supernatural apocalypse in modern Japan.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#101827] border border-[#101827]">
              <span className="text-[10px] font-mono text-[#B9C8DD]/60 block uppercase">
                Curse Mutation Response
              </span>
              <h4 className="text-base font-bold text-[#FF3B30] mt-1 font-heading">
                {balanceFactor > 70 ? 'Disaster Curses Emerged' : 'Semi-Grade Spirits'}
              </h4>
              <p className="text-xs text-[#B9C8DD]/70 mt-2 leading-relaxed">
                {balanceFactor > 70
                  ? 'Jogo, Hanami, Dagon, and Mahito materialized with sentience to counterbalance Gojo.'
                  : 'Lower-tier curses suffice under standard equilibrium.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#101827] border border-[#101827]">
              <span className="text-[10px] font-mono text-[#B9C8DD]/60 block uppercase">
                Bounty Placed on Infant Gojo
              </span>
              <h4 className="text-base font-bold text-amber-400 mt-1 font-heading">
                ¥100,000,000+
              </h4>
              <p className="text-xs text-[#B9C8DD]/70 mt-2 leading-relaxed">
                Assassins swarmed the Gojo estate; child Satoru froze professional hitmen with a single glance.
              </p>
            </div>
          </div>
        </div>

        {/* Archival Chronology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'birth-1989',
              year: '1989',
              title: 'The Blessed Birth',
              kanji: '誕生',
              desc: 'Born into the Gojo Clan as the direct descendant of Sugawara no Michizane. First sorcerer in four centuries to inherit both Limitless and the Six Eyes.',
            },
            {
              id: 'awakening-2006',
              year: '2006',
              title: 'Awakening & RCT',
              kanji: '覚醒',
              desc: 'Encountered Toji Fushiguro. Brought to the brink of death, unlocking Reverse Cursed Technique, Red, Purple, and the absolute Honored One realization.',
            },
            {
              id: 'shibuya-2018',
              year: '2018',
              title: 'Shibuya B5F Gambit',
              kanji: '渋谷事変',
              desc: 'Faced disaster curses in a crowded subway terminal. Executed the 0.2-second Unlimited Void, eliminating 1,000 transfigured curses before being sealed in Prison Realm.',
            },
            {
              id: 'shinjuku-2018',
              year: '2018',
              title: 'Battle of Shinjuku',
              kanji: '新宿決戦',
              desc: 'Unsealed from 8,000m beneath the sea. Engaged Ryomen Sukuna in the highest tier sorcery battle in history, cementing his immortal legacy.',
            },
          ].map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl bg-[#080E1A] border border-[#101827] hover:border-[#53E8FF]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#53E8FF] px-2 py-0.5 rounded bg-[#101827]">
                    {item.year}
                  </span>
                  <span className="text-xs text-[#B9C8DD]/40 font-kanji">{item.kanji}</span>
                </div>
                <h4 className="font-heading font-semibold text-base text-[#F4F8FF] mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-[#B9C8DD] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
