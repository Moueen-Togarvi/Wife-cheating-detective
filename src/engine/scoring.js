// Pure scoring logic for the Trust Meter, stars and detective ranks.
// The twist system: most cases are innocent (correctVerdict === 'innocent');
// roughly every 10th case is "real" (isReal + correctVerdict === 'suspicious').
// Over-suspicion is punished; catching a genuinely real case is richly rewarded.

export const TRUST_START = 50;
export const TRUST_MAX = 100;
export const TRUST_MIN = 0;

const clamp = (v) => Math.max(TRUST_MIN, Math.min(TRUST_MAX, v));

// Funny detective ranks, unlocked by cumulative stars earned.
export const RANKS = [
  { min: 0, title: 'Nosy Neighbour', prop: 'eyes' },
  { min: 3, title: 'Rookie Snooper', prop: 'footprints' },
  { min: 6, title: 'Part-Time Sleuth', prop: 'magnifier' },
  { min: 10, title: 'Licensed Overthinker', prop: 'face_monocle' },
  { min: 15, title: 'Case-Cracking Bunty', prop: 'notebook' },
  { min: 21, title: 'The Human Lie-Detector', prop: 'face_suspect' },
  { min: 28, title: 'Sherlock of the Streets', prop: 'detective' },
  { min: 36, title: 'Legendary Detective', prop: 'trophy' },
];

export function rankForStars(totalStars) {
  let r = RANKS[0];
  for (const rank of RANKS) if (totalStars >= rank.min) r = rank;
  return r;
}

export function nextRank(totalStars) {
  return RANKS.find((r) => r.min > totalStars) || null;
}

// Evaluate a completed case.
// verdict: 'innocent' | 'suspicious'
// connectionsFound / totalConnections: evidence-board links the player made.
// hintsUsed: number of hints taken (each costs a little polish).
export function evaluateCase({
  correctVerdict,
  isReal,
  verdict,
  connectionsFound = 0,
  totalConnections = 0,
  hintsUsed = 0,
}) {
  const correct = verdict === correctVerdict;

  // ----- Trust Meter delta -----
  let trustDelta;
  let headline;
  let blurb;

  if (isReal) {
    if (correct) {
      trustDelta = +22; // caught the rare real one — huge
      headline = "You actually caught it!";
      blurb = "Sherlock ki rooh khush ho gayi. This one was REAL — and you nailed it.";
    } else {
      trustDelta = -10; // missed a real case
      headline = 'It slipped right past you...';
      blurb = "There genuinely was something hidden — and you waved it off. Ouch.";
    }
  } else {
    if (correct) {
      trustDelta = +8; // trusted correctly
      headline = 'Trust well placed.';
      blurb = "Nothing shady here. You kept your cool and got it right.";
    } else {
      trustDelta = -14; // accused an innocent person
      headline = 'You accused an innocent soul!';
      blurb = "Arre detective, itna shak thik nahi. Bharosa bhi ek clue hai.";
    }
  }

  // ----- Stars (1..3) -----
  let stars = correct ? 2 : 1;
  if (correct && totalConnections > 0 && connectionsFound >= totalConnections) {
    stars = 3; // perfect deduction
  }
  if (correct && hintsUsed > 0 && stars === 3) stars = 2; // hints cost the third star
  if (!correct) stars = 1;

  return { correct, stars, trustDelta, headline, blurb };
}

export function applyTrust(current, delta) {
  return clamp((current ?? TRUST_START) + delta);
}

export function trustLabel(trust) {
  if (trust >= 85) return 'Ice-Cold Instinct';
  if (trust >= 65) return 'Sharp & Fair';
  if (trust >= 45) return 'Balanced-ish';
  if (trust >= 25) return 'A Bit Paranoid';
  return 'Trust Issues: Maxed';
}
