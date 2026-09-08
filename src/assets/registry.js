// AUTO-GENERATED asset registry. React Native requires static require() paths.
// Characters & props are Microsoft Fluent Emoji (MIT). See assets/ATTRIBUTIONS.md.

export const characters = {
  cook_m: require('../../assets/characters/cook_m.png'),
  cook_w: require('../../assets/characters/cook_w.png'),
  cop: require('../../assets/characters/cop.png'),
  detective: require('../../assets/characters/detective.png'),
  detective_m: require('../../assets/characters/detective_m.png'),
  detective_w: require('../../assets/characters/detective_w.png'),
  facepalm_m: require('../../assets/characters/facepalm_m.png'),
  facepalm_w: require('../../assets/characters/facepalm_w.png'),
  hand_m: require('../../assets/characters/hand_m.png'),
  man: require('../../assets/characters/man.png'),
  no_m: require('../../assets/characters/no_m.png'),
  old_man: require('../../assets/characters/old_man.png'),
  old_woman: require('../../assets/characters/old_woman.png'),
  person: require('../../assets/characters/person.png'),
  shrug_m: require('../../assets/characters/shrug_m.png'),
  shrug_w: require('../../assets/characters/shrug_w.png'),
  techie_m: require('../../assets/characters/techie_m.png'),
  techie_w: require('../../assets/characters/techie_w.png'),
  woman: require('../../assets/characters/woman.png'),
};

export const props = {
  bell: require('../../assets/props/bell.png'),
  boom: require('../../assets/props/boom.png'),
  briefcase: require('../../assets/props/briefcase.png'),
  bulb: require('../../assets/props/bulb.png'),
  calendar: require('../../assets/props/calendar.png'),
  camera: require('../../assets/props/camera.png'),
  cash: require('../../assets/props/cash.png'),
  chart: require('../../assets/props/chart.png'),
  coffee: require('../../assets/props/coffee.png'),
  cooking: require('../../assets/props/cooking.png'),
  die: require('../../assets/props/die.png'),
  envelope: require('../../assets/props/envelope.png'),
  eyes: require('../../assets/props/eyes.png'),
  face_cry: require('../../assets/props/face_cry.png'),
  face_joy: require('../../assets/props/face_joy.png'),
  face_love: require('../../assets/props/face_love.png'),
  face_mind_blown: require('../../assets/props/face_mind_blown.png'),
  face_monocle: require('../../assets/props/face_monocle.png'),
  face_nervous: require('../../assets/props/face_nervous.png'),
  face_suspect: require('../../assets/props/face_suspect.png'),
  face_think: require('../../assets/props/face_think.png'),
  face_woozy: require('../../assets/props/face_woozy.png'),
  face_zany: require('../../assets/props/face_zany.png'),
  fire: require('../../assets/props/fire.png'),
  footprints: require('../../assets/props/footprints.png'),
  heart: require('../../assets/props/heart.png'),
  heart_broken: require('../../assets/props/heart_broken.png'),
  key: require('../../assets/props/key.png'),
  laptop: require('../../assets/props/laptop.png'),
  lipstick: require('../../assets/props/lipstick.png'),
  locked: require('../../assets/props/locked.png'),
  love_letter: require('../../assets/props/love_letter.png'),
  magnifier: require('../../assets/props/magnifier.png'),
  memo: require('../../assets/props/memo.png'),
  money_bag: require('../../assets/props/money_bag.png'),
  money_fly: require('../../assets/props/money_fly.png'),
  moon: require('../../assets/props/moon.png'),
  newspaper: require('../../assets/props/newspaper.png'),
  package: require('../../assets/props/package.png'),
  party: require('../../assets/props/party.png'),
  phone: require('../../assets/props/phone.png'),
  pot: require('../../assets/props/pot.png'),
  receipt: require('../../assets/props/receipt.png'),
  rice: require('../../assets/props/rice.png'),
  ring: require('../../assets/props/ring.png'),
  rocket: require('../../assets/props/rocket.png'),
  shopping: require('../../assets/props/shopping.png'),
  sparkles: require('../../assets/props/sparkles.png'),
  star: require('../../assets/props/star.png'),
  star_glow: require('../../assets/props/star_glow.png'),
  sweat: require('../../assets/props/sweat.png'),
  trophy: require('../../assets/props/trophy.png'),
  turtle: require('../../assets/props/turtle.png'),
  unlocked: require('../../assets/props/unlocked.png'),
};

// Resolve a portrait key (character) with graceful fallback.
export function portrait(key) {
  return characters[key] || characters.person || characters.detective;
}

// Resolve a prop/icon key with graceful fallback.
export function prop(key) {
  return props[key] || props.magnifier;
}

export const app = {
  icon: require('../../assets/app/icon.png'),
};
