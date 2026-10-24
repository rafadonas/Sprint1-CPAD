import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia } from '../../types';
import { STATUS_COLORS } from '../../utils/occurrence';

interface DetailHeaderProps {
  occurrence: Ocorrencia;
  onBack: () => void;
}

export const DetailHeader = ({ occurrence, onBack }: DetailHeaderProps) => {
  const statusColor = STATUS_COLORS[occurrence.status];

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onBack}
        style={styles.back}
        accessibilityRole="button"
        accessibilityLabel="Voltar"
      >
        <MaterialCommunityIcons name="chevron-left" size={28} color="#F8FAFC" />
      </TouchableOpacity>
      <View>
        <Text style={styles.eyebrow}>{occurrence.rodovia}</Text>
        <Text style={styles.title}>{occurrence.local}</Text>
      </View>
      <View style={[styles.status, { backgroundColor: `${statusColor}25` }]}>
        <Text style={[styles.statusText, { color: statusColor }]}>{occurrence.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F3327',
  },
  back: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  eyebrow: {
    color: '#4ADE80',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 19,
    fontWeight: '800',
  },
  status: {
    marginLeft: 'auto',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
