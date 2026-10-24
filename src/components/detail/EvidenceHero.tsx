import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia } from '../../types';
import { riskLabel, RISK_COLORS } from '../../utils/occurrence';

const ROAD_IMAGE = require('../../../assets/estrada-com-mata.webp');

interface EvidenceHeroProps {
  occurrence: Ocorrencia;
}

export const EvidenceHero = ({ occurrence }: EvidenceHeroProps) => {
  const hasRealPhoto = Boolean(occurrence.foto && occurrence.foto !== 'mock-photo');

  return (
    <View style={styles.wrap}>
      <Image
        source={hasRealPhoto ? { uri: occurrence.foto } : ROAD_IMAGE}
        style={styles.image}
        resizeMode="cover"
        accessibilityLabel={
          hasRealPhoto ? 'Foto registrada em campo' : 'Imagem ilustrativa do trecho'
        }
      />
      <View style={styles.scrim} />
      <View style={[styles.risk, { backgroundColor: RISK_COLORS[occurrence.risco] }]}>
        <MaterialCommunityIcons name="alert" size={15} color="#fff" />
        <Text style={styles.riskText}>Risco {riskLabel(occurrence.risco)}</Text>
      </View>
      {occurrence.foto ? (
        <View style={styles.photoBadge}>
          <MaterialCommunityIcons name="camera" size={14} color="#DCFCE7" />
          <Text style={styles.photoBadgeText}>Evidência anexada</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    height: 215,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  risk: {
    position: 'absolute',
    left: 16,
    bottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  riskText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 5,
  },
  photoBadge: {
    position: 'absolute',
    right: 16,
    bottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(8,17,12,0.88)',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  photoBadgeText: {
    color: '#DCFCE7',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 5,
  },
});
