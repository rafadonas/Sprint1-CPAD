import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type FormFieldProps = React.ComponentProps<typeof TextInput> & {
  label: string;
  error?: string;
};

export const FormField = ({ label, error, multiline, ...props }: FormFieldProps) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      {...props}
      multiline={multiline}
      placeholderTextColor="#64748B"
      accessibilityLabel={label}
      style={[styles.input, multiline && styles.textArea, error && styles.inputError]}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

export const fieldStyles = StyleSheet.create({
  label: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 7,
  },
  error: {
    color: '#F87171',
    fontSize: 11,
    marginTop: 5,
  },
});

const styles = StyleSheet.create({
  field: {
    marginBottom: 17,
  },
  label: fieldStyles.label,
  error: fieldStyles.error,
  input: {
    backgroundColor: '#111C16',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    color: '#F8FAFC',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#294133',
  },
  textArea: {
    minHeight: 105,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: '#EF4444',
  },
});
