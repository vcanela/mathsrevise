'use strict';
// ── Maths Revise · Daily practice ───────────────────────────────────────────
// Builds a short mixed session: a handful of questions drawn from several
// topics rather than one.
//
// Two reasons it is not simply a random exercise. First, the topics are
// chosen by what the student needs — never attempted, longest unseen, fewest
// stars — which is spaced repetition, the best evidenced thing there is for
// revision. Second, mixing topics forces the student to work out *which*
// method applies, instead of being told by the page heading. That is where
// most marks actually go missing.
//
//   const s = Practice.session(rng, difficulty);
//   s.questions   → question objects, each tagged with where it came from
//   s.topicIds    → the topics it drew on
// ─────────────────────────────────────────────────────────────────────────────

const Practice = (() => {

  // Short on purpose. The daily bar has to be low enough that it is easier to
  // do than to skip; a five minute task gets put off on a busy evening and the
  // habit dies. Five questions from five different topics is about two
  // minutes, and the student who wants more can simply go again.
  const SESSION_QUESTIONS = 5;
  const TOPICS_PER_SESSION = 5;

  /** Whole days between an ISO day key and today. */
  function daysSince(key) {
    if (!key) return null;
    const then = new Date(key + 'T00:00:00');
    const now  = new Date(MRG.dayKey() + 'T00:00:00');
    return Math.round((now - then) / 86400000);
  }

  /**
   * Every topic, with how badly it is wanted. Higher means more overdue.
   *
   *   never attempted   a large fixed weight, so new material comes first
   *   time since seen   grows with the gap, which is the spacing part
   *   stars missing     a topic scraping one star comes round sooner
   */
  function priorities(subject) {
    // Only exercises that exist yet, and only from the subject being practised.
    return Manifest.live(subject).map(ex => {
      const rec  = MRG.getExercise(ex.id);
      const seen = (rec.attempts || 0) > 0;
      const gap  = daysSince(rec.last);
      const stars = rec.stars || 0;

      let score;
      if (!seen) {
        score = 120;
      } else {
        // Cap the gap so a topic untouched for a term does not crowd out
        // everything else for weeks.
        score = Math.min(gap === null ? 30 : gap, 30) * 2 + (3 - stars) * 15;
      }
      return { id: ex.id, label: ex.label, href: ex.href, title: ex.title, score, seen, gap, stars };
    }).sort((a, b) => b.score - a.score);
  }

  /** A short plain-English reason, for showing on the card. */
  function reason(p) {
    if (!p.seen) return 'not tried yet';
    if (p.gap === 0) return 'done today';
    if (p.gap === 1) return 'done yesterday';
    if (p.gap !== null && p.gap >= 14) return `${p.gap} days ago`;
    if (p.stars < 3) return `${p.stars} of 3 stars`;
    return p.gap === null ? 'due for a look' : `${p.gap} days ago`;
  }

  /**
   * Choose the topics for one session. The most overdue are strongly
   * favoured, but the pick is weighted rather than strict, so two sessions in
   * the same week are not identical.
   */
  function chooseTopics(rng, count, subject) {
    const pool = priorities(subject);
    const picked = [];
    const taken = new Set();
    count = Math.min(count || TOPICS_PER_SESSION, pool.length);

    while (picked.length < count) {
      const avail = pool.filter(p => !taken.has(p.id));
      if (!avail.length) break;
      // Weighted draw: squaring the score sharpens the preference for the
      // genuinely overdue without ever excluding the rest.
      const weights = avail.map(p => Math.pow(Math.max(p.score, 1), 2));
      const total = weights.reduce((s, w) => s + w, 0);
      let r = rng.next() * total;
      let idx = 0;
      while (idx < weights.length - 1 && (r -= weights[idx]) > 0) idx++;
      picked.push(avail[idx]);
      taken.add(avail[idx].id);
    }
    return picked;
  }

  /**
   * Build the session. Each chosen topic generates its full set, and we take a
   * couple of questions from it at spread-out positions, because a topic's
   * questions run from straightforward at the start to challenging at the end.
   */
  function session(rng, difficulty, opts) {
    opts = opts || {};
    const wanted = opts.questions || SESSION_QUESTIONS;
    const topics = chooseTopics(rng, opts.topics || TOPICS_PER_SESSION, opts.subject);
    const perTopic = Math.max(1, Math.round(wanted / Math.max(topics.length, 1)));

    const out = [];
    const used = [];
    for (const t of topics) {
      const topic = window.Topics && window.Topics[t.id];
      if (!topic) continue;
      let all;
      try { all = topic.generate(rng, difficulty); }
      catch (err) { console.error('practice: ' + t.id + ' failed to generate', err); continue; }
      if (!all || !all.length) continue;

      // Spread the picks across the set rather than clustering at the easy end.
      const idx = rng.shuffle(all.map((_, i) => i)).slice(0, Math.min(perTopic, all.length));
      idx.sort((a, b) => a - b);
      for (const i of idx) {
        out.push({
          ...all[i],
          // Where this came from, so the engine can build another like it.
          origin: { topicId: t.id, index: i },
          source: {
            id: t.id,
            label: t.label,
            title: t.title,
            href: t.href
          }
        });
      }
      used.push(t.id);
    }

    // Interleave, so consecutive questions are rarely from the same topic.
    const mixed = rng.shuffle(out).slice(0, wanted);
    return { questions: mixed, topicIds: used, topics };
  }

  /**
   * The seed for today's session. Deterministic per day, so reloading the page
   * does not reshuffle the questions halfway through, but different each day.
   * ?set=N still overrides, which is how a class can be given the same set.
   */
  function todaySeed() {
    const key = MRG.dayKey();
    let h = 2166136261;
    for (const ch of key) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  /**
   * Render the practice page.
   *
   * By default the session is seeded from the date, so "today's practice" is
   * one specific thing all day rather than reshuffling on every glance.
   * ?r=… asks for a different one (the shuffle button), and ?set=N seeds it
   * the same way for everyone, which is how a class can be given identical
   * questions.
   */
  function start() {
    const params = new URLSearchParams(location.search);
    const set = Seed.setNumber();
    const r   = params.get('r');
    // Each subject has its own mix. Both count towards the same weekly target.
    const subject = Manifest.subject(params.get('subject') || 'maths');

    let rng;
    if (set !== null)      rng = Seed.rng('practice-' + subject.id);
    else if (r !== null)   rng = new RNG((Number(r) || 1) * 2654435761 >>> 0);
    else                   rng = new RNG(todaySeed() ^ (subject.id === 'maths' ? 0 : 0x5bd1e995));

    const level = MRG.getCurrentLevel();
    const difficulty = level.level >= 4 ? 'expert' : level.level >= 3 ? 'hard' : 'core';

    const s = session(rng, difficulty, { subject: subject.id });
    const done = MRG.practisedToday();
    const word = subject.name.toLowerCase();

    Exercise.run({
      practice: true,
      base: '',
      id: 'practice-' + subject.id,
      subject: subject.id,
      eyebrow: set !== null ? `Shared ${word} set ${set}` : `Daily ${word} mix`,
      title: done ? `More ${word}` : `Today's ${word}`,
      footer: `Daily ${word} mix`,
      blurb: `Five ${word} questions, chosen from what you have seen least recently. ` +
             'Each one says which exercise it came from.',
      questions: s.questions,
      topicIds: s.topicIds,
      topics: s.topics
    });
  }

  return { start, session, priorities, chooseTopics, reason, todaySeed, daysSince, SESSION_QUESTIONS };
})();
