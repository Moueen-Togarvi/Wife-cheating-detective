import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

// Comic speech bubble with a little tail. `tone` colours the border.
export default function SpeechBubble({ children, tone = colors.mustard, style }) {
  return (
    <View style={[styles.wrap, style]}>
      <View style={[styles.bubble, { borderColor: tone }]}>
        <Text style={styles.text}>{children}</Text>
      </View>
      <View style={[styles.tail, { borderTopColor: tone }]} />
      <View style={styles.tailInner} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'flex-start' },
  bubble: {
    backgroundColor: colors.paper,
    borderRadius: 18,
    borderWidth: 3,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  text: { fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 23, color: colors.paperInk },
  tail: {
    marginLeft: 26,
    marginTop: -1,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 14,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  tailInner: {
    position: 'absolute',
    bottom: 3,
    left: 29,
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.paper,
  },
});
