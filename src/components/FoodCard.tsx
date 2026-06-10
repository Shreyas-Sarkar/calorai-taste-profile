import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Food } from '../types/index';
import { Colors, BorderRadius, FontSize, FontWeight, Shadow } from '../theme/index';
import GlassView from './GlassView';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CARD_WIDTH = SCREEN_WIDTH - 48;
const CARD_HEIGHT = CARD_WIDTH * 1.35; // ~4:5.4 aspect from Figma

interface Props {
  food: Food;
  isBack?: boolean;
  backOffset?: number;
}

export default function FoodCard({ food, isBack = false, backOffset = 12 }: Props) {
  if (isBack) {
    return (
      <View
        style={[
          styles.cardContainer,
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
    <GlassView 
      style={styles.cardContainer} 
      borderRadius={BorderRadius.xl}
      fallbackBackgroundColor={Colors.backgroundCard}
    >
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: food.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.foodName}>I love eating {food.name.toLowerCase()}</Text>
      </View>
    </GlassView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: BorderRadius.xl,
    ...Shadow.card,
  },
  backCard: {
    position: 'absolute',
    transform: [{ scale: 0.95 }],
    backgroundColor: Colors.backgroundCardAlt,
    zIndex: -1,
    opacity: 0.85,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  backCardInner: {
    flex: 1,
    backgroundColor: Colors.backgroundCardAlt,
    borderRadius: BorderRadius.xl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  foodName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
});

export { CARD_WIDTH, CARD_HEIGHT };
