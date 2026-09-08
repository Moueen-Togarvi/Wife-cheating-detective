import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { prop } from '../assets/registry';

// Detective rank badge: art medallion + title + star count.
export default function RankBadge({ rank, totalStars, compact, style }) {
  return (
    <View style={[styles.wrap, compact && styles.compact, style]}>
      <View style={[styles.medal, compact && styles.medalSm]}>
        <Image
          source={prop(rank.prop)}
          style={compact ? { width: 30, height: 30 } : { width: 46, height: 46 }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.kicker}>DETECTIVE RANK</Text>
        <Text style={[styles.title, compact && { fontSize: 15 }]} numberOfLines={1}>
          {rank.title}
        </Text>
        {!compact && (
          <View style={styles.starsRow}>
            <Image source={prop('star_glow')} style={{ width: 15, height: 15 }} />
            <Text style={styles.stars}>{totalStars} stars earned</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.surfaceRaised,
    borderRadius: 16,
    borderWidth: 2.5,
    borderColor: colors.mustardDeep,
    padding: 14,
  },
  compact: { padding: 10, gap: 10, borderRadius: 14 },
  medal: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.bgDeep,
    borderWidth: 2.5,
    borderColor: colors.mustard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medalSm: { width: 46, height: 46, borderRadius: 23 },
  kicker: { fontFamily: fonts.bodyExtra, fontSize: 10, letterSpacing: 1.5, color: colors.textFaint },
  title: { fontFamily: fonts.display, fontSize: 18, color: colors.mustard, marginTop: 2 },
  starsRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  stars: { fontFamily: fonts.body, fontSize: 12, color: colors.textDim },
});
