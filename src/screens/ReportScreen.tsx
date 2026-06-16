import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia, Risco } from '../types';

interface ReportScreenProps {
  onAddOccurrence: (occurrence: Ocorrencia) => void;
  onCancel: () => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({ onAddOccurrence, onCancel }) => {
  const [km, setKm] = useState('');
  const [altura, setAltura] = useState('');
  const [descricao, setDescricao] = useState('');
  const [risco, setRisco] = useState<Risco>('medio');

  const handleSubmit = () => {
    if (!km || !altura || !descricao) return;

    const newOccurrence: Ocorrencia = {
      id: Math.random().toString(36).substr(2, 9),
      local: `KM ${km}`,
      rodovia: 'BR-101',
      risco: risco,
      descricao: descricao,
      data: new Date().toISOString(),
      alturaGrama: altura,
      latitude: '-23.5505',
      longitude: '-46.6333',
      status: 'Pendente',
      inspetor: 'Usuário Atual',
    };

    onAddOccurrence(newOccurrence);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.subtitle}>NOVA ENTRADA</Text>
            <Text style={styles.title}>Registrar Ocorrência</Text>
          </View>
          <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={24} color="#f9f9f9" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.form}>
          <TouchableOpacity style={styles.photoPlaceholder}>
            <MaterialCommunityIcons name="camera" size={32} color="#a0a0a0" />
            <Text style={styles.photoText}>Tirar Foto</Text>
            <Text style={styles.photoHint}>JPG ou PNG até 10MB</Text>
          </TouchableOpacity>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Kilômetro da Rodovia (KM)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 142,5"
              placeholderTextColor="#555"
              keyboardType="numeric"
              value={km}
              onChangeText={setKm}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Altura da grama (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 35"
              placeholderTextColor="#555"
              keyboardType="numeric"
              value={altura}
              onChangeText={setAltura}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Risco Identificado</Text>
            <View style={styles.riscoContainer}>
              {(['baixo', 'medio', 'alto'] as Risco[]).map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[
                    styles.riscoButton,
                    risco === r && styles.riscoButtonActive,
                    risco === r && { backgroundColor: r === 'alto' ? '#ff6366' : r === 'medio' ? '#ffb900' : '#00bc7c' }
                  ]}
                  onPress={() => setRisco(r)}
                >
                  <Text style={[styles.riscoText, risco === r && { color: '#fff' }]}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição da situação</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descreva o estado da vegetação..."
              placeholderTextColor="#555"
              multiline
              numberOfLines={4}
              value={descricao}
              onChangeText={setDescricao}
            />
          </View>

          <View style={styles.locationCard}>
            <View style={styles.locationIcon}>
              <MaterialCommunityIcons name="map-marker-check" size={20} color="#00bc7c" />
            </View>
            <View>
              <Text style={styles.locationTitle}>Localização automática capturada</Text>
              <Text style={styles.locationCoords}>-23.5505 / -46.6333 (Lat/Long)</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Enviar Ocorrência</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
  },
  subtitle: {
    color: '#a0a0a0',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 2,
  },
  title: {
    color: '#f9f9f9',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    padding: 24,
    paddingBottom: 40,
  },
  photoPlaceholder: {
    height: 160,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#333',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  photoText: {
    color: '#f9f9f9',
    fontSize: 14,
    marginTop: 8,
  },
  photoHint: {
    color: '#a0a0a0',
    fontSize: 12,
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#a0a0a0',
    fontSize: 12,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#f9f9f9',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  riscoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  riscoButton: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#333',
  },
  riscoButtonActive: {
    borderColor: 'transparent',
  },
  riscoText: {
    color: '#a0a0a0',
    fontSize: 14,
    fontWeight: '600',
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  locationIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 188, 124, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  locationTitle: {
    color: '#f9f9f9',
    fontSize: 12,
  },
  locationCoords: {
    color: '#a0a0a0',
    fontSize: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  submitButton: {
    backgroundColor: '#269936',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
