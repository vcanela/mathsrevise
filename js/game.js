'use strict';
// ── Maths Revise · Game Engine ───────────────────────────────────────────────
// Handles XP, levels, star ratings, and per-exercise progress.
// All state lives in localStorage — no backend required.
//
// Public API (via global MRG object):
//   MRG.getCurrentLevel()       → current level object
//   MRG.getGlobalXP()           → total XP number
//   MRG.getExercise(id)         → { stars, bestScore, attempts }
//   MRG.scoreQuestion(ok, ms)   → points for one question
//   MRG.calcStars(score, max)   → 0-3
//   MRG.finishExercise(id, s, max) → { xpGained, newTotal, stars, leveledUp, newLevel }
//   MRG.getLevelInfo()          → { current, xp, next, xpToNext, pct }
// ─────────────────────────────────────────────────────────────────────────────

const MRG = (() => {
  const GLOBAL_KEY = 'mrg_global';
  const EX_PREFIX  = 'mrg_ex_';

  // Level definitions — order matters (ascending xp threshold).
  const LEVELS = [
    { level: 1, name: 'Rookie',     xp: 0,   timerVisible: false, penalty: 0, timerSecs: 30 },
    { level: 2, name: 'Apprentice', xp: 150,  timerVisible: true,  penalty: 3, timerSecs: 30 },
    { level: 3, name: 'Scholar',    xp: 400,  timerVisible: true,  penalty: 3, timerSecs: 15 },
    { level: 4, name: 'Expert',     xp: 700,  timerVisible: true,  penalty: 3, timerSecs: 15 },
  ];

  // XP granted the first time a player reaches each star tier.
  // Index = star count (0 = unused, 1 = first star, etc.)
  const STAR_XP = [0, 20, 30, 50];

  // ── Storage helpers ────────────────────────────────────────────────────────
  function _read(key, def) {
    try { return JSON.parse(localStorage.getItem(key)) || def; }
    catch { return def; }
  }
  function _write(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (_) {}
  }

  function _getGlobal()       { return _read(GLOBAL_KEY, { xp: 0 }); }
  function getExercise(id)    { return _read(EX_PREFIX + id, { stars: 0, bestScore: 0, attempts: 0 }); }

  // ── Level calculations ─────────────────────────────────────────────────────
  function _levelForXP(xp) {
    let out = LEVELS[0];
    for (const l of LEVELS) { if (xp >= l.xp) out = l; }
    return out;
  }

  function getCurrentLevel() { return _levelForXP(_getGlobal().xp || 0); }
  function getGlobalXP()     { return _getGlobal().xp || 0; }

  // ── Per-question scoring ───────────────────────────────────────────────────
  // Returns points earned for one question (may be negative at Level 2+).
  function scoreQuestion(correct, elapsedMs) {
    const lvl = getCurrentLevel();
    if (!correct) return -lvl.penalty;
    const s = elapsedMs / 1000;
    if (s <  5)  return 15;
    if (s < 15)  return 12;
    if (s < 30)  return 10;
    return 8;
  }

  // ── Star calculation ───────────────────────────────────────────────────────
  function calcStars(score, maxScore) {
    const pct = score / maxScore;
    if (pct >= 0.87) return 3;
    if (pct >= 0.67) return 2;
    if (pct >= 0.47) return 1;
    return 0;
  }

  // ── Finish an exercise ─────────────────────────────────────────────────────
  // Call once all questions are answered.
  // Returns { xpGained, newTotal, stars, leveledUp, newLevel }
  function finishExercise(id, score, maxScore) {
    const stars     = calcStars(score, maxScore);
    const ex        = getExercise(id);
    const prevStars = ex.stars || 0;

    // XP only for star tiers the player hasn't reached on this exercise before.
    let xpGained = 0;
    for (let s = prevStars + 1; s <= stars; s++) xpGained += STAR_XP[s];

    // Persist exercise record.
    _write(EX_PREFIX + id, {
      stars:     Math.max(prevStars, stars),
      bestScore: Math.max(ex.bestScore || 0, score),
      attempts:  (ex.attempts || 0) + 1
    });

    // Persist global XP and detect level-up.
    const g         = _getGlobal();
    const prevLevel = _levelForXP(g.xp || 0).level;
    g.xp            = (g.xp || 0) + xpGained;
    _write(GLOBAL_KEY, g);

    const newLevel = _levelForXP(g.xp);
    return {
      xpGained,
      newTotal:  g.xp,
      stars,
      leveledUp: newLevel.level > prevLevel,
      newLevel
    };
  }

  // ── XP bar rendering info ─────────────────────────────────────────────────
  function getLevelInfo() {
    const xp      = getGlobalXP();
    const current = _levelForXP(xp);
    const nextIdx = LEVELS.findIndex(l => l.level === current.level) + 1;
    const next    = LEVELS[nextIdx] || null;
    const pct     = next
      ? Math.min(100, ((xp - current.xp) / (next.xp - current.xp)) * 100)
      : 100;
    return { current, xp, next, xpToNext: next ? next.xp - xp : null, pct };
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  return {
    getCurrentLevel,
    getGlobalXP,
    getExercise,
    scoreQuestion,
    calcStars,
    finishExercise,
    getLevelInfo,
    LEVELS
  };
})();
