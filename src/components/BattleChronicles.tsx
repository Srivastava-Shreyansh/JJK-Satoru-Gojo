import React, { useState } from 'react';

interface Battle {
  id: string;
  opponent: string;
  kanji: string;
  arc: string;
  location: string;
  outcome: string;
  keyMoments: string[];
  quote: string;
  analysis: string;
}

const BATTLES: Battle[] = [
  {
    id: 'sukuna',
    opponent: 'Ryomen Sukuna',
    kanji: '両面宿儺',
    arc: 'The Shinjuku Showdown (2018)',
    location: 'Ruins of Shinjuku, Tokyo',
    outcome: 'Pushed the King of Curses beyond all conventional limits',
    keyMoments: [
      '200% Hollow Purple opened the battle across 4 kilometers',
      'Continuous Domain Clashes (Unlimited Void vs Malevolent Shrine)',
      'Self-inflicted brain damage & RCT circuit resets',
      'Improvised Unrestricted Hollow Purple across the district',
    ],
    quote: '"Are you the strongest because you are Satoru Gojo? Or are you Satoru Gojo because you are the strongest?"',
    analysis:
      'The single most sophisticated sorcery duel in human history. Gojo weaponized Black Flashes at will, expanded his domain with basketball-sized parameters, and forced Sukuna to rely on Mahoraga for adaptation.',
  },
  {
    id: 'toji',
    opponent: 'Toji Fushiguro',
    kanji: '伏黒甚爾',
    arc: 'Hidden Inventory (2006)',
    location: 'Tomb of the Star Corridor, Tokyo',
    outcome: 'Decisive Victory · Satoru Gojo Awakens',
    keyMoments: [
      'Toji pierced Gojo with the Inverted Spear of Heaven',
      'On the threshold of death, Gojo grasped the core of Reverse Cursed Technique',
      'First deployment of Cursed Technique Reversal: Red',
      'First deployment of Hollow Technique: Purple',
    ],
    quote: '"Throughout heaven and earth, I alone am the honored one."',
    analysis:
      'The catalyst of the modern era. By failing to finish Gojo, Toji inadvertently forced Satoru to unlock RCT, automated Infinity filtering, and Hollow Purple, transforming him from an arrogant prodigy into an untouchable god.',
  },
  {
    id: 'shibuya',
    opponent: 'Disaster Curses (Jogo, Hanami, Choso)',
    kanji: '特級呪霊集団',
    arc: 'The Shibuya Incident (2018)',
    location: 'Fukutoshin Line B5F Platform, Shibuya Station',
    outcome: 'Tactical Stalemate · Hanami Exorcised · Gojo Sealed in Prison Realm',
    keyMoments: [
      'Kenjaku trapped Gojo in an enclosed platform packed with thousands of civilians',
      'Curse users exploited non-sorcerers to prevent Gojo from using Infinity or massive output',
      'Gojo executed an unprecedented 0.2-second Domain Expansion',
      'Exorcised 1,000 transfigured humans in precisely 299 seconds by bare hands',
    ],
    quote: '"I\'m surprised you thought you could beat me with an excuse like that."',
    analysis:
      'Demonstrated Gojo\'s tactical restraint and moral discipline. Rather than sacrificing civilians, he gambled on microsecond domain manipulation, incapacitating every curse before Kenjaku deployed Prison Realm.',
  },
  {
    id: 'jogo',
    opponent: 'Jogo (Volcano Disaster Curse)',
    kanji: '漏瑚',
    arc: 'Cursed Training Arc (2018)',
    location: 'Suburban Tokyo Riverbank',
    outcome: 'Absolute Domination · Head Decapitated & Interrogated',
    keyMoments: [
      'Jogo ambushed Gojo with maximum flame blasts, absorbed effortlessly by Infinity',
      'Gojo held Jogo\'s hand to demonstrate the mathematical convergence of distance',
      'First demonstration of Domain Expansion: Unlimited Void',
      'Brought Yuji Itadori along as a spectator for educational purposes',
    ],
    quote: '"You\'re weak."',
    analysis:
      'A humiliating demonstration of the gulf between Special Grade curses and Satoru Gojo. Jogo believed his domain Coffin of the Iron Mountain could bypass Infinity, only to be paralyzed in fractions of a second.',
  },
];

export const BattleChronicles: React.FC = () => {
  const [activeBattleId, setActiveBattleId] = useState<string>('sukuna');
  const activeBattle = BATTLES.find((b) => b.id === activeBattleId) || BATTLES[0];

  return (
    <section id="chronicles" className="py-24 px-5 sm:px-8 md:px-12 bg-[#05070B] border-t border-[#101827]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-[#53E8FF] uppercase tracking-widest">
                COMBAT DOSSIER · 特級激闘録
              </span>
              <span className="text-[#53E8FF]">/</span>
              <span className="text-xs font-mono text-[#B9C8DD]/60">APEX ENGAGEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F4F8FF] font-heading">
              Battle Chronicles. <span className="text-[#53E8FF]">最強の軌跡</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#B9C8DD] leading-relaxed">
            Historical records of Satoru Gojo&apos;s confrontations against the deadliest sorcerers, assassins, and cursed spirits in Jujutsu history.
          </p>
        </div>

        {/* Battle Selector Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {BATTLES.map((battle) => (
            <button
              key={battle.id}
              onClick={() => setActiveBattleId(battle.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                activeBattleId === battle.id
                  ? 'bg-[#101827] border-[#53E8FF] shadow-[0_0_20px_rgba(83,232,255,0.15)]'
                  : 'bg-[#080E1A] border-[#101827] hover:border-[#53E8FF]/30 text-[#B9C8DD]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#53E8FF] uppercase">
                  {battle.id === 'sukuna' ? 'APEX DUEL' : 'CLASSIFIED'}
                </span>
                <span className="text-xs font-kanji text-[#B9C8DD]/40">{battle.kanji}</span>
              </div>
              <h4 className="font-heading font-bold text-sm sm:text-base text-[#F4F8FF]">
                vs {battle.opponent}
              </h4>
            </button>
          ))}
        </div>

        {/* Selected Battle Dossier View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch p-6 sm:p-8 rounded-2xl bg-[#080E1A] border border-[#101827]">
          {/* Left Column: Context & Key Moments */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded bg-[#101827] border border-[#53E8FF]/30 text-xs font-mono text-[#53E8FF]">
                  {activeBattle.arc}
                </span>
                <span className="text-xs font-mono text-[#B9C8DD]/60">
                  {activeBattle.location}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F4F8FF] font-heading mb-2">
                Satoru Gojo vs. {activeBattle.opponent}
              </h3>

              <p className="text-sm text-emerald-400 font-mono mb-4">
                OUTCOME: {activeBattle.outcome}
              </p>

              <p className="text-xs sm:text-sm text-[#B9C8DD] leading-relaxed mb-6">
                {activeBattle.analysis}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono text-[#53E8FF] uppercase tracking-wider block">
                  TACTICAL LOG & KEY OCCURRENCES
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-[#B9C8DD]">
                  {activeBattle.keyMoments.map((moment, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#53E8FF] font-mono">0{idx + 1}.</span>
                      <span>{moment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#101827] flex items-center justify-between text-xs text-[#B9C8DD]/50 font-mono">
              <span>AUTHENTICATED BY JUJUTSU HIGH ARCHIVES</span>
              <span>SPECIAL GRADE FILE</span>
            </div>
          </div>

          {/* Right Column: Iconic Quote Card */}
          <div className="lg:col-span-5 bg-[#101827] rounded-xl p-6 flex flex-col justify-between border border-[#53E8FF]/20 relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-mono text-[#53E8FF] uppercase tracking-widest block">
                IMMORTAL DECLARATION
              </span>
              <blockquote className="text-xl sm:text-2xl font-heading font-bold text-[#F4F8FF] leading-snug">
                {activeBattle.quote}
              </blockquote>
            </div>

            <div className="relative z-10 pt-6 border-t border-[#101827] flex items-center justify-between text-xs font-mono text-[#B9C8DD]">
              <span>— SATORU GOJO</span>
              <span className="text-[#53E8FF]">天上天下唯我独尊</span>
            </div>

            {/* Subtle decorative background Kanji */}
            <div className="absolute right-2 bottom-0 text-[100px] font-kanji font-black text-[#53E8FF]/5 pointer-events-none select-none">
              最強
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
