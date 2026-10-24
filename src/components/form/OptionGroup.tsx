import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fieldStyles } from './FormField';

interface Option<T extends string> {
  value: T;
  label: string;
  color?: string;
}

interface OptionGroupProps<T extends string> {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

const DEFAULT_COLOR = '#4ADE80';

export const OptionGroup = <T extends string>({
  label,
  options,
  value,
  onChange,
}: OptionGroupProps<T>) => (
  <>
    <Text style={fieldStyles.label}>{label}</Text>
    <View style={styles.options}>
      {options.map((option) => {
        const active = option.value === value;
        const color = option.color ?? DEFAULT_COLOR;
        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.option, active && { backgroundColor: color, borderColor: color }]}
            onPress={() => onChange(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.optionText, active && styles.optionActiveText]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </>
);

const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 17,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#111C16',
    borderWidth: 1,
    borderColor: '#294133',
  },
  optionText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '700',
  },
  optionActiveText: {
    color: '#07120A',
  },
});
