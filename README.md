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
already handed out still work. Science lives under `science/`, one page per subject
(`science/physics.html`, `science/physics/speed.html`). Science was first grouped by year; the build
leaves a small forwarding page at each old address (`science/year-7/exercise-3.html` and so on),
keeping any `?set=N`, so links already shared still work. Every path is built in `js/manifest.js`;
nothing else constructs a URL by hand.

### Science

Science follows **Phase 3 (Years 7–8)** of the *Science Years 0–10* learning area (Ministry of
Education, August 2026; in use from 1 January 2027). Units are by subject (Chemistry, Physics, Earth and Space, Biology), because schools sequence the years differently; within a subject, topics sit under their curriculum sub-strand, Year 7 before Year 8, and each card is tagged with its year. Each exercise is one
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

**Learn it.** Each science topic opens with a collapsible reading section of short idea cards
(a heading, a sentence or two, and usually a diagram), declared as `learn: [{ id, title, text, draw }]`
in the topic. Every question slot names the card that answers it (`learn: 'id'` on the slot, or on
an item), and "Stuck?" links straight to that card; in the daily mix the link opens the topic page
at that card. `node tools/check-topics.js` fails if any question has no card or names a missing one,
and lists any card no question links to.

### English

English follows **Phase 3 (Years 7–8)** of *English Years 0–10* (2025, in effect from 2026), grouped
by strand: Reading, Writing and Oral Language. It practises what can be checked (word knowledge,
grammar, punctuation, language features, and close reading of short passages written for this
site) and leaves reading whole texts and speaking to the classroom. Questions tagged
**Extension** reach towards Year 9. English uses the same banked-question helpers as science
(`Sci` in `js/science.js`) and lives in `js/topics/english-reading.js`, `english-writing.js` and `english-oral.js`; codes are R (reading), W (writing)
and O (oral language). The curriculum PDF is in `reference/`.

**Year 9 challenge.** An exercise can also offer a harder set at `?set=challenge`, chosen from the
set picker or the "★ Year 9 challenge" button. In the topic, a slot marked `challenge: 'only'` appears
only in that set and one marked `challenge: 'also'` (the Extension slot) appears in both; its
questions are tagged *Year 9*. The new ideas get Learn it cards with `years: '9'`. Mark the exercise
`challenge: true` in the manifest too, so its subject card shows the badge and the self-test loads
the challenge page; the checker fails if the two disagree. The content follows the Year 9 column of
Phase 4 in the curriculum. W15, The Literary Essay, is Year 9 throughout (`year: 9` in the manifest), built on a
short story and a poem written for the site.

**Free writing.** W16 (Evidence and Persuasion) and W17 (Show, Don't Tell) each end with a `write`
question (`Sci.write`): a brief, a text box and a minimum word count. Nothing marks the writing, so
the question is untimed and earns full points once it is long enough; the student then ticks a
checklist against their own draft and sees a model, and the box stays open for revising. **Stuck?**
gives the nudges only, never the model. Drafts are kept in the browser, so a reload loses nothing,
and **Copy my writing** puts the brief and the draft on the clipboard to hand to a teacher. Writing
questions stay out of the daily mix.

**Reviewing content.** Authored science items can't be verified by a script: a wrong fact would
pass every test. `tools/review-science.html` lists every item with all its options, the marked
answer and the explanation, each with an ID such as `7.1·Q4·3` for reporting problems.

**Marking what is new.** `tools/review-baseline.json` is a fingerprint of every science item and card
as last approved. The review page marks anything not in it as *new*, with a "Show only new items"
filter. After a batch has been reviewed, take a fresh snapshot with `node tools/review-baseline.js`
and commit it.

**New-version notice.** The build writes `version.json` (the asset version and the date it changed)
and stamps each page with its own version. A page checks the file when the student returns to the
tab and every 15 minutes, and shows a "Refresh" bar if a newer version is live. It never reloads by
itself, since points are saved only when a set is finished. The footer shows the version and date,
so a student's screen can be compared with the live site.

### Coding

Python from scratch for **Years 9 and 10**, pitched at the computational thinking progress
outcomes PO4 to PO5 (*Technology in the New Zealand Curriculum*; the PDF and the development
paper behind it are in `reference/`): programs with inputs, outputs, sequence, selection with
comparative and logical operators, variables of different data types and iteration, with an
organised approach to testing and debugging. Codes run C1 to C8 across two units, Python Basics
(C1–C4) and Loops, Lists and Functions (C5–C8): C1 Output and Strings, C2 Variables and Types,
C3 Input and Calculation, C4 Decisions, C5 While Loops, C6 For Loops and range (with turtle
drawing), C7 Lists and C8 Functions. All eight are written.

Programs run in the page with **Skulpt**, pinned to 1.2.0 and loaded deferred from jsDelivr on
coding exercise pages only (`js/python.js` wraps it). A program that runs for more than three
seconds, or prints more than 20,000 characters, is stopped (so a loop that never ends is caught
either way). Error messages keep Python's own names, with a plain-English line added.

Each exercise has two sets. The main set is a **walk-through** for a student meeting Python for
the first time: one idea per question, seen running before it is predicted, then changed. Code in
a prompt can carry its own **▶ Run** button (`Py.tryIt`), so the first question of an idea is
answered by watching ("Run it. What did it print?"), the next by predicting, and the next by
changing one thing in an almost-finished program; every question has nudges. The **★ Challenge
set** (`?set=challenge`, a unit's `challengeName` in the manifest) holds the harder questions,
for students working to a high standard: predict the output, read the error, spot the line that
breaks, Parsons problems, tracing, then larger programs to change and write. Both follow PRIMM
(Predict, Run, Investigate, Modify, Make). Coding exercises are untimed and score by nudges
taken, as Unit 6 does. Outside coding pages, such as the daily mix, Skulpt is fetched the first
time Run is pressed. The new `code` question is an editor
with Run and Check: Check runs the program against hidden tests, which can set the program's
variables to other values (`set`) and answer `input()` (`inputs`), so typing the answer in does
not pass. A test can also call the student's function after the program (`after`, as in
`print(double(4))`), so a function that prints instead of returning fails with "8, None". A
**turtle** program is marked by what it draws: under Check, `import turtle` is a stand-in that
records each line drawn, rounded to whole units, and the set of lines must match the model's (or
an `alts` program's, such as the mirror image), so any loop that draws the right picture passes.
Under Run it draws on a real canvas with Skulpt's turtle. A failed check is not final: it scores 15, 12, 10 or 8 by how many checks it took.
Code questions stay out of the daily mix.

Skulpt is not quite real Python: `41 / 5` prints `8.199999999999999`, `round(2.675, 2)` gives
2.68 (Python gives 2.67), a missing bracket is reported on the line after it, and a missing indent
is a SyntaxError rather than an IndentationError. Questions steer round these (dividing by 2, 4 or
8; `:.2f` rather than `round`; the explanations name both errors). So **`node tools/check-coding.js`** runs every program a question
shows through both Skulpt and `python3`, and fails unless both agree with the answer; it also
checks every model program passes its tests and every starter program does not, and that each
turtle model draws the same lines in both. Its real Python has the same three seconds and output
cap as the page. The first run
fetches Skulpt from the pinned address into `tools/.cache/` and confirms its checksum.

**Not seen recently.** In free practice and the daily mix, each science slot prefers items the
student has not yet answered (remembered per topic in the browser), then the ones answered longest
ago. Fixed sets (`?set=N`) ignore this, so they stay identical for a whole class.

## Layout

```
index.html              home page: subjects side by side, each section's details on a note (rendered from the manifest)
practice.html           the daily mix (?subject=maths or ?subject=science)
paper.html              the timed paper (maths)
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
  python.js             Python in the page (Skulpt): runs programs, tests them, the code question
  paper.js              the timed paper: builds it, times it, and the reflection after
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
    problems.js         unit 6, problem solving
    science-y7.js       Year 7 science
    science-y8.js       Year 8 science
    coding-basics.js    Coding: Python Basics (C1 to C4)
    coding-loops.js     Coding: Loops, Lists and Functions (C5 to C8)
tools/
  check-topics.js       generates ~200k questions and checks them (node)
  check-paper.js        builds ~3,000 timed papers and checks their sections and marks (node)
  check-coding.js       runs every coding question's programs in Skulpt and real Python (node + python3)
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
| 6 Problem Solving | 5 | non-routine problems in the style of the Otago Problem Challenge, grouped by strategy: make a list, two unknowns without algebra, digits and numbers, what stays the same, logic and grids |

Unit 6 is extension work. Its problems are original, written in the style of the University of
Otago Problem Challenge for intermediate schools, and every answer is found by trying every case
in code rather than typed in, so a generated puzzle with no answer, or two, is rejected and
rebuilt. Its exercises are `untimed: true`: the countdown is hidden and points depend on nudges
used instead of speed (15 unaided, then 12, 10, 8). The unit is `mix: false` in the manifest,
so the daily mix never draws from it.

## Getting unstuck

Every question has a quiet **Stuck?** button that opens help in two steps: first the rule with
no numbers in it, for a student who knows the topic but cannot find the first move; then the
full worked solution for that exact question.

Both routes end at **Try one like it**, which is the part that actually teaches. Understanding
an explanation is recognition, not recall — watching someone else solve it strengthens nothing.
The step that consolidates is the one they do unaided immediately afterwards, and without this
the next question is a different topic and the moment is lost.

A question can carry its own `hints`, a list of nudges that each give a little more away. Then
**Stuck?** hands them out one at a time ("Nudge 1 of 3", "Another nudge") before the full
working, in place of the topic's general rule. Unit 6 uses this on every question.

Nothing that helps with the method is shown before a student tries. A question's `note` sits
under the prompt for everyone, so it holds only instructions needed to answer at all ("two
answers: x, then the angle"). Method help is a `tip`: **Stuck?** gives the topic's general rule
first, then the tip, then the full working. Answer boxes never show a worked example as a
placeholder; `check-topics.js` fails if one contains "e.g." or a digit. On the timed paper,
which has no Stuck?, tips simply do not appear.

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

All of these checks should pass before committing.

```bash
node tools/check-topics.js 400
```

Builds every topic 400 times at each of the three difficulties — around 250,000 questions —
and checks each one against its own answer key: numeric answers are whole numbers unless a
tolerance is given, fractions are in lowest terms, typed answers parse and match, multiple
choice has exactly one correct option and no duplicate options, matches and orderings are real
permutations, and every diagram draws without producing a `NaN` coordinate.

```bash
node tools/check-coding.js
```

Runs every program shown in a coding question through Skulpt and through real Python, and checks
both print exactly the expected answer (or raise the expected error); then runs every model
program against its tests, and every starter program to make sure it does not already pass.

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
a) b) c) d) as in a printed exercise, and marking uses pen colours: a teacher's mark written
over the card's top right corner (a tick, a slash for "not yet", or a circled H for answered
with help), the verdict as a rubber stamp, and the working set in italic like a note in the
margin. Colours are all custom properties, and the diagrams read the same tokens, so dark mode
needs nothing extra from a diagram author.

**Page layout.** Home, unit and exercise pages share one compact header: breadcrumbs, the title,
a line about it, a facts line, and a small XP bar. On an exercise page, Learn it and the worked
examples are two buttons side by side. The examples start open on a first visit and closed once
the exercise has been done, so a returning student finds question 1 on the first screen; a
student's own choice is remembered. "Your turn" and the progress strip stay pinned to the top
while the questions scroll, and the results come up as a pinned note.

**A study desk.** Question cards and worked examples are sheets lying on the desk, with lifted
corners; a "one like it" follow-up is a second sheet tucked under the one it came from. Smaller
boxes are paper objects chosen for their job: nudges and Remember tips are sticky notes, Learn it
cards are index cards, reading passages sit in a cream mount, model answers are deckled paper,
and the daily panel is a pinned note whose pin turns green once practice is done. Paper objects
keep dark ink in both themes (dimmed, not inverted, in the dark), with text contrast of at least
4.5:1; the question sheets themselves follow the theme. Nothing long tilts, and nothing with
maths or an input in it tilts at all. All of it is CSS, with no images, and it flattens for print.

## Timed paper

`paper.html` is practice at managing time in an assessment, for maths. The skill is budgeting,
not speed: see the whole paper, give each question time in proportion to its marks, notice when
one runs over, and move on so the easy marks at the end are not left unclaimed. So there are no
points for going fast, only marks.

**The paper.** Section A is one question each from Units 1 to 5, early in a topic's set (1 mark
each). Section B is parts (a), (b) and (c) from one topic, one from each third of its set, so
they rise in difficulty (1 mark a part). Section C is one Unit 6 problem at core difficulty,
worth 5 marks, all or nothing: it is the question that tempts a student to stay too long. A
short paper is 4 + 2 + 1 questions (15 marks), a full paper 8 + 4 + 1 (25 marks).

**The clock.** Every question's budget is its marks times the pace: Relaxed 1.5 minutes a mark
(about an IB maths paper), Standard 1.2, Exam 1.0. The paper time is the total, rounded up:
15 to 23 minutes for a short paper, 25 to 38 for a full one. These rates are a first guess,
to be tuned once students have sat a few.

**The flow.** Reading time shows every question, inert, with its marks and budget, and asks
four predictions: which question first, which last, which will take longest, and whether they
will finish in time. Then the clock starts. One question is on screen at a time, so time spent
can be measured; students move freely, flag questions to come back to, and can change any
answer until they hand in. Nothing is marked before then. Past 1.5 times a question's budget a
quiet note suggests flagging it and moving on. When time runs out a banner says so, but the
paper stays open: anything answered afterwards counts as after time.

**The results.** Marks in time and after time; each prediction against what happened; a bar per
question of time spent against budget; one or two lessons from simple rules (blank questions at
time-up and what they would have cost, the worst overspend as a share of time and marks, working
straight through, time to spare); and a line against the last paper, kept in the browser. Then
every answer, marked, with the usual working. A paper counts as the day's practice and earns XP
from the in-time marks.

**Sharing.** `paper.html?length=full&pace=exam&units=1,2,3&diff=core&seed=4821` is one specific
paper, the same for everyone; the reading screen has a button that copies it.
`node tools/check-paper.js` builds about 3,000 papers and checks every one.

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
Monday, shown as seven dots, with a calendar of recent weeks behind the "Record" link. A streak is a number you can
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
is under "What is this?" on the home page.

Star XP is awarded once per star tier per exercise, as before. On top of that there is a small
**effort XP** award for finishing any set, so the bar still moves for a student who has already
three-starred everything: without it, XP froze permanently and any daily goal measured in XP
became impossible. Effort XP is capped per day, so it cannot be ground into unlocking Expert
mode and its harder questions.

## Deployment

Push to `main`; GitHub Pages serves the folder as it stands. `build-pages.js` stamps a content
hash onto every script and stylesheet link, so an update reaches students who have the old
version cached instead of waiting for their browser to expire it.
