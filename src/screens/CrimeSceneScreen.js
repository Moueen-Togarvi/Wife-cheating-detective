import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInUp, SlideInDown } from 'react-native-reanimated';
import { ScreenBg, NoirButton } from '../components/ui';
import ClueHotspot from '../components/ClueHotspot';
import StampOverlay from '../components/StampOverlay';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { prop } from '../assets/registry';
import { getCase } from '../data/cases';
import { useCaseRun } from '../engine/caseRun';

export default function CrimeSceneScreen({ navigation, route }) {
  const { caseId } = route.params;
  const c = getCase(caseId);
  const { run, collect } = useCaseRun();
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(null); // clue currently displayed
  const [stamp, setStamp] = useState(false);

  const total = c.scene.clues.length;
  const found = run.collected.length;
  const allFound = found >= total;

  const onHotspot = (clue) => {
    const already = run.collected.includes(clue.id);
    if (!already) {
      collect(clue.id);
      setStamp(true);
    }
    setActive(clue);
  };

  return (
    <ScreenBg>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topbar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={10}>
            <Text style={styles.backArrow}>‹</Text>
          </Pressable>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.topTitle}>CRIME SCENE</Text>
            <Text style={styles.topSub}>{c.location}</Text>
          </View>
          <View style={styles.counter}>
            <Image source={prop('magnifier')} style={{ width: 16, height: 16 }} />
            <Text style={styles.counterText}>{found}/{total}</Text>
          </View>
        </View>

        <Text style={styles.hint}>{c.scene.label}</Text>

        {/* The scene canvas */}
        <View style={styles.sceneWrap}>
          <LinearGradient colors={['#20293A', '#141A24', '#0B0E13']} style={styles.scene}
            onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}>
            {/* faint floor line for depth */}
            <View style={styles.horizon} />
            {size.w > 0 &&
              c.scene.clues.map((clue) => (
                <ClueHotspot
                  key={clue.id}
                  x={(clue.x / 100) * size.w - 27}
                  y={(clue.y / 100) * size.h - 27}
                  found={run.collected.includes(clue.id)}
                  propName={clue.prop}
                  onPress={() => onHotspot(clue)}
                />
              ))}
            {stamp && <StampOverlay label="CLUE!" color={colors.mustard} onDone={() => setStamp(false)} />}
          </LinearGradient>
        </View>

        {/* Clue detail popup */}
        {active && (
          <Animated.View entering={SlideInDown.duration(260)} style={styles.popup}>
            <View style={styles.popupArtWrap}>
              <Image source={prop(active.prop)} style={{ width: 54, height: 54 }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.popupTitle}>{active.title}</Text>
              <Text style={styles.popupText}>{active.text}</Text>
            </View>
            <Pressable onPress={() => setActive(null)} style={styles.popupClose} hitSlop={10}>
              <Text style={styles.popupCloseX}>×</Text>
            </Pressable>
          </Animated.View>
        )}

        <View style={styles.footer}>
          {!allFound ? (
            <Animated.Text entering={FadeIn} style={styles.footHint}>
              {found === 0 ? 'Tap the glowing spots to collect clues.' : `Keep looking — ${total - found} clue${total - found > 1 ? 's' : ''} still hidden.`}
            </Animated.Text>
          ) : (
            <Animated.View entering={FadeInUp.duration(400)}>
              <NoirButton
                title="TO THE EVIDENCE BOARD"
                icon={<Image source={prop('memo')} style={{ width: 22, height: 22 }} />}
                onPress={() => navigation.navigate('EvidenceBoard', { caseId })}
              />
            </Animated.View>
          )}
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
  topSub: { fontFamily: fonts.body, fontSize: 11, color: colors.textFaint },
  counter: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.surfaceRaised, borderRadius: 12, borderWidth: 2, borderColor: colors.mustardDeep, paddingHorizontal: 10, paddingVertical: 7 },
  counterText: { fontFamily: fonts.display, fontSize: 13, color: colors.mustard },
  hint: { fontFamily: fonts.body, fontSize: 13, color: colors.textDim, paddingHorizontal: 20, marginBottom: 8, fontStyle: 'italic' },
  sceneWrap: { flex: 1, marginHorizontal: 16, borderRadius: 20, overflow: 'hidden', borderWidth: 3, borderColor: colors.line },
  scene: { flex: 1 },
  horizon: { position: 'absolute', left: 0, right: 0, top: '68%', height: 2, backgroundColor: 'rgba(255,255,255,0.05)' },
  popup: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    marginHorizontal: 16, marginTop: 12,
    backgroundColor: colors.paper, borderRadius: 16, borderWidth: 3, borderColor: colors.mustardDeep,
    padding: 14,
  },
  popupArtWrap: { width: 64, height: 64, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.06)', alignItems: 'center', justifyContent: 'center' },
  popupTitle: { fontFamily: fonts.display, fontSize: 15, color: colors.paperInk },
  popupText: { fontFamily: fonts.body, fontSize: 13, color: colors.paperInk, lineHeight: 18, marginTop: 3 },
  popupClose: { width: 26, height: 26, alignItems: 'center', justifyContent: 'center' },
  popupCloseX: { fontSize: 26, color: colors.paperInk, fontFamily: fonts.display, marginTop: -4 },
  footer: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8, minHeight: 76, justifyContent: 'center' },
  footHint: { fontFamily: fonts.body, fontSize: 13, color: colors.textFaint, textAlign: 'center' },
});
