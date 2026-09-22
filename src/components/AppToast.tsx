import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ToastKind = 'success' | 'info' | 'error';

export interface ToastMessage {
  id: number;
  title: string;
  message: string;
  kind?: ToastKind;
}

interface AppToastProps {
  toast: ToastMessage;
  onDismiss: () => void;
}

const CONFIG = {
  success: { icon: 'check-circle' as const, color: '#4ADE80', background: '#10251A' },
  info: { icon: 'information' as const, color: '#60A5FA', background: '#101F2F' },
  error: { icon: 'alert-circle' as const, color: '#F87171', background: '#2B1517' },
};

export const AppToast = ({ toast, onDismiss }: AppToastProps) => {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-24)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const config = CONFIG[toast.kind ?? 'success'];

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, damping: 16 }),
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start();
    const timer = setTimeout(onDismiss, 3800);
    return () => clearTimeout(timer);
  }, [onDismiss, opacity, toast.id, translateY]);

  return (
    <Animated.View style={[styles.toast, { top: Math.max(insets.top + 8, 16), backgroundColor: config.background, borderColor: config.color, opacity, transform: [{ translateY }] }]} accessibilityLiveRegion="polite">
      <MaterialCommunityIcons name={config.icon} size={23} color={config.color} />
      <View style={styles.copy}>
        <Text style={styles.title}>{toast.title}</Text>
        <Text style={styles.message} numberOfLines={2}>{toast.message}</Text>
      </View>
      <TouchableOpacity onPress={onDismiss} style={styles.close} accessibilityRole="button" accessibilityLabel="Fechar aviso">
        <MaterialCommunityIcons name="close" size={19} color="#94A3B8" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: { position: 'absolute', left: 16, right: 16, zIndex: 100, elevation: 12, minHeight: 70, borderRadius: 15, borderWidth: 1, padding: 14, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.35, shadowRadius: 12, shadowOffset: { width: 0, height: 6 } },
  copy: { flex: 1, marginLeft: 11 },
  title: { color: '#F8FAFC', fontSize: 13, fontWeight: '800' },
  message: { color: '#CBD5E1', fontSize: 11, lineHeight: 16, marginTop: 2 },
  close: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center', marginLeft: 4 },
});
