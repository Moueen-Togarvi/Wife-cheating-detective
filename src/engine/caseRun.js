// Transient per-case run state (clues collected, evidence connections made,
// questions asked, hints used). Reset each time a case starts. Kept separate
// from persistent progress so replays are clean.
import React, { createContext, useContext, useCallback, useMemo, useState } from 'react';

const RunContext = createContext(null);

const emptyRun = {
  caseId: null,
  collected: [],
  connections: [], // array of [a, b] sorted pairs
  asked: [],       // "suspectIdx:qIdx"
  hintsUsed: 0,
};

const pairKey = (a, b) => [a, b].sort().join('|');

export function CaseRunProvider({ children }) {
  const [run, setRun] = useState(emptyRun);

  const start = useCallback((caseId) => {
    setRun({ ...emptyRun, caseId, collected: [], connections: [], asked: [] });
  }, []);

  const collect = useCallback((clueId) => {
    setRun((r) => (r.collected.includes(clueId) ? r : { ...r, collected: [...r.collected, clueId] }));
  }, []);

  const toggleConnection = useCallback((a, b) => {
    setRun((r) => {
      const key = pairKey(a, b);
      const exists = r.connections.some(([x, y]) => pairKey(x, y) === key);
      return {
        ...r,
        connections: exists
          ? r.connections.filter(([x, y]) => pairKey(x, y) !== key)
          : [...r.connections, [a, b]],
      };
    });
  }, []);

  const markAsked = useCallback((suspectIdx, qIdx) => {
    setRun((r) => {
      const id = `${suspectIdx}:${qIdx}`;
      return r.asked.includes(id) ? r : { ...r, asked: [...r.asked, id] };
    });
  }, []);

  const useHint = useCallback(() => {
    setRun((r) => ({ ...r, hintsUsed: r.hintsUsed + 1 }));
  }, []);

  // How many of the case's "correct" connections has the player made?
  const countCorrectConnections = useCallback(
    (correctPairs = []) => {
      const made = new Set(run.connections.map(([a, b]) => pairKey(a, b)));
      return correctPairs.filter(([a, b]) => made.has(pairKey(a, b))).length;
    },
    [run.connections]
  );

  const value = useMemo(
    () => ({ run, start, collect, toggleConnection, markAsked, useHint, countCorrectConnections, pairKey }),
    [run, start, collect, toggleConnection, markAsked, useHint, countCorrectConnections]
  );

  return <RunContext.Provider value={value}>{children}</RunContext.Provider>;
}

export function useCaseRun() {
  const ctx = useContext(RunContext);
  if (!ctx) throw new Error('useCaseRun must be used within a CaseRunProvider');
  return ctx;
}
