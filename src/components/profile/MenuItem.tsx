import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const DANGER = '#F87171';

interface MenuItemProps {
  icon: IconName;
  label: string;
  hint: string;
  danger?: boolean;
  onPress: () => void;
}

export const MenuItem = ({ icon, label, hint, danger = false, onPress }: MenuItemProps) => (
  <TouchableOpacity style={styles.item} onPress={onPress} accessibilityRole="button">
    <MenuCopy icon={icon} label={label} hint={hint} danger={danger} />
    <MaterialCommunityIcons name="chevron-right" size={22} color="#64748B" />
  </TouchableOpacity>
);

interface MenuSwitchProps {
  icon: IconName;
  label: string;
  hint: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const MenuSwitch = ({ icon, label, hint, value, onValueChange }: MenuSwitchProps) => (
  <View style={styles.item}>
    <MenuCopy icon={icon} label={label} hint={hint} />
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#334155', true: '#27663C' }}
      thumbColor={value ? '#4ADE80' : '#94A3B8'}
      accessibilityLabel={label}
    />
  </View>
);

interface MenuCopyProps {
  icon: IconName;
  label: string;
  hint: string;
  danger?: boolean;
}

const MenuCopy = ({ icon, label, hint, danger = false }: MenuCopyProps) => (
  <View style={styles.copyRow}>
    <View style={styles.icon}>
      <MaterialCommunityIcons name={icon} size={21} color={danger ? DANGER : '#86EFAC'} />
    </View>
    <View style={styles.copy}>
      <Text style={[styles.label, danger && styles.danger]}>{label}</Text>
      <Text style={styles.hint}>{hint}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  item: {
    minHeight: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111C16',
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#294133',
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  copy: {
    flex: 1,
  },
  icon: {
    width: 39,
    height: 39,
    borderRadius: 11,
    backgroundColor: '#183021',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  label: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  danger: {
    color: DANGER,
  },
  hint: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 2,
  },
});
