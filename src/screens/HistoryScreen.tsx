import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia, StatusOcorrencia } from '../types';
import { OccurrenceCard } from '../components/OccurrenceCard';
import { StateFeedback } from '../components/StateFeedback';

interface HistoryScreenProps { ocorrencias: Ocorrencia[]; onSelectOccurrence: (occurrence: Ocorrencia) => void; onNavigateToReport: () => void; onBack: () => void; }
type Filter = 'Todos' | StatusOcorrencia;
const FILTERS: Filter[] = ['Todos', 'Pendente', 'Em análise', 'Concluído'];

export const HistoryScreen = ({ ocorrencias, onSelectOccurrence, onNavigateToReport, onBack }: HistoryScreenProps) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('Todos');
  const filtered = useMemo(() => ocorrencias.filter((item) => {
    const text = `${item.local} ${item.rodovia} ${item.descricao}`.toLowerCase();
    return text.includes(query.trim().toLowerCase()) && (filter === 'Todos' || item.status === filter);
  }), [ocorrencias, query, filter]);
  const pending = ocorrencias.filter((item) => item.status === 'Pendente').length;
  const highRisk = ocorrencias.filter((item) => item.risco === 'alto' && item.status !== 'Concluído').length;

  return <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
    <View style={styles.header}><View style={styles.titleRow}><TouchableOpacity onPress={onBack} style={styles.backButton} accessibilityRole="button" accessibilityLabel="Voltar ao mapa"><MaterialCommunityIcons name="chevron-left" size={28} color="#F8FAFC" /></TouchableOpacity><View style={styles.heading}><Text style={styles.subtitle}>ACOMPANHAMENTO</Text><Text style={styles.title}>Histórico</Text><Text style={styles.summary}>{ocorrencias.length} ocorrências monitoradas</Text></View></View><View style={styles.quickStats}><View style={styles.quickStat}><Text style={styles.quickValue}>{pending}</Text><Text style={styles.quickLabel}>pendentes</Text></View><View style={styles.quickStat}><Text style={[styles.quickValue, styles.danger]}>{highRisk}</Text><Text style={styles.quickLabel}>críticas abertas</Text></View></View></View>
    <View style={styles.search}><MaterialCommunityIcons name="magnify" size={20} color="#94A3B8" /><TextInput style={styles.searchInput} value={query} onChangeText={setQuery} placeholder="Buscar no histórico" placeholderTextColor="#64748B" accessibilityLabel="Buscar no histórico" />{query ? <TouchableOpacity onPress={() => setQuery('')} accessibilityRole="button" accessibilityLabel="Limpar busca"><MaterialCommunityIcons name="close-circle" size={19} color="#94A3B8" /></TouchableOpacity> : null}</View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroller} contentContainerStyle={styles.filters}>{FILTERS.map((item) => <TouchableOpacity key={item} onPress={() => setFilter(item)} style={[styles.filter, filter === item && styles.filterActive]} accessibilityRole="button" accessibilityState={{ selected: filter === item }}><Text style={[styles.filterText, filter === item && styles.filterTextActive]}>{item}</Text></TouchableOpacity>)}</ScrollView>
    <FlatList data={filtered} keyExtractor={(item) => item.id} contentContainerStyle={[styles.list, filtered.length === 0 && styles.emptyList]} renderItem={({ item }) => <OccurrenceCard occurrence={item} onPress={() => onSelectOccurrence(item)} />} ListEmptyComponent={<StateFeedback icon="clipboard-text-search-outline" title="Nenhuma ocorrência" message={ocorrencias.length === 0 ? 'Registre a primeira ocorrência para iniciar o monitoramento.' : 'Nenhum resultado corresponde à busca e ao status selecionado.'} actionLabel={ocorrencias.length === 0 ? 'Registrar ocorrência' : 'Limpar filtros'} onAction={ocorrencias.length === 0 ? onNavigateToReport : () => { setQuery(''); setFilter('Todos'); }} />} />
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#08110C' }, header: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 15 }, titleRow: { flexDirection: 'row', alignItems: 'center' }, backButton: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center', marginRight: 5 }, heading: { flex: 1 }, subtitle: { color: '#4ADE80', fontSize: 10, fontWeight: '700', letterSpacing: 1.3 }, title: { color: '#F8FAFC', fontSize: 28, fontWeight: '800', marginTop: 3 }, summary: { color: '#94A3B8', fontSize: 13, marginTop: 4 }, quickStats: { flexDirection: 'row', gap: 9, marginTop: 13, marginLeft: 47 }, quickStat: { flexDirection: 'row', alignItems: 'baseline', backgroundColor: '#111C16', borderWidth: 1, borderColor: '#294133', borderRadius: 9, paddingHorizontal: 10, paddingVertical: 7 }, quickValue: { color: '#F8FAFC', fontSize: 14, fontWeight: '800' }, quickLabel: { color: '#64748B', fontSize: 9, marginLeft: 5 }, danger: { color: '#F87171' },
  search: { marginHorizontal: 22, flexDirection: 'row', alignItems: 'center', backgroundColor: '#111C16', borderRadius: 12, paddingHorizontal: 13, borderWidth: 1, borderColor: '#294133' }, searchInput: { flex: 1, height: 46, color: '#F8FAFC', marginLeft: 8 }, filterScroller: { flexGrow: 0, height: 60 }, filters: { paddingHorizontal: 22, paddingVertical: 13, gap: 7 }, filter: { minHeight: 34, justifyContent: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, backgroundColor: '#111C16', borderWidth: 1, borderColor: '#294133' }, filterActive: { backgroundColor: '#4ADE80', borderColor: '#4ADE80' }, filterText: { color: '#CBD5E1', fontSize: 11, fontWeight: '600' }, filterTextActive: { color: '#07120A' },
  list: { paddingHorizontal: 22, paddingBottom: 110 }, emptyList: { flexGrow: 1, justifyContent: 'center' },
});
