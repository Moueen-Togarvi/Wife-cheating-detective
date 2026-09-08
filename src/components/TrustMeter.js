import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { trustLabel } from '../engine/scoring';

// Animated Trust Meter bar. `value` 0..100. Colour shifts red -> mustard -> teal.
export default function TrustMeter({ value = 50, delay = 200, showLabel = true, height = 16 }) {
  const w = useSharedValue(0);

  useEffect(() => {
    w.value = withDelay(delay, withTiming(Math.max(0, Math.min(100, value)), {
      duration: 900,
      easing: Easing.out(Easing.cubic),
    }));
  }, [value, delay]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${w.value}%` }));

  const barColor =
    value >= 65 ? [colors.teal, '#2AA894'] : value >= 40 ? [colors.mustard, colors.mustardDeep] : [colors.red, colors.redDeep];

  return (
    <View>
      {showLabel && (
        <View style={styles.row}>
          <Text style={styles.title}>TRUST METER</Text>
          <Text style={[styles.value, { color: barColor[0] }]}>{Math.round(value)}%</Text>
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <Animated.View style={[styles.fillWrap, fillStyle]}>
          <LinearGradient colors={barColor} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.fill} />
        </Animated.View>
      </View>
      {showLabel && <Text style={styles.mood}>{trustLabel(value)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 6 },
  title: { fontFamily: fonts.bodyExtra, fontSize: 12, letterSpacing: 1.5, color: colors.textDim },
  value: { fontFamily: fonts.display, fontSize: 16 },
  track: {
    backgroundColor: colors.bgDeep,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.line,
    overflow: 'hidden',
  },
  fillWrap: { height: '100%' },
  fill: { flex: 1, borderRadius: 20 },
  mood: { fontFamily: fonts.body, fontSize: 12, color: colors.textFaint, marginTop: 6, fontStyle: 'italic' },
});
