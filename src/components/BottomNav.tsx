import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight, Shadow } from '../theme/index';
import GlassView from './GlassView';

export type NavTab = 'Start' | 'FAQ' | 'TasteProfile' | 'Search';

interface Props {
  activeTab: NavTab;
  onTabPress?: (tab: NavTab) => void;
}

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
      <GlassView 
        style={styles.container} 
        borderRadius={BorderRadius.xl}
      >
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
      </GlassView>
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
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 0, 
    ...Shadow.nav,
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
