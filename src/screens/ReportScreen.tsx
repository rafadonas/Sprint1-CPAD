import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia, Risco, Rodovia } from '../types';
import { riskLabel, RISK_COLORS } from '../utils/occurrence';
import { buildOccurrence, ReportErrors, ReportForm, validateReport } from '../utils/report';
import { useDeviceLocation } from '../hooks/useDeviceLocation';
import { usePhotoPicker } from '../hooks/usePhotoPicker';
import { FormField } from '../components/form/FormField';
import { OptionGroup } from '../components/form/OptionGroup';
import { PhotoPicker } from '../components/form/PhotoPicker';
import { LocationCard } from '../components/form/LocationCard';

interface ReportScreenProps {
  onAddOccurrence: (occurrence: Ocorrencia) => void;
  onCancel: () => void;
}

type TextField = 'km' | 'altura' | 'descricao';

const ROAD_OPTIONS = (['BR-101', 'SP-270', 'SP-280'] as Rodovia[]).map((road) => ({
  value: road,
  label: road,
}));

const RISK_OPTIONS = (['baixo', 'medio', 'alto'] as Risco[]).map((level) => ({
  value: level,
  label: riskLabel(level),
  color: RISK_COLORS[level],
}));

const INITIAL_FORM: ReportForm = {
  km: '',
  altura: '',
  descricao: '',
  risco: 'medio',
  rodovia: 'BR-101',
};

const DESCRIPTION_LIMIT = 280;

export const ReportScreen = ({ onAddOccurrence, onCancel }: ReportScreenProps) => {
  const [form, setForm] = useState<ReportForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<ReportErrors>({});
  const { gps, refresh: refreshLocation } = useDeviceLocation();
  const { photoUri, photoError, pickPhoto, removePhoto } = usePhotoPicker();

  const setField = <K extends keyof ReportForm>(field: K, value: ReportForm[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const updateText = (field: TextField) => (value: string) => {
    setField(field, value);
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = () => {
    const nextErrors = validateReport(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onAddOccurrence(buildOccurrence(form, gps, photoUri));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onCancel}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Cancelar e voltar"
          >
            <MaterialCommunityIcons name="close" size={24} color="#F8FAFC" />
          </TouchableOpacity>
          <View style={styles.headerCopy}>
            <Text style={styles.subtitle}>INSPEÇÃO DE CAMPO</Text>
            <Text style={styles.title}>Nova ocorrência</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          <View style={styles.progress}>
            <View style={styles.progressStep} />
            <View style={styles.progressStep} />
            <View style={styles.progressStep} />
          </View>

          <Text style={styles.step}>1 · Evidência</Text>
          <PhotoPicker
            photoUri={photoUri}
            error={photoError}
            onPick={pickPhoto}
            onRemove={removePhoto}
          />

          <Text style={styles.step}>2 · Localização</Text>
          <OptionGroup
            label="Rodovia"
            options={ROAD_OPTIONS}
            value={form.rodovia}
            onChange={(road) => setField('rodovia', road)}
          />
          <FormField
            label="Quilômetro da rodovia"
            value={form.km}
            onChangeText={updateText('km')}
            placeholder="Ex.: 142,5"
            keyboardType="decimal-pad"
            error={errors.km}
          />
          <LocationCard gps={gps} rodovia={form.rodovia} onRefresh={refreshLocation} />

          <Text style={styles.step}>3 · Avaliação</Text>
          <FormField
            label="Altura estimada da vegetação (cm)"
            value={form.altura}
            onChangeText={updateText('altura')}
            placeholder="Ex.: 35"
            keyboardType="decimal-pad"
            error={errors.altura}
          />
          <OptionGroup
            label="Nível de risco"
            options={RISK_OPTIONS}
            value={form.risco}
            onChange={(level) => setField('risco', level)}
          />
          <FormField
            label="Descrição da situação"
            value={form.descricao}
            onChangeText={updateText('descricao')}
            placeholder="Descreva visibilidade, densidade e impacto observado..."
            multiline
            maxLength={DESCRIPTION_LIMIT}
            error={errors.descricao}
          />
          <Text style={styles.counter}>
            {form.descricao.length}/{DESCRIPTION_LIMIT} caracteres
          </Text>

          <TouchableOpacity style={styles.submit} onPress={handleSubmit} accessibilityRole="button">
            <MaterialCommunityIcons name="send" size={19} color="#07120A" />
            <Text style={styles.submitText}>Enviar ocorrência</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#08110C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1F3327',
  },
  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#16211B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCopy: {
    marginLeft: 13,
  },
  subtitle: {
    color: '#4ADE80',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: '#F8FAFC',
    fontSize: 21,
    fontWeight: '800',
  },
  form: {
    padding: 22,
    paddingBottom: 50,
  },
  progress: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 20,
  },
  progressStep: {
    height: 3,
    flex: 1,
    borderRadius: 2,
    backgroundColor: '#4ADE80',
  },
  step: {
    color: '#4ADE80',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 7,
    marginBottom: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  counter: {
    color: '#64748B',
    fontSize: 10,
    textAlign: 'right',
    marginTop: -11,
    marginBottom: 18,
  },
  submit: {
    marginTop: 10,
    backgroundColor: '#4ADE80',
    borderRadius: 13,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  submitText: {
    color: '#07120A',
    fontWeight: '800',
    fontSize: 15,
    marginLeft: 8,
  },
});
