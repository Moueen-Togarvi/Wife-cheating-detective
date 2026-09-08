// Case registry. The engine reads this ordered array; adding a new case is just
// authoring a new data file and appending it here — no engine changes needed.
import case01 from './case01';
import case02 from './case02';
import case03 from './case03';

export const CASES = [case01, case02, case03];

export function getCase(id) {
  return CASES.find((c) => c.id === id);
}

export function caseIndex(id) {
  return CASES.findIndex((c) => c.id === id);
}
