import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { ScreenBg, NoirButton } from '../components/ui';
import SpeechBubble from '../components/SpeechBubble';
import StampOverlay from '../components/StampOverlay';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { prop } from '../assets/registry';
import { getCase } from '../data/cases';
import { useCaseRun } from '../engine/caseRun';
import { useGame } from '../engine/gameState';
import { evaluateCase } from '../engine/scoring';

export default function RevealScreen({ navigation, route }) {
  const { caseId, verdict } = route.params;
  const c = getCase(caseId);
  const { run, countCorrectConnections } = useCaseRun();
  const { recordCaseResult } = useGame();
  const [showStamp, setShowStamp] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const result = useMemo(() => {
    const totalConnections = c.connections?.length || 0;
    const connectionsFound = countCorrectConnections(c.connections || []);
    return {
      ...evaluateCase({
        correctVerdict: c.correctVerdict,
        isReal: c.isReal,
        verdict,
        connectionsFound,
        totalConnections,
        hintsUsed: run.hintsUsed,
      }),
      connectionsFound,
      totalConnections,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    recordCaseResult(c, result, verdict);
    const t1 = setTimeout(() => setShowStamp(true), 500);
    const t2 = setTimeout(() => setRevealed(true), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const good = result.correct;
  const accent = good ? colors.success : colors.red;

  return (
    <ScreenBg variant="reveal">
      <SafeAreaView style={{ flex: 1 }}>
        {showStamp && (
          <StampOverlay
            label={good ? 'NAILED IT!' : 'WHOOPS!'}
            color={accent}
            onDone={() => setShowStamp(false)}
          />
        )}

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeIn.duration(400)} style={styles.topLabel}>
            <Text style={styles.kicker}>THE TRUTH ABOUT</Text>
            <Text style={styles.caseTitle}>{c.title}</Text>
          </Animated.View>

          {revealed && (
            <>
              <Animated.View entering={ZoomIn.duration(500)} style={styles.faceWrap}>
                <View style={[styles.faceRing, { borderColor: accent, shadowColor: accent }]}>
                  <Image source={prop(c.reveal.face)} style={{ width: 96, height: 96 }} />
                </View>
                {c.isReal && (
                  <View style={styles.realTag}>
                    <Image source={prop('fire')} style={{ width: 16, height: 16 }} />
                    <Text style={styles.realTagText}>THE 1-IN-10 REAL CASE</Text>
                  </View>
                )}
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(120).duration(500)} style={styles.headlineWrap}>
                <Text style={[styles.headline, { color: accent }]}>{result.headline}</Text>
                <Text style={styles.blurb}>{result.blurb}</Text>
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(260).duration(500)} style={{ marginTop: 20 }}>
                <SpeechBubble tone={colors.mustard}>{c.reveal.story}</SpeechBubble>
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.punchBox}>
                <Image source={prop(c.reveal.prop)} style={{ width: 40, height: 40 }} />
                <Text style={styles.punchText}>{c.reveal.punch}</Text>
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(520).duration(500)} style={styles.verdictRow}>
                <View style={styles.verdictItem}>
                  <Text style={styles.vLabel}>YOU SAID</Text>
                  <Text style={[styles.vValue, { color: verdict === 'innocent' ? colors.teal : colors.red }]}>
                    {verdict === 'innocent' ? 'INNOCENT' : 'SUSPICIOUS'}
                  </Text>
                </View>
                <View style={styles.verdictItem}>
                  <Text style={styles.vLabel}>TRUTH</Text>
                  <Text style={[styles.vValue, { color: c.correctVerdict === 'innocent' ? colors.teal : colors.red }]}>
                    {c.correctVerdict === 'innocent' ? 'INNOCENT' : 'SUSPICIOUS'}
                  </Text>
                </View>
              </Animated.View>
            </>
          )}
        </ScrollView>

        {revealed && (
          <Animated.View entering={FadeInDown.delay(650)} style={styles.footer}>
            <NoirButton
              title="SEE YOUR SCORE"
              icon={<Image source={prop('trophy')} style={{ width: 24, height: 24 }} />}
              onPress={() => navigation.navigate('Results', { caseId, verdict, result })}
            />
          </Animated.View>
        )}
      </SafeAreaView>
    </ScreenBg>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 8 },
  topLabel: { alignItems: 'center', marginTop: 4 },
  kicker: { fontFamily: fonts.bodyExtra, fontSize: 11, letterSpacing: 2, color: colors.textFaint },
  caseTitle: { fontFamily: fonts.display, fontSize: 18, color: colors.text, textAlign: 'center', marginTop: 4, lineHeight: 24 },
  faceWrap: { alignItems: 'center', marginTop: 22 },
  faceRing: {
    width: 128, height: 128, borderRadius: 64, borderWidth: 4,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center',
    shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.7, shadowRadius: 22, elevation: 10,
  },
  realTag: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, backgroundColor: 'rgba(226,59,59,0.15)', borderRadius: 14, borderWidth: 2, borderColor: colors.red, paddingHorizontal: 12, paddingVertical: 5 },
  realTagText: { fontFamily: fonts.bodyExtra, fontSize: 11, letterSpacing: 1, color: colors.red },
  headlineWrap: { alignItems: 'center', marginTop: 18 },
  headline: { fontFamily: fonts.display, fontSize: 24, textAlign: 'center' },
  blurb: { fontFamily: fonts.body, fontSize: 14, color: colors.textDim, textAlign: 'center', lineHeight: 20, marginTop: 8, paddingHorizontal: 8 },
  punchBox: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.surface, borderRadius: 16, borderWidth: 2, borderColor: colors.mustardDeep, padding: 14, marginTop: 18 },
  punchText: { flex: 1, fontFamily: fonts.bodyBold, fontSize: 14, color: colors.text, lineHeight: 20 },
  verdictRow: { flexDirection: 'row', gap: 12, marginTop: 20 },
  verdictItem: { flex: 1, backgroundColor: colors.surfaceRaised, borderRadius: 14, borderWidth: 2, borderColor: colors.line, padding: 14, alignItems: 'center' },
  vLabel: { fontFamily: fonts.bodyExtra, fontSize: 10, letterSpacing: 1.5, color: colors.textFaint },
  vValue: { fontFamily: fonts.display, fontSize: 18, marginTop: 6 },
  footer: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 10 },
});
