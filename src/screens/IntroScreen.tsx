import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IntroScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Intro Screen — Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070C0A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
