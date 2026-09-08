import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { ScreenBg, NoirButton } from '../components/ui';
import RankBadge from '../components/RankBadge';
import { colors } from '../theme/colors';
import { fonts, type } from '../theme/typography';
import { portrait, prop } from '../assets/registry';
import { useGame } from '../engine/gameState';
import { CASES } from '../data/cases';

export default function HomeScreen({ navigation }) {
  const { progress, rank } = useGame();

  const solved = Object.values(progress.cases).filter((c) => c).length;
  const hasProgress = solved > 0;

  // "Continue" jumps to the first unsolved, unlocked case; else episode map.
  const nextCase = CASES.find((c, i) => i + 1 <= progress.unlockedEpisode && !progress.cases[c.id]);

  return (
    <ScreenBg variant="spotlight">
      <SafeAreaView style={styles.safe}>
        <Animated.View entering={FadeIn.duration(600)} style={styles.badgeTop}>
          <RankBadge rank={rank} totalStars={progress.totalStars} compact />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).duration(700)} style={styles.hero}>
          <Image source={portrait('detective')} style={styles.heroArt} resizeMode="contain" />
          <View style={styles.magWrap}>
            <Image source={prop('magnifier')} style={styles.mag} />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(240).duration(700)} style={styles.titleBlock}>
          <Text style={styles.kicker}>THE OVER-DRAMATIC CASEFILES OF</Text>
          <Text style={styles.title}>DETECTIVE</Text>
          <Text style={styles.titleBig}>BUNTY</Text>
          <Text style={styles.tagline}>9 out of 10 are innocent. Can you tell which one isn’t?</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(360).duration(700)} style={styles.actions}>
          {hasProgress && nextCase ? (
            <NoirButton
              title="CONTINUE INVESTIGATION"
              icon={<Image source={prop('footprints')} style={styles.btnIcon} />}
              onPress={() => navigation.navigate('CaseIntro', { caseId: nextCase.id })}
            />
          ) : (
            <NoirButton
              title={hasProgress ? 'ALL CASES CRACKED' : 'START NEW CASE'}
              icon={<Image source={prop('magnifier')} style={styles.btnIcon} />}
              onPress={() =>
                hasProgress
                  ? navigation.navigate('EpisodeMap')
                  : navigation.navigate('CaseIntro', { caseId: CASES[0].id })
              }
            />
          )}
          <NoirButton
            title="CASE FILES"
            variant="ghost"
            icon={<Image source={prop('newspaper')} style={styles.btnIcon} />}
            onPress={() => navigation.navigate('EpisodeMap')}
          />
          <Pressable style={styles.creditsLink} onPress={() => navigation.navigate('Credits')}>
            <Text style={styles.creditsText}>Credits & About</Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </ScreenBg>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, paddingHorizontal: 22, justifyContent: 'space-between' },
  badgeTop: { marginTop: 8 },
  hero: { alignItems: 'center', marginTop: 6 },
  heroArt: { width: 170, height: 170 },
  magWrap: { position: 'absolute', right: 78, bottom: 6, transform: [{ rotate: '18deg' }] },
  mag: { width: 58, height: 58 },
  titleBlock: { alignItems: 'center' },
  kicker: { fontFamily: fonts.bodyExtra, fontSize: 11, letterSpacing: 2, color: colors.textFaint },
  title: { fontFamily: fonts.display, fontSize: 40, color: colors.text, letterSpacing: 1, marginTop: 6 },
  titleBig: { fontFamily: fonts.display, fontSize: 52, color: colors.mustard, letterSpacing: 1, marginTop: -6 },
  tagline: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textDim,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  actions: { gap: 12, marginBottom: 10 },
  btnIcon: { width: 24, height: 24 },
  creditsLink: { alignItems: 'center', paddingVertical: 8 },
  creditsText: { fontFamily: fonts.body, fontSize: 13, color: colors.textFaint, textDecorationLine: 'underline' },
});
