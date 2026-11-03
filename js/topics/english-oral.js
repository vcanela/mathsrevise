'use strict';
// ── Revision · English, Oral Language (Years 7–8) ─────────────────────────────────
// Phase 3 of English Years 0–10 (2025, in effect from 2026). Each exercise
// follows the knowledge and practices of one element or sub-element.
//
// The site practises what can be checked: word knowledge, grammar,
// punctuation, language features and close reading of short passages written
// for this site. Reading whole texts, writing them, and speaking are left to
// the classroom. Questions tagged Extension reach towards Year 9.
//
// Every example is written to have one defensible answer. Keep it that way
// when adding more: if a second option could be argued for, change it.
// ─────────────────────────────────────────────────────────────────────────────

(() => {
  const C = Sci.choice, TF = Sci.tf;
  const EXT = 'Extension';

  // ═══ O14 Language for discussion and argument ═════════════════════════════
  // Oral Language (Years 7–8), the knowledge side of what is mostly spoken
  // practice. Verbal reasoning: precise language; open questions that test
  // assumptions; Year 8 evaluative and modal language (more convincing, less
  // reliable, likely, unlikely). Presenting: rhetorical questions, inclusive
  // pronouns, signposting, analogies, conversational language in podcasts,
  // cultural oral structures (mihi, pepeha, whaikōrero), voice and body.
  // Listening and responding: paraphrasing, discussion roles, respectful
  // disagreement. Reflective language and specific feedback.
  // Extension: formal debate conventions.

  Sci.topic({
    id: 'eo14', unit: 'oral',
    title: 'Language for Discussion and Argument',
    blurb: 'The words that make a discussion fair, a question sharp and a presentation clear.',
    hint: 'Open questions invite thinking (why, how, what if); closed ones get yes or no. Modal words (will, probably, might) show how certain you are. ' +
          'Paraphrase to check you understood. Disagree with the idea, not the person. Give feedback that is specific.',

    learn: [
      { id: 'questions', title: 'Open and closed questions',
        text: '<p><strong>Closed</strong>: a short, fixed answer. <em>Did you like it?</em></p><p><strong>Open</strong>: invites explanation. <em>Why do you think the character lied?</em></p>' +
              '<p>Open questions explore perspectives, test assumptions and consider consequences.</p>' },
      { id: 'assumptions', title: 'Testing assumptions',
        text: '<p>An <strong>assumption</strong> is something believed without proof.</p><p>Questions that test it: <em>What are we assuming about this person’s motivation? Where is the evidence for that?</em></p>' },
      { id: 'modal', title: 'Modal and evaluative language (Year 8)',
        text: '<p><strong>Modal</strong> words show how likely or certain something is:</p><p>will → probably will → might → probably won’t → won’t</p>' +
              '<p><strong>Evaluative</strong> words judge: <em>more convincing, less reliable, a stronger argument</em>.</p>' },
      { id: 'roles', title: 'Discussion roles',
        text: Sci.table(['Role', 'Job'], [['Facilitator', 'keeps the discussion on track and fair'], ['Speaker', 'shares ideas clearly'], ['Listener', 'pays attention and responds'],
          ['Questioner', 'asks questions to deepen thinking'], ['Summariser', 'sums up agreement and difference']]) },
      { id: 'listening', title: 'Paraphrasing and clarifying',
        text: '<p><strong>Paraphrasing</strong> restates someone’s idea in your own words, to show understanding or check meaning.</p>' +
              '<p><em>“So what you’re saying is …”</em> &nbsp; <em>“That links to what we learnt before …”</em></p>' },
      { id: 'respect', title: 'Respectful disagreement',
        text: '<p>Challenge the <strong>idea</strong>, not the person.</p><ul><li><em>“I see your point, but …”</em></li><li><em>“Can you tell me more about your view?”</em></li><li><em>“I disagree, because the evidence shows …”</em></li></ul>' },
      { id: 'feedback', title: 'Feedback and reflection',
        text: '<p>Useful feedback is <strong>specific</strong>: <em>“One thing that worked well was your opening question. Next time you could slow down in the middle.”</em></p>' +
              '<p>Reflective language: <em>“I chose that strategy because …”, “Next time I’ll try …”</em></p>' },
      { id: 'present', title: 'Presenting',
        text: '<ul><li><strong>Speeches</strong>: rhetorical questions, inclusive “we” and “our”, cue cards</li><li><strong>Podcasts</strong>: conversational language, signposting (“Next, let’s look at …”), analogies</li>' +
              '<li><strong>Storytelling</strong>: figurative language, clear structure, pace and tone</li><li><strong>Cultural structures</strong>: mihi, pepeha and whaikōrero shape how a message is delivered</li>' +
              '<li><strong>Voice and body</strong>: volume, pace, tone, gesture and eye contact guide attention</li></ul>' },
      { id: 'debate', title: 'Extension: formal debate',
        text: '<p>Formal debates follow set conventions: an <strong>affirmative</strong> team argues for the moot, a <strong>negative</strong> team against it.</p>' +
              '<p>Speakers <strong>rebut</strong> (answer) the other side’s points, and must be respectful even in disagreement.</p>' }
    ],

    examples: [
      {
        title: 'Example 1: from closed to open',
        steps: ['Closed: <em>Was the ending sad?</em> (yes or no)', 'Open: <em>How did the ending change your view of the main character?</em>',
                'The open question asks for thinking and evidence, not just a one-word answer.']
      },
      {
        title: 'Example 2: disagreeing well',
        steps: ['Unhelpful: <em>That’s a dumb idea.</em>', 'Helpful: <em>I see why you’d say that, but the data in the article points the other way.</em>',
                'The helpful version respects the person and challenges the idea with evidence.']
      }
    ],

    slots: [
      { name: 'Open or closed?', learn: 'questions',
        items: [rng => Sci.sort(rng, { prompt: 'Is each question open or closed?', bins: ['Open', 'Closed'],
          items: [
            { text: 'Why do you think the character lied?', bin: 0 }, { text: 'How might the story change if it were told by the villain?', bin: 0 },
            { text: 'What would happen if we banned cars from the city centre?', bin: 0 }, { text: 'How could we make the playground fairer?', bin: 0 }, { text: 'What makes a good leader?', bin: 0 },
            { text: 'Did you finish the book?', bin: 1 }, { text: 'Is the poem about the sea?', bin: 1 }, { text: 'How many pages is it?', bin: 1 },
            { text: 'Do you agree?', bin: 1 }, { text: 'Was the speech long?', bin: 1 }
          ], pick: 6,
          explain: 'Closed questions have a short, fixed answer. Open questions invite explanation and different views.' })] },
      { name: 'Year 8: how certain?', learn: 'modal',
        items: [
          rng => Sci.order(rng, 'Put these from most certain to least certain.', ['This will reduce litter.', 'This will probably reduce litter.', 'This might reduce litter.', 'This is unlikely to reduce litter.'], 'Will → probably will → might → unlikely: modal words show degrees of certainty.'),
          rng => Sci.order(rng, 'Put these from most certain to least certain.', ['It is certain to rain.', 'It is likely to rain.', 'It could possibly rain.', 'It is very unlikely to rain.'], 'Certain → likely → possibly → very unlikely.'),
          rng => Sci.order(rng, 'Put these from strongest to weakest judgement.', ['This is the most convincing argument.', 'This is a fairly convincing argument.', 'This argument is not very convincing.', 'This argument is completely unconvincing.'], 'Evaluative language can be graded from strong to weak.'),
          rng => Sci.order(rng, 'Put these from most reliable to least reliable source.', ['A government health agency’s website', 'A newspaper opinion column', 'An anonymous social media post'], 'Reliability depends on expertise, checking and accountability.'),
          rng => Sci.order(rng, 'Put these from most certain to least certain.', ['We will win.', 'We should win.', 'We may win.', 'We probably won’t win.'], 'Will → should → may → probably won’t.'),
          rng => Sci.order(rng, 'Put these from most certain to least certain.', ['Definitely', 'Probably', 'Possibly', 'Unlikely'], 'Each word shows a lower degree of certainty than the one before.')
        ] },
      { name: 'Testing assumptions', learn: 'assumptions',
        items: [
          ['A character arrives late, and someone says he must be lazy.', 'What else might explain why he was late?', ['Was he late?', 'What time is it now?', 'Who else was there?']],
          ['A classmate says the new rule is unfair because everyone hates it.', 'How do we know everyone hates it?', ['When was the rule made?', 'Is the rule written down?', 'Do you like rules?']],
          ['An article claims young people do not care about the environment.', 'Where is the evidence for that claim?', ['Who wrote the article?', 'How long is the article?', 'Is the article online?']],
          ['Someone says the expensive phone must be the best.', 'Are we assuming that price means quality?', ['How much is the phone?', 'What colour is it?', 'Where is it sold?']],
          ['A group decides the quiet student has nothing to say.', 'What are we assuming about why she is quiet?', ['Is she in our class?', 'What is her name?', 'Does she sit at the front?']],
          ['A team says they lost because the referee was biased.', 'What evidence shows the referee was biased?', ['What was the score?', 'Where was the game?', 'Who scored first?']]
        ].map(([situation, right, wrong]) => rng => C(rng, { prompt: `${situation} Which question best tests the assumption?`, right, wrong,
          explain: 'A good question asks for evidence, or for other explanations, before accepting the belief.' })) },
      { name: 'Discussion roles', learn: 'roles',
        items: [Sci.gen(rng => {
          const rows = rng.sample([['Facilitator', 'Keeps the discussion on track and fair'], ['Speaker', 'Shares ideas clearly'], ['Listener', 'Pays close attention and responds'],
                                   ['Questioner', 'Asks questions to deepen thinking'], ['Summariser', 'Sums up agreement and difference']], 4);
          return Sci.match(rng, 'Match each discussion role to its job.', rows, 'Roles help keep a discussion inclusive, focused and respectful.');
        })] },
      { name: 'The best paraphrase', learn: 'listening',
        items: [
          ['“I think we should have the class trip at the beach, because it’s free and everyone can get there by bus.”', 'So you’re saying the beach is a good choice because it costs nothing and is easy to reach.', ['So you hate the museum.', 'So you want to go by bus.', 'So you think trips are a waste of money.']],
          ['“The character changes because she realises her friends were never really on her side.”', 'So her change comes from realising her friends were not loyal.', ['So she has no friends.', 'So the friends were the main characters.', 'So she was always loyal.']],
          ['“Phones should stay in bags during class, but students could use them at lunch.”', 'So you think phones should be allowed only outside class time.', ['So you want to ban phones completely.', 'So you think phones are fine in class.', 'So you don’t care about phones.']],
          ['“I liked the poem’s images, but the ending felt rushed.”', 'So the images worked for you, but the ending needed more time.', ['So you didn’t like the poem.', 'So the poem was too long.', 'So the ending was the best part.']],
          ['“Recycling helps, but cutting down on plastic in the first place matters more.”', 'So you think using less plastic is more important than recycling it.', ['So you think recycling is useless.', 'So you want more plastic.', 'So recycling and reducing are the same.']],
          ['“The speech was convincing, mostly because of the speaker’s own story.”', 'So the personal anecdote is what made it persuasive for you.', ['So the speech had no evidence.', 'So the speech was too personal.', 'So you didn’t find it convincing.']]
        ].map(([said, right, wrong]) => rng => C(rng, { prompt: `Someone says: <em>${said}</em> Which is the best paraphrase?`, right, wrong,
          explain: 'A good paraphrase keeps the whole meaning, including any “but”, in your own words.' })) },
      { name: 'Disagreeing respectfully', learn: 'respect',
        items: [
          ['A classmate says the novel’s ending was perfect. You disagree.', 'I see why you liked it, but I felt the ending left too many questions.', ['That’s just wrong.', 'Only people who didn’t read it carefully think that.', 'Whatever.']],
          ['In a group, someone suggests a plan you think will fail.', 'Can you tell me more about how it would work? I’m worried about the cost.', ['That’s the worst idea yet.', 'No.', 'We’re not doing your idea.']],
          ['Someone shares a view on a controversial topic that you strongly oppose.', 'I hear you. I see it differently, because of what I read in the report.', ['You’re being ridiculous.', 'Everyone knows you’re wrong.', 'Let’s not listen to that.']],
          ['A friend says your argument has no evidence.', 'That’s fair. Here is the source I was thinking of.', ['You never have evidence either.', 'I don’t need evidence.', 'Stop attacking me.']],
          ['Two group members keep talking over each other.', 'Let’s hear one idea at a time. Mere, would you like to finish?', ['Both of you, be quiet.', 'I’m not listening to either of you.', 'This group is hopeless.']],
          ['Someone summarises your idea wrongly.', 'Not quite. What I meant was that we should start earlier, not cancel it.', ['You never listen.', 'That’s not what I said, obviously.', 'Forget it.']]
        ].map(([situation, right, wrong]) => rng => C(rng, { prompt: `${situation} Which response is most respectful and constructive?`, right, wrong,
          explain: 'Respectful disagreement acknowledges the other person, then challenges the idea with reasons.' })) },
      { name: 'Specific feedback', learn: 'feedback',
        items: [
          rng => C(rng, { prompt: 'Which feedback on a speech is most useful?', right: 'Your opening question grabbed us. Next time, slow down in the middle section.', wrong: ['Good job.', 'It was okay.', 'I didn’t like it.'], explain: 'Useful feedback is specific about what worked and what to try next.' }),
          rng => C(rng, { prompt: 'Which feedback on a story draft is most useful?', right: 'The setting is vivid. Try adding a clue earlier so the twist feels fair.', wrong: ['Nice.', 'Make it better.', 'It’s too long.'], explain: 'It names a strength and gives a clear next step.' }),
          rng => C(rng, { prompt: 'Which sentence is reflective language about your own learning?', right: 'I chose to plan with a mind map because it helped me see links. Next time I’ll try an outline.', wrong: ['I finished.', 'My work is done now.', 'That was the task.'], explain: 'Reflective language explains choices and plans next steps.' }),
          rng => C(rng, { prompt: 'A peer gives you feedback you disagree with. What is the best response?', right: 'Think it through, and if you don’t use it, be able to explain why.', wrong: ['Ignore all feedback.', 'Accept every suggestion without thinking.', 'Argue until they take it back.'], explain: 'Writers weigh feedback carefully and justify their decisions.' }),
          rng => C(rng, { prompt: 'Which sentence starter helps give positive, specific feedback?', right: '“One thing that worked well was …”', wrong: ['“You always …”', '“This is bad because …”', '“Why didn’t you …”'], explain: 'It focuses on a specific strength.' }),
          rng => C(rng, { prompt: 'Which sentence starter helps suggest an improvement kindly?', right: '“Next time you could try …”', wrong: ['“You got this wrong.”', '“This doesn’t work at all.”', '“Everyone noticed that …”'], explain: 'It points forward, towards a goal.' })
        ] },
      { name: 'Presenting', learn: 'present',
        items: [
          rng => C(rng, { prompt: 'Why might a speaker use “we” and “our” in a speech?', right: 'To build connection by including the audience', wrong: ['To avoid naming themselves', 'To make the speech shorter', 'Because “I” is not allowed'], explain: 'Inclusive pronouns make the audience feel part of the message.' }),
          rng => C(rng, { prompt: 'A podcast host says, “Next, let’s look at why this matters.” What is this?', right: 'Signposting', wrong: ['A rhetorical question', 'A cliché', 'A pun'], explain: 'Signposting tells listeners where the talk is going.' }),
          rng => C(rng, { prompt: 'Why do podcasts often use conversational language?', right: 'It builds rapport with listeners and sounds natural.', wrong: ['It is required by law.', 'It makes episodes shorter.', 'Listeners prefer formal language.'], explain: 'Informal, natural speech helps listeners feel spoken to.' }),
          rng => C(rng, { prompt: 'A speaker explains the heart as “a pump, like the one that fills a paddling pool.” What is this?', right: 'An analogy', wrong: ['A rhetorical question', 'Signposting', 'An anecdote'], explain: 'An analogy explains something new by comparing it to something familiar.' }),
          rng => C(rng, { prompt: 'Why might a speaker begin with a pepeha?', right: 'To introduce themselves through their connections to people and place', wrong: ['To summarise their main argument', 'To end the speech', 'To ask the audience a question'], explain: 'Oral structures such as pepeha reflect cultural identity and shape how a message is received.' }),
          rng => C(rng, { prompt: 'A storyteller lowers their voice and slows down before the scariest moment. Why?', right: 'To build tension and draw the audience in', wrong: ['Because they forgot the words', 'To end the story early', 'To make it harder to hear'], explain: 'Voice modulation (pace, volume, tone) guides the audience’s attention and mood.' })
        ] },
      { name: 'True or false', learn: 'questions',
        items: [
          rng => TF(rng, { statement: 'An open question can usually be answered with yes or no.', answer: false, learn: 'questions', explain: 'That describes a closed question.' }),
          rng => TF(rng, { statement: 'An assumption is something believed without proof.', answer: true, learn: 'assumptions', explain: 'Good questions can test whether it is fair or accurate.' }),
          rng => TF(rng, { statement: '“Might” sounds more certain than “will”.', answer: false, learn: 'modal', explain: '“Will” is more certain; “might” leaves room for doubt.' }),
          rng => TF(rng, { statement: 'Paraphrasing means repeating someone’s exact words.', answer: false, learn: 'listening', explain: 'It means restating the idea in your own words.' }),
          rng => TF(rng, { statement: 'Respectful disagreement challenges the idea, not the person.', answer: true, learn: 'respect', explain: 'It keeps a discussion safe and productive.' }),
          rng => TF(rng, { statement: 'A summariser sums up areas of agreement and difference.', answer: true, learn: 'roles', explain: 'That helps the group see where it stands.' })
        ] },
      { name: 'Extension: formal debate', learn: 'debate',
        items: [
          rng => C(rng, { tag: EXT, prompt: 'In a formal debate, which team argues for the moot?', right: 'The affirmative team', wrong: ['The negative team', 'The adjudicator', 'The audience'], explain: 'The affirmative supports the moot; the negative opposes it.' }),
          rng => C(rng, { tag: EXT, prompt: 'What does it mean to rebut in a debate?', right: 'To answer and challenge the other team’s arguments', wrong: ['To agree with everything', 'To read your speech twice', 'To change sides'], explain: 'Rebuttal shows why the opposing points are weaker.' }),
          rng => C(rng, { tag: EXT, prompt: 'What is a “moot”?', right: 'The statement or topic being debated', wrong: ['The winning team', 'A kind of question', 'The time limit'], explain: 'For example: “That school uniforms should be abolished.”' }),
          rng => C(rng, { tag: EXT, prompt: 'Why do formal debates have strict conventions?', right: 'They support structured, fair and respectful disagreement.', wrong: ['To make debates longer', 'To stop anyone from disagreeing', 'So only one team speaks'], explain: 'Conventions such as speaking order and time limits keep it fair.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which is the strongest rebuttal?', right: 'Our opponents say uniforms are expensive, but second-hand uniforms cost less than most casual clothes.', wrong: ['Our opponents are wrong.', 'Their speaker was nervous.', 'We just disagree with them.'], explain: 'It names the point and answers it with evidence.' }),
          rng => C(rng, { tag: EXT, prompt: 'Which kind of evidence would most strengthen a debate argument?', right: 'Data from a reliable, named source', wrong: ['A rumour', 'A personal insult', 'A louder voice'], explain: 'Reliable evidence makes an argument more convincing.' })
        ] }
    ]
  });

})();
