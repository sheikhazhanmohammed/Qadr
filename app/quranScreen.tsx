// screens/QuranScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QadrColorSchema } from '../constants/colors';

export default function QuranScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Quran Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: QadrColorSchema.backgroundColor,
  },
  text: {
    fontFamily: 'zainRegular',
    fontSize: 18,
    color: QadrColorSchema.secondaryColor1,
  },
});