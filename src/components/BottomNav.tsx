import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type ScreenName = 'MAP' | 'REPORT' | 'HISTORY' | 'PROFILE';

interface BottomNavProps {
  activeScreen: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const items: { id: ScreenName; label: string; icon: any }[] = [
    { id: 'MAP', label: 'Mapa', icon: 'map' },
    { id: 'REPORT', label: 'Relatar', icon: 'plus-circle' },
    { id: 'HISTORY', label: 'Histórico', icon: 'history' },
    { id: 'PROFILE', label: 'Perfil', icon: 'account' },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = activeScreen === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.item, isActive && styles.itemActive]}
            onPress={() => onNavigate(item.id)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color={isActive ? '#f9f9f9' : '#a0a0a0'}
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
    backgroundColor: '#0a0a0a',
    borderTopWidth: 1,
    borderTopColor: '#1f1f1f',
    paddingBottom: 25,
    paddingTop: 10,
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
  },
  itemActive: {
    backgroundColor: '#1f1f1f',
  },
  label: {
    fontSize: 10,
    marginTop: 4,
  },
  labelActive: {
    color: '#f9f9f9',
  },
  labelInactive: {
    color: '#a0a0a0',
  },
});
