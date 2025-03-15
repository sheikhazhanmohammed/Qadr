// screens/DhikrScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QadrColorSchema } from '../constants/colors';

export default function DhikrScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dhikr Screen</Text>
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