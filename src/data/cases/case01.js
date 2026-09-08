// Episode 1 — INNOCENT case. Clue positions x/y are percentages (0..100) of the
// scene area so they scale to any device.
export default {
  id: 'case01',
  episode: 1,
  chapter: 'Chapter 1: Trust Issues',
  title: 'The Case of the 6 O’Clock Disappearance',
  location: 'The Sharma Living Room',
  isReal: false,
  correctVerdict: 'innocent',

  client: { name: 'Bunty', portrait: 'man', mood: 'sweating buckets' },
  intro:
    "Detective saab! Meri biwi Rani roz shaam 6 baje GAYAB ho jaati hai. Poof! " +
    "Phone silent, lipstick lagaya hua, aur wapas aati hai toh muskura rahi hoti hai. " +
    "Muskura! Kaun muskuraata hai bina wajah?! Kuch toh chal raha hai. Pakdo use!",

  scene: {
    label: 'Tap around the living room. Something always hides in plain sight.',
    clues: [
      { id: 'receipt', prop: 'receipt', x: 15, y: 30, title: 'A Crumpled Receipt',
        text: '₹450 for... 5kg flour, ghee, and "class fee". Flour? For a secret rendezvous? Suspicious. Or delicious.' },
      { id: 'phone', prop: 'phone', x: 68, y: 22, title: 'Her Second Phone',
        text: 'One unread text: "Same time tomorrow? Bring your rolling pin. 😉" A rolling pin emoji. The plot thickens like gravy.' },
      { id: 'lipstick', prop: 'lipstick', x: 40, y: 58, title: 'Fresh Lipstick',
        text: 'Shade: "Biryani Brown". She only wears it at 5:55pm. Every. Single. Day.' },
      { id: 'apronflour', prop: 'cooking', x: 78, y: 62, title: 'Flour Handprints',
        text: 'White powdery handprints on the door. You panicked for a second. It’s flour. Definitely flour. (You tasted it. It’s flour.)' },
      { id: 'calendar', prop: 'calendar', x: 22, y: 74, title: 'Circled Calendar',
        text: '"6 PM" circled in red for 30 days straight, with a tiny drawing of a... samosa?' },
    ],
  },

  suspects: [
    {
      name: 'Rani (the wife)',
      portrait: 'woman',
      tag: 'The "Suspect"',
      questions: [
        { q: 'Where do you go every evening at 6?', a: 'Bunty ko bata dungi toh surprise kharab ho jayega. Bas thoda bharosa rakho, jaanu.' },
        { q: 'Who keeps texting "same time tomorrow"?', a: 'That’s Neetu. We’re... partners. In a very intense, very floury operation.' },
        { q: 'Why the secret second phone?', a: 'Kyunki tum meri gallery mein ghus ke sab dekhte ho, Sherlock. It’s for the group chat.' },
      ],
    },
    {
      name: 'Neetu (the neighbour)',
      portrait: 'old_woman',
      tag: 'Nosy Witness',
      questions: [
        { q: 'Where does Rani go at 6?', a: 'Beta, main sirf apni balcony se dekhti hoon. Aur roz woh haath mein dabba le kar jaati hai. Dabba!' },
        { q: 'What’s in the dabba?', a: 'Khushboo aati hai... masala... pyaaz... Hai Allah, mujhe bhookh lag gayi.' },
        { q: 'Is there another man?', a: 'Ek "chef Ramesh" ka naam suna tha. Par woh sabko "beta" bulaata hai. 60 saal ka hai. Chill.' },
      ],
    },
  ],

  theories: [
    'She’s having a scandalous affair 🔥',
    'She’s running a secret spy operation 🕵️',
    'Something sweet & totally innocent 🥰',
  ],

  connections: [
    ['receipt', 'apronflour'],
    ['phone', 'calendar'],
  ],

  hint:
    'Flour + a "class fee" + a rolling-pin emoji + "chef Ramesh who calls everyone beta". ' +
    'Detective, follow your stomach on this one.',

  reveal: {
    verdict: 'innocent',
    face: 'face_love',
    prop: 'rice',
    story:
      'Rani wasn’t cheating. She was secretly taking evening COOKING CLASSES from ' +
      '60-year-old Chef Ramesh — to surprise Bunty on their anniversary with the ' +
      'legendary Hyderabadi biryani his late mother used to make.',
    punch:
      'Bunty cried into the biryani. The biryani was worth it. 🍛 ' +
      'He also cried because it was very spicy. Both are valid.',
  },
};
