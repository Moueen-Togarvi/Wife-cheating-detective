import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../theme/colors';
import { type, fonts } from '../theme/typography';
import { layout } from '../theme/layout';
import { portrait, prop } from '../assets/registry';

// Full-screen noir gradient background wrapper.
export function ScreenBg({ children, variant = 'noir', style }) {
  return (
    <LinearGradient colors={gradients[variant] || gradients.noir} style={[styles.bg, style]}>
      {children}
    </LinearGradient>
  );
}

// Chunky comic card.
export function Card({ children, style, accent }) {
  return (
    <View
      style={[
        styles.card,
        accent && { borderColor: accent },
        layout.cardShadow,
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Primary / secondary / danger button with display font.
export function NoirButton({ title, onPress, variant = 'primary', disabled, icon, style, small }) {
  const grad =
    variant === 'danger' ? gradients.danger : variant === 'red' ? gradients.red : gradients.mustard;
  const isGhost = variant === 'ghost';
  const textColor = isGhost ? colors.text : variant === 'primary' ? colors.bgDeep : '#fff';

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.btnWrap,
        layout.softShadow,
        { opacity: disabled ? 0.45 : pressed ? 0.9 : 1, transform: [{ translateY: pressed ? 2 : 0 }] },
        style,
      ]}
    >
      {isGhost ? (
        <View style={[styles.btn, styles.btnGhost, small && styles.btnSmall]}>
          {icon}
          <Text style={[type.button, { color: textColor }, small && { fontSize: 13 }]}>{title}</Text>
        </View>
      ) : (
        <LinearGradient colors={grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.btn, small && styles.btnSmall]}>
          {icon}
          <Text style={[type.button, { color: textColor }, small && { fontSize: 13 }]}>{title}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

// Small uppercase section label with accent tick.
export function SectionLabel({ children, color = colors.mustard }) {
  return (
    <View style={styles.sectionLabel}>
      <View style={[styles.tick, { backgroundColor: color }]} />
      <Text style={[type.label, { color }]}>{String(children).toUpperCase()}</Text>
    </View>
  );
}

// Star row (filled / empty) — uses the real Fluent Emoji star art.
export function StarRow({ count = 0, max = 3, size = 26, style }) {
  return (
    <View style={[{ flexDirection: 'row', gap: 4 }, style]}>
      {Array.from({ length: max }).map((_, i) => (
        <Image
          key={i}
          source={prop(i < count ? 'star_glow' : 'star')}
          style={{ width: size, height: size, opacity: i < count ? 1 : 0.28 }}
        />
      ))}
    </View>
  );
}

// A Fluent Emoji prop/icon image by key.
export function PropImage({ name, size = 40, style }) {
  return <Image source={prop(name)} style={[{ width: size, height: size }, style]} />;
}

// Character portrait on a glowing pedestal.
export function CharacterPortrait({ name, size = 120, glow = colors.mustard, label, style }) {
  return (
    <View style={[{ alignItems: 'center' }, style]}>
      <View
        style={[
          styles.pedestal,
          { width: size + 26, height: size + 26, borderRadius: (size + 26) / 2, shadowColor: glow },
        ]}
      >
        <Image source={portrait(name)} style={{ width: size, height: size }} resizeMode="contain" />
      </View>
      {label ? <Text style={styles.portraitLabel}>{label}</Text> : null}
    </View>
  );
}

// Pill / chip.
export function Chip({ label, color = colors.mustard, filled, icon }) {
  return (
    <View
      style={[
        styles.chip,
        { borderColor: color, backgroundColor: filled ? color : 'transparent' },
      ]}
    >
      {icon}
      <Text style={[styles.chipText, { color: filled ? colors.bgDeep : color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: layout.radius,
    borderWidth: layout.borderW,
    borderColor: colors.line,
    padding: layout.pad,
  },
  btnWrap: { borderRadius: layout.radius },
  btn: {
    minHeight: 56,
    borderRadius: layout.radius,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 22,
    borderWidth: layout.borderW,
    borderColor: 'rgba(0,0,0,0.25)',
  },
  btnSmall: { minHeight: 42, paddingHorizontal: 16, borderRadius: layout.radiusSm },
  btnGhost: {
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.line,
  },
  sectionLabel: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  tick: { width: 20, height: 4, borderRadius: 2 },
  pedestal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceRaised,
    borderWidth: layout.borderW,
    borderColor: colors.line,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 8,
  },
  portraitLabel: {
    marginTop: 10,
    fontFamily: fonts.display,
    fontSize: 14,
    color: colors.text,
    letterSpacing: 0.3,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 2,
  },
  chipText: { fontFamily: fonts.bodyExtra, fontSize: 12, letterSpacing: 0.5 },
});
