import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Food } from '../types/index';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from '../theme/index';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Card occupies most of the screen width, leaving margins
const CARD_WIDTH = SCREEN_WIDTH - 48;
const CARD_HEIGHT = CARD_WIDTH * 1.35; // ~4:5.4 aspect from Figma

interface Props {
  food: Food;
  /** Stacked card beneath top card — scaled down, shifted up */
  isBack?: boolean;
  backOffset?: number; // how far down the card peeks (default 12)
}

export default function FoodCard({ food, isBack = false, backOffset = 12 }: Props) {
  if (isBack) {
    return (
      <View
        style={[
          styles.card,
          styles.backCard,
          { top: -backOffset },
        ]}
        pointerEvents="none"
      >
        <View style={styles.backCardInner} />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {/* Food image fills card */}
      <Image
        source={{ uri: food.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Bottom gradient overlay for text legibility */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.25)', 'rgba(0,0,0,0.80)']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Food name */}
      <View style={styles.textContainer}>
        <Text style={styles.foodName}>{food.name}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{food.category}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundCard,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Shadow.card,
  },
  backCard: {
    position: 'absolute',
    transform: [{ scale: 0.95 }],
    backgroundColor: Colors.backgroundCardAlt,
    zIndex: -1,
    opacity: 0.85,
  },
  backCardInner: {
    flex: 1,
    backgroundColor: Colors.backgroundCardAlt,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  foodName: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.3,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  categoryText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
    textTransform: 'capitalize',
    letterSpacing: 0.5,
  },
});

export { CARD_WIDTH, CARD_HEIGHT };
