import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia } from '../types';

const ROAD_IMAGE = require('../../assets/estrada-com-mata.webp');

interface DetailScreenProps {
  occurrence: Ocorrencia;
  onBack: () => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({ occurrence, onBack }) => {
  const getRiscoColor = (risco: string) => {
    switch (risco) {
      case 'alto': return '#ff6366';
      case 'medio': return '#ffb900';
      case 'baixo': return '#00bc7c';
      default: return '#a0a0a0';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={30} color="#f9f9f9" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da Ocorrência</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={ROAD_IMAGE} style={styles.occurrenceImage} />
          <View style={styles.imageTagLeft}>
            <MaterialCommunityIcons name="road" size={12} color="#f9f9f9" />
            <Text style={styles.imageTagText}>{occurrence.rodovia}</Text>
          </View>
          <View style={styles.imageTagRight}>
            <MaterialCommunityIcons name="clock-outline" size={12} color="#f9f9f9" />
            <Text style={styles.imageTagText}>Há 2h</Text>
          </View>
        </View>

        <View style={[styles.statusBanner, { backgroundColor: getRiscoColor(occurrence.risco) }]}>
          <View style={styles.statusRow}>
            <MaterialCommunityIcons name="alert" size={20} color="#fff" />
            <Text style={styles.statusText}>Status: Risco {occurrence.risco.charAt(0).toUpperCase() + occurrence.risco.slice(1)}</Text>
          </View>
          <Text style={styles.statusDot}>🔴</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>LOCALIZAÇÃO</Text>
            <Text style={styles.sectionValue}>{occurrence.local}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailGrid}>
            <DetailItem 
              icon="ruler" 
              label="Altura analisada" 
              value={`${occurrence.alturaGrama} cm`} 
            />
            <DetailItem 
              icon="calendar-clock" 
              label="Reportado em" 
              value="15 Jun, 10:24" 
            />
            <DetailItem 
              icon="account" 
              label="Inspetor" 
              value={occurrence.inspetor} 
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionLabel}>DESCRIÇÃO</Text>
            <Text style={styles.descriptionText}>{occurrence.descricao}</Text>
          </View>

          <View style={styles.tagContainer}>
            <Tag icon="eye-off" label="Baixa visibilidade" />
            <Tag icon="pine-tree" label="Vegetação densa" />
            <Tag icon="alert-decagram" label="Urgente" />
          </View>
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={onBack}>
          <MaterialCommunityIcons name="truck-delivery" size={20} color="#f9f9f9" />
          <Text style={styles.actionButtonText}>Despachar Equipe</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailItem = ({ icon, label, value }: { icon: any; label: string; value: string }) => (
  <View style={styles.detailItem}>
    <View style={styles.detailIconRow}>
      <MaterialCommunityIcons name={icon} size={16} color="#a0a0a0" />
      <Text style={styles.detailLabel}>{label}</Text>
    </View>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const Tag = ({ icon, label }: { icon: any; label: string }) => (
  <View style={styles.tag}>
    <MaterialCommunityIcons name={icon} size={14} color="#f9f9f9" />
    <Text style={styles.tagText}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: '#f9f9f9',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    paddingBottom: 40,
  },
  imageContainer: {
    height: 240,
    width: '100%',
    position: 'relative',
  },
  occurrenceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageTagLeft: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  imageTagRight: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  imageTagText: {
    color: '#f9f9f9',
    fontSize: 12,
    marginLeft: 4,
  },
  statusBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  statusDot: {
    fontSize: 18,
  },
  infoSection: {
    padding: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionLabel: {
    color: '#a0a0a0',
    fontSize: 12,
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  sectionValue: {
    color: '#f9f9f9',
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#1f1f1f',
    marginVertical: 16,
  },
  detailGrid: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    color: '#a0a0a0',
    fontSize: 14,
    marginLeft: 8,
  },
  detailValue: {
    color: '#f9f9f9',
    fontSize: 16,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionText: {
    color: 'rgba(249, 249, 249, 0.9)',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#1a1a1a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#333',
  },
  tagText: {
    color: '#f9f9f9',
    fontSize: 12,
    marginLeft: 4,
  },
  actionButton: {
    backgroundColor: '#ff6366',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  actionButtonText: {
    color: '#f9f9f9',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
