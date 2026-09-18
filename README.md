# Maths Revision

A self-contained revision site for Year 8–10 maths: number, algebra, geometry, and the
places where algebra and geometry meet. No frameworks, no build step, no server. Open
`index.html` or publish the folder to GitHub Pages.

**5 units · 21 exercises · 10 questions each, generated fresh every time.**

---

## Two things worth knowing before you change anything

**1. Questions are generated, not written out.** Each exercise has a `generate(rng, difficulty)`
function that builds ten questions from random numbers. A student gets new questions on every
reload, so an exercise stays useful after the first attempt. Add `?set=3` to the URL and everyone
gets the same ten questions instead, which is what you want for setting a class the same work.
The set picker inside each exercise switches between the two.

**2. Diagrams are computed from the real measurements, never drawn by hand.** A triangle
labelled 35°, 75°, 70° is constructed by the law of sines and genuinely has those angles.
Irregular polygons are built by `Geo.polygonFromAngles`, which solves for side lengths that
close the shape, then measures the finished figure to confirm. A student who estimates from
the picture always gets the same answer as one who uses the rule. Please keep it that way:
never position vertices by hand and label them with numbers chosen separately.

---

## Layout

```
index.html              home page (rendered from the manifest)
units/unit-N.html       one per unit
exercises/unit-N/…      one per exercise; each is a ~20 line shell
css/style.css           the whole stylesheet, light and dark
js/
  manifest.js           the list of units and exercises — the single source of truth
  engine.js             renders an exercise page: cards, inputs, scoring, results
  nav.js                renders the home and unit pages
  game.js               XP, levels, stars, saved in localStorage
  timer.js              the per-question countdown bar
  rng.js                seeded random numbers (this is what ?set=N controls)
  algebra.js            parses and compares typed algebraic expressions
  geometry.js           builds and measures shapes; the SVG drawing surface
  diagrams.js           balance scales, tiles, number lines, nets, circles
  format.js             turning numbers into the TeX a student expects to read
  mathjax.js            loads MathJax
  topics/
    number.js           unit 1
    algebra.js          unit 2
    geometry.js         unit 3
    combined.js         unit 4
    words.js            unit 5
tools/
  check-topics.js       generates ~200k questions and checks them (node)
  selftest.html         loads every page in a browser and checks it renders
  build-pages.js        regenerates the HTML shells from the manifest (node)
```

## The units

| Unit | Exercises | Covers |
|---|---|---|
| 1 Number & Arithmetic | 4 | decimals, fractions |
| 2 Algebra | 5 | like terms, expanding, factorising, `ax + b = c`, `ax + b = cx + d` |
| 3 Geometry | 6 | angle rules, triangles, parallel lines, polygons, circles, nets |
| 4 Algebra Meets Geometry | 3 | angles and lengths as expressions: build the equation, then solve it |
| 5 Maths in Words | 3 | English to algebra, algebra to English, word problems |

## Question types

The engine renders seven kinds of answer control. A generator picks whichever suits the question.

- **`number`** — one box, optionally with a prefix or unit.
- **`fill`** — a row of text and boxes, for example `= □x + □`. Also does stacked fractions.
- **`choice`** — multiple choice.
- **`expr`** — the student types an expression. Compared by value, not spelling, so `3 + 2n`
  and `2n + 3` both pass. With `mode: 'factorised'` it also insists the answer really is
  factorised, so `2(2x + 4)` is rejected as unfinished.
- **`spot`** — a worked solution with one wrong line; click the mistake.
- **`match`** — pair items across two columns.
- **`order`** — click steps into sequence.

## Adding an exercise

1. Add it to the right unit in `js/manifest.js`.
2. Write `Topics.<id>` in the matching file under `js/topics/`.
3. `node tools/build-pages.js` — writes the HTML shell and updates every page's asset version.
4. `node tools/check-topics.js` — must report no problems.

A topic looks like this:

```js
Topics.u2e9 = {
  id: 'u2e9', unit: 2,
  title: 'Something New',
  blurb: 'One line under the heading.',
  hint: 'The reminder shown under the worked examples.',
  examples: [ { title, steps: [...], result, draw, diagram: { w, h } } ],
  generate(rng, difficulty) {          // 'core' | 'hard' | 'expert'
    return [ { prompt, note, tag, draw, diagram, input, explain }, … ];
  }
};
```

Use `rng` for every random choice, never `Math.random`, or `?set=N` stops being reproducible.

## Testing

Both checks should pass before committing.

```bash
node tools/check-topics.js 400
```

Builds every topic 400 times at each of the three difficulties — around 250,000 questions —
and checks each one against its own answer key: numeric answers are whole numbers unless a
tolerance is given, fractions are in lowest terms, typed answers parse and match, multiple
choice has exactly one correct option and no duplicate options, matches and orderings are real
permutations, and every diagram draws without producing a `NaN` coordinate.

```bash
# with the dev server running, open:
http://localhost:8765/tools/selftest.html?runs=6
```

Loads every page in an iframe and checks it renders without console errors, that each question
has an answer control and a prompt, and — the important one — that every angle label on a
polygon is within 1.5° of the angle actually drawn at that corner.

## Progress and scoring

XP, stars and best scores live in `localStorage` on the student's own device. Nothing is sent
anywhere and there is no account. Levels unlock a timer (level 2), a tighter countdown
(level 3) and the harder question sets (level 4). "Reset progress on this device" is on the
home page.

## Deployment

Push to `main`; GitHub Pages serves the folder as it stands. `build-pages.js` stamps a content
hash onto every script and stylesheet link, so an update reaches students who have the old
version cached instead of waiting for their browser to expire it.
