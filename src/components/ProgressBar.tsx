import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../theme/index';

interface Props {
  /** 0.0 to 1.0 */
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  const clampedProgress = Math.max(0, Math.min(1, progress));

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clampedProgress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.progressTrack,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: Colors.progressFill,
  },
});
