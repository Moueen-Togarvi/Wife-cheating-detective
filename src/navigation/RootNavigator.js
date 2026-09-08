import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CaseRunProvider } from '../engine/caseRun';
import { colors } from '../theme/colors';

import HomeScreen from '../screens/HomeScreen';
import EpisodeMapScreen from '../screens/EpisodeMapScreen';
import CaseIntroScreen from '../screens/CaseIntroScreen';
import CrimeSceneScreen from '../screens/CrimeSceneScreen';
import EvidenceBoardScreen from '../screens/EvidenceBoardScreen';
import InterrogationScreen from '../screens/InterrogationScreen';
import AccusationScreen from '../screens/AccusationScreen';
import RevealScreen from '../screens/RevealScreen';
import ResultsScreen from '../screens/ResultsScreen';
import CreditsScreen from '../screens/CreditsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <CaseRunProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bg },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EpisodeMap" component={EpisodeMapScreen} />
        <Stack.Screen name="CaseIntro" component={CaseIntroScreen} />
        <Stack.Screen name="CrimeScene" component={CrimeSceneScreen} />
        <Stack.Screen name="EvidenceBoard" component={EvidenceBoardScreen} />
        <Stack.Screen name="Interrogation" component={InterrogationScreen} />
        <Stack.Screen name="Accusation" component={AccusationScreen} />
        <Stack.Screen
          name="Reveal"
          component={RevealScreen}
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen name="Results" component={ResultsScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="Credits" component={CreditsScreen} />
      </Stack.Navigator>
    </CaseRunProvider>
  );
}
