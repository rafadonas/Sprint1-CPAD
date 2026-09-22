import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ScreenName = 'MAP' | 'REPORT' | 'HISTORY' | 'PROFILE';

interface BottomNavProps {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

const ITEMS: Array<{ id: ScreenName; label: string; icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'] }> = [
  { id: 'MAP', label: 'Mapa', icon: 'map-outline' },
  { id: 'REPORT', label: 'Relatar', icon: 'plus-circle-outline' },
  { id: 'HISTORY', label: 'Histórico', icon: 'history' },
  { id: 'PROFILE', label: 'Perfil', icon: 'account-outline' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      {ITEMS.map((item) => {
        const isActive = activeScreen === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.item, isActive && styles.itemActive]}
            onPress={() => onNavigate(item.id)}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            accessibilityState={{ selected: isActive }}
          >
            {isActive ? <View style={styles.activeIndicator} /> : null}
            <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color={isActive ? '#4ADE80' : '#64748B'}
            />
            <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#09100C',
    borderTopWidth: 1,
    borderTopColor: '#1F3327',
    paddingTop: 8,
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 66,
    position: 'relative',
  },
  itemActive: {
    backgroundColor: '#10251A',
  },
  activeIndicator: { position: 'absolute', top: 0, width: 22, height: 2, borderRadius: 1, backgroundColor: '#4ADE80' },
  label: {
    fontSize: 10,
    marginTop: 4,
  },
  labelActive: {
    color: '#86EFAC',
    fontWeight: '700',
  },
  labelInactive: {
    color: '#64748B',
  },
});
