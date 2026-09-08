import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ScreenBg, StarRow, SectionLabel } from '../components/ui';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { portrait, prop } from '../assets/registry';
import { useGame } from '../engine/gameState';
import { CASES } from '../data/cases';

function BackBar({ navigation, title }) {
  return (
    <View style={styles.topbar}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={10}>
        <Text style={styles.backArrow}>‹</Text>
      </Pressable>
      <Text style={styles.topTitle}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

export default function EpisodeMapScreen({ navigation }) {
  const { progress } = useGame();

  return (
    <ScreenBg>
      <SafeAreaView style={{ flex: 1 }}>
        <BackBar navigation={navigation} title="CASE FILES" />
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <SectionLabel>{CASES[0].chapter}</SectionLabel>
          <Text style={styles.blurb}>
            Every case looks guilty. Most aren’t. Pick a file, detective — and try not to accuse the
            wrong person.
          </Text>

          {CASES.map((c, i) => {
            const epNo = i + 1;
            const unlocked = epNo <= progress.unlockedEpisode;
            const result = progress.cases[c.id];
            return (
              <Animated.View key={c.id} entering={FadeInDown.delay(80 * i).duration(500)}>
                <Pressable
                  disabled={!unlocked}
                  onPress={() => navigation.navigate('CaseIntro', { caseId: c.id })}
                  style={({ pressed }) => [
                    styles.caseRow,
                    { opacity: unlocked ? 1 : 0.5, transform: [{ scale: pressed ? 0.98 : 1 }] },
                    result && styles.caseSolved,
                  ]}
                >
                  <View style={styles.epArt}>
                    {unlocked ? (
                      <Image source={portrait(c.client.portrait)} style={{ width: 56, height: 56 }} />
                    ) : (
                      <Image source={prop('locked')} style={{ width: 40, height: 40 }} />
                    )}
                  </View>

                  <View style={{ flex: 1 }}>
                    <Text style={styles.epNo}>EPISODE {epNo}</Text>
                    <Text style={styles.epTitle} numberOfLines={2}>
                      {unlocked ? c.title : 'Locked — solve the previous case'}
                    </Text>
                    {unlocked && (
                      <View style={styles.metaRow}>
                        {result ? (
                          <>
                            <StarRow count={result.stars} size={16} />
                            <Text style={[styles.verdict, { color: result.correct ? colors.success : colors.red }]}>
                              {result.correct ? 'SOLVED' : 'MISJUDGED'}
                            </Text>
                          </>
                        ) : (
                          <Text style={styles.newTag}>NEW · tap to open the file</Text>
                        )}
                      </View>
                    )}
                  </View>

                  {unlocked && <Text style={styles.chev}>›</Text>}
                </Pressable>
              </Animated.View>
            );
          })}

          <View style={styles.comingSoon}>
            <Image source={prop('package')} style={{ width: 34, height: 34 }} />
            <Text style={styles.comingText}>
              More episodes coming soon. Chapter 1 is just the beginning of Bunty’s trust issues.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBg>
  );
}

const styles = StyleSheet.create({
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10 },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: colors.surfaceRaised, borderWidth: 2, borderColor: colors.line },
  backArrow: { color: colors.text, fontSize: 30, marginTop: -4, fontFamily: fonts.display },
  topTitle: { fontFamily: fonts.display, fontSize: 18, color: colors.text, letterSpacing: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  blurb: { fontFamily: fonts.body, fontSize: 14, color: colors.textDim, lineHeight: 20, marginBottom: 18 },
  caseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 2.5,
    borderColor: colors.line,
    padding: 14,
    marginBottom: 14,
  },
  caseSolved: { borderColor: colors.mustardDeep },
  epArt: {
    width: 68, height: 68, borderRadius: 16,
    backgroundColor: colors.surfaceRaised,
    borderWidth: 2, borderColor: colors.line,
    alignItems: 'center', justifyContent: 'center',
  },
  epNo: { fontFamily: fonts.bodyExtra, fontSize: 11, letterSpacing: 1.5, color: colors.mustard },
  epTitle: { fontFamily: fonts.display, fontSize: 15, color: colors.text, marginTop: 3, lineHeight: 20 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  verdict: { fontFamily: fonts.bodyExtra, fontSize: 11, letterSpacing: 1 },
  newTag: { fontFamily: fonts.body, fontSize: 12, color: colors.textFaint, fontStyle: 'italic' },
  chev: { fontSize: 30, color: colors.textFaint, fontFamily: fonts.display },
  comingSoon: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surfaceRaised, borderRadius: 16,
    borderWidth: 2, borderColor: colors.lineSoft, borderStyle: 'dashed',
    padding: 16, marginTop: 6,
  },
  comingText: { flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.textDim, lineHeight: 19 },
});
