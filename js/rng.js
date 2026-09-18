'use strict';
// ── Maths Revise · Seeded random numbers ────────────────────────────────────
// Every exercise draws its questions from this generator. Given the same seed
// it produces the same questions, which is what lets a whole class be set an
// identical worksheet via ?set=3 while a student revising alone gets fresh
// numbers on every reload.
//
//   const r = new RNG(12345);
//   r.int(1, 9)        → integer in [1, 9]
//   r.pick([a, b, c])  → one element
//   r.shuffle(arr)     → new shuffled array
// ─────────────────────────────────────────────────────────────────────────────

class RNG {
  constructor(seed) {
    // mulberry32: tiny, fast, good enough spread for question generation.
    this._s = (seed >>> 0) || 1;
  }

  next() {
    this._s = (this._s + 0x6D2B79F5) >>> 0;
    let t = this._s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /** Integer in [lo, hi] inclusive. */
  int(lo, hi) { return lo + Math.floor(this.next() * (hi - lo + 1)); }

  /** Integer in [lo, hi] excluding any value in `skip`. */
  intExcept(lo, hi, skip) {
    const banned = new Set(skip);
    for (let i = 0; i < 200; i++) {
      const v = this.int(lo, hi);
      if (!banned.has(v)) return v;
    }
    return lo;
  }

  /** Non-zero integer in [lo, hi]. */
  nonZero(lo, hi) { return this.intExcept(lo, hi, [0]); }

  /** +1 or -1. */
  sign() { return this.next() < 0.5 ? -1 : 1; }

  /** true with probability p (default 0.5). */
  chance(p) { return this.next() < (p === undefined ? 0.5 : p); }

  pick(arr) { return arr[Math.floor(this.next() * arr.length)]; }

  /** n distinct elements from arr (n <= arr.length). */
  sample(arr, n) { return this.shuffle(arr).slice(0, n); }

  shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /** Split `total` into `n` positive integers, each at least `min`. */
  partition(total, n, min) {
    min = min || 1;
    let left = total - min * n;
    const out = new Array(n).fill(min);
    while (left > 0) { out[this.int(0, n - 1)]++; left--; }
    return out;
  }
}

// ── Seed selection ───────────────────────────────────────────────────────────
// ?set=N  → fixed, shareable question set (same for everyone, every time).
// no param → fresh random questions on each load.
const Seed = {
  /** The set number from the URL, or null for free practice. */
  setNumber() {
    const v = new URLSearchParams(location.search).get('set');
    if (v === null) return null;
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : null;
  },

  /** An RNG for this exercise: deterministic under ?set=N, random otherwise. */
  rng(exerciseId) {
    const set = this.setNumber();
    if (set === null) return new RNG((Math.random() * 2 ** 32) >>> 0);
    // Mix the exercise id into the seed so set 1 of two different exercises
    // does not reuse the same number stream.
    let h = 2166136261;
    for (const ch of String(exerciseId)) {
      h ^= ch.charCodeAt(0);
      h = Math.imul(h, 16777619);
    }
    return new RNG((h ^ Math.imul(set + 1, 0x9E3779B1)) >>> 0);
  }
};
