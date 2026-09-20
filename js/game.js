'use strict';
// ── Maths Revise · Game Engine ───────────────────────────────────────────────
// Handles XP, levels, star ratings, and per-exercise progress.
// All state lives in localStorage — no backend required.
//
// Public API (via global MRG object):
//   MRG.getCurrentLevel()       → current level object
//   MRG.getGlobalXP()           → total XP number
//   MRG.getExercise(id)         → { stars, bestScore, attempts, last }
//   MRG.scoreQuestion(ok, ms)   → points for one question
//   MRG.calcStars(score, max)   → 0-3
//   MRG.finishExercise(id, s, max) → { xpGained, stars, leveledUp, firstToday, week, … }
//   MRG.finishPractice(s, max, ids) → the same, for a mixed practice session
//   MRG.getLevelInfo()          → { current, xp, next, xpToNext, pct }
//
// Practice habit — regularity is a weekly target, not a streak. See the
// comment above the habit section for why.
//   MRG.dayKey(date?)           → 'YYYY-MM-DD' in the student's own timezone
//   MRG.practisedToday()        → boolean
//   MRG.weekProgress()          → { target, done, met, hit[], stillPossible, … }
//   MRG.calendar(weeks)         → rows of 7 day cells, oldest first
//   MRG.habitSummary()          → { total, longest }
// ─────────────────────────────────────────────────────────────────────────────

const MRG = (() => {
  const GLOBAL_KEY = 'mrg_global';
  const EX_PREFIX  = 'mrg_ex_';
  const DAYS_KEY   = 'mrg_days';

  // How many days a week counts as keeping up. Deliberately not seven: the
  // target has to survive a missed day, or missing one day is the same as
  // giving up.
  const WEEK_TARGET = 4;
  const DAYS_KEPT   = 200;              // roughly two terms of history

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

  // A small amount of XP for the work itself, so the bar never freezes.
  const EFFORT_XP_MAX       = 10;   // per completed set, scaled by score
  const EFFORT_XP_DAILY_CAP = 25;   // so it cannot be ground into a level

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

  /**
   * A little XP for the work itself, so the bar still moves for a student who
   * has already three-starred everything. Capped per day: without a cap, a
   * student could grind their way into Expert mode without ever answering
   * well, and would then be handed the hard question sets.
   */
  function _effortXP(g, score, maxScore) {
    const today = dayKey();
    if (g.effortDay !== today) { g.effortDay = today; g.effortToday = 0; }
    const earned = Math.round((score / Math.max(maxScore, 1)) * EFFORT_XP_MAX);
    const room   = Math.max(0, EFFORT_XP_DAILY_CAP - (g.effortToday || 0));
    const give   = Math.min(earned, room);
    g.effortToday = (g.effortToday || 0) + give;
    return give;
  }

  /** Apply an XP change and report whether it crossed a level boundary. */
  function _award(xp) {
    const g         = _getGlobal();
    const prevLevel = _levelForXP(g.xp || 0).level;
    g.xp            = (g.xp || 0) + xp;
    _write(GLOBAL_KEY, g);
    const newLevel = _levelForXP(g.xp);
    return { newTotal: g.xp, leveledUp: newLevel.level > prevLevel, newLevel };
  }

  // ── Finish an exercise ─────────────────────────────────────────────────────
  // Call once all questions are answered.
  // Returns { xpGained, starXP, effortXP, newTotal, stars, leveledUp, newLevel,
  //           firstToday, week }
  function finishExercise(id, score, maxScore) {
    const stars     = calcStars(score, maxScore);
    const ex        = getExercise(id);
    const prevStars = ex.stars || 0;

    // XP only for star tiers the player hasn't reached on this exercise before.
    let starXP = 0;
    for (let s = prevStars + 1; s <= stars; s++) starXP += STAR_XP[s];

    // Persist exercise record. `last` is what the practice scheduler reads to
    // work out which topics are overdue.
    _write(EX_PREFIX + id, {
      stars:     Math.max(prevStars, stars),
      bestScore: Math.max(ex.bestScore || 0, score),
      attempts:  (ex.attempts || 0) + 1,
      last:      dayKey()
    });

    const g = _getGlobal();
    const effortXP = _effortXP(g, score, maxScore);
    _write(GLOBAL_KEY, g);

    const firstToday = recordPracticeDay();
    const awarded = _award(starXP + effortXP);

    return {
      xpGained: starXP + effortXP,
      starXP, effortXP,
      stars,
      firstToday,
      week: weekProgress(),
      ...awarded
    };
  }

  /**
   * Finish a mixed practice session. It counts towards the day and earns
   * effort XP, but deliberately does not write stars or best scores: those
   * belong to the exercise a question came from, where the student can see
   * them in context.
   */
  function finishPractice(score, maxScore, topicIds) {
    const g = _getGlobal();
    const effortXP = _effortXP(g, score, maxScore);
    _write(GLOBAL_KEY, g);

    // Touching a topic in practice counts as having seen it recently.
    for (const id of (topicIds || [])) {
      const ex = getExercise(id);
      _write(EX_PREFIX + id, { ...ex, last: dayKey() });
    }

    const firstToday = recordPracticeDay();
    return {
      xpGained: effortXP,
      effortXP,
      firstToday,
      week: weekProgress(),
      ..._award(effortXP)
    };
  }

  // ── Practice habit ─────────────────────────────────────────────────────────
  // Regularity is tracked as a set of dates, not as a consecutive-day count.
  // A streak has a failure state, and the students most worth keeping are
  // exactly the ones who lose it: away for a weekend, ill for a week, or off
  // over the holidays. A weekly target resets every Monday, so a missed day
  // costs that day and nothing else.

  /** Local calendar date as YYYY-MM-DD. Local, so "today" means the student's today. */
  function dayKey(d) {
    d = d || new Date();
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
  }

  function _days() {
    const raw = _read(DAYS_KEY, []);
    return Array.isArray(raw) ? raw : [];
  }

  /** Note that some practice happened today. Returns true if this is the first today. */
  function recordPracticeDay() {
    const today = dayKey();
    const days = _days();
    if (days.includes(today)) return false;
    days.push(today);
    days.sort();
    _write(DAYS_KEY, days.slice(-DAYS_KEPT));
    return true;
  }

  const practisedToday = () => _days().includes(dayKey());

  /** The Monday that starts the week containing `d`. */
  function weekStart(d) {
    const x = new Date(d || new Date());
    x.setHours(0, 0, 0, 0);
    x.setDate(x.getDate() - ((x.getDay() + 6) % 7));   // getDay: 0 = Sunday
    return x;
  }

  /** This week's progress towards the target. */
  function weekProgress() {
    const start = weekStart();
    const keys = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      keys.push(dayKey(d));
    }
    const days = _days();
    const hit = keys.map(k => days.includes(k));
    const done = hit.filter(Boolean).length;
    // Days still available to reach the target, today included.
    const todayIdx = keys.indexOf(dayKey());
    const left = todayIdx < 0 ? 0 : 7 - todayIdx;
    return {
      target: WEEK_TARGET,
      done,
      met: done >= WEEK_TARGET,
      dayKeys: keys,
      hit,
      todayIdx,
      stillPossible: done + left >= WEEK_TARGET
    };
  }

  /**
   * The last `weeks` weeks as rows of seven days, oldest first, for a calendar.
   * Each cell is { key, practised, future, today }.
   */
  function calendar(weeks) {
    weeks = weeks || 10;
    const days = new Set(_days());
    const today = dayKey();
    const start = weekStart();
    start.setDate(start.getDate() - 7 * (weeks - 1));
    const rows = [];
    for (let w = 0; w < weeks; w++) {
      const row = [];
      for (let i = 0; i < 7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + w * 7 + i);
        const key = dayKey(d);
        row.push({ key, practised: days.has(key), today: key === today, future: key > today });
      }
      rows.push(row);
    }
    return rows;
  }

  /** Total days practised, and the longest run, for a gentle "look how far" line. */
  function habitSummary() {
    const days = _days();
    let longest = 0, run = 0, prev = null;
    for (const k of days) {
      const d = new Date(k + 'T00:00:00');
      if (prev && (d - prev) === 86400000) run++; else run = 1;
      longest = Math.max(longest, run);
      prev = d;
    }
    return { total: days.length, longest };
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
    finishPractice,
    getLevelInfo,
    // Practice habit
    dayKey,
    practisedToday,
    recordPracticeDay,
    weekProgress,
    calendar,
    habitSummary,
    LEVELS,
    WEEK_TARGET
  };
})();
