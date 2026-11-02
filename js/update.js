'use strict';
// ── Revision · New-version notice ────────────────────────────────────────────
// A tab left open keeps running the code it loaded, however many updates are
// pushed after it. Each page knows its own version (a <meta> tag the build
// writes), and checks version.json, which the build also writes, when the
// student comes back to the tab and every 15 minutes while it is open. If the
// two differ, a bar offers a refresh.
//
// It never reloads by itself: points for a set are saved only when the set
// is finished, so a surprise reload could throw away a half-done set.
//
// The page footer also shows the version and the date it was built, so a
// teacher can compare a student's screen with the live site.
// ─────────────────────────────────────────────────────────────────────────────

const SiteUpdate = (() => {
  const meta = document.querySelector('meta[name="site-version"]');
  if (!meta) return {};
  const mine = meta.content;
  const built = meta.dataset.built || '';
  const root = meta.dataset.root || '';
  let shown = false;

  function stamp() {
    const foot = document.querySelector('.page-foot');
    if (!foot || foot.querySelector('.version-stamp')) return;
    const span = document.createElement('span');
    span.className = 'version-stamp';
    const when = built ? new Date(built + 'T12:00:00').toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
    span.textContent = `Version ${mine}${when ? ' · updated ' + when : ''}`;
    foot.appendChild(span);
  }

  /** True when some questions in this set are answered but the set is not finished. */
  function midSet() {
    const cards = document.querySelectorAll('.qcard');
    const done = document.querySelectorAll('.qcard.answered');
    return done.length > 0 && done.length < cards.length;
  }

  function showBar() {
    if (shown) return;
    shown = true;
    const bar = document.createElement('div');
    bar.className = 'update-bar';
    bar.setAttribute('role', 'status');
    const text = document.createElement('span');
    text.textContent = midSet()
      ? 'A newer version of this site is available. Finish this set first (points are saved when a set is finished), then refresh.'
      : 'A newer version of this site is available.';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'update-btn';
    btn.textContent = 'Refresh';
    btn.addEventListener('click', () => location.reload());
    bar.append(text, btn);
    document.body.prepend(bar);
  }

  async function check() {
    if (shown || document.hidden) return;
    try {
      const res = await fetch(root + 'version.json', { cache: 'no-store' });
      if (!res.ok) return;
      const live = await res.json();
      if (live.version && live.version !== mine) showBar();
    } catch (_) { /* offline, or the file is missing: say nothing */ }
  }

  document.addEventListener('DOMContentLoaded', () => { stamp(); check(); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
  setInterval(check, 15 * 60 * 1000);

  return { version: mine, check };
})();
