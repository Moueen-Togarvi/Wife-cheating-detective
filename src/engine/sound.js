// Lightweight sound hook. No SFX files are bundled yet (kept out to stay
// license-clean and small); this is a safe no-op wrapper that respects the
// soundOn setting and is ready to wire real expo-av assets later.
export function useSfx(_soundOn) {
  return {
    play: (_name) => {},
  };
}
