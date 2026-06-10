import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform, StyleProp, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, BorderRadius, Shadow } from '../theme/index';

interface Props {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  fallbackBackgroundColor?: string;
  borderRadius?: number;
}

export default function GlassView({ 
  children, 
  style, 
  intensity = 20, 
  tint = 'dark',
  fallbackBackgroundColor = 'rgba(10, 16, 12, 0.95)',
  borderRadius = BorderRadius.xl
}: Props) {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        intensity={intensity}
        tint={tint}
        style={[
          styles.glassWrapper,
          { borderRadius },
          style,
        ]}
      >
        {children}
      </BlurView>
    );
  }

  // Android Fallback
  return (
    <View
      style={[
        styles.androidFallback,
        { backgroundColor: fallbackBackgroundColor, borderRadius },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  glassWrapper: {
    backgroundColor: Colors.glassBackground,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glassBorderLight,
  },
  androidFallback: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.glassBorderLight,
    ...Shadow.card,
  },
});
