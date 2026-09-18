'use strict';
// ── Maths Revise · Home and unit pages ──────────────────────────────────────
// Both are rendered from the manifest, so exercise counts, titles and links
// cannot drift away from what actually exists. Star progress comes from the
// same localStorage the exercises write to.
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

  function exerciseCard(unit, ex, prefix) {
    const rec = MRG.getExercise(ex.id);
    return h('a', { class: 'card', href: `${prefix}exercises/unit-${unit.n}/exercise-${ex.n}.html` },
      h('div', { class: 'card-mark', text: unit.n + '.' + ex.n }),
      h('h3', { text: ex.title }),
      h('p', { text: ex.tag }),
      h('div', { class: 'card-foot' },
        h('span', { text: rec.attempts ? `Best ${rec.bestScore} pts` : 'Not started yet' }),
        stars(rec.stars || 0)));
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
    document.title = 'Maths Revision';
    const root = document.getElementById('app') || document.body;
    root.innerHTML = '';

    const all = Manifest.progress();

    root.appendChild(h('header', { class: 'page-head' },
      h('h1', { text: 'Maths Revision' }),
      h('p', { text: `${Manifest.UNITS.length} units, ${Manifest.count()} exercises, fresh questions every time.` })));

    const main = h('main');
    root.appendChild(main);
    main.appendChild(xpStrip());

    main.appendChild(h('p', { class: 'intro' },
      'Every exercise builds new questions each time you open it, so you can practise the same topic ' +
      'as often as you like. Use the set picker inside an exercise if you want everybody to get the ' +
      'same questions. Diagrams are drawn to scale, so measuring off the picture always agrees with the answer.'));

    main.appendChild(progressBar('Overall', all.stars, all.max));

    const grid = h('div', { class: 'grid' });
    for (const u of Manifest.UNITS) {
      const p = Manifest.progress(u.n);
      grid.appendChild(h('a', { class: 'card', href: `units/unit-${u.n}.html` },
        h('div', { class: 'card-mark', text: u.icon }),
        h('h3', { text: u.name }),
        h('p', { text: u.blurb }),
        h('div', { class: 'card-foot' },
          h('span', { text: `${u.exercises.length} exercises` }),
          stars(Math.round((p.stars / Math.max(p.max, 1)) * 3)))));
    }
    main.appendChild(grid);

    main.appendChild(h('div', { class: 'toolbar', style: 'margin-top:2rem' }, resetButton()));

    root.appendChild(h('footer', { class: 'page-foot' },
      'Maths Revision · progress is saved in this browser only'));
  }

  // ── Unit page ─────────────────────────────────────────────────────────────
  function renderUnit(n) {
    const u = Manifest.unit(n);
    document.title = u.name + ' · Maths Revision';
    const root = document.getElementById('app') || document.body;
    root.innerHTML = '';

    root.appendChild(h('header', { class: 'page-head' },
      h('span', { class: 'eyebrow', text: 'Unit ' + u.n }),
      h('h1', { text: u.name.replace(/^Unit \d+: /, '') }),
      h('p', { text: u.blurb })));

    root.appendChild(h('nav', { class: 'crumbs' },
      h('a', { href: '../index.html', text: 'Home' }),
      h('span', { text: '/' }),
      h('span', { class: 'here', text: u.short })));

    const main = h('main');
    root.appendChild(main);
    main.appendChild(xpStrip());

    const p = Manifest.progress(u.n);
    main.appendChild(progressBar('This unit', p.stars, p.max));

    const grid = h('div', { class: 'grid' });
    for (const ex of u.exercises) grid.appendChild(exerciseCard(u, ex, '../'));
    main.appendChild(grid);

    main.appendChild(h('a', { class: 'back-link', href: '../index.html' }, '← All units'));

    root.appendChild(h('footer', { class: 'page-foot', text: 'Maths Revision · ' + u.name }));
  }

  return { renderHome, renderUnit };
})();
