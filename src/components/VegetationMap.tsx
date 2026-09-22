import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia } from '../types';
import { riskLabel, RISK_COLORS } from '../utils/occurrence';

interface VegetationMapProps {
  occurrences: Ocorrencia[];
  onSelectOccurrence: (occurrence: Ocorrencia) => void;
}

const BOUNDS = {
  north: -23.35,
  south: -23.7,
  east: -46.45,
  west: -47.65,
};

const MAP_URL = 'https://www.openstreetmap.org/export/embed.html?bbox=-47.65%2C-23.7%2C-46.45%2C-23.35&layer=mapnik';

const positionFor = (occurrence: Ocorrencia) => {
  const latitude = Number(occurrence.latitude);
  const longitude = Number(occurrence.longitude);

  return {
    left: `${((longitude - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * 100}%` as `${number}%`,
    top: `${((BOUNDS.north - latitude) / (BOUNDS.north - BOUNDS.south)) * 100}%` as `${number}%`,
  };
};

export const VegetationMap = ({ occurrences, onSelectOccurrence }: VegetationMapProps) => (
  <View style={styles.container}>
    {React.createElement('iframe', {
      src: MAP_URL,
      title: 'Mapa interativo das ocorrências de vegetação',
      style: styles.webMap,
    })}
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      {occurrences.map((occurrence) => (
        <TouchableOpacity
          key={occurrence.id}
          style={[styles.marker, positionFor(occurrence), { backgroundColor: RISK_COLORS[occurrence.risco] }]}
          onPress={() => onSelectOccurrence(occurrence)}
          accessibilityRole="button"
          accessibilityLabel={`${occurrence.local}, risco ${riskLabel(occurrence.risco)}`}
        >
          <MaterialCommunityIcons name="leaf" size={19} color="#FFFFFF" />
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#D7E0D8' },
  webMap: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
    opacity: 0.78,
  },
  marker: {
    position: 'absolute',
    width: 42,
    height: 42,
    marginLeft: -21,
    marginTop: -21,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#F8FAFC',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
  },
});
