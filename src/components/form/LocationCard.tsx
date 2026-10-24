import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GpsState } from '../../hooks/useDeviceLocation';
import { Rodovia } from '../../types';

interface LocationCardProps {
  gps: GpsState;
  rodovia: Rodovia;
  onRefresh: () => void;
}

const describe = (gps: GpsState, rodovia: Rodovia) => {
  switch (gps.status) {
    case 'loading':
      return { title: 'Obtendo localização...', hint: 'Aguardando o GPS do aparelho' };
    case 'ok': {
      const coords = `${gps.latitude.toFixed(5)}, ${gps.longitude.toFixed(5)}`;
      const accuracy = gps.accuracy ? ` · precisão de ${Math.round(gps.accuracy)} m` : '';
      return { title: 'Localização capturada', hint: `${coords}${accuracy}` };
    }
    case 'unavailable':
      return {
        title: gps.reason,
        hint: `Será usada a referência da ${rodovia}. Toque para tentar novamente.`,
      };
  }
};

export const LocationCard = ({ gps, rodovia, onRefresh }: LocationCardProps) => {
  const { title, hint } = describe(gps, rodovia);
  const loading = gps.status === 'loading';
  const captured = gps.status === 'ok';

  return (
    <TouchableOpacity
      style={[styles.card, gps.status === 'unavailable' && styles.warning]}
      onPress={onRefresh}
      disabled={loading}
      accessibilityRole="button"
      accessibilityLabel="Atualizar localização"
    >
      {loading ? (
        <ActivityIndicator size="small" color="#4ADE80" />
      ) : (
        <MaterialCommunityIcons
          name={captured ? 'crosshairs-gps' : 'crosshairs-question'}
          size={21}
          color={captured ? '#4ADE80' : '#F59E0B'}
        />
      )}
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.hint}>{hint}</Text>
      </View>
      {!loading ? <MaterialCommunityIcons name="refresh" size={18} color="#94A3B8" /> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 11,
    alignItems: 'center',
    backgroundColor: '#10251A',
    borderRadius: 12,
    padding: 13,
    marginBottom: 23,
  },
  warning: {
    backgroundColor: '#2A2210',
  },
  copy: {
    flex: 1,
  },
  title: {
    color: '#DCFCE7',
    fontSize: 12,
    fontWeight: '700',
  },
  hint: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 3,
  },
});
