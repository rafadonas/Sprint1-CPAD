import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface StateFeedbackProps {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const StateFeedback = ({ icon, title, message, actionLabel, onAction }: StateFeedbackProps) => (
  <View style={styles.container}>
    <View style={styles.icon}>
      <MaterialCommunityIcons name={icon} size={32} color="#22C55E" />
    </View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{message}</Text>
    {actionLabel && onAction ? (
      <TouchableOpacity style={styles.button} onPress={onAction} accessibilityRole="button">
        <Text style={styles.buttonText}>{actionLabel}</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingHorizontal: 30, paddingVertical: 70 },
  icon: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#163722', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { color: '#F8FAFC', fontSize: 18, fontWeight: '700', textAlign: 'center' },
  message: { color: '#94A3B8', fontSize: 14, lineHeight: 20, textAlign: 'center', marginTop: 8, maxWidth: 320 },
  button: { marginTop: 20, paddingHorizontal: 18, paddingVertical: 11, backgroundColor: '#22C55E', borderRadius: 10 },
  buttonText: { color: '#07120A', fontWeight: '700' },
});
