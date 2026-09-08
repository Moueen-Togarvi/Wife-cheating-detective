// Font family keys map to the loaded @expo-google-fonts faces (see App.js).
// Bungee / Luckiest Guy = chunky display (comic-detective). Nunito = readable body.
export const fonts = {
  display: 'Bungee',        // headings, titles, case numbers
  displayAlt: 'LuckiestGuy',// playful accents, stamps, reveal
  body: 'Nunito',           // paragraphs
  bodyBold: 'Nunito_700Bold',
  bodyExtra: 'Nunito_800ExtraBold',
};

export const type = {
  hero: { fontFamily: fonts.display, fontSize: 34, letterSpacing: 0.5 },
  title: { fontFamily: fonts.display, fontSize: 24, letterSpacing: 0.3 },
  subtitle: { fontFamily: fonts.displayAlt, fontSize: 20 },
  caseNo: { fontFamily: fonts.display, fontSize: 14, letterSpacing: 2 },
  bodyLg: { fontFamily: fonts.body, fontSize: 18, lineHeight: 26 },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 23 },
  bodyBold: { fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 23 },
  label: { fontFamily: fonts.bodyExtra, fontSize: 13, letterSpacing: 1.2 },
  button: { fontFamily: fonts.display, fontSize: 16, letterSpacing: 0.5 },
  small: { fontFamily: fonts.body, fontSize: 13, lineHeight: 18 },
};
