import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { ScreenBg, NoirButton, StarRow, Card } from '../components/ui';
import TrustMeter from '../components/TrustMeter';
import RankBadge from '../components/RankBadge';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { prop } from '../assets/registry';
import { getCase, CASES, caseIndex } from '../data/cases';
import { useGame } from '../engine/gameState';
import { nextRank } from '../engine/scoring';

export default function ResultsScreen({ navigation, route }) {
  const { caseId, result } = route.params;
  const c = getCase(caseId);
  const { progress, rank } = useGame();

  const idx = caseIndex(caseId);
  const next = CASES[idx + 1];
  const nextUnlocked = next && idx + 2 <= progress.unlockedEpisode;

  const nr = nextRank(progress.totalStars);
  const trustUp = result.trustDelta >= 0;

  return (
    <ScreenBg variant="spotlight">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View entering={ZoomIn.duration(500)} style={styles.header}>
            <Image source={prop(result.correct ? 'trophy' : 'sweat')} style={{ width: 64, height: 64 }} />
            <Text style={styles.caseClosed}>CASE CLOSED</Text>
            <Text style={styles.caseName} numberOfLines={2}>{c.title}</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(120).duration(500)}>
            <Card style={styles.starCard}>
              <Text style={styles.cardLabel}>YOUR RATING</Text>
              <StarRow count={result.stars} size={40} style={{ marginTop: 10, alignSelf: 'center' }} />
              <Text style={styles.starVerdict}>
                {result.stars === 3 ? 'Flawless deduction!' : result.stars === 2 ? 'Solid detective work.' : 'Case cracked... barely.'}
              </Text>
              {result.totalConnections > 0 && (
                <Text style={styles.connLine}>
                  Evidence links found: {result.connectionsFound}/{result.totalConnections}
                </Text>
              )}
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(240).duration(500)}>
            <Card style={styles.trustCard}>
              <TrustMeter value={progress.trust} />
              <View style={[styles.deltaPill, { borderColor: trustUp ? colors.success : colors.red }]}>
                <Text style={[styles.deltaText, { color: trustUp ? colors.success : colors.red }]}>
                  {trustUp ? '▲ +' : '▼ '}{Math.abs(result.trustDelta)} trust
                </Text>
              </View>
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(360).duration(500)}>
            <RankBadge rank={rank} totalStars={progress.totalStars} style={{ marginTop: 16 }} />
            {nr && (
              <Text style={styles.nextRank}>
                {nr.min - progress.totalStars} more star{nr.min - progress.totalStars > 1 ? 's' : ''} to become “{nr.title}”
              </Text>
            )}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(480).duration(500)} style={styles.actions}>
            {next ? (
              <NoirButton
                title={nextUnlocked ? `NEXT: EPISODE ${idx + 2}` : 'NEXT EPISODE'}
                icon={<Image source={prop('footprints')} style={{ width: 22, height: 22 }} />}
                onPress={() => navigation.navigate('CaseIntro', { caseId: next.id })}
              />
            ) : (
              <NoirButton
                title="BACK TO CASE FILES"
                icon={<Image source={prop('newspaper')} style={{ width: 22, height: 22 }} />}
                onPress={() => navigation.navigate('EpisodeMap')}
              />
            )}
            <View style={styles.smallRow}>
              <NoirButton title="REPLAY" variant="ghost" small style={{ flex: 1 }}
                onPress={() => navigation.navigate('CaseIntro', { caseId })} />
              <NoirButton title="HOME" variant="ghost" small style={{ flex: 1 }}
                onPress={() => navigation.popToTop()} />
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBg>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 30, paddingTop: 12 },
  header: { alignItems: 'center', marginBottom: 8 },
  caseClosed: { fontFamily: fonts.display, fontSize: 26, color: colors.mustard, letterSpacing: 1, marginTop: 8 },
  caseName: { fontFamily: fonts.body, fontSize: 14, color: colors.textDim, textAlign: 'center', marginTop: 4 },
  starCard: { marginTop: 14, alignItems: 'center' },
  cardLabel: { fontFamily: fonts.bodyExtra, fontSize: 11, letterSpacing: 1.5, color: colors.textFaint },
  starVerdict: { fontFamily: fonts.display, fontSize: 16, color: colors.text, marginTop: 10 },
  connLine: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textDim, marginTop: 6 },
  trustCard: { marginTop: 16 },
  deltaPill: { alignSelf: 'flex-start', marginTop: 12, borderWidth: 2, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 5 },
  deltaText: { fontFamily: fonts.bodyExtra, fontSize: 12, letterSpacing: 0.5 },
  nextRank: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textFaint, textAlign: 'center', marginTop: 8, fontStyle: 'italic' },
  actions: { marginTop: 24, gap: 12 },
  smallRow: { flexDirection: 'row', gap: 12 },
});
