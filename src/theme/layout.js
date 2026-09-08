import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const screen = { width, height };

export const layout = {
  radius: 18,
  radiusLg: 26,
  radiusSm: 10,
  pad: 20,
  gap: 14,
  borderW: 2.5,
  // Chunky comic border shadow (offset "sticker" look).
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  softShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
};
