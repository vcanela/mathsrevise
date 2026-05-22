'use strict';
// ── Maths Revise · Question Timer ───────────────────────────────────────────
// Controls a single per-question countdown bar.
//
// Usage:
//   const t = new QuestionTimer(fillDivElement, durationSecs);
//   t.start()          — begin countdown, animate the bar
//   t.stop()           — freeze bar, return elapsed ms
//   t.hasStarted()     — true after first start() call
//   t.elapsed          — ms since start (or 99999 if never started)
// ─────────────────────────────────────────────────────────────────────────────

class QuestionTimer {
  constructor(barEl, durationSecs) {
    this._bar      = barEl;        // the coloured fill <div>, or null
    this._duration = (durationSecs || 30) * 1000;
    this._start    = null;
    this._elapsed  = null;
    this._raf      = null;
  }

  setDuration(secs) { this._duration = secs * 1000; }

  hasStarted() { return this._start !== null || this._elapsed !== null; }

  start() {
    if (this.hasStarted()) return;   // idempotent — only starts once
    if (this._raf) cancelAnimationFrame(this._raf);
    this._start   = performance.now();
    this._elapsed = null;
    if (this._bar) {
      this._bar.style.width      = '100%';
      this._bar.style.background = '#27ae60';
      this._bar.style.transition = 'none';
    }
    this._animate();
  }

  _animate() {
    if (!this._start) return;
    const elapsed = performance.now() - this._start;
    const pct     = Math.max(0, 1 - elapsed / this._duration);
    if (this._bar) {
      this._bar.style.width = (pct * 100).toFixed(2) + '%';
      this._bar.style.background =
        pct > 0.34 ? '#27ae60' : pct > 0.17 ? '#e67e22' : '#e74c3c';
    }
    if (elapsed < this._duration) {
      this._raf = requestAnimationFrame(() => this._animate());
    }
  }

  stop() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf     = null;
    this._elapsed = this._start !== null
      ? performance.now() - this._start
      : 99999;
    this._start   = null;
    return this._elapsed;
  }

  get elapsed() { return this._elapsed !== null ? this._elapsed : 99999; }
}
