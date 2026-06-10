import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
  BorderRadius,
  FontSize,
  FontWeight,
  Shadow,
} from '../theme/index';
import BottomNav from '../components/BottomNav';
import GlassView from '../components/GlassView';

type IntroScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Intro'
>;

interface Props {
  navigation: IntroScreenNavigationProp;
}

const { width } = Dimensions.get('window');

export default function IntroScreen({ navigation }: Props) {
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
      {/* Ambient background glows for glassmorphism */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={['rgba(14, 165, 233, 0.15)', 'transparent']}
          start={{ x: 0, y: 0.2 }}
          end={{ x: 0.5, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={['rgba(34, 197, 94, 0.15)', 'transparent']}
          start={{ x: 1, y: 0.8 }}
          end={{ x: 0.5, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Page header — outside the card */}
      <View style={[styles.pageHeader, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Design Your Food Plan</Text>
      </View>

      {/* Main onboarding card */}
      <View style={styles.scrollArea}>
        <GlassView style={styles.card} borderRadius={BorderRadius.xl}>
          {/* Emoji illustration */}
          <Text style={styles.emoji}>😋</Text>

          {/* Card heading */}
          <Text style={styles.cardTitle}>Build Your Taste Profile</Text>

          {/* Description */}
          <Text style={styles.cardDescription}>
            Swipe right on foods you love, left on{'\n'}foods you don't.
          </Text>

          {/* Secondary description */}
          <Text style={styles.cardSubDescription}>
            This helps us recommend meals you'll love eating.
          </Text>

          {/* CTA Button */}
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Swipe')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaButtonText}>Start Swiping</Text>
          </TouchableOpacity>

          {/* Helper text */}
          <Text style={styles.helperText}>Takes about 2 minutes.</Text>
        </GlassView>
      </View>

      {/* Bottom Navigation */}
      <BottomNav activeTab="Start" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
  },
  pageHeader: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  pageTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  backButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '300',
    marginTop: -2,
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    justifyContent: 'center',
    paddingBottom: Spacing.md,
  },
  card: {
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    borderWidth: 0,
    ...Shadow.card,
  },
  emoji: {
    fontSize: 56,
    marginBottom: Spacing.xl,
  },
  cardTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    letterSpacing: -0.3,
  },
  cardDescription: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  cardSubDescription: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Spacing.xxl,
  },
  ctaButton: {
    backgroundColor: Colors.accentGreen,
    borderRadius: BorderRadius.pill,
    paddingVertical: 14,
    paddingHorizontal: Spacing.xxl,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadow.button,
  },
  ctaButtonText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
    letterSpacing: 0.2,
  },
  helperText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
