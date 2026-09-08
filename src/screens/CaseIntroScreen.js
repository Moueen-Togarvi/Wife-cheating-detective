import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn, ZoomIn } from 'react-native-reanimated';
import { ScreenBg, NoirButton, CharacterPortrait, Chip } from '../components/ui';
import SpeechBubble from '../components/SpeechBubble';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { prop } from '../assets/registry';
import { getCase } from '../data/cases';
import { useCaseRun } from '../engine/caseRun';

export default function CaseIntroScreen({ navigation, route }) {
  const { caseId } = route.params;
  const c = getCase(caseId);
  const { start } = useCaseRun();

  useEffect(() => {
    start(caseId);
  }, [caseId]);

  if (!c) return null;

  return (
    <ScreenBg variant="spotlight">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topbar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={10}>
            <Text style={styles.backArrow}>‹</Text>
          </Pressable>
          <Text style={styles.topTitle}>CASE FILE #{c.episode}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View entering={ZoomIn.duration(500)} style={styles.fileCard}>
            <View style={styles.fileHeader}>
              <Image source={prop('newspaper')} style={{ width: 22, height: 22 }} />
              <Text style={styles.confidential}>CONFIDENTIAL · DO NOT SNOOP (you will)</Text>
            </View>
            <Text style={styles.title}>{c.title}</Text>
            <View style={styles.chipRow}>
              <Chip label={c.location} color={colors.teal} />
              <Chip label={`Client: ${c.client.name}`} color={colors.mustard} />
            </View>
          </Animated.View>

          <Animated.View entering={FadeIn.delay(300).duration(600)} style={styles.clientBlock}>
            <CharacterPortrait name={c.client.portrait} size={120} label={c.client.name} glow={colors.red} />
            <Text style={styles.mood}>“{c.client.mood}”</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(480).duration(600)}>
            <SpeechBubble tone={colors.red}>{c.intro}</SpeechBubble>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(620).duration(600)} style={styles.warnBox}>
            <Image source={prop('face_monocle')} style={{ width: 30, height: 30 }} />
            <Text style={styles.warnText}>
              Detective’s note: stay sharp, but don’t be a paranoid maniac. Accusing an innocent
              partner will tank your Trust Meter.
            </Text>
          </Animated.View>
        </ScrollView>

        <View style={styles.footer}>
          <NoirButton
            title="OPEN THE CRIME SCENE"
            icon={<Image source={prop('magnifier')} style={{ width: 24, height: 24 }} />}
            onPress={() => navigation.navigate('CrimeScene', { caseId })}
          />
        </View>
      </SafeAreaView>
    </ScreenBg>
  );
}

const styles = StyleSheet.create({
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10 },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: colors.surfaceRaised, borderWidth: 2, borderColor: colors.line },
  backArrow: { color: colors.text, fontSize: 30, marginTop: -4, fontFamily: fonts.display },
  topTitle: { fontFamily: fonts.display, fontSize: 16, color: colors.text, letterSpacing: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },
  fileCard: {
    backgroundColor: colors.paper,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: colors.paperShadow,
    padding: 18,
    transform: [{ rotate: '-1.2deg' }],
  },
  fileHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  confidential: { fontFamily: fonts.bodyExtra, fontSize: 10, letterSpacing: 1.2, color: colors.redDeep },
  title: { fontFamily: fonts.display, fontSize: 22, color: colors.paperInk, lineHeight: 28 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  clientBlock: { alignItems: 'center', marginTop: 22, marginBottom: 8 },
  mood: { fontFamily: fonts.body, fontSize: 13, color: colors.textFaint, fontStyle: 'italic', marginTop: 6 },
  warnBox: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.surface, borderRadius: 14,
    borderWidth: 2, borderColor: colors.mustardDeep,
    padding: 14, marginTop: 20,
  },
  warnText: { flex: 1, fontFamily: fonts.body, fontSize: 13, color: colors.textDim, lineHeight: 19 },
  footer: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 8 },
});
