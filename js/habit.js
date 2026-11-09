'use strict';
// ── Maths Revise · Habit panel ──────────────────────────────────────────────
// The "keep coming back" surface: today's practice, this week's target, and a
// calendar of days worked.
//
// Deliberately no streak counter. A streak is a number you can lose, and the
// students most likely to lose one — away for a weekend, off ill, on holiday
// — are the ones worth keeping. The weekly target resets every Monday, so a
// missed day costs that day and nothing more, and the calendar gives the
// satisfying part of a streak (a visible record) with no failure state.
// ─────────────────────────────────────────────────────────────────────────────

const Habit = (() => {
  const h = Exercise.h;

  const DAY_INITIALS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  /** The seven dots for this week, one per day. */
  function weekDots(wk) {
    return h('div', { class: 'week-dots', role: 'img',
                      'aria-label': `${wk.done} of ${wk.target} days practised this week` },
      wk.hit.map((done, i) => h('span', {
        class: 'week-dot' + (done ? ' done' : '') +
               (i === wk.todayIdx ? ' today' : '') +
               (i > wk.todayIdx && wk.todayIdx >= 0 ? ' future' : ''),
        text: DAY_INITIALS[i],
        title: wk.dayKeys[i]
      })));
  }

  /**
   * A short, honest line about where the week stands. When the target can no
   * longer be reached it says so plainly but still counts today, because the
   * point is to practise, not to hit a number.
   */
  function weekLine(wk, doneToday) {
    const head = `${wk.done} of ${wk.target} days this week.`;
    if (wk.met) return `Target met: ${wk.done} days this week.`;
    if (!wk.stillPossible) {
      return head + (doneToday ? ' Next week starts fresh on Monday.' : ' Today still counts.');
    }
    return `${head} ${wk.target - wk.done} more to go.`;
  }

  /** The calendar of recent weeks. Columns are weeks, rows are weekdays. */
  function calendarGrid(weeks) {
    const rows = MRG.calendar(weeks || 10);
    const grid = h('div', { class: 'cal' });
    // One column of weekday initials, then one column per week.
    grid.appendChild(h('div', { class: 'cal-col cal-labels' },
      DAY_INITIALS.map((d, i) => h('span', { class: 'cal-label', text: d, key: i }))));
    for (const row of rows) {
      grid.appendChild(h('div', { class: 'cal-col' },
        row.map(cell => h('span', {
          class: 'cal-cell' + (cell.practised ? ' done' : '') +
                 (cell.today ? ' today' : '') + (cell.future ? ' future' : ''),
          title: cell.key + (cell.practised ? ' · practised' : '')
        }))));
    }
    return grid;
  }

  /**
   * The strip on the home page: one row with today's mixes, this week's dots,
   * and the practice record behind a small pop-up once there is one.
   * `base` is the path prefix back to the site root.
   */
  function panel(base) {
    base = base || '';
    const wk = MRG.weekProgress();
    const done = MRG.practisedToday();
    const sum = MRG.habitSummary();

    return h('section', { class: 'habit' + (done ? ' habit-done' : '') },
      h('h2', { class: 'habit-title', text: done ? 'Done for today' : "Today's practice" }),
      // One mix per subject; finishing any counts as today's practice.
      h('div', { class: 'habit-go' },
        Manifest.SUBJECTS.filter(s => Manifest.count(s.id) > 0).map((s, i) =>
          h('a', {
            class: 'tool-btn' + (i === 0 && !done ? ' primary' : ''),
            href: base + 'practice.html?subject=' + s.id
          }, s.name + ' mix'))),
      h('div', { class: 'habit-week' },
        weekDots(wk),
        h('span', { class: 'habit-weekline', text: weekLine(wk, done) }),
        // The long view, but only once there is something to look at.
        sum.total > 0
          ? h('details', { class: 'pop pop-record' },
              h('summary', { text: 'Record' }),
              h('div', { class: 'pop-note' },
                h('p', { class: 'pop-head', text: `Practice record · ${sum.total} ${sum.total === 1 ? 'day' : 'days'} so far` }),
                calendarGrid(10)))
          : null));
  }

  return { panel, weekDots, weekLine, calendarGrid };
})();
