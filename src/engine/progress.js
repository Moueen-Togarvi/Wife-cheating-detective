// AsyncStorage persistence for game progress.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TRUST_START } from './scoring';

const KEY = '@detective_bunty/progress_v1';

export const defaultProgress = {
  trust: TRUST_START,
  totalStars: 0,
  // per-case results keyed by case id: { stars, correct, verdict }
  cases: {},
  // highest episode number unlocked (episode 1 always available)
  unlockedEpisode: 1,
  soundOn: true,
};

export async function loadProgress() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return { ...defaultProgress };
    const parsed = JSON.parse(raw);
    return { ...defaultProgress, ...parsed, cases: { ...(parsed.cases || {}) } };
  } catch (e) {
    return { ...defaultProgress };
  }
}

export async function saveProgress(progress) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(progress));
  } catch (e) {
    // best-effort; ignore write failures
  }
}

export async function resetProgress() {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch (e) {}
  return { ...defaultProgress };
}
