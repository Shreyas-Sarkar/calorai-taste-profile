import React, { useState } from 'react';
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
  Shadow,
} from '../theme/index';
import BottomNav from '../components/BottomNav';
import FoodCard from '../components/FoodCard';
import ProgressBar from '../components/ProgressBar';
import ActionButton from '../components/ActionButton';
import foodsData from '../data/foods.json';
import { Food } from '../types/index';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const foods = foodsData.foods as Food[];

type SwipeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Swipe'
>;

interface Props {
  navigation: SwipeScreenNavigationProp;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3;

export default function SwipeScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();

  // T-4.1 Track: currentIndex, likedFoods[], dislikedFoods[]
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const currentIndexRef = React.useRef(0);
  const [likedFoods, setLikedFoods] = React.useState<Food[]>([]);
  const [dislikedFoods, setDislikedFoods] = React.useState<Food[]>([]);

  // T-4.2 Create shared values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const currentFood = foods[currentIndex];
  const nextFood = foods[currentIndex + 1];

  // T-4.12 Navigate to Results Screen when all cards are processed
  React.useEffect(() => {
    if (currentIndex > 0 && currentIndex >= foods.length) {
      navigation.navigate('Results', { likedFoods, dislikedFoods });
    }
  }, [currentIndex, likedFoods, dislikedFoods, navigation]);

  // T-4.8 Add card to liked/disliked collection, Advance currentIndex
  const handleSwipeEnd = (direction: 'left' | 'right') => {
    const idx = currentIndexRef.current;
    if (idx >= foods.length) return;
    const food = foods[idx];

    if (direction === 'right') {
      setLikedFoods((prev) => [...prev, food]);
    } else {
      setDislikedFoods((prev) => [...prev, food]);
    }

    const nextIndex = idx + 1;
    currentIndexRef.current = nextIndex;
    setCurrentIndex(nextIndex);

    // Reset shared values for the next card instantly
    translateX.value = 0;
    translateY.value = 0;
    rotation.value = 0;
  };

  // T-4.7 Animate card exit off-screen
  // T-4.9 & T-4.10 logic sharing
  const swipeLeft = () => {
    translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 300 }, (finished) => {
      if (finished) runOnJS(handleSwipeEnd)('left');
    });
    translateY.value = withTiming(50, { duration: 300 });
    rotation.value = withTiming(-15, { duration: 300 });
  };

  const swipeRight = () => {
    translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 300 }, (finished) => {
      if (finished) runOnJS(handleSwipeEnd)('right');
    });
    translateY.value = withTiming(50, { duration: 300 });
    rotation.value = withTiming(15, { duration: 300 });
  };

  // T-4.3 Attach pan gesture to top card
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // T-4.4 Animate card movement and rotation during drag
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotation.value = (event.translationX / SCREEN_WIDTH) * 15; // Max 15 degrees
    })
    .onEnd((event) => {
      // T-4.5 & T-4.6 Implement swipe threshold detection
      const isSwipeRight = event.translationX > SWIPE_THRESHOLD || event.velocityX > 800;
      const isSwipeLeft = event.translationX < -SWIPE_THRESHOLD || event.velocityX < -800;

      if (isSwipeRight) {
        runOnJS(swipeRight)();
      } else if (isSwipeLeft) {
        runOnJS(swipeLeft)();
      } else {
        // Snap back to center
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotation.value = withSpring(0);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotation.value}deg` },
      ],
    };
  });

  const yesOpacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, SCREEN_WIDTH * 0.2], [0, 1], Extrapolation.CLAMP),
  }));

  const noOpacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, -SCREEN_WIDTH * 0.2], [0, 1], Extrapolation.CLAMP),
  }));

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={Gradients.background as [string, string, ...string[]]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Progress bar — not wired yet (Phase 5) */}
      <View style={[styles.progressContainer, { paddingTop: insets.top + 12 }]}>
        <ProgressBar progress={0} />
      </View>

      <View style={styles.cardStack}>
        {nextFood && (
          <View style={styles.backCardWrapper}>
            <FoodCard food={nextFood} isBack />
          </View>
        )}
        
        {currentFood && (
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.topCardWrapper, animatedCardStyle]}>
              <FoodCard food={currentFood} />
              <Animated.View style={[styles.stamp, styles.stampYes, yesOpacityStyle]}>
                <Text style={styles.stampText}>Yes</Text>
              </Animated.View>
              <Animated.View style={[styles.stamp, styles.stampNo, noOpacityStyle]}>
                <Text style={styles.stampText}>No</Text>
              </Animated.View>
            </Animated.View>
          </GestureDetector>
        )}
      </View>

      <View style={styles.actionsRow}>
        <ActionButton type="dislike" onPress={currentFood ? swipeLeft : undefined} />
        <ActionButton type="notSure" />
        <ActionButton type="superLike" />
        <ActionButton type="like" onPress={currentFood ? swipeRight : undefined} />
      </View>

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
    transform: [{ translateY: 14 }, { scale: 0.95 }],
    zIndex: 0,
  },
  topCardWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  stamp: {
    position: 'absolute',
    top: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    zIndex: 10,
    ...Shadow.button,
  },
  stampYes: {
    right: 40,
    backgroundColor: Colors.buttonLike,
    transform: [{ rotateZ: '15deg' }],
  },
  stampNo: {
    left: 40,
    backgroundColor: Colors.buttonDislike,
    transform: [{ rotateZ: '-15deg' }],
  },
  stampText: {
    color: Colors.backgroundDark,
    fontSize: 22,
    fontWeight: FontWeight.bold,
  },
});
