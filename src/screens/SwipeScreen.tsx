import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  Colors,
  Gradients,
  Spacing,
  FontSize,
  FontWeight,
} from '../theme/index';
import BottomNav from '../components/BottomNav';
import FoodCard from '../components/FoodCard';
import ProgressBar from '../components/ProgressBar';
import ActionButton from '../components/ActionButton';
import foodsData from '../data/foods.json';
import { Food } from '../types/index';

const foods = foodsData.foods as Food[];

type SwipeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Swipe'
>;

interface Props {
  navigation: SwipeScreenNavigationProp;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SwipeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  // Static in Phase 2 — shows first card, progress at 0%
  const currentFood = foods[0];
  const nextFood = foods[1];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={Gradients.background as [string, string, ...string[]]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Progress bar — thin strip at top */}
      <View style={[styles.progressContainer, { paddingTop: insets.top + 12 }]}>
        <ProgressBar progress={0} />
        <Text style={styles.progressLabel}>
          0 / {foods.length}
        </Text>
      </View>

      {/* Card stack — back card peeking behind top card */}
      <View style={styles.cardStack}>
        {/* Back card — positioned behind */}
        <View style={styles.backCardWrapper}>
          <FoodCard food={nextFood} isBack />
        </View>
        {/* Top card — the active card */}
        <FoodCard food={currentFood} />
      </View>

      {/* Action buttons row */}
      <View style={styles.actionsRow}>
        <ActionButton type="dislike" />
        <ActionButton type="notSure" />
        <ActionButton type="superLike" />
        <ActionButton type="like" />
      </View>

      {/* Bottom Navigation */}
      <BottomNav activeTab="TasteProfile" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  progressContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    gap: 6,
  },
  progressLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.textMuted,
    textAlign: 'right',
  },
  cardStack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
  },
  backCardWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    // Shift back card slightly down to simulate stack depth
    transform: [{ translateY: 14 }, { scale: 0.95 }],
    zIndex: 0,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
});
