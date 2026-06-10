import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadow } from '../theme/index';

export type NavTab = 'Start' | 'FAQ' | 'TasteProfile' | 'Search';

interface Props {
  activeTab: NavTab;
  onTabPress?: (tab: NavTab) => void;
}

// Simple SVG-like icons using Unicode / emoji for Phase 2 (no icon library needed)
const NAV_ITEMS: { tab: NavTab; icon: string; label: string }[] = [
  { tab: 'Start',        icon: '⊙',  label: 'Start' },
  { tab: 'FAQ',          icon: '?',   label: 'FAQ' },
  { tab: 'TasteProfile', icon: '✏',  label: 'Taste Profile' },
  { tab: 'Search',       icon: '⌕',  label: 'Search' },
];

export default function BottomNav({ activeTab, onTabPress }: Props) {
  const insets = useSafeAreaInsets();
  const bottomPad = Math.max(insets.bottom, 8);

  return (
    <View style={[styles.wrapper, { paddingBottom: bottomPad }]}>
      <View style={styles.container}>
        {NAV_ITEMS.map(({ tab, icon, label }) => {
          const isActive = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.tab}
              onPress={() => onTabPress?.(tab)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
                <Text style={[styles.icon, isActive && styles.iconActive]}>
                  {icon}
                </Text>
              </View>
              {label.length <= 5 && (
                <Text style={[styles.label, isActive && styles.labelActive]}>
                  {label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.navBackground,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.navBorder,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'space-around',
    ...Shadow.nav,
    // Android fallback: slightly more opaque since no blur
    ...Platform.select({
      android: {
        backgroundColor: 'rgba(10, 16, 12, 0.95)',
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  iconWrapActive: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
  },
  icon: {
    fontSize: 18,
    color: Colors.navIconInactive,
  },
  iconActive: {
    color: Colors.navIconActive,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.navIconInactive,
  },
  labelActive: {
    color: Colors.navIconActive,
  },
});
