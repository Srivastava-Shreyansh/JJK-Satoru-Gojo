import React, { useState } from 'react';

export type ModalType = 'pitch' | 'careers' | 'hello' | 'operate' | 'labs' | 'studio' | 'openings' | 'shop' | 'contact' | null;

interface ModalDrawerProps {
  type: ModalType;
  onClose: () => void;
}

export const ModalDrawer: React.FC<ModalDrawerProps> = ({ type, onClose }) => {
  const [pitchForm, setPitchForm] = useState({ name: '', email: '', company: '', scope: 'brand-system', brief: '' });
  const [pitchSubmitted, setPitchSubmitted] = useState(false);

  const [helloForm, setHelloForm] = useState({ name: '', email: '', message: '' });
  const [helloSubmitted, setHelloSubmitted] = useState(false);

  const [jobApplied, setJobApplied] = useState<string | null>(null);

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-all duration-300 animate-fadeIn">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white text-black rounded-2xl p-6 sm:p-10 shadow-2xl border border-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Close Button */}
        <div className="flex items-center justify-between pb-5 mb-6 border-b border-black/10">
          <div className="flex items-center gap-2">
            <span className="text-[20px] font-medium tracking-tight">
              {type === 'pitch' || type === 'contact' ? 'Pitch an Idea & Collaboration' :
               type === 'careers' || type === 'openings' ? 'Careers at Mainframe' :
               type === 'hello' ? 'Send a Brief Hello' :
               type === 'operate' ? 'How We Operate' :
               type === 'labs' ? 'Mainframe Labs' :
               type === 'studio' ? 'Studio Archive' :
               type === 'shop' ? 'Mainframe Editions & Shop' : ''}
            </span>
            <span className="text-sm text-black/40">✳︎</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white transition-colors cursor-pointer text-xs uppercase"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Modal Contents based on type */}
        {/* 1. Pitch / Contact */}
        {(type === 'pitch' || type === 'contact') && (
          <div>
            {pitchSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-black text-white flex items-center justify-center text-lg">
                  ✓
                </div>
                <h3 className="text-2xl font-medium tracking-tight">Transmission Received</h3>
                <p className="text-black/70 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you, {pitchForm.name || 'friend'}. Your project brief has been routed directly to our creative partners. We review every brief within 24 hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full bg-black text-white text-sm hover:opacity-80 transition-opacity"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPitchSubmitted(true);
                }}
                className="space-y-4 text-left"
              >
                <p className="text-black/70 text-sm leading-relaxed mb-4">
                  We partner with audacious brands, founders, and cultural institutions on identity, interactive software, and spatial interfaces.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={pitchForm.name}
                      onChange={(e) => setPitchForm({ ...pitchForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-black/20 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                      Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@organization.com"
                      value={pitchForm.email}
                      onChange={(e) => setPitchForm({ ...pitchForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-black/20 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                      Organization / Brand
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Studios"
                      value={pitchForm.company}
                      onChange={(e) => setPitchForm({ ...pitchForm, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-black/20 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                      Scope of Engagement
                    </label>
                    <select
                      value={pitchForm.scope}
                      onChange={(e) => setPitchForm({ ...pitchForm, scope: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-black/20 text-sm focus:outline-none focus:border-black transition-colors bg-white"
                    >
                      <option value="brand-system">Brand Identity & Design System</option>
                      <option value="interactive-web">Interactive & Spatial Web Experience</option>
                      <option value="product-engineering">Full-Stack Product & R&D</option>
                      <option value="creative-tech">Creative Technology & AI Prototype</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                    Project Vision / Brief *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you are looking to build, desired timeline, or what problems need solving..."
                    value={pitchForm.brief}
                    onChange={(e) => setPitchForm({ ...pitchForm, brief: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-black/20 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-black/50">Direct dispatch to partners</span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-black/80 transition-colors cursor-pointer"
                  >
                    Submit Pitch →
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 2. Come Work Here / Openings */}
        {(type === 'careers' || type === 'openings') && (
          <div className="space-y-6 text-left">
            <p className="text-black/70 text-sm leading-relaxed">
              Mainframe operates as an egalitarian studio of designers, creative engineers, and researchers. We don&apos;t hire based on credentials, but on taste, technical mastery, and creative rigor.
            </p>

            <div className="divide-y divide-black/10">
              {[
                {
                  title: 'Lead Creative Technologist',
                  loc: 'London or Remote',
                  type: 'Full-time',
                  desc: 'Crafting experimental WebGL, custom shaders, and real-time interaction systems for global brand experiences.',
                },
                {
                  title: 'Principal Motion Designer',
                  loc: 'New York or Zurich',
                  type: 'Full-time',
                  desc: 'Directing kinetic identities, micro-interactions, and cinematic product teasers.',
                },
                {
                  title: 'Brand Systems Architect',
                  loc: 'Berlin or Tokyo',
                  type: 'Full-time',
                  desc: 'Engineering scalable typographic frameworks, generative tokens, and editorial guidelines.',
                },
                {
                  title: 'Systems & Realtime Audio Engineer',
                  loc: 'Hybrid / London',
                  type: 'Contract / Project',
                  desc: 'Building responsive sonic branding, generative synth environments, and web haptics.',
                },
              ].map((job) => (
                <div key={job.title} className="py-4 first:pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <h4 className="font-medium text-base text-black">{job.title}</h4>
                    <span className="text-xs text-black/60 font-mono">{job.loc} · {job.type}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/70 mb-3">{job.desc}</p>
                  {jobApplied === job.title ? (
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                      ✓ Application sent to people@mainframe.co
                    </span>
                  ) : (
                    <button
                      onClick={() => setJobApplied(job.title)}
                      className="text-xs font-medium text-black underline underline-offset-2 hover:opacity-60 transition-opacity"
                    >
                      Express Interest →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Send a brief hello */}
        {type === 'hello' && (
          <div>
            {helloSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-black text-white flex items-center justify-center text-lg">
                  ✓
                </div>
                <h3 className="text-2xl font-medium tracking-tight">Hello returned!</h3>
                <p className="text-black/70 text-sm max-w-sm mx-auto">
                  We appreciate the note. Our inbox is constantly monitored by humans, not bots. Talk soon.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-full bg-black text-white text-sm hover:opacity-80 transition-opacity"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setHelloSubmitted(true);
                }}
                className="space-y-4 text-left"
              >
                <p className="text-black/70 text-sm">
                  Saying hello takes thirty seconds. Whether you want to discuss typography, a curious collaboration, or grab coffee in London, write to us.
                </p>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Alex"
                    value={helloForm.name}
                    onChange={(e) => setHelloForm({ ...helloForm, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-black/20 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                    Your Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="alex@example.com"
                    value={helloForm.email}
                    onChange={(e) => setHelloForm({ ...helloForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-black/20 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-black/60 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Just wanted to say hi..."
                    value={helloForm.message}
                    onChange={(e) => setHelloForm({ ...helloForm, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-lg border border-black/20 text-sm focus:outline-none focus:border-black resize-none"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-black/85 transition-colors cursor-pointer"
                  >
                    Send Note
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* 4. See How We Operate */}
        {type === 'operate' && (
          <div className="space-y-6 text-left">
            <p className="text-black/70 text-sm leading-relaxed">
              Traditional creative agencies suffer from excessive organizational friction. Mainframe replaces bloated pyramids with a direct maker-to-client dynamic.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-black/10 bg-black/[0.02]">
                <span className="text-xs font-mono text-black/50 block mb-1">01 / DIRECT ACCESS</span>
                <h4 className="font-medium text-base mb-1">Zero Intermediaries</h4>
                <p className="text-xs text-black/70 leading-relaxed">
                  Clients speak directly with the engineers, art directors, and typographers who build their actual products. No telephone game.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-black/10 bg-black/[0.02]">
                <span className="text-xs font-mono text-black/50 block mb-1">02 / CONTINUOUS PROTOTYPING</span>
                <h4 className="font-medium text-base mb-1">Working Code in Week 1</h4>
                <p className="text-xs text-black/70 leading-relaxed">
                  Static slide decks rarely survive contact with reality. We test live code in browser environments within days of project initiation.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-black/10 bg-black/[0.02]">
                <span className="text-xs font-mono text-black/50 block mb-1">03 / PHYSICAL & DIGITAL</span>
                <h4 className="font-medium text-base mb-1">Unified Craft</h4>
                <p className="text-xs text-black/70 leading-relaxed">
                  Screen pixels, machined metal, print collateral, and spatial sound environments are authored under a coherent sensory thesis.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-black/10 bg-black/[0.02]">
                <span className="text-xs font-mono text-black/50 block mb-1">04 / RADICAL RESTRAINT</span>
                <h4 className="font-medium text-base mb-1">High Signal-to-Noise</h4>
                <p className="text-xs text-black/70 leading-relaxed">
                  We reject decorative fluff. Every element, type weight, and transition must earn its existence through utility or deep emotional resonance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 5. Labs */}
        {type === 'labs' && (
          <div className="space-y-4 text-left">
            <p className="text-black/70 text-sm">
              Mainframe Labs dedicates 20% of our annual bandwidth to exploratory R&D, speculative hardware, and open-source creative code.
            </p>
            <div className="divide-y divide-black/10">
              <div className="py-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-base">A.R.I.A Interface Engine</h4>
                  <span className="text-xs font-mono text-black/50">Active R&D</span>
                </div>
                <p className="text-xs text-black/70 mt-1">
                  Adaptive Response Interface Agent combining predictive viewport spatialization with scrubbable neural timelines.
                </p>
              </div>

              <div className="py-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-base">Kinetica Type Shaper</h4>
                  <span className="text-xs font-mono text-black/50">Experimental</span>
                </div>
                <p className="text-xs text-black/70 mt-1">
                  Variable font rasterizer responding to cursor velocity, microphone input, and ambient illumination.
                </p>
              </div>

              <div className="py-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-base">Sub-Millisecond Canvas</h4>
                  <span className="text-xs font-mono text-black/50">Open Source</span>
                </div>
                <p className="text-xs text-black/70 mt-1">
                  High-performance WebGPU raster engine tailored for hyper-dense design token graphs and interactive layouts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 6. Studio Archive */}
        {type === 'studio' && (
          <div className="space-y-4 text-left">
            <p className="text-black/70 text-sm">
              A curated selection of commissions across industrial design, digital architecture, and kinetic brand systems.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { title: 'Kvantum Mobility', year: '2026', scope: 'Vehicle HMI & Spatial UI' },
                { title: 'Aethelgard Audio', year: '2025', scope: 'Acoustic Industrial Design' },
                { title: 'Vanguard Biometrics', year: '2025', scope: 'Enterprise Design System' },
                { title: 'Maison de L&apos;Ombre', year: '2024', scope: 'Interactive Haute Couture Flagship' },
              ].map((proj) => (
                <div key={proj.title} className="p-3.5 rounded-xl border border-black/10 hover:border-black transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-sm text-black">{proj.title}</h5>
                    <span className="text-xs font-mono text-black/40">{proj.year}</span>
                  </div>
                  <p className="text-xs text-black/60">{proj.scope}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Shop */}
        {type === 'shop' && (
          <div className="space-y-4 text-left">
            <p className="text-black/70 text-sm">
              Limited run physical artifacts, publications, and tools produced in-house.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl border border-black/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium text-sm">Mainframe Manual: Vol. 1</h5>
                    <span className="text-xs font-mono text-black/70">£45</span>
                  </div>
                  <p className="text-xs text-black/60">320-page hardcover on typography, systems design, and creative code.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setJobApplied('manual')}
                  className="mt-3 text-xs font-medium underline underline-offset-2 hover:opacity-60 text-left cursor-pointer"
                >
                  {jobApplied === 'manual' ? '✓ Waitlist confirmed' : 'Reserve Copy →'}
                </button>
              </div>

              <div className="p-3.5 rounded-xl border border-black/10 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="font-medium text-sm">Asterisk Anodized Paperweight ✳︎</h5>
                    <span className="text-xs font-mono text-black/70">£60</span>
                  </div>
                  <p className="text-xs text-black/60">Solid machined 6061 billet aluminum with laser-etched alignment markings.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setJobApplied('paperweight')}
                  className="mt-3 text-xs font-medium underline underline-offset-2 hover:opacity-60 text-left cursor-pointer"
                >
                  {jobApplied === 'paperweight' ? '✓ Waitlist confirmed' : 'Reserve Copy →'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
