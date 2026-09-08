import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

// A rubber-stamp "slam" overlay (e.g. FOUND! / CASE CLOSED). Fires onDone.
export default function StampOverlay({ label = 'FOUND!', color = colors.red, onDone, style }) {
  const scale = useSharedValue(2.4);
  const opacity = useSharedValue(0);
  const rot = useSharedValue(-16);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 120 });
    scale.value = withSequence(
      withTiming(0.92, { duration: 180, easing: Easing.out(Easing.back(2)) }),
      withTiming(1, { duration: 120 })
    );
    rot.value = withTiming(-12, { duration: 200 });
    opacity.value = withDelay(
      900,
      withTiming(0, { duration: 260 }, (fin) => {
        if (fin && onDone) runOnJS(onDone)();
      })
    );
  }, []);

  const aStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { rotate: `${rot.value}deg` }],
  }));

  return (
    <Animated.View pointerEvents="none" style={[styles.wrap, aStyle, style]}>
      <Text style={[styles.text, { color, borderColor: color }]}>{label}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', alignSelf: 'center', top: '42%', zIndex: 50 },
  text: {
    fontFamily: fonts.displayAlt,
    fontSize: 40,
    color: colors.red,
    borderWidth: 5,
    borderColor: colors.red,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 6,
    letterSpacing: 1,
    backgroundColor: 'rgba(14,17,22,0.35)',
    overflow: 'hidden',
  },
});
