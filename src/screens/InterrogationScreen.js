import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { ScreenBg, NoirButton, CharacterPortrait } from '../components/ui';
import SpeechBubble from '../components/SpeechBubble';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { prop, portrait } from '../assets/registry';
import { getCase } from '../data/cases';
import { useCaseRun } from '../engine/caseRun';

export default function InterrogationScreen({ navigation, route }) {
  const { caseId } = route.params;
  const c = getCase(caseId);
  const { run, markAsked } = useCaseRun();
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  const suspect = c.suspects[active];
  const askedTotal = run.asked.length;

  const ask = (qIdx) => {
    markAsked(active, qIdx);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
  };

  const isAsked = (qIdx) => run.asked.includes(`${active}:${qIdx}`);
  const askedForSuspect = suspect.questions.map((_, i) => isAsked(i));

  return (
    <ScreenBg variant="spotlight">
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topbar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={10}>
            <Text style={styles.backArrow}>‹</Text>
          </Pressable>
          <Text style={styles.topTitle}>INTERROGATION</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* suspect selector */}
        <View style={styles.selector}>
          {c.suspects.map((s, i) => (
            <Pressable key={i} onPress={() => setActive(i)} style={[styles.suspectTab, active === i && styles.suspectTabActive]}>
              <CharacterPortraitMini name={s.portrait} active={active === i} />
              <Text style={[styles.suspectName, active === i && { color: colors.mustard }]} numberOfLines={1}>
                {s.name.split(' ')[0]}
              </Text>
            </Pressable>
          ))}
        </View>

        <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View key={`hdr-${active}`} entering={FadeIn.duration(400)} style={styles.suspectHeader}>
            <CharacterPortrait name={suspect.portrait} size={100} label={suspect.name} glow={colors.teal} />
            <View style={styles.tagPill}>
              <Text style={styles.tagText}>{suspect.tag}</Text>
            </View>
          </Animated.View>

          {/* transcript */}
          <View style={styles.transcript}>
            {suspect.questions.map((qa, i) =>
              isAsked(i) ? (
                <Animated.View key={i} entering={FadeInDown.duration(300)} style={{ marginBottom: 14 }}>
                  <View style={styles.youRow}>
                    <Text style={styles.youText}>You: {qa.q}</Text>
                  </View>
                  <SpeechBubble tone={colors.teal}>{qa.a}</SpeechBubble>
                </Animated.View>
              ) : null
            )}
            {askedForSuspect.every((x) => !x) && (
              <Text style={styles.emptyHint}>Pick a question below to start grilling {suspect.name.split(' ')[0]}.</Text>
            )}
          </View>
        </ScrollView>

        {/* question picker */}
        <View style={styles.picker}>
          <Text style={styles.pickerLabel}>ASK A QUESTION</Text>
          <View style={styles.qWrap}>
            {suspect.questions.map((qa, i) => (
              <Pressable
                key={i}
                onPress={() => ask(i)}
                style={[styles.qChip, isAsked(i) && styles.qChipAsked]}
              >
                <Text style={[styles.qChipText, isAsked(i) && styles.qChipTextAsked]} numberOfLines={2}>
                  {qa.q}
                </Text>
              </Pressable>
            ))}
          </View>
          <NoirButton
            title={askedTotal < 2 ? 'ASK MORE, THEN ACCUSE' : 'MAKE YOUR ACCUSATION'}
            variant={askedTotal < 2 ? 'ghost' : 'red'}
            icon={<Image source={prop('face_suspect')} style={{ width: 22, height: 22 }} />}
            onPress={() => navigation.navigate('Accusation', { caseId })}
          />
        </View>
      </SafeAreaView>
    </ScreenBg>
  );
}

function CharacterPortraitMini({ name, active }) {
  return (
    <View style={[stylesMini.wrap, active && stylesMini.active]}>
      <Image source={portrait(name)} style={{ width: 44, height: 44 }} resizeMode="contain" />
    </View>
  );
}

const stylesMini = StyleSheet.create({
  wrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.bgDeep, borderWidth: 2, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  active: { borderColor: colors.mustard },
});

const styles = StyleSheet.create({
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10 },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: colors.surfaceRaised, borderWidth: 2, borderColor: colors.line },
  backArrow: { color: colors.text, fontSize: 30, marginTop: -4, fontFamily: fonts.display },
  topTitle: { fontFamily: fonts.display, fontSize: 16, color: colors.text, letterSpacing: 1 },
  selector: { flexDirection: 'row', justifyContent: 'center', gap: 24, paddingVertical: 8 },
  suspectTab: { alignItems: 'center', gap: 4, opacity: 0.7 },
  suspectTabActive: { opacity: 1 },
  suspectName: { fontFamily: fonts.bodyExtra, fontSize: 12, color: colors.textDim },
  scroll: { paddingHorizontal: 20, paddingBottom: 10 },
  suspectHeader: { alignItems: 'center', marginTop: 4 },
  tagPill: { marginTop: 8, backgroundColor: colors.surfaceRaised, borderRadius: 14, borderWidth: 2, borderColor: colors.teal, paddingHorizontal: 12, paddingVertical: 5 },
  tagText: { fontFamily: fonts.bodyExtra, fontSize: 11, letterSpacing: 0.8, color: colors.teal },
  transcript: { marginTop: 18 },
  youRow: { alignSelf: 'flex-end', backgroundColor: colors.surfaceRaised, borderRadius: 12, borderTopRightRadius: 2, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 6, maxWidth: '85%' },
  youText: { fontFamily: fonts.bodyBold, fontSize: 13, color: colors.text },
  emptyHint: { fontFamily: fonts.body, fontSize: 13, color: colors.textFaint, textAlign: 'center', fontStyle: 'italic', marginTop: 10 },
  picker: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 8, borderTopWidth: 2, borderTopColor: colors.lineSoft, backgroundColor: 'rgba(8,10,14,0.4)' },
  pickerLabel: { fontFamily: fonts.bodyExtra, fontSize: 11, letterSpacing: 1.5, color: colors.textFaint, marginBottom: 8 },
  qWrap: { gap: 8, marginBottom: 12 },
  qChip: { backgroundColor: colors.surface, borderRadius: 12, borderWidth: 2, borderColor: colors.line, paddingHorizontal: 14, paddingVertical: 11 },
  qChipAsked: { opacity: 0.45, borderColor: colors.lineSoft },
  qChipText: { fontFamily: fonts.bodyBold, fontSize: 13.5, color: colors.text },
  qChipTextAsked: { color: colors.textFaint },
});
