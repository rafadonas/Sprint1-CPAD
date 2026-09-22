import React from 'react';
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  icon?: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmModal = ({ visible, title, message, confirmLabel, icon = 'truck-delivery-outline', onCancel, onConfirm }: ConfirmModalProps) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel} statusBarTranslucent>
    <View style={styles.overlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} accessibilityLabel="Fechar confirmação" />
      <View style={styles.card} accessibilityViewIsModal>
        <View style={styles.icon}><MaterialCommunityIcons name={icon} size={28} color="#4ADE80" /></View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.cancel} onPress={onCancel} accessibilityRole="button"><Text style={styles.cancelText}>Cancelar</Text></TouchableOpacity>
          <TouchableOpacity style={styles.confirm} onPress={onConfirm} accessibilityRole="button"><Text style={styles.confirmText}>{confirmLabel}</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.72)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 390, backgroundColor: '#111C16', borderWidth: 1, borderColor: '#294133', borderRadius: 20, padding: 22, alignItems: 'center' },
  icon: { width: 58, height: 58, borderRadius: 29, backgroundColor: '#163722', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  title: { color: '#F8FAFC', fontSize: 19, fontWeight: '800', textAlign: 'center' },
  message: { color: '#94A3B8', fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 8 },
  actions: { flexDirection: 'row', gap: 10, width: '100%', marginTop: 22 },
  cancel: { flex: 1, alignItems: 'center', paddingVertical: 13, borderRadius: 11, borderWidth: 1, borderColor: '#33483B' },
  cancelText: { color: '#CBD5E1', fontWeight: '700' },
  confirm: { flex: 1, alignItems: 'center', paddingVertical: 13, borderRadius: 11, backgroundColor: '#4ADE80' },
  confirmText: { color: '#07120A', fontWeight: '800' },
});
