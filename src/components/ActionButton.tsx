import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import { Colors, FontSize, FontWeight, Shadow } from '../theme/index';

export type ActionType = 'dislike' | 'notSure' | 'superLike' | 'like';

const ACTION_CONFIG: Record<
  ActionType,
  { bg: string; icon: string; label: string; size: number }
> = {
  dislike: {
    bg: Colors.buttonDislike,
    icon: '✕',
    label: 'Swipe Left',
    size: 58,
  },
  notSure: {
    bg: Colors.buttonNotSure,
    icon: '?',
    label: 'Not Sure',
    size: 50,
  },
  superLike: {
    bg: Colors.buttonSuperLike,
    icon: '★',
    label: 'Super Like',
    size: 50,
  },
  like: {
    bg: Colors.buttonLike,
    icon: '♥',
    label: 'Swipe Right',
    size: 58,
  },
};

interface Props {
  type: ActionType;
  onPress?: () => void;
}

export default function ActionButton({ type, onPress }: Props) {
  const { bg, icon, label, size } = ACTION_CONFIG[type];

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={[
          styles.button,
          { 
            backgroundColor: bg, 
            width: size, 
            height: size, 
            borderRadius: size / 2,
            shadowColor: bg,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: type === 'notSure' ? 0.2 : 0.6,
            shadowRadius: type === 'notSure' ? 10 : 20,
            elevation: type === 'notSure' ? 4 : 10,
          },
        ]}
      >
        <Text style={[styles.icon, { fontSize: type === 'dislike' || type === 'like' ? 22 : 20 }]}>
          {icon}
        </Text>
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 6,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.button,
  },
  icon: {
    color: Colors.white,
    fontWeight: FontWeight.bold,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
