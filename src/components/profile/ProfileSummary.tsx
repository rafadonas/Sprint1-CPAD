import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia } from '../../types';

interface ProfileSummaryProps {
  ocorrencias: Ocorrencia[];
}

export const ProfileSummary = ({ ocorrencias }: ProfileSummaryProps) => {
  const total = ocorrencias.length;
  const concluded = ocorrencias.filter((item) => item.status === 'Concluído').length;
  const analysing = ocorrencias.filter((item) => item.status === 'Em análise').length;
  const resolutionRate = total ? (concluded / total) * 100 : 0;

  return (
    <>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="account-hard-hat" size={48} color="#86EFAC" />
        </View>
        <View style={styles.identity}>
          <Text style={styles.userName}>Carlos Monteiro</Text>
          <Text style={styles.userRole}>Inspetor de Campo · Motiva</Text>
          <View style={styles.verified}>
            <MaterialCommunityIcons name="check-decagram" size={14} color="#4ADE80" />
            <Text style={styles.verifiedText}>Perfil verificado</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionLabel}>RESUMO OPERACIONAL</Text>
      <View style={styles.stats}>
        <Stat value={total} label="Relatos" />
        <View style={styles.divider} />
        <Stat value={analysing} label="Em análise" />
        <View style={styles.divider} />
        <Stat value={concluded} label="Resolvidos" />
      </View>

      <View style={styles.performance}>
        <View style={styles.performanceHeader}>
          <View>
            <Text style={styles.performanceTitle}>Taxa de resolução</Text>
            <Text style={styles.performanceHint}>Ocorrências concluídas neste dispositivo</Text>
          </View>
          <Text style={styles.performanceValue}>{Math.round(resolutionRate)}%</Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.progress, { width: `${resolutionRate}%` }]} />
        </View>
      </View>
    </>
  );
};

const Stat = ({ value, label }: { value: number; label: string }) => (
  <View style={styles.stat}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export const sectionLabelStyle = StyleSheet.create({
  label: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.1,
    marginTop: 24,
    marginBottom: 9,
  },
}).label;

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111C16',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#294133',
    padding: 17,
    marginTop: 18,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#163722',
    borderWidth: 2,
    borderColor: '#275A39',
    alignItems: 'center',
    justifyContent: 'center',
  },
  identity: {
    flex: 1,
    marginLeft: 14,
  },
  userName: {
    color: '#F8FAFC',
    fontSize: 19,
    fontWeight: '800',
  },
  userRole: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 3,
  },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  verifiedText: {
    color: '#86EFAC',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 5,
  },
  sectionLabel: sectionLabelStyle,
  stats: {
    flexDirection: 'row',
    backgroundColor: '#111C16',
    borderRadius: 15,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#294133',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#F8FAFC',
    fontSize: 21,
    fontWeight: '800',
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 3,
  },
  divider: {
    width: 1,
    backgroundColor: '#294133',
  },
  performance: {
    backgroundColor: '#111C16',
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: '#294133',
    marginTop: 10,
  },
  performanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  performanceTitle: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  performanceHint: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 2,
  },
  performanceValue: {
    color: '#4ADE80',
    fontSize: 20,
    fontWeight: '800',
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#24372B',
    marginTop: 14,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#4ADE80',
  },
});
