import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ScreenBg, SectionLabel } from '../components/ui';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { prop } from '../assets/registry';
import { getCase } from '../data/cases';

export default function AccusationScreen({ navigation, route }) {
  const { caseId } = route.params;
  const c = getCase(caseId);

  const decide = (verdict) => navigation.navigate('Reveal', { caseId, verdict });

  return (
    <ScreenBg variant="reveal">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topbar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={10}>
            <Text style={styles.backArrow}>‹</Text>
          </Pressable>
          <Text style={styles.topTitle}>THE VERDICT</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInDown.duration(500)}>
            <Text style={styles.headline}>Time to decide, detective.</Text>
            <Text style={styles.sub}>
              You’ve seen the clues. You’ve grilled the suspects. Is {c.client.name}’s partner
              actually hiding something — or is this pure paranoia?
            </Text>
          </Animated.View>

          <View style={styles.theoryBox}>
            <SectionLabel color={colors.teal}>Theories on the table</SectionLabel>
            {c.theories.map((t, i) => (
              <View key={i} style={styles.theoryRow}>
                <Text style={styles.theoryDot}>0{i + 1}</Text>
                <Text style={styles.theoryText}>{t}</Text>
              </View>
            ))}
          </View>

          <Animated.View entering={FadeInDown.delay(150).duration(500)}>
            <Pressable style={[styles.verdictCard, { borderColor: colors.teal }]} onPress={() => decide('innocent')}>
              <Image source={prop('heart')} style={styles.vIcon} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.vTitle, { color: colors.teal }]}>THEY’RE INNOCENT</Text>
                <Text style={styles.vSub}>“Relax, Bunty. It’s a sweet misunderstanding.”</Text>
              </View>
              <Text style={styles.vChev}>›</Text>
            </Pressable>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(280).duration(500)}>
            <Pressable style={[styles.verdictCard, { borderColor: colors.red }]} onPress={() => decide('suspicious')}>
              <Image source={prop('face_suspect')} style={styles.vIcon} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.vTitle, { color: colors.red }]}>SOMETHING’S FISHY</Text>
                <Text style={styles.vSub}>“I knew it. They’re definitely hiding something.”</Text>
              </View>
              <Text style={styles.vChev}>›</Text>
            </Pressable>
          </Animated.View>

          <Text style={styles.warn}>
            Choose wisely — a wrong accusation wrecks your Trust Meter. But miss a real one and,
            well... you had one job.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </ScreenBg>
  );
}

const styles = StyleSheet.create({
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10 },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: colors.surfaceRaised, borderWidth: 2, borderColor: colors.line },
  backArrow: { color: colors.text, fontSize: 30, marginTop: -4, fontFamily: fonts.display },
  topTitle: { fontFamily: fonts.display, fontSize: 16, color: colors.text, letterSpacing: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 30 },
  headline: { fontFamily: fonts.display, fontSize: 24, color: colors.text, marginTop: 6 },
  sub: { fontFamily: fonts.body, fontSize: 14, color: colors.textDim, lineHeight: 20, marginTop: 8 },
  theoryBox: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 2, borderColor: colors.line, padding: 16, marginTop: 20 },
  theoryRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
  theoryDot: { fontFamily: fonts.display, fontSize: 14, color: colors.textFaint },
  theoryText: { flex: 1, fontFamily: fonts.bodyBold, fontSize: 14, color: colors.text },
  verdictCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: colors.surfaceRaised, borderRadius: 18, borderWidth: 3,
    padding: 16, marginTop: 16,
  },
  vIcon: { width: 48, height: 48 },
  vTitle: { fontFamily: fonts.display, fontSize: 17, letterSpacing: 0.5 },
  vSub: { fontFamily: fonts.body, fontSize: 13, color: colors.textDim, marginTop: 4, lineHeight: 18 },
  vChev: { fontSize: 30, color: colors.textFaint, fontFamily: fonts.display },
  warn: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textFaint, fontStyle: 'italic', textAlign: 'center', marginTop: 22, lineHeight: 18 },
});
