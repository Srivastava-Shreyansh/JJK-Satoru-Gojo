/**
 * Web Audio API synthesized sound generator for Satoru Gojo tribute.
 * Zero external audio dependencies; synthesized in real-time.
 */

class GojoSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private ambientGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private isPlayingAmbient: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
    } else if (!this.isMuted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.isMuted && this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  /**
   * Ambient celestial drone (Infinity hum)
   */
  public startAmbient() {
    if (this.isPlayingAmbient) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note (subtle low hum)

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(110.5, this.ctx.currentTime); // A2 slight detune for cosmic beat

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, this.ctx.currentTime);

      gain.gain.setValueAtTime(this.isMuted ? 0 : 0.05, this.ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();

      this.ambientOsc = osc1;
      this.ambientOsc2 = osc2;
      this.ambientGain = gain;
      this.isPlayingAmbient = true;
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Blue: Attractive vacuum sound (downward sweep + suction)
   */
  public playBlue() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.6);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.Q.setValueAtTime(5, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.7);
    } catch {
      // Ignored
    }
  }

  /**
   * Red: Repulsive divergence sound (explosive shockwave + ascending crack)
   */
  public playRed() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const sub = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);

      sub.type = 'sine';
      sub.frequency.setValueAtTime(90, now);
      sub.frequency.exponentialRampToValueAtTime(40, now + 0.5);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      sub.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      sub.start(now);
      osc.stop(now + 0.55);
      sub.stop(now + 0.55);
    } catch {
      // Ignored
    }
  }

  /**
   * Hollow Purple: Imaginary mass collision (Blue + Red collision + reality distortion)
   */
  public playHollowPurple() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const sub = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Blue descending
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(550, now);
      osc1.frequency.exponentialRampToValueAtTime(150, now + 0.5);

      // Red ascending
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(150, now);
      osc2.frequency.exponentialRampToValueAtTime(550, now + 0.5);

      // Deep imaginary mass sub-thud
      sub.type = 'sine';
      sub.frequency.setValueAtTime(45, now + 0.5);
      sub.frequency.exponentialRampToValueAtTime(25, now + 1.2);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.setValueAtTime(0.3, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      osc1.connect(gain);
      osc2.connect(gain);
      sub.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      sub.start(now + 0.5);

      osc1.stop(now + 0.6);
      osc2.stop(now + 0.6);
      sub.stop(now + 1.35);
    } catch {
      // Ignored
    }
  }

  /**
   * Domain Expansion: Unlimited Void
   */
  public playDomainExpansion() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // High glass chime harmonic
      const chime = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();

      chime.type = 'sine';
      chime.frequency.setValueAtTime(1760, now); // A6 crystal note
      chimeGain.gain.setValueAtTime(0.18, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      chime.connect(chimeGain);
      chimeGain.connect(this.ctx.destination);

      chime.start(now);
      chime.stop(now + 1.9);

      // Deep cosmic drone swell
      const swell = this.ctx.createOscillator();
      const swellGain = this.ctx.createGain();
      swell.type = 'triangle';
      swell.frequency.setValueAtTime(65, now);
      swell.frequency.linearRampToValueAtTime(130, now + 0.8);
      swellGain.gain.setValueAtTime(0.05, now);
      swellGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      swell.connect(swellGain);
      swellGain.connect(this.ctx.destination);

      swell.start(now);
      swell.stop(now + 1.6);
    } catch {
      // Ignored
    }
  }

  /**
   * Memorial Offering chime
   */
  public playOffering() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, now); // 528 Hz Love/transformation frequency
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.5);
    } catch {
      // Ignored
    }
  }
}

export const gojoAudio = new GojoSoundEngine();
