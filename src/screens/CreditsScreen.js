import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenBg, NoirButton, SectionLabel } from '../components/ui';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { prop } from '../assets/registry';
import { useGame } from '../engine/gameState';

export default function CreditsScreen({ navigation }) {
  const { reset } = useGame();

  const confirmReset = () => {
    Alert.alert('Reset all progress?', 'This wipes your Trust Meter, stars and unlocked cases. No undo.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => reset() },
    ]);
  };

  return (
    <ScreenBg>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topbar}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={10}>
            <Text style={styles.backArrow}>‹</Text>
          </Pressable>
          <Text style={styles.topTitle}>CREDITS & ABOUT</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <Image source={prop('magnifier')} style={{ width: 54, height: 54 }} />
            <Text style={styles.title}>Detective Bunty</Text>
            <Text style={styles.sub}>
              A comedy detective game where 9 out of 10 “cheaters” are gloriously innocent — and every
              10th case hides a harmless little twist. Stay sharp. Don’t be a maniac.
            </Text>
          </View>

          <SectionLabel>Art & Assets</SectionLabel>
          <View style={styles.card}>
            <Text style={styles.attr}>• Character & prop art: Microsoft Fluent Emoji (MIT).</Text>
            <Text style={styles.attr}>• Clue icons: game-icons.net by Delapouite & Lorc (CC BY 3.0).</Text>
            <Text style={styles.attr}>• Fonts: Bungee, Luckiest Guy, Nunito — Google Fonts (OFL).</Text>
            <Text style={styles.attrDim}>
              Every image is a real, open-license asset — nothing here is AI-generated. Full licenses
              are in assets/ATTRIBUTIONS.md.
            </Text>
          </View>

          <SectionLabel color={colors.teal}>The Message</SectionLabel>
          <View style={styles.card}>
            <Text style={styles.attr}>
              Over-suspicion breaks trust. This game gently roasts the paranoid detective in all of us —
              spying isn’t cool, and most people are just… taking cooking classes. 🍛
            </Text>
          </View>

          <View style={{ marginTop: 24 }}>
            <NoirButton
              title="RESET PROGRESS"
              variant="danger"
              icon={<Image source={prop('sweat')} style={{ width: 20, height: 20 }} />}
              onPress={confirmReset}
            />
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
  topTitle: { fontFamily: fonts.display, fontSize: 16, color: colors.text, letterSpacing: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 30 },
  hero: { alignItems: 'center', marginVertical: 16 },
  title: { fontFamily: fonts.display, fontSize: 26, color: colors.mustard, marginTop: 10 },
  sub: { fontFamily: fonts.body, fontSize: 14, color: colors.textDim, textAlign: 'center', lineHeight: 20, marginTop: 10 },
  card: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 2, borderColor: colors.line, padding: 16, marginBottom: 10, gap: 8 },
  attr: { fontFamily: fonts.body, fontSize: 13.5, color: colors.text, lineHeight: 20 },
  attrDim: { fontFamily: fonts.body, fontSize: 12.5, color: colors.textFaint, lineHeight: 18, marginTop: 4, fontStyle: 'italic' },
});
