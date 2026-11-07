/**
 * SoundEngine - Web Audio API Synthesizer & Interactive Soundboard
 * Melodi Lo-Fi Akustik Romantis & Efek Suara Interaktif Khusus Pasangan
 */

class CoupleSoundEngine {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.isPlaying = false;
        this.melodyTimer = null;
        this.noteIndex = 0;
        this.customAudio = null;

        // Melodi romantis hangat Happy Birthday akustik
        this.melody = [
            { f: 261.63, d: 0.48 }, // Hap-
            { f: 261.63, d: 0.38 }, // py
            { f: 293.66, d: 0.85 }, // Birth-
            { f: 261.63, d: 0.85 }, // day
            { f: 349.23, d: 0.85 }, // to
            { f: 329.63, d: 1.45 }, // you...

            { f: 261.63, d: 0.48 }, // Hap-
            { f: 261.63, d: 0.38 }, // py
            { f: 293.66, d: 0.85 }, // Birth-
            { f: 261.63, d: 0.85 }, // day
            { f: 392.00, d: 0.85 }, // to
            { f: 349.23, d: 1.45 }, // you...

            { f: 261.63, d: 0.48 }, // Hap-
            { f: 261.63, d: 0.38 }, // py
            { f: 523.25, d: 0.85 }, // Birth-
            { f: 440.00, d: 0.85 }, // day
            { f: 349.23, d: 0.85 }, // dear
            { f: 329.63, d: 0.85 }, // ayang
            { f: 293.66, d: 1.25 }, // ...

            { f: 466.16, d: 0.48 }, // Hap-
            { f: 466.16, d: 0.38 }, // py
            { f: 440.00, d: 0.85 }, // Birth-
            { f: 349.23, d: 0.85 }, // day
            { f: 392.00, d: 0.85 }, // to
            { f: 349.23, d: 1.90 }  // you! 💖
        ];
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.setValueAtTime(0.24, this.ctx.currentTime);
            this.masterGain.connect(this.ctx.destination);
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playWarmTone(freq, duration) {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc1.type = 'triangle';
        osc2.type = 'sine';

        osc1.frequency.setValueAtTime(freq, now);
        osc2.frequency.setValueAtTime(freq * 1.002, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.frequency.exponentialRampToValueAtTime(500, now + duration);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.22, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + duration + 0.05);
        osc2.stop(now + duration + 0.05);
    }

    startMelody() {
        this.init();
        this.isPlaying = true;
        this.stepMelody();
    }

    stepMelody() {
        if (!this.isPlaying) return;

        const item = this.melody[this.noteIndex];
        this.playWarmTone(item.f, item.d * 0.95);

        this.noteIndex = (this.noteIndex + 1) % this.melody.length;
        const delay = item.d * 1000;

        this.melodyTimer = setTimeout(() => {
            this.stepMelody();
        }, delay);
    }

    stopMelody() {
        this.isPlaying = false;
        if (this.melodyTimer) {
            clearTimeout(this.melodyTimer);
            this.melodyTimer = null;
        }
    }

    toggleMusic(customUrl = null) {
        if (customUrl && customUrl.trim() !== '') {
            if (!this.customAudio) {
                this.customAudio = new Audio(customUrl);
                this.customAudio.loop = true;
            }
            if (this.customAudio.paused) {
                this.customAudio.play();
                this.isPlaying = true;
            } else {
                this.customAudio.pause();
                this.isPlaying = false;
            }
            return this.isPlaying;
        } else {
            if (this.isPlaying) {
                this.stopMelody();
                return false;
            } else {
                this.startMelody();
                return true;
            }
        }
    }

    playPageFlip() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.16);

        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.17);
    }

    /**
     * SFX Love Meter Tick (semakin tinggi meter, semakin tinggi nadanya)
     */
    playLoveMeterTick(frequency = 500) {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, now);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.09);
    }

    /**
     * SFX Love Meter Climax Overflow
     */
    playLoveMeterClimax() {
        this.init();
        [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((f, idx) => {
            setTimeout(() => this.playWarmTone(f, 0.6), idx * 60);
        });
    }

    /**
     * SFX Tiup Lilin
     */
    playCandleBlow() {
        this.init();
        const now = this.ctx.currentTime;

        const bufferSize = Math.floor(this.ctx.sampleRate * 0.45);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.linearRampToValueAtTime(250, now + 0.45);
        filter.Q.setValueAtTime(2.5, now);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        noise.start(now);

        setTimeout(() => {
            [523.25, 659.25, 783.99, 1046.50].forEach((f, idx) => {
                setTimeout(() => this.playWarmTone(f, 0.5), idx * 75);
            });
        }, 320);
    }

    /**
     * SFX Kupon Cinta Terklaim (Magic Stamp Pop)
     */
    playCouponStamp() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.12);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.13);

        setTimeout(() => {
            this.playWarmTone(1046.50, 0.4);
        }, 100);
    }

    /**
     * SFX Bunga Mekar
     */
    playFlowerBloom() {
        this.init();
        const notes = [659.25, 783.99, 987.77, 1318.51, 1567.98];
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playWarmTone(freq, 0.6), idx * 75);
        });
    }

    /**
     * SFX Hujan Hati (Harp Glissando)
     */
    playHeartRain() {
        this.init();
        const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
        notes.forEach((f, i) => {
            setTimeout(() => this.playWarmTone(f, 0.4), i * 50);
        });
    }

    /**
     * SFX Buka Kado
     */
    playGiftUnbox() {
        this.init();
        const chord = [523.25, 659.25, 783.99, 1046.50];
        chord.forEach((freq, idx) => {
            setTimeout(() => this.playWarmTone(freq, 0.7), idx * 80);
        });
    }

    playQuizSuccess() {
        this.init();
        [523.25, 659.25, 1046.50].forEach((f, idx) => {
            setTimeout(() => this.playWarmTone(f, 0.35), idx * 80);
        });
    }

    playQuizError() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.linearRampToValueAtTime(180, now + 0.22);

        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.23);
    }
}

window.coupleSound = new CoupleSoundEngine();
