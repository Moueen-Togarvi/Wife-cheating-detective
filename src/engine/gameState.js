// Global game state: persistent progress + actions. Backed by AsyncStorage.
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { loadProgress, saveProgress, resetProgress, defaultProgress } from './progress';
import { applyTrust, rankForStars } from './scoring';
import { CASES } from '../data/cases';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [progress, setProgress] = useState(defaultProgress);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alive = true;
    loadProgress().then((p) => {
      if (alive) {
        setProgress(p);
        setReady(true);
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const persist = useCallback((next) => {
    setProgress(next);
    saveProgress(next);
  }, []);

  // Record a finished case. `result` from evaluateCase() plus verdict.
  const recordCaseResult = useCallback(
    (caseData, result, verdict) => {
      setProgress((prev) => {
        const prevCase = prev.cases[caseData.id];
        const bestStars = Math.max(prevCase?.stars || 0, result.stars);
        // Only add the *delta* in stars to the cumulative total (replays don't farm).
        const starGain = bestStars - (prevCase?.stars || 0);

        const episodeIndex = CASES.findIndex((c) => c.id === caseData.id);
        const nextEpisodeNo = episodeIndex >= 0 ? episodeIndex + 2 : prev.unlockedEpisode;

        const next = {
          ...prev,
          trust: applyTrust(prev.trust, result.trustDelta),
          totalStars: prev.totalStars + Math.max(0, starGain),
          unlockedEpisode: Math.max(prev.unlockedEpisode, nextEpisodeNo),
          cases: {
            ...prev.cases,
            [caseData.id]: {
              stars: bestStars,
              correct: result.correct,
              verdict,
            },
          },
        };
        saveProgress(next);
        return next;
      });
    },
    []
  );

  const reset = useCallback(async () => {
    const fresh = await resetProgress();
    setProgress(fresh);
  }, []);

  const toggleSound = useCallback(() => {
    setProgress((prev) => {
      const next = { ...prev, soundOn: !prev.soundOn };
      saveProgress(next);
      return next;
    });
  }, []);

  const rank = useMemo(() => rankForStars(progress.totalStars), [progress.totalStars]);

  const value = useMemo(
    () => ({ progress, ready, rank, recordCaseResult, reset, toggleSound }),
    [progress, ready, rank, recordCaseResult, reset, toggleSound]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
}
