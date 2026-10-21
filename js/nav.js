'use strict';
// ── Revision · Home and unit pages ──────────────────────────────────────────
// Both are rendered from the manifest, so exercise counts, titles and links
// cannot drift away from what actually exists. Star progress comes from the
// same localStorage the exercises write to.
//
// The home page carries both subjects. Maths and science share one XP bar and
// one weekly target: a day spent on either counts as a day practised.
// ─────────────────────────────────────────────────────────────────────────────

const Nav = (() => {
  const h = Exercise.h;

  const stars = n => h('span', { class: 'card-stars' + (n ? '' : ' none'),
                                 text: '★'.repeat(n) + '☆'.repeat(3 - n) });

  function progressBar(label, got, max) {
    const pct = max ? (got / max) * 100 : 0;
    return h('div', { class: 'unit-progress' },
      h('span', { text: label }),
      h('div', { class: 'bar' }, h('i', { style: `width:${pct.toFixed(1)}%` })),
      h('span', { text: `${got} of ${max} stars` }));
  }

  function xpStrip() {
    const info = MRG.getLevelInfo();
    const next = info.next ? `${info.xpToNext} XP to <strong>${info.next.name}</strong>` : '<strong>Top level</strong>';
    return h('div', { class: 'xpbar' },
      h('span', { class: 'xp-rank', text: info.current.name }),
      h('div', { class: 'xp-track' }, h('div', { class: 'xp-fill', style: `width:${info.pct.toFixed(1)}%` })),
      h('span', { class: 'xp-text', html: `${info.xp} XP &middot; ${next}` }));
  }

  /** One exercise card. Exercises not written yet show as a quiet placeholder. */
  function exerciseCard(ex, prefix) {
    if (ex.soon) {
      return h('div', { class: 'card card-soon', 'aria-disabled': 'true' },
        h('div', { class: 'card-mark', text: ex.label }),
        h('h3', { text: ex.title }),
        h('p', { text: ex.tag }),
        h('div', { class: 'card-foot' }, h('span', { text: 'Coming soon' })));
    }
    const rec = MRG.getExercise(ex.id);
    return h('a', { class: 'card', href: prefix + ex.href },
      h('div', { class: 'card-mark', text: ex.label }),
      h('h3', { text: ex.title }),
      h('p', { text: ex.tag }),
      h('div', { class: 'card-foot' },
        h('span', { text: rec.attempts ? `Best ${rec.bestScore} pts` : 'Not started yet' }),
        stars(rec.stars || 0)));
  }

  function unitCard(u) {
    const p = Manifest.progress(u.key);
    const live = u.exercises.filter(e => !e.soon).length;
    const total = u.exercises.length;
    return h('a', { class: 'card', href: u.page },
      h('div', { class: 'card-mark', text: u.icon }),
      h('h3', { text: u.name }),
      h('p', { text: u.blurb }),
      h('div', { class: 'card-foot' },
        h('span', { text: live === total ? `${total} exercises` : `${live} of ${total} exercises ready` }),
        stars(p.max ? Math.round((p.stars / p.max) * 3) : 0)));
  }

  function resetButton() {
    return h('button', {
      type: 'button', class: 'tool-btn',
      onclick() {
        if (!confirm('Clear all stars, XP and best scores on this device? This cannot be undone.')) return;
        try {
          Object.keys(localStorage)
            .filter(k => k.startsWith('mrg_'))
            .forEach(k => localStorage.removeItem(k));
        } catch (_) {}
        location.reload();
      }
    }, 'Reset progress on this device');
  }

  // ── Home ──────────────────────────────────────────────────────────────────
  function renderHome() {
    document.title = 'Revision';
    const root = document.getElementById('app') || document.body;
    root.innerHTML = '';

    root.appendChild(h('header', { class: 'page-head' },
      h('h1', { text: 'Revision' }),
      h('p', { text: 'Maths and science, with fresh questions every time.' })));

    const main = h('main');
    root.appendChild(main);
    main.appendChild(xpStrip());
    main.appendChild(Habit.panel(''));

    main.appendChild(h('p', { class: 'intro' },
      'Every exercise builds new questions each time you open it, so you can practise the same topic ' +
      'as often as you like. Use the set picker inside an exercise if you want everybody to get the ' +
      'same questions. Diagrams are drawn to scale, so measuring off the picture always agrees with the answer.'));

    // One section per subject, each with its own progress and unit cards.
    for (const s of Manifest.SUBJECTS) {
      const p = Manifest.progress(s.id);
      main.appendChild(h('section', { class: 'subject', id: s.id },
        h('div', { class: 'section-head' },
          h('h2', { text: s.name }),
          h('span', { class: 'qcount', text: `${Manifest.count(s.id)} exercises` })),
        h('p', { class: 'subject-blurb', text: s.blurb }),
        progressBar(s.name, p.stars, p.max),
        h('div', { class: 'grid' }, Manifest.units(s.id).map(unitCard))));
    }

    main.appendChild(h('div', { class: 'toolbar', style: 'margin-top:2rem' }, resetButton()));

    root.appendChild(h('footer', { class: 'page-foot' },
      'Revision · progress is saved in this browser only'));
  }

  // ── Unit page ─────────────────────────────────────────────────────────────
  function renderUnit(key) {
    const u = Manifest.unit(key);
    const subj = Manifest.subject(u.subject);
    document.title = u.name + ' · Revision';
    const root = document.getElementById('app') || document.body;
    root.innerHTML = '';

    root.appendChild(h('header', { class: 'page-head' },
      h('span', { class: 'eyebrow', text: u.subject === 'maths' ? subj.name + ' · ' + u.short : subj.name }),
      h('h1', { text: u.subject === 'maths' ? u.name.replace(/^Unit \d+: /, '') : u.name }),
      h('p', { text: u.blurb })));

    root.appendChild(h('nav', { class: 'crumbs' },
      h('a', { href: '../index.html', text: 'Home' }),
      h('span', { text: '/' }),
      h('a', { href: '../index.html#' + u.subject, text: subj.name }),
      h('span', { text: '/' }),
      h('span', { class: 'here', text: u.short })));

    const main = h('main');
    root.appendChild(main);
    main.appendChild(xpStrip());

    const p = Manifest.progress(u.key);
    main.appendChild(progressBar(u.subject === 'maths' ? 'This unit' : 'This year', p.stars, p.max));

    const grid = h('div', { class: 'grid' });
    for (const ex of u.exercises) grid.appendChild(exerciseCard(ex, '../'));
    main.appendChild(grid);

    main.appendChild(h('a', { class: 'back-link', href: '../index.html#' + u.subject }, '← All ' + subj.name.toLowerCase()));

    root.appendChild(h('footer', { class: 'page-foot', text: 'Revision · ' + u.name }));
  }

  return { renderHome, renderUnit };
})();
