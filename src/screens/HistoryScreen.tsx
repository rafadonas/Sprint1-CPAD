import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Ocorrencia } from '../types';
import { OccurrenceCard } from '../components/OccurrenceCard';

interface HistoryScreenProps {
  ocorrencias: Ocorrencia[];
  onSelectOccurrence: (occurrence: Ocorrencia) => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ ocorrencias, onSelectOccurrence }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>OCORRÊNCIAS</Text>
        <Text style={styles.title}>Histórico</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.list}>
        {ocorrencias.length > 0 ? (
          ocorrencias.map((item) => (
            <OccurrenceCard 
              key={item.id} 
              occurrence={item} 
              onPress={() => onSelectOccurrence(item)} 
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma ocorrência registrada.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  subtitle: {
    color: '#a0a0a0',
    fontSize: 12,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    color: '#f9f9f9',
    fontSize: 28,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  emptyText: {
    color: '#a0a0a0',
    fontSize: 16,
  },
});
