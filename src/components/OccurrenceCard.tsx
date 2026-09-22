import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia } from '../types';
import { relativeDate, riskLabel, RISK_COLORS, STATUS_COLORS } from '../utils/occurrence';

interface OccurrenceCardProps {
  occurrence: Ocorrencia;
  onPress: () => void;
}

export const OccurrenceCard: React.FC<OccurrenceCardProps> = ({ occurrence, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8} accessibilityRole="button" accessibilityLabel={`Ver ${occurrence.local} da ${occurrence.rodovia}`}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${RISK_COLORS[occurrence.risco]}26` }]}>
          <MaterialCommunityIcons name="leaf" size={20} color={RISK_COLORS[occurrence.risco]} />
        </View>
        <View style={styles.headerInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>{occurrence.local} · {occurrence.rodovia}</Text>
            <View style={[styles.badge, { backgroundColor: RISK_COLORS[occurrence.risco] }]}>
              <Text style={styles.badgeText}>{riskLabel(occurrence.risco)}</Text>
            </View>
          </View>
          <Text style={styles.description} numberOfLines={2}>{occurrence.descricao}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.meta}>
          <MaterialCommunityIcons name="clock-outline" size={14} color="#a0a0a0" />
          <Text style={styles.metaText}>{relativeDate(occurrence.data)}</Text>
        </View>
        <View style={styles.meta}>
          <MaterialCommunityIcons name="account-outline" size={14} color="#a0a0a0" />
          <Text style={styles.metaText}>{occurrence.inspetor}</Text>
        </View>
        {occurrence.foto ? <MaterialCommunityIcons name="camera-outline" size={15} color="#86EFAC" /> : null}
        <Text style={[styles.status, { color: STATUS_COLORS[occurrence.status] }]}>{occurrence.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111C16',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#294133',
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
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
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
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 17,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#21362A',
    paddingTop: 12,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  metaText: {
    color: '#94A3B8',
    fontSize: 11,
    marginLeft: 4,
  },
  status: {
    marginLeft: 'auto',
    fontSize: 11,
    fontWeight: '600',
  },
});
