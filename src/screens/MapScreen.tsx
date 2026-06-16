import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia } from '../types';

const MAP_IMAGE = require('../../assets/mapa-sp.jpg');

interface MapScreenProps {
  ocorrencias: Ocorrencia[];
  onSelectOccurrence: (occurrence: Ocorrencia) => void;
  onNavigateToReport: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ ocorrencias, onSelectOccurrence, onNavigateToReport }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapMock}>
        <Image source={MAP_IMAGE} style={styles.mapImage} />
        <View style={styles.overlay}>
          <View style={styles.searchBar}>
            <View style={styles.searchIcon}>
              <MaterialCommunityIcons name="magnify" size={20} color="#a0a0a0" />
            </View>
            <TextInput 
              style={styles.searchInput} 
              placeholder="Buscar trecho ou rodovia..." 
              placeholderTextColor="#a0a0a0"
            />
            <TouchableOpacity style={styles.filterButton}>
              <MaterialCommunityIcons name="tune" size={20} color="#f9f9f9" />
            </TouchableOpacity>
          </View>

          <View style={styles.pillsContainer}>
            <TouchableOpacity style={[styles.pill, styles.pillActive]}>
              <MaterialCommunityIcons name="road" size={14} color="#000" />
              <Text style={styles.pillTextActive}>BR-101</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill}>
              <Text style={styles.pillText}>Todos os riscos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pill}>
              <MaterialCommunityIcons name="calendar" size={14} color="#f9f9f9" />
              <Text style={styles.pillText}>Hoje</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <LegendItem color="#e7000a" label="Alto" />
          <LegendItem color="#ffb900" label="Médio" />
          <LegendItem color="#00bc7c" label="Baixo" />
        </View>

        {/* Mock Markers */}
        {ocorrencias.map((item, index) => (
          <TouchableOpacity 
            key={item.id}
            style={[
              styles.marker, 
              { 
                top: 200 + index * 100, 
                left: 50 + index * 60,
                backgroundColor: item.risco === 'alto' ? '#e7000a' : item.risco === 'medio' ? '#ffb900' : '#00bc7c'
              }
            ]}
            onPress={() => onSelectOccurrence(item)}
          >
            <MaterialCommunityIcons name="alert" size={20} color="#fff" />
          </TouchableOpacity>
        ))}

        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomButton}>
            <MaterialCommunityIcons name="plus" size={24} color="#f9f9f9" />
          </TouchableOpacity>
          <View style={styles.zoomDivider} />
          <TouchableOpacity style={styles.zoomButton}>
            <MaterialCommunityIcons name="minus" size={24} color="#f9f9f9" />
          </TouchableOpacity>
          <View style={styles.zoomDivider} />
          <TouchableOpacity style={styles.zoomButton} onPress={onNavigateToReport}>
            <MaterialCommunityIcons name="plus-circle" size={24} color="#00bc7c" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendColor, { backgroundColor: color }]} />
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  mapMock: {
    flex: 1,
    backgroundColor: '#111',
    position: 'relative',
  },
  mapImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  overlay: {
    padding: 16,
    zIndex: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 30,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: '#f9f9f9',
    paddingHorizontal: 12,
  },
  filterButton: {
    padding: 8,
  },
  pillsContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  pillActive: {
    backgroundColor: '#f9f9f9',
    borderColor: '#f9f9f9',
  },
  pillText: {
    color: '#f9f9f9',
    fontSize: 12,
    marginLeft: 4,
  },
  pillTextActive: {
    color: '#000',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  legend: {
    position: 'absolute',
    top: 130,
    right: 16,
    backgroundColor: '#1a1a1a',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    zIndex: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendLabel: {
    color: '#f9f9f9',
    fontSize: 10,
  },
  marker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  zoomControls: {
    position: 'absolute',
    right: 16,
    top: 250,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  zoomButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomDivider: {
    height: 1,
    backgroundColor: '#333',
    width: '100%',
  },
});
