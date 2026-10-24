# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Jujutsu Kaisen fans, anime/manga enthusiasts, and lore theorycrafters looking for deep, technically accurate explanations, tactical analyses, and interactive simulations of Satoru Gojo's abilities, philosophy, and battle history.

## Product Purpose
Deliver an authoritative, interactive web tribute and theorycrafting laboratory for Satoru Gojo. The product exists to make complex Jujutsu concepts (Limitless, Six Eyes, Infinity, Blue, Red, Hollow Purple, and Unlimited Void) intuitively comprehensible through interactive mathematical and spatial simulations paired with cinematic lore archives.

## Positioning
Unlike static wikis or passive tribute pages, this experience couples high-precision canonical lore analysis with live interactive laboratories that simulate the actual spatial, mathematical, and cursed-energy mechanisms of the Limitless and Six Eyes.

## Operating Context
Accessed on desktop and mobile web browsers. Users engage with interactive simulations (scrubbing distance in the Limitless Lab, triggering Domain Expansion, toggling technique states, inspecting battle breakdowns) alongside reading in-depth canonical lore.

## Capabilities and Constraints
- Interactive Limitless Laboratory (spatial simulation of neutral Infinity, Lapse Blue, Reversal Red, and Hollow Purple).
- Domain Expansion Modal (cinematic Unlimited Void immersion with escape hatch / keyboard controls).
- Six Eyes atomic perception visualizer.
- Battle Chronicles detailing canonical fights (Toji Fushiguro, Shibuya Disaster Curses, Shinjuku Sukuna Showdown).
- Historical Genesis and memorial tribute sections.
- Technical constraint: High-performance client-side rendering with smooth 60fps animations, zero required backend dependencies for core experience, fully responsive layout across viewports.

## Brand Commitments
- Voice: Cinematic, reverent, intellectually sharp, and faithful to canonical Jujutsu Kaisen source material.
- Japanese terminology preserved alongside English (六眼 Rikugan, 無下限 Mukagen, 蒼 Ao, 赫 Aka, 茈 Murasaki, 無量空処 Muryōkūsho).
- Aesthetic discipline: Deep void obsidian tones (`#05070B`), electric cursed-energy cyan (`#53E8FF`), reverse cursed technique crimson (`#FF3366`), and Hollow Purple (`#A855F7`).

## Evidence on Hand
- Canonical manga/anime technique mechanics and battle timelines.
- Existing custom-built interactive components: `HeroSection.tsx`, `GenesisSection.tsx`, `SixEyesSection.tsx`, `LimitlessLab.tsx`, `BattleChronicles.tsx`, `TributeSection.tsx`, and `DomainExpansionModal.tsx`.

## Product Principles
1. Canonical Precision: Every simulation and explanation strictly honors canonical technique mechanics rather than fabricated tropes.
2. Interactive Comprehension: Demonstrate mechanics through interactive cause-and-effect instead of relying solely on text exposition.
3. Cinematic Immersion: Every interaction evokes the overwhelming scale and tension of the "Honored One" and top-tier Jujutsu combat.
4. Frictionless Performance: Rich visual effects and particle animations must maintain fluid 60fps responsiveness and never block user interaction.

## Accessibility & Inclusion
- Respect `prefers-reduced-motion` for intense animations and domain expansion sequences.
- Keyboard navigation (Escape key dismisses modals and interactive overlays).
- High-contrast text legibility across all dark void backgrounds.
