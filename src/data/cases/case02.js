// Episode 2 — INNOCENT case (a decoy that feels very guilty).
export default {
  id: 'case02',
  episode: 2,
  chapter: 'Chapter 1: Trust Issues',
  title: 'The Midnight Text Bandit',
  location: 'The Verma Bedroom, 2 AM',
  isReal: false,
  correctVerdict: 'innocent',

  client: { name: 'Pinky', portrait: 'woman', mood: 'red-eyed from no sleep' },
  intro:
    "Detective! Mera husband Raju raat 2 baje tak phone mein ghusa rehta hai. " +
    "Giggling. Whispering. 'Yes! YESSS!' bolta hai andhere mein. " +
    "Main jaagti hoon toh phone ulta kar deta hai. Kaun hai woh?! Uska naam kya hai?!",

  scene: {
    label: 'A dark bedroom at 2 AM. Tap to shine your torch on the clues.',
    clues: [
      { id: 'phone', prop: 'phone', x: 60, y: 26, title: 'The Glowing Phone',
        text: 'Screen still on. A message: "GG bro, you carried the whole team. 🎲" Who is "bro"? And why the dice?' },
      { id: 'die', prop: 'die', x: 20, y: 34, title: 'A Tiny Dice App Icon',
        text: 'App called "Ludo Legends: Battle Royale". Level 87. Clan: "Bedroom Warriors". Uh oh.' },
      { id: 'moon', prop: 'moon', x: 78, y: 46, title: 'Nightly Pattern',
        text: 'Every night, exactly 11 PM to 2 AM. The same window. The same... "tournament schedule"?' },
      { id: 'coffee', prop: 'coffee', x: 34, y: 62, title: 'Cold Coffee Graveyard',
        text: 'Six empty mugs. This man has not slept properly in weeks. Love? No. Ranked mode? Yes.' },
      { id: 'chat', prop: 'newspaper', x: 70, y: 70, title: 'Group Chat Printout',
        text: '"Meesha" (his mystery contact) turns out to be "Meesho_GodOfLudo" — a 14-year-old from Indore.' },
    ],
  },

  suspects: [
    {
      name: 'Raju (the husband)',
      portrait: 'man',
      tag: 'The "Night Whisperer"',
      questions: [
        { q: 'Who do you text at 2 AM?', a: 'My clan, Pinky! We’re in the semi-finals! Do you know how hard it is to roll a six under pressure?!' },
        { q: 'Why do you whisper "yesss" in the dark?', a: 'Because I knocked out Meesho’s last token! Three years I’ve waited for that moment!' },
        { q: 'Who is "Meesha"?', a: 'Meesho. He’s 14. He’s my rival. He’s also grounded right now so we’re winning. Don’t tell his mom.' },
      ],
    },
    {
      name: 'Chintu (his best friend)',
      portrait: 'person',
      tag: 'Clan Member',
      questions: [
        { q: 'Is Raju seeing someone?', a: 'Bro he’s "seeing" a blue token reach home base. That’s his entire personality now.' },
        { q: 'What’s the "Bedroom Warriors" clan?', a: 'Four middle-aged men who should be asleep. We have a logo. Pinky designed it, actually.' },
        { q: 'Any late-night meetups?', a: 'Only online. Raju once left a wedding early to "defend our clan ranking". True story.' },
      ],
    },
  ],

  theories: [
    'A secret midnight affair 💔',
    'He’s in a shady online group 😬',
    'A hilariously harmless obsession 🎲',
  ],

  connections: [
    ['phone', 'die'],
    ['moon', 'coffee'],
  ],

  hint:
    'Dice emoji. A clan. A 14-year-old rival named Meesho. "Semi-finals." ' +
    'This is less "affair", more "someone needs to touch grass".',

  reveal: {
    verdict: 'innocent',
    face: 'face_joy',
    prop: 'die',
    story:
      'Raju was NOT cheating. He was captain of an online Ludo clan, "Bedroom Warriors", ' +
      'grinding ranked matches till 2 AM against a 14-year-old prodigy from Indore. ' +
      'The whispered "yesss" was a triple-six. The giggling was pure serotonin.',
    punch:
      'Pinky was so relieved she joined the clan. She’s now ranked higher than Raju. ' +
      'He hasn’t recovered. The real affair was with the leaderboard all along. 🎲',
  },
};
