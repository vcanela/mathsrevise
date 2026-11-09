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
      ex.year ? h('span', { class: 'card-year', text: 'Year ' + ex.year })
        : ex.years ? h('span', { class: 'card-year', text: 'Years ' + ex.years }) : null,
      h('h3', { text: ex.title }),
      h('p', { text: ex.tag }),
      ex.challenge ? h('p', { class: 'card-challenge', text: '★ Year 9 challenge' }) : null,
      h('div', { class: 'card-foot' },
        h('span', { text: rec.attempts ? `Best ${rec.bestScore} pts` : 'Not started yet' }),
        stars(rec.stars || 0)));
  }

  // ── Home: doodles ──────────────────────────────────────────────────────────
  // A small pen drawing for each section, shown on its note. Strokes only, in
  // the note's ink, so they follow the theme like the teacher's marks do.
  const DOODLES = {
    1: '<circle cx="24" cy="24" r="16"/><path d="M24 8 V40 M24 14 L14 24 M24 21 L15 30 M24 28 L18 34"/>',
    2: '<path d="M24 9 V38 M15 38 H33 M7 15 H41"/><path d="M7 15 L3 25 M7 15 L11 25 M2 25 Q7 30 12 25 M41 15 L37 25 M41 15 L45 25 M36 25 Q41 30 46 25"/>',
    3: '<path d="M7 38 H41 L17 9 Z"/><path d="M14 38 A7 7 0 0 0 11.6 32.6"/>',
    4: '<path d="M7 38 H42 M7 38 L35 12"/><path d="M19 38 A12 12 0 0 0 15.8 29.9"/><path d="M25 26 L31 32 M31 26 L25 32"/>',
    5: '<path d="M7 11 H41 V30 H22 L14 38 V30 H7 Z"/><path d="M19 16 L28 25 M28 16 L19 25"/>',
    6: '<path d="M17 30 C9 25 10 11 24 10 C38 11 39 25 31 30 V34 H17 Z"/><path d="M18 38 H30 M20 42 H28 M21 22 L24 26 L27 22"/>',
    paper: '<circle cx="24" cy="27" r="14"/><path d="M24 27 V18 M24 27 L30 31 M20 8 H28 M24 8 V13 M36 15 L39 12"/>',
    chemistry: '<path d="M19 7 H29 M21 7 V20 L10 37 Q9 41 13 41 H35 Q39 41 38 37 L27 20 V7"/><path d="M13 32 H35"/><circle cx="21" cy="36" r="1.5"/><circle cx="28" cy="35" r="1"/><circle cx="25" cy="27" r="1"/>',
    physics: '<path d="M12 9 V26 A12 12 0 0 0 36 26 V9 H28 V26 A4 4 0 0 1 20 26 V9 Z"/><path d="M12 15 H20 M28 15 H36"/>',
    'earth-space': '<circle cx="20" cy="27" r="12"/><path d="M9 22 Q20 26 31 22"/><path d="M38 7 A7 7 0 1 0 44 17 A5.5 5.5 0 0 1 38 7 Z"/>',
    biology: '<path d="M9 39 C9 19 21 8 40 8 C40 28 29 39 9 39 Z"/><path d="M9 39 L33 15 M18 30 H26 M23 25 V18"/>',
    reading: '<path d="M24 14 C18 10 10 10 6 12 V36 C10 34 18 34 24 38 C30 34 38 34 42 36 V12 C38 10 30 10 24 14 Z"/><path d="M24 14 V38"/>',
    writing: '<path d="M10 38 L12 30 L34 8 L40 14 L18 36 Z"/><path d="M30 12 L36 18 M12 30 L18 36"/>',
    oral: '<path d="M5 9 H28 V23 H16 L10 29 V23 H5 Z"/><path d="M22 27 H43 V39 H38 V44 L32 39 H22 Z"/>'
  };
  const doodle = key => h('span', { class: 'home-doodle', 'aria-hidden': 'true',
    html: `<svg viewBox="0 0 48 48">${DOODLES[key] || ''}</svg>` });

  /**
   * One row in a subject's list, with the note that comes out of it: on hover
   * or keyboard focus, or on a first tap where there is no hover.
   */
  function homeItem({ key, href, icon, name, full, blurb, meta, got }) {
    return h('li', { class: 'home-item' },
      h('a', { class: 'home-row', href },
        // Neither Plex face has an angle sign, so that one is drawn.
        icon === '∠'
          ? h('span', { class: 'home-icon', html: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 H13.5 M3 13 L11.5 3.5 M7.5 13 A4.5 4.5 0 0 0 6 9.6"/></svg>' })
          : h('span', { class: 'home-icon' + (/[△→]/.test(icon) ? ' sym' : ''), text: icon }),
        h('span', { class: 'home-name', text: name }),
        got === null ? null : stars(got)),
      h('aside', { class: 'home-note' },
        doodle(key),
        h('h3', { text: full }),
        h('p', { text: blurb }),
        h('p', { class: 'home-meta', text: meta }),
        h('a', { class: 'tool-btn primary', href }, 'Open')));
  }

  function unitItem(u) {
    const p = Manifest.progress(u.key);
    const live = u.exercises.filter(e => !e.soon).length;
    return homeItem({
      key: u.key, href: u.page, icon: u.icon,
      name: u.name.replace(/^Unit \d+: /, ''), full: u.name, blurb: u.blurb,
      meta: `${live} ${live === 1 ? 'exercise' : 'exercises'} · ${p.stars} of ${p.max} stars`,
      got: p.max ? Math.round((p.stars / p.max) * 3) : 0
    });
  }

  /** The timed paper sits with the maths units: practice at managing time. */
  function paperItem() {
    return homeItem({
      key: 'paper', href: 'paper.html', icon: 'T', name: 'Timed Paper', full: 'Timed Paper',
      blurb: 'A mixed paper against one clock. Plan your time across every question, then see where it actually went.',
      meta: 'Short or full · 15 to 38 minutes', got: null
    });
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
  // One screen on a laptop: the subjects side by side as short lists, each
  // section's details on a note that comes out of it. The explaining lives
  // behind "What is this?" instead of on the page.
  function renderHome() {
    document.title = 'Revision';
    const root = document.getElementById('app') || document.body;
    root.innerHTML = '';

    root.appendChild(h('header', { class: 'home-head' },
      h('h1', { text: 'Revision' }),
      xpStrip(),
      h('details', { class: 'pop pop-about' },
        h('summary', { text: 'What is this?' }),
        h('div', { class: 'pop-note' },
          h('p', {}, h('strong', { text: 'Revision for maths, science and English, Years 7 and 8, ' }),
            'with Year 9 challenges when you want more.'),
          h('p', { text: 'Every exercise builds new questions each time you open it, so you can practise the same topic ' +
            'as often as you like. Use the set picker inside an exercise if you want everybody to get the same questions. ' +
            'Diagrams are drawn to scale, so measuring off the picture always agrees with the answer.' }),
          h('p', { text: 'Today’s practice is five questions, about two minutes, mixed across the topics you have seen ' +
            'least recently. Any subject counts, and four days a week is the target.' }),
          h('p', { text: 'Point at a section to see what is in it. Progress is saved in this browser only.' }),
          resetButton()))));

    const main = h('main', { class: 'home' });
    root.appendChild(main);
    main.appendChild(Habit.panel(''));

    const cols = h('div', { class: 'home-cols' });
    for (const s of Manifest.SUBJECTS) {
      const p = Manifest.progress(s.id);
      const list = h('ul', { class: 'home-list' }, Manifest.units(s.id).map(unitItem),
        s.id === 'maths' ? paperItem() : null);
      cols.appendChild(h('section', { class: 'home-col', id: s.id },
        h('div', { class: 'home-col-head' },
          h('h2', { text: s.name }),
          h('span', { class: 'home-stars', text: `★ ${p.stars} of ${p.max}` })),
        list));
    }
    main.appendChild(cols);

    root.appendChild(h('footer', { class: 'page-foot home-foot' }, 'Revision'));

    // Where there is no hover, the first tap on a row shows its note and the
    // second goes in. A tap elsewhere, or Escape, puts notes and pop-ups away.
    const noHover = matchMedia('(hover: none)');
    const closeAll = except => {
      document.querySelectorAll('.home-item.open').forEach(li => { if (li !== except) li.classList.remove('open'); });
    };
    cols.addEventListener('click', ev => {
      const row = ev.target.closest('.home-row');
      if (!row || !noHover.matches) return;
      const li = row.parentElement;
      if (!li.classList.contains('open')) { ev.preventDefault(); closeAll(li); li.classList.add('open'); }
    });
    document.addEventListener('click', ev => {
      if (!ev.target.closest('.home-item')) closeAll();
      document.querySelectorAll('details.pop[open]').forEach(d => { if (!d.contains(ev.target)) d.open = false; });
    });
    document.addEventListener('keydown', ev => {
      if (ev.key !== 'Escape') return;
      closeAll();
      document.querySelectorAll('details.pop[open]').forEach(d => { d.open = false; });
    });
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
    main.appendChild(progressBar(u.subject === 'maths' ? 'This unit' : 'This subject', p.stars, p.max));

    // Science subjects are laid out by curriculum sub-strand, each with its
    // Year 7 topic before the Year 8 one it leads into.
    const strands = [...new Set(u.exercises.map(ex => ex.strand).filter(Boolean))];
    // A lone sub-strand is still named, unless it just repeats the subject's name.
    if (strands.length > 1 || (strands.length === 1 && strands[0].toLowerCase() !== u.name.toLowerCase())) {
      for (const st of strands) {
        main.appendChild(h('h2', { class: 'strand-head', text: st }));
        const grid = h('div', { class: 'grid' });
        for (const ex of u.exercises.filter(e => e.strand === st)) grid.appendChild(exerciseCard(ex, '../'));
        main.appendChild(grid);
      }
    } else {
      const grid = h('div', { class: 'grid' });
      for (const ex of u.exercises) grid.appendChild(exerciseCard(ex, '../'));
      main.appendChild(grid);
    }

    main.appendChild(h('a', { class: 'back-link', href: '../index.html#' + u.subject }, '← All ' + subj.name.toLowerCase()));

    root.appendChild(h('footer', { class: 'page-foot', text: 'Revision · ' + u.name }));
  }

  return { renderHome, renderUnit };
})();
