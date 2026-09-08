import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../theme/colors';
import { prop as propAsset } from '../assets/registry';

// A hidden clue marker on the crime scene. Pulses gently until found, then
// shows the actual prop art.
export default function ClueHotspot({ x, y, size = 54, found, propName, onPress }) {
  const pulse = useSharedValue(1);
  const glow = useSharedValue(0.4);

  useEffect(() => {
    if (!found) {
      pulse.value = withRepeat(
        withSequence(
          withTiming(1.18, { duration: 780, easing: Easing.inOut(Easing.quad) }),
          withTiming(1, { duration: 780, easing: Easing.inOut(Easing.quad) })
        ),
        -1
      );
      glow.value = withRepeat(withTiming(0.85, { duration: 780 }), -1, true);
    } else {
      pulse.value = withTiming(1);
      glow.value = withTiming(0.9);
    }
  }, [found]);

  const aStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    shadowOpacity: glow.value,
  }));

  return (
    <Animated.View style={[styles.pos, { left: x, top: y }, aStyle]}>
      <Pressable
        onPress={onPress}
        style={[
          styles.dot,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: found ? colors.mustard : colors.red,
            backgroundColor: found ? colors.surfaceRaised : 'rgba(226,59,59,0.16)',
          },
        ]}
      >
        {found ? (
          <Image source={propAsset(propName)} style={{ width: size * 0.72, height: size * 0.72 }} />
        ) : null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pos: {
    position: 'absolute',
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 14,
    elevation: 6,
  },
  dot: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
});
