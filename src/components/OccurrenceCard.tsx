import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia } from '../types';

interface OccurrenceCardProps {
  occurrence: Ocorrencia;
  onPress: () => void;
}

export const OccurrenceCard: React.FC<OccurrenceCardProps> = ({ occurrence, onPress }) => {
  const getRiscoColor = (risco: string) => {
    switch (risco) {
      case 'alto': return '#ff6366';
      case 'medio': return '#ffb900';
      case 'baixo': return '#00bc7c';
      default: return '#a0a0a0';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${getRiscoColor(occurrence.risco)}26` }]}>
          <MaterialCommunityIcons name="alert" size={20} color={getRiscoColor(occurrence.risco)} />
        </View>
        <View style={styles.headerInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{occurrence.local} · {occurrence.rodovia}</Text>
            <View style={[styles.badge, { backgroundColor: getRiscoColor(occurrence.risco) }]}>
              <Text style={styles.badgeText}>{occurrence.risco.charAt(0).toUpperCase() + occurrence.risco.slice(1)}</Text>
            </View>
          </View>
          <Text style={styles.description}>{occurrence.descricao.substring(0, 50)}...</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.meta}>
          <MaterialCommunityIcons name="clock-outline" size={14} color="#a0a0a0" />
          <Text style={styles.metaText}>Há 2h</Text>
        </View>
        <View style={styles.meta}>
          <MaterialCommunityIcons name="account-outline" size={14} color="#a0a0a0" />
          <Text style={styles.metaText}>{occurrence.inspetor}</Text>
        </View>
        <Text style={[styles.status, { color: getRiscoColor(occurrence.risco) }]}>{occurrence.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    color: '#f9f9f9',
    fontSize: 14,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  description: {
    color: '#a0a0a0',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 12,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    color: '#a0a0a0',
    fontSize: 12,
    marginLeft: 4,
  },
  status: {
    marginLeft: 'auto',
    fontSize: 12,
    fontWeight: '600',
  },
});
