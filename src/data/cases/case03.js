// Episode 3 — THE REAL ONE. isReal = true, correctVerdict = 'suspicious'.
// Still harmless & funny (no dark stuff) — but this time something IS hidden.
export default {
  id: 'case03',
  episode: 3,
  chapter: 'Chapter 1: Trust Issues',
  title: 'The Secret of the Locked Drawer',
  location: 'The Kapoor Study',
  isReal: true,
  correctVerdict: 'suspicious',

  client: { name: 'Chintu', portrait: 'man', mood: 'suspiciously calm' },
  intro:
    "Detective, honestly? Meri wife Simran is probably innocent — sab kehte hain main paranoid hoon. " +
    "But there’s ONE locked drawer she NEVER opens in front of me. Money keeps disappearing. " +
    "She takes secret calls in the bathroom. Prove me wrong, detective. Please... prove me wrong.",

  scene: {
    label: 'The study. This one feels different. Look closely at everything.',
    clues: [
      { id: 'laptop', prop: 'laptop', x: 58, y: 24, title: 'The Always-Closing Laptop',
        text: 'She slams it shut when you enter. You glimpse a spreadsheet: "Q3 BURN RATE" and "INVESTOR DECK v9".' },
      { id: 'cash', prop: 'cash', x: 18, y: 30, title: 'Vanishing Money Trail',
        text: '₹2 lakh moved out this month. Recipient: "SPROUT LABS PVT LTD". Not a person. A... company?' },
      { id: 'briefcase', prop: 'briefcase', x: 74, y: 52, title: 'The Locked Drawer, Opened',
        text: 'Inside: business cards reading "Simran Kapoor — Founder & CEO". CEO of WHAT exactly?' },
      { id: 'turtle', prop: 'turtle', x: 30, y: 66, title: 'A Live Turtle. In a Drawer.',
        text: 'A small turtle named (per its tiny name tag) "Mr. Sprout". It blinks at you. It knows things.' },
      { id: 'chart', prop: 'chart', x: 66, y: 72, title: 'Hidden Growth Chart',
        text: 'A hockey-stick graph taped inside the cupboard. Label: "Users 📈". Someone is building something big.' },
    ],
  },

  suspects: [
    {
      name: 'Simran (the wife)',
      portrait: 'woman',
      tag: 'Founder &... ?',
      questions: [
        { q: 'What’s in the locked drawer?', a: 'Nothing! Just... paperwork. And Mr. Sprout. Please don’t look at the burn rate, I beg you.' },
        { q: 'Where is the money going?', a: 'It’s an... investment. In us! Sort of. In a legal, incorporated, VC-adjacent kind of way.' },
        { q: 'Who do you call from the bathroom?', a: 'My... "co-founder". His name is Arjun. It’s STRICTLY about our Series A. Mostly.' },
      ],
    },
    {
      name: 'Arjun (the "co-founder")',
      portrait: 'techie_m',
      tag: 'Mystery Contact',
      questions: [
        { q: 'What is your relationship with Simran?', a: 'We’re co-founders. I handle backend, she handles the turtle-based product vision. It’s complicated.' },
        { q: 'What is Sprout Labs?', a: 'A stealth startup. A social app... for pet turtles. "Tinder for tortoises." We have 40,000 users.' },
        { q: 'Why all the secrecy?', a: 'Chintu keeps saying "startups are gambling". So she hid the whole COMPANY. For eight months. Legend.' },
      ],
    },
  ],

  theories: [
    'A genuine affair — this time it’s real 💔',
    'She’s hiding something big (but harmless) 🚀',
    'Classic overreaction, she’s totally innocent 🥱',
  ],

  connections: [
    ['laptop', 'chart'],
    ['cash', 'briefcase'],
  ],

  hint:
    '"Founder & CEO" cards, a burn rate, an investor deck, ₹2 lakh to a Pvt Ltd, ' +
    'and a turtle named Mr. Sprout. She IS hiding something — just not a person. Trust your gut here.',

  reveal: {
    verdict: 'suspicious',
    face: 'face_mind_blown',
    prop: 'rocket',
    story:
      'This time your suspicion was RIGHT — Simran really was hiding something. Not an affair: ' +
      'a secret startup. She’d quietly founded "Sprout Labs", a social app for pet turtles ' +
      '("Tinder for tortoises"), moved the family savings into it, and hid the entire company ' +
      'for eight months because Chintu once called startups "gambling".',
    punch:
      'The good news: 40,000 users and a term sheet. The turtle, Mr. Sprout, is employee #1. ' +
      'Chintu fainted, then asked for equity. 🐢🚀',
  },
};
