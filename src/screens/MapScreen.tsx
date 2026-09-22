import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia, Risco, Rodovia } from '../types';
import { riskLabel, RISK_COLORS } from '../utils/occurrence';
import { StateFeedback } from '../components/StateFeedback';
import { VegetationMap } from '../components/VegetationMap';

const RISK_OPTIONS: Array<Risco | 'todos'> = ['todos', 'alto', 'medio', 'baixo'];
const ROADS: Array<Rodovia | 'Todas'> = ['Todas', 'BR-101', 'SP-270', 'SP-280'];

interface MapScreenProps { ocorrencias: Ocorrencia[]; onSelectOccurrence: (occurrence: Ocorrencia) => void; onNavigateToReport: () => void; }

export const MapScreen = ({ ocorrencias, onSelectOccurrence, onNavigateToReport }: MapScreenProps) => {
  const [query, setQuery] = useState('');
  const [risk, setRisk] = useState<Risco | 'todos'>('todos');
  const [road, setRoad] = useState<Rodovia | 'Todas'>('Todas');
  const filtered = useMemo(() => ocorrencias.filter((item) => {
    const normalized = query.trim().toLowerCase();
    const matchesQuery = !normalized || `${item.local} ${item.rodovia} ${item.descricao}`.toLowerCase().includes(normalized);
    return matchesQuery && (risk === 'todos' || item.risco === risk) && (road === 'Todas' || item.rodovia === road);
  }), [ocorrencias, query, risk, road]);
  const cycleRisk = () => setRisk((current) => RISK_OPTIONS[(RISK_OPTIONS.indexOf(current) + 1) % RISK_OPTIONS.length]);
  const cycleRoad = () => setRoad((current) => ROADS[(ROADS.indexOf(current) + 1) % ROADS.length]);
  const clearFilters = () => { setQuery(''); setRisk('todos'); setRoad('Todas'); };

  return <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}><View style={styles.mapContainer}>
    <VegetationMap occurrences={filtered} onSelectOccurrence={onSelectOccurrence} />
    <View style={styles.overlay}>
      <View style={styles.brandRow}><View><Text style={styles.eyebrow}>CENTRAL OPERACIONAL</Text><Text style={styles.title}>Mapa de vegetação</Text></View><View style={styles.online}><View style={styles.onlineDot} /><Text style={styles.onlineText}>Online</Text></View></View>
      <View style={styles.searchBar}><MaterialCommunityIcons name="magnify" size={20} color="#94A3B8" /><TextInput style={styles.searchInput} placeholder="Buscar KM, rodovia ou ocorrência" placeholderTextColor="#64748B" value={query} onChangeText={setQuery} returnKeyType="search" accessibilityLabel="Buscar ocorrências no mapa" />{query ? <TouchableOpacity onPress={() => setQuery('')} accessibilityRole="button" accessibilityLabel="Limpar busca"><MaterialCommunityIcons name="close-circle" size={20} color="#94A3B8" /></TouchableOpacity> : null}</View>
      <View style={styles.pillsContainer}>
        <TouchableOpacity style={styles.pill} onPress={cycleRoad} accessibilityRole="button"><MaterialCommunityIcons name="road" size={14} color="#F8FAFC" /><Text style={styles.pillText}>{road}</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.pill, risk !== 'todos' && { borderColor: RISK_COLORS[risk as Risco] }]} onPress={cycleRisk} accessibilityRole="button"><MaterialCommunityIcons name="tune" size={14} color="#F8FAFC" /><Text style={styles.pillText}>{risk === 'todos' ? 'Todos os riscos' : `Risco ${riskLabel(risk)}`}</Text></TouchableOpacity>
      </View>
    </View>
    <View style={styles.legend}><Text style={styles.legendTitle}>{filtered.length} {filtered.length === 1 ? 'ponto' : 'pontos'}</Text>{(['alto', 'medio', 'baixo'] as Risco[]).map((level) => <LegendItem key={level} color={RISK_COLORS[level]} label={riskLabel(level)} />)}</View>
    {filtered.length === 0 ? <View style={styles.noResults}><StateFeedback icon="map-search-outline" title="Nenhum ponto encontrado" message="Ajuste a busca ou limpe os filtros para visualizar outros trechos." actionLabel="Limpar filtros" onAction={clearFilters} /></View> : null}
    <TouchableOpacity style={styles.reportButton} onPress={onNavigateToReport} accessibilityRole="button"><MaterialCommunityIcons name="plus" size={24} color="#07120A" /><Text style={styles.reportText}>Nova ocorrência</Text></TouchableOpacity>
  </View></SafeAreaView>;
};

const LegendItem = ({ color, label }: { color: string; label: string }) => <View style={styles.legendItem}><View style={[styles.legendColor, { backgroundColor: color }]} /><Text style={styles.legendLabel}>{label}</Text></View>;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#08110C' }, mapContainer: { flex: 1, backgroundColor: '#111', position: 'relative' },
  overlay: { padding: 18, zIndex: 10, backgroundColor: 'rgba(8,17,12,0.78)' }, brandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }, eyebrow: { color: '#4ADE80', fontSize: 10, fontWeight: '700', letterSpacing: 1.3 }, title: { color: '#F8FAFC', fontSize: 24, fontWeight: '800', marginTop: 2 },
  online: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#163722', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 }, onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#4ADE80', marginRight: 6 }, onlineText: { color: '#BBF7D0', fontSize: 11, fontWeight: '600' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111C16', borderRadius: 14, paddingHorizontal: 14, borderWidth: 1, borderColor: '#294133' }, searchInput: { flex: 1, height: 48, color: '#F8FAFC', paddingHorizontal: 10 }, pillsContainer: { flexDirection: 'row', marginTop: 10, gap: 8 }, pill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#16211B', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#33483B' }, pillText: { color: '#F8FAFC', fontSize: 12, marginLeft: 6, fontWeight: '600' },
  legend: { position: 'absolute', top: 225, right: 14, backgroundColor: 'rgba(8,17,12,0.92)', padding: 10, borderRadius: 12, borderWidth: 1, borderColor: '#294133', zIndex: 10 }, legendTitle: { color: '#F8FAFC', fontSize: 11, fontWeight: '700', marginBottom: 7 }, legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 }, legendColor: { width: 9, height: 9, borderRadius: 5, marginRight: 7 }, legendLabel: { color: '#CBD5E1', fontSize: 10 },
  noResults: { position: 'absolute', left: 20, right: 20, top: 350, backgroundColor: 'rgba(8,17,12,0.96)', borderRadius: 18, zIndex: 20 }, reportButton: { position: 'absolute', left: 20, bottom: 104, backgroundColor: '#4ADE80', borderRadius: 16, paddingHorizontal: 18, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', elevation: 4, zIndex: 10 }, reportText: { color: '#07120A', fontWeight: '800', marginLeft: 7 },
});
