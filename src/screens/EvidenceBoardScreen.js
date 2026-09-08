import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Line } from 'react-native-svg';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { ScreenBg, NoirButton } from '../components/ui';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { prop } from '../assets/registry';
import { getCase } from '../data/cases';
import { useCaseRun } from '../engine/caseRun';

// Deterministic scatter slots (percentages of the board).
const SLOTS = [
  { x: 24, y: 16 },
  { x: 75, y: 22 },
  { x: 28, y: 48 },
  { x: 74, y: 54 },
  { x: 30, y: 80 },
  { x: 72, y: 82 },
];
const NODE = 92;

export default function EvidenceBoardScreen({ navigation, route }) {
  const { caseId } = route.params;
  const c = getCase(caseId);
  const { run, toggleConnection, useHint, pairKey } = useCaseRun();

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const clues = c.scene.clues;
  const center = (i) => ({
    x: (SLOTS[i].x / 100) * size.w,
    y: (SLOTS[i].y / 100) * size.h,
  });
  const idxOf = (id) => clues.findIndex((cl) => cl.id === id);

  const onTapNode = (clue, i) => {
    if (selected == null) {
      setSelected(i);
    } else if (selected === i) {
      setSelected(null);
    } else {
      toggleConnection(clues[selected].id, clue.id);
      setSelected(null);
    }
  };

  const connCount = run.connections.length;

  return (
    <ScreenBg>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topbar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={10}>
            <Text style={styles.backArrow}>‹</Text>
          </Pressable>
          <Text style={styles.topTitle}>EVIDENCE BOARD</Text>
          <Pressable onPress={() => { setShowHint((s) => { if (!s) useHint(); return !s; }); }} style={styles.hintBtn} hitSlop={8}>
            <Image source={prop('bulb')} style={{ width: 22, height: 22 }} />
          </Pressable>
        </View>

        <Text style={styles.help}>
          Tap one clue, then another, to string them together. Find the links that matter.
        </Text>

        {showHint && (
          <Animated.View entering={FadeIn} style={styles.hintCard}>
            <Image source={prop('bulb')} style={{ width: 26, height: 26 }} />
            <Text style={styles.hintText}>{c.hint}</Text>
          </Animated.View>
        )}

        <View
          style={styles.board}
          onLayout={(e) => setSize({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
        >
          {/* red string threads */}
          {size.w > 0 && (
            <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
              {run.connections.map(([a, b], k) => {
                const ca = center(idxOf(a));
                const cb = center(idxOf(b));
                return (
                  <Line key={k} x1={ca.x} y1={ca.y} x2={cb.x} y2={cb.y}
                    stroke={colors.thread} strokeWidth={3} strokeLinecap="round" opacity={0.9} />
                );
              })}
              {/* live thread from selected node to nowhere (visual anchor) */}
            </Svg>
          )}

          {size.w > 0 &&
            clues.map((clue, i) => {
              const cc = center(i);
              const isSel = selected === i;
              const linked = run.connections.some(
                ([a, b]) => a === clue.id || b === clue.id
              );
              return (
                <Pressable
                  key={clue.id}
                  onPress={() => onTapNode(clue, i)}
                  style={[
                    styles.node,
                    {
                      left: cc.x - NODE / 2,
                      top: cc.y - NODE / 2,
                      borderColor: isSel ? colors.mustard : linked ? colors.thread : colors.line,
                      transform: [{ rotate: `${(i % 2 === 0 ? -1 : 1) * 2.5}deg` }, { scale: isSel ? 1.06 : 1 }],
                    },
                  ]}
                >
                  <View style={styles.pin} />
                  <Image source={prop(clue.prop)} style={{ width: 40, height: 40 }} />
                  <Text style={styles.nodeLabel} numberOfLines={2}>{clue.title.replace(/^(A |An |The )/, '')}</Text>
                </Pressable>
              );
            })}
        </View>

        <View style={styles.footer}>
          <Text style={styles.connInfo}>
            {connCount === 0 ? 'No links yet — connect the clues that tell a story.' : `${connCount} connection${connCount > 1 ? 's' : ''} made`}
          </Text>
          <NoirButton
            title="INTERROGATE THE SUSPECTS"
            icon={<Image source={prop('eyes')} style={{ width: 24, height: 24 }} />}
            onPress={() => navigation.navigate('Interrogation', { caseId })}
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
  hintBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 12, backgroundColor: colors.surfaceRaised, borderWidth: 2, borderColor: colors.mustardDeep },
  help: { fontFamily: fonts.body, fontSize: 13, color: colors.textDim, paddingHorizontal: 20, fontStyle: 'italic', marginBottom: 6 },
  hintCard: { flexDirection: 'row', gap: 10, alignItems: 'center', marginHorizontal: 16, backgroundColor: colors.surfaceRaised, borderRadius: 12, borderWidth: 2, borderColor: colors.mustardDeep, padding: 12, marginBottom: 4 },
  hintText: { flex: 1, fontFamily: fonts.body, fontSize: 12.5, color: colors.text, lineHeight: 18 },
  board: {
    flex: 1, marginHorizontal: 16, marginTop: 6,
    backgroundColor: '#171C26',
    borderRadius: 18, borderWidth: 3, borderColor: colors.line,
    overflow: 'hidden',
  },
  node: {
    position: 'absolute',
    width: NODE, height: NODE,
    backgroundColor: colors.paper,
    borderRadius: 12, borderWidth: 3,
    alignItems: 'center', justifyContent: 'center',
    padding: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.4, shadowRadius: 5, elevation: 6,
  },
  pin: { position: 'absolute', top: -6, width: 12, height: 12, borderRadius: 6, backgroundColor: colors.red, borderWidth: 2, borderColor: '#7E1717' },
  nodeLabel: { fontFamily: fonts.bodyBold, fontSize: 10, color: colors.paperInk, textAlign: 'center', marginTop: 3, lineHeight: 12 },
  footer: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 8, gap: 10 },
  connInfo: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textFaint, textAlign: 'center' },
});
