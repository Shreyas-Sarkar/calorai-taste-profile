import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  Colors,
  Gradients,
  Spacing,
  BorderRadius,
  FontSize,
  FontWeight,
  Shadow,
} from '../theme/index';
import BottomNav from '../components/BottomNav';
import GlassView from '../components/GlassView';

type ResultsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Results'
>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

interface Props {
  navigation: ResultsScreenNavigationProp;
  route: ResultsScreenRouteProp;
}

// Static placeholder highlights — wired to real data in Phase 6
const HIGHLIGHT_ITEMS = [
  { emoji: '🥩', label: 'Carnivore' },
  { emoji: '🇮🇹', label: 'Italian Food' },
  { emoji: '🍇', label: 'Fruit-Lover' },
];

// Static placeholder lifestyle items — wired to real data in Phase 6
const LIFESTYLE_ITEMS = [
  'Active',
  'Gym-Goer',
  'Walks a lot',
  'PCOS & GI Diet',
];

// Static placeholder foods — wired to real data in Phase 6
const FOOD_ITEMS = [
  { emoji: '🥬', label: 'Spinach' },
  { emoji: '🥦', label: 'Kale' },
  { emoji: '🥑', label: 'Avocado' },
  { emoji: '🌾', label: 'Quinoa' },
  { emoji: '🐟', label: 'Salmon' },
  { emoji: '🫐', label: 'Blueberries' },
];

export default function ResultsScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={Gradients.background as [string, string, ...string[]]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Back arrow */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>‹</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Your Taste Profile</Text>
          <Text style={styles.subtitle}>
            Tailored to your unique needs. We'll use this for{'\n'}
            recommendations and meals plans
          </Text>
        </View>

        {/* Key Highlights section */}
        <Text style={styles.sectionLabel}>Key Highlights:</Text>
        <GlassView style={styles.card} borderRadius={BorderRadius.lg}>
          <View style={styles.highlightsRow}>
            {HIGHLIGHT_ITEMS.map((item, index) => (
              <React.Fragment key={item.label}>
                <View style={styles.highlightItem}>
                  <Text style={styles.highlightEmoji}>{item.emoji}</Text>
                  <Text style={styles.highlightLabel}>{item.label}</Text>
                </View>
                {index < HIGHLIGHT_ITEMS.length - 1 && (
                  <View style={styles.divider} />
                )}
              </React.Fragment>
            ))}
          </View>
          {/* Pagination dots */}
          <View style={styles.dots}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
          </View>
        </GlassView>

        {/* Lifestyle & Goals section */}
        <GlassView style={[styles.card, styles.cardSpacedTop]} borderRadius={BorderRadius.lg}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderEmoji}>💪</Text>
            <View>
              <Text style={styles.cardHeaderTitle}>Lifestyle &amp; Goals</Text>
              <Text style={styles.cardHeaderSubtitle}>
                We'll use this to tailor our advice &amp; meal plan
              </Text>
            </View>
          </View>
          {LIFESTYLE_ITEMS.map((item, index) => (
            <View key={item} style={[styles.checkRow, index > 0 && styles.rowBorderTop]}>
              <View style={styles.checkCircle}>
                <Text style={styles.checkMark}>✓</Text>
              </View>
              <Text style={styles.checkLabel}>{item}</Text>
            </View>
          ))}
        </GlassView>

        {/* Foods You Love section */}
        <GlassView style={[styles.card, styles.cardSpacedTop]} borderRadius={BorderRadius.lg}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderEmoji}>❤️</Text>
            <View>
              <Text style={styles.cardHeaderTitle}>Foods You Love</Text>
              <Text style={styles.cardHeaderSubtitle}>We'll Recommend These</Text>
            </View>
          </View>
          {FOOD_ITEMS.map((item, index) => (
            <View key={item.label} style={[styles.foodRow, index > 0 && styles.rowBorderTop]}>
              <View style={styles.foodIconCircle}>
                <Text style={styles.foodHeart}>♥</Text>
              </View>
              <Text style={styles.foodLabel}>{item.label}</Text>
            </View>
          ))}
        </GlassView>

        <View style={{ height: Spacing.xl }} />
      </ScrollView>

      {/* Bottom Navigation — "Taste Profile" tab active */}
      <BottomNav activeTab="TasteProfile" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xs,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.pill,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    color: Colors.textPrimary,
    fontSize: 24,
    lineHeight: 28,
    marginTop: -2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
  },
  titleSection: {
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  sectionLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  card: {
    padding: Spacing.md,
    borderWidth: 0,
    ...Shadow.card,
  },
  cardSpacedTop: {
    marginTop: Spacing.md,
  },
  highlightsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: Spacing.md,
  },
  highlightItem: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  highlightEmoji: {
    fontSize: 36,
  },
  highlightLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingTop: Spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dotActive: {
    backgroundColor: Colors.accentGreen,
    width: 18,
    borderRadius: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  cardHeaderEmoji: {
    fontSize: 20,
  },
  cardHeaderTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  cardHeaderSubtitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
    color: Colors.textMuted,
    marginTop: 2,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: 12,
  },
  rowBorderTop: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.accentGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: FontWeight.bold,
  },
  checkLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
  },
  foodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: 12,
  },
  foodIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.buttonSuperLike || '#1877F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodHeart: {
    color: Colors.white,
    fontSize: 14,
    marginTop: -2,
  },
  foodLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.textPrimary,
  },
});
