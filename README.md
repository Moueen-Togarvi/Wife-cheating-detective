# 🕵️ Detective Bunty

A premium, comedy **episodic detective game** built with **Expo SDK 57** + React
Native (React 19, RN 0.86, Reanimated 4, New Architecture).

> The joke: you play an over-dramatic, paranoid detective hired to investigate
> "cheating" partners. **9 out of 10 cases are gloriously innocent** (a sweet,
> funny reason) — but roughly every **10th case hides a real (still harmless)
> twist**. You never know which is which. Accuse an innocent partner and your
> **Trust Meter** tanks; catch the rare real one and you're a legend.

The wholesome message underneath the comedy: **over-suspicion breaks trust.**

---

## ✨ What's in this build (Chapter 1)

- **Full game engine**, data-driven — add a case by writing one data file, no
  engine changes.
- **All screens**, episode-to-episode (not a branching choice game):
  Home → Case Files (episode map) → Case Intro → Crime Scene → Evidence Board →
  Interrogation → Accusation → Reveal → Results.
- **Premium asset-library art** — every image is a real open-license asset
  (see Assets below). Nothing is AI-generated or drawn in code.
- **Trust Meter, star ratings, and funny detective ranks**, all persisted.
- **3 fully-written comedy cases**, including the chapter's "1-in-10 real" twist.

### The game loop
1. **Case Intro** — the client's over-dramatic complaint (case-file opens).
2. **Crime Scene** — tap glowing hotspots to collect clues.
3. **Evidence Board** — string clues together on a cork-board (red thread).
4. **Interrogation** — pick questions, get funny answers from each suspect.
5. **Accusation** — Innocent, or Something's Fishy?
6. **Reveal** — the twist, plus were-you-right stamp.
7. **Results** — stars, Trust Meter change, rank progress, next episode unlocks.

---

## 🎨 Assets (all ship-safe, open-license)

| Category | Source | License |
|---|---|---|
| Characters & props | [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji) | MIT |
| Clue / detective icons | [game-icons.net](https://github.com/game-icons/icons) (Delapouite & Lorc) | CC BY 3.0 |
| Fonts (Bungee, Luckiest Guy, Nunito) | Google Fonts via `@expo-google-fonts` | SIL OFL |
| UI glyphs | `@expo/vector-icons` (bundled) | MIT / OFL |

Full text in [`assets/ATTRIBUTIONS.md`](assets/ATTRIBUTIONS.md). In-app credits
are on the **Credits & About** screen.

---

## 🚀 Run it

```bash
npm install
npx expo start        # then press 'a' for Android, or scan the QR in Expo Go
```

Other targets: `npm run android`, `npm run ios`, `npm run web`.

Validate the production bundle without a device:

```bash
npx expo export --platform android   # bundles everything; fails loudly on errors
```

---

## 🗂️ Project structure

```
App.js                     Fonts + providers + navigation
src/
  navigation/              Native-stack navigator (+ CaseRun provider)
  screens/                 The 9 screens listed above + Credits
  components/              NoirButton, Card, TrustMeter, SpeechBubble,
                           ClueHotspot, StampOverlay, RankBadge, ...
  engine/
    gameState.js           Persistent progress store (Context)
    caseRun.js             Transient per-case run state
    scoring.js             Trust Meter, stars, ranks (pure)
    progress.js            AsyncStorage load/save
  data/cases/              case01..03 + registry (index.js)
  assets/registry.js       Static require() map for all art
  theme/                   colors, typography, layout
assets/                    characters/ props/ icons/ app/ (real art files)
```

---

## ➕ Adding a new case

1. Create `src/data/cases/caseNN.js` following the shape in `case01.js`
   (positions are percentages so they scale to any screen).
2. Reference art by key — portraits from `assets/characters`, props from
   `assets/props` (see `src/assets/registry.js`).
3. Append it to `CASES` in `src/data/cases/index.js`. Done — it becomes the
   next episode automatically.

Set `isReal: true` + `correctVerdict: 'suspicious'` for a "real" twist case;
otherwise `isReal: false` + `correctVerdict: 'innocent'`.

---

## 🛣️ Roadmap
- Complete Chapter 1 to the full 10 cases (9 innocent + 1 real).
- Optional SFX (expo-av) and Lottie flourishes.
- Chapter unlocks / monetization (first chapter free).
