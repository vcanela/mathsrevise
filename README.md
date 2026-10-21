# Revision

A self-contained revision site for Year 8–10 maths (number, algebra, geometry, and the
places where algebra and geometry meet) and Year 7–8 science. No frameworks, no build step, no server. Open
`index.html` or publish the folder to GitHub Pages.

**Maths: 5 units · 21 exercises. Science: 2 years · 15 exercises. 10 questions each, fresh every time.**

There is also a **daily practice** session: five questions, about two minutes, mixed across
the units and chosen from whatever the student has seen least recently.

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

## Two subjects

The site carries **Maths** and **Science** on one engine. Both share the XP bar and the weekly
target, so a day spent on either counts as a day practised; each has its own daily mix
(`practice.html?subject=maths` or `?subject=science`).

Maths keeps its original URLs (`units/unit-2.html`, `exercises/unit-2/exercise-4.html`) so links
already handed out still work. Science lives under `science/` (`science/year-7.html`,
`science/year-7/exercise-3.html`). Every path is built in `js/manifest.js`; nothing else
constructs a URL by hand.

### Science

Science follows **Phase 3 (Years 7–8)** of the *Science Years 0–10* learning area (Ministry of
Education, August 2026; in use from 1 January 2027). Units are by year; each exercise is one
knowledge heading for that year, and its practice questions come from the matching practices
column. Questions stay inside the knowledge statements: where the curriculum stops short of a
formula or a term, so do the questions. The curriculum PDF itself sits in `reference/`, which
is git-ignored and never published.

Science questions come in two kinds. **Quantitative** ones (speed, mass, reading a graph) are
generated with fresh numbers, like the maths. **Conceptual** ones cannot be, so each question
*slot* holds a pool of authored items testing the same idea; a visit picks one per slot, and
"Try one like it" picks another from the same slot. Topics are declared with `Sci.topic()` in
`js/science.js`, giving `slots` instead of a `generate` function.

An exercise can be listed in the manifest with `soon: true` before it is written. It then shows on
its unit page as a dashed placeholder, gets no page, and is left out of the daily mix.

**Reviewing content.** Authored science items can't be verified by a script: a wrong fact would
pass every test. `tools/review-science.html` lists every item with all its options, the marked
answer and the explanation, each with an ID such as `7.1·Q4·3` for reporting problems.

## Layout

```
index.html              home page (rendered from the manifest)
practice.html           the daily mix (?subject=maths or ?subject=science)
units/unit-N.html       one per maths unit
exercises/unit-N/…      one per maths exercise; each is a ~20 line shell
science/year-N.html     one per science year
science/year-N/…        one per science exercise
reference/              the curriculum PDF; git-ignored, never published
css/style.css           the whole stylesheet, light and dark
js/
  manifest.js           the list of units and exercises — the single source of truth
  engine.js             renders an exercise page: cards, inputs, scoring, results
  nav.js                renders the home and unit pages
  practice.js           picks what is due and builds the mixed session
  habit.js              the daily panel: weekly target and practice calendar
  game.js               XP, levels, stars and practice days, in localStorage
  timer.js              the per-question countdown bar
  rng.js                seeded random numbers (this is what ?set=N controls)
  algebra.js            parses and compares typed algebraic expressions
  geometry.js           builds and measures shapes; the SVG drawing surface
  diagrams.js           balance scales, tiles, number lines, nets, circles
  science.js            science question builders; particle, state-change and graph diagrams
  format.js             turning numbers into the TeX a student expects to read
  mathjax.js            loads MathJax
  topics/
    number.js           unit 1
    algebra.js          unit 2
    geometry.js         unit 3
    combined.js         unit 4
    words.js            unit 5
    science-y7.js       Year 7 science
    science-y8.js       Year 8 science
tools/
  check-topics.js       generates ~200k questions and checks them (node)
  selftest.html         loads every page in a browser and checks it renders
  check-diagrams.html   measures every diagram against its own viewBox
  review-science.html   every authored science item and its answer, for a teacher to read
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

## Getting unstuck

Every question has a quiet **Stuck?** button that opens help in two steps: first the rule with
no numbers in it, for a student who knows the topic but cannot find the first move; then the
full worked solution for that exact question.

Both routes end at **Try one like it**, which is the part that actually teaches. Understanding
an explanation is recognition, not recall — watching someone else solve it strengthens nothing.
The step that consolidates is the one they do unaided immediately afterwards, and without this
the next question is a different topic and the moment is lost.

The same button appears on any question answered **wrong**, which is the same moment
pedagogically and used to be a dead end.

A follow-up is a genuine twin: same topic, same index in that topic's set, fresh numbers.
Question 4 of Collecting Like Terms is always "two letters, coefficients only", so
regenerating at the same index gives the same kind of question rather than merely the same
topic. `tools/check-topics.js` enforces that indexes stay stable, because the feature silently
breaks if a generator ever starts varying what it emits at a position.

Scoring follows from the aim. A question taken with help scores **zero, never negative**, so
asking is safe. The follow-up scores **normally**, so the marks are won back by doing one
yourself. Getting a follow-up wrong costs nothing either — charging for a second chance would
make it something to avoid. Follow-ups chain two deep, labelled 3a and 3b, and indent under
the question they came from so the record of where help was needed stays visible.

## Question types

The engine renders nine kinds of answer control. A generator picks whichever suits the question.

- **`number`** — one box, optionally with a prefix or unit.
- **`fill`** — a row of text and boxes, for example `= □x + □`. Also does stacked fractions.
- **`choice`** — multiple choice.
- **`expr`** — the student types an expression. Compared by value, not spelling, so `3 + 2n`
  and `2n + 3` both pass. With `mode: 'factorised'` it also insists the answer really is
  factorised, so `2(2x + 4)` is rejected as unfinished.
- **`spot`** — a worked solution with one wrong line; click the mistake.
- **`match`** — pair items across two columns.
- **`order`** — click steps into sequence.
- **`sort`** — put each item into one of a few groups (constant or changing speed; thermal
  energy added or removed). Has an explicit Check button, since students often look back over
  their sorting before committing.
- **`label`** — numbered markers on a diagram, each named from a drop-down.

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

All three checks should pass before committing.

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

```bash
# also with the dev server running:
http://localhost:8765/tools/check-diagrams.html?runs=4
```

Measures the real ink bounds of every drawing against its viewBox and reports anything that
spills over the edge, which is what makes a diagram look cut off. Worth running after changing
anything in `diagrams.js` or a diagram size.

## The look

The design is meant to read as "worked in pen, on good paper": a warm ground with a faint
squared grid, IBM Plex Serif for anything mathematical, IBM Plex Sans for interface chrome,
IBM Plex Mono in the answer boxes. MathJax sets formulas in a serif face, so the prose around
them is serif too and the two sit together rather than clashing.

Answers are fill-in-the-blank boxes ruled in ochre underneath, multiple choice is lettered
a) b) c) d) as in a printed exercise, and marking uses pen colours: a green or red rule down
the margin of the card, a small-caps verdict, and the working set in italic like a note in
the margin. Colours are all custom properties, and the diagrams read the same tokens, so
dark mode needs nothing extra from a diagram author.

## Daily practice and keeping it up

`practice.html` builds a short mixed session, and this is the part meant to bring students
back. Three deliberate choices sit behind it.

**It is short on purpose.** Five questions, about two minutes. The daily bar has to be low
enough that doing it is easier than skipping it; a five minute task gets put off on a busy
evening and the habit dies. Anyone with more time presses "Five more", or opens any of the 21
exercises, which are as long as they ever were.

**The questions are chosen, not random.** `Practice.priorities()` ranks every topic by how
overdue it is: never attempted comes first, then longest since last seen, then fewest stars.
That is spaced repetition. Mixing topics in one session also forces the student to work out
*which* method applies rather than being told by the page heading, which is where most marks
actually go missing. Each question is tagged with the exercise it came from and links there,
so a student who keeps missing one kind can go and drill it.

Today's session is seeded from the date, so it is one specific thing all day. `?r=…` asks for
a different one (the shuffle button) and `?set=N` seeds it identically for everyone, which is
how a class can be given the same practice.

**Regularity is a weekly target, not a streak.** The goal is four days a week, resetting every
Monday, shown as seven dots plus a calendar of recent weeks. A streak is a number you can
lose, and the students most likely to lose one — away for a weekend, off ill, on holiday over
a term break — are exactly the ones worth keeping. A weekly target costs a missed day and
nothing more, and the calendar gives the satisfying part of a streak with no failure state.
If you disagree and want a streak, `MRG.habitSummary()` already returns the longest run.

Finishing the daily mix leads with "That is today's practice done" rather than the score, and
says outright that coming back tomorrow counts for more than doing extra now. That is not just
encouragement: effort XP is capped per day, so it is literally true.

## Progress and scoring

XP, stars, best scores and practice days live in `localStorage` on the student's own device.
Nothing is sent anywhere and there is no account. Levels unlock a timer (level 2), a tighter
countdown (level 3) and the harder question sets (level 4). "Reset progress on this device"
is on the home page.

Star XP is awarded once per star tier per exercise, as before. On top of that there is a small
**effort XP** award for finishing any set, so the bar still moves for a student who has already
three-starred everything: without it, XP froze permanently and any daily goal measured in XP
became impossible. Effort XP is capped per day, so it cannot be ground into unlocking Expert
mode and its harder questions.

## Deployment

Push to `main`; GitHub Pages serves the folder as it stands. `build-pages.js` stamps a content
hash onto every script and stylesheet link, so an update reaches students who have the old
version cached instead of waiting for their browser to expire it.
