import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia, Risco, Rodovia } from '../types';
import { riskLabel, RISK_COLORS } from '../utils/occurrence';

interface ReportScreenProps { onAddOccurrence: (occurrence: Ocorrencia) => void; onCancel: () => void; }
type Errors = Partial<Record<'km' | 'altura' | 'descricao', string>>;
const ROADS: Rodovia[] = ['BR-101', 'SP-270', 'SP-280'];

export const ReportScreen = ({ onAddOccurrence, onCancel }: ReportScreenProps) => {
  const [km, setKm] = useState(''); const [altura, setAltura] = useState(''); const [descricao, setDescricao] = useState('');
  const [risco, setRisco] = useState<Risco>('medio'); const [rodovia, setRodovia] = useState<Rodovia>('BR-101'); const [photoAdded, setPhotoAdded] = useState(false); const [errors, setErrors] = useState<Errors>({});
  const validate = () => {
    const next: Errors = {};
    const kmNumber = Number(km.replace(',', '.')); const heightNumber = Number(altura.replace(',', '.'));
    if (!km.trim() || Number.isNaN(kmNumber) || kmNumber < 0 || kmNumber > 999) next.km = 'Informe um KM válido entre 0 e 999.';
    if (!altura.trim() || Number.isNaN(heightNumber) || heightNumber < 0 || heightNumber > 500) next.altura = 'Informe uma altura válida entre 0 e 500 cm.';
    if (descricao.trim().length < 10) next.descricao = 'Descreva a situação com pelo menos 10 caracteres.';
    setErrors(next); return Object.keys(next).length === 0;
  };
  const handleSubmit = () => {
    if (!validate()) return;
    const now = new Date().toISOString();
    const occurrence: Ocorrencia = { id: `occ-${Date.now()}`, local: `KM ${km.replace(',', '.')}`, rodovia, risco, descricao: descricao.trim(), data: now, alturaGrama: altura.replace(',', '.'), latitude: '-23.5505', longitude: '-46.6333', status: 'Pendente', inspetor: 'Carlos M.', foto: photoAdded ? 'mock-photo' : undefined, tags: risco === 'alto' ? ['Vegetação densa', 'Prioridade alta'] : ['Inspeção de campo'], previsaoIntervencao: risco === 'alto' ? 'Imediata' : risco === 'medio' ? 'Até 72 horas' : 'Monitoramento', historico: [{ data: now, titulo: 'Ocorrência registrada', descricao: 'Registro enviado pelo aplicativo de campo.' }] };
    onAddOccurrence(occurrence);
  };
  const update = (setter: (value: string) => void, field: keyof Errors) => (value: string) => { setter(value); if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined })); };

  return <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
    <View style={styles.header}><TouchableOpacity onPress={onCancel} style={styles.closeButton} accessibilityRole="button" accessibilityLabel="Cancelar e voltar"><MaterialCommunityIcons name="close" size={24} color="#F8FAFC" /></TouchableOpacity><View style={styles.headerCopy}><Text style={styles.subtitle}>INSPEÇÃO DE CAMPO</Text><Text style={styles.title}>Nova ocorrência</Text></View></View>
    <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
      <View style={styles.progress}><View style={styles.progressActive} /><View style={styles.progressActive} /><View style={styles.progressActive} /></View>
      <Text style={styles.step}>1 · Evidência</Text><TouchableOpacity style={[styles.photo, photoAdded && styles.photoAdded]} onPress={() => setPhotoAdded((value) => !value)} accessibilityRole="button" accessibilityState={{ selected: photoAdded }}><MaterialCommunityIcons name={photoAdded ? 'check-circle' : 'camera-plus-outline'} size={32} color={photoAdded ? '#4ADE80' : '#94A3B8'} /><Text style={styles.photoText}>{photoAdded ? 'Foto anexada' : 'Adicionar foto do trecho'}</Text><Text style={styles.hint}>{photoAdded ? 'Toque para remover' : 'Demonstração com captura mockada'}</Text></TouchableOpacity>
      <Text style={styles.step}>2 · Localização</Text><Text style={styles.label}>Rodovia</Text><View style={styles.options}>{ROADS.map((road) => <Option key={road} label={road} active={rodovia === road} onPress={() => setRodovia(road)} />)}</View>
      <Field label="Quilômetro da rodovia" value={km} onChangeText={update(setKm, 'km')} placeholder="Ex.: 142,5" keyboardType="decimal-pad" error={errors.km} />
      <View style={styles.location}><MaterialCommunityIcons name="crosshairs-gps" size={21} color="#4ADE80" /><View><Text style={styles.locationTitle}>Localização capturada</Text><Text style={styles.hint}>-23.5505, -46.6333 · precisão de 8 m</Text></View></View>
      <Text style={styles.step}>3 · Avaliação</Text><Field label="Altura estimada da vegetação (cm)" value={altura} onChangeText={update(setAltura, 'altura')} placeholder="Ex.: 35" keyboardType="decimal-pad" error={errors.altura} />
      <Text style={styles.label}>Nível de risco</Text><View style={styles.options}>{(['baixo', 'medio', 'alto'] as Risco[]).map((level) => <Option key={level} label={riskLabel(level)} active={risco === level} color={RISK_COLORS[level]} onPress={() => setRisco(level)} />)}</View>
      <Field label="Descrição da situação" value={descricao} onChangeText={update(setDescricao, 'descricao')} placeholder="Descreva visibilidade, densidade e impacto observado..." multiline maxLength={280} error={errors.descricao} />
      <Text style={styles.counter}>{descricao.length}/280 caracteres</Text>
      <TouchableOpacity style={styles.submit} onPress={handleSubmit}><MaterialCommunityIcons name="send" size={19} color="#07120A" /><Text style={styles.submitText}>Enviar ocorrência</Text></TouchableOpacity>
    </ScrollView>
  </KeyboardAvoidingView></SafeAreaView>;
};

const Option = ({ label, active, onPress, color = '#4ADE80' }: { label: string; active: boolean; onPress: () => void; color?: string }) => <TouchableOpacity style={[styles.option, active && { backgroundColor: color, borderColor: color }]} onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: active }}><Text style={[styles.optionText, active && styles.optionActiveText]}>{label}</Text></TouchableOpacity>;
const Field = ({ label, error, multiline, ...props }: React.ComponentProps<typeof TextInput> & { label: string; error?: string }) => <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput {...props} multiline={multiline} placeholderTextColor="#64748B" style={[styles.input, multiline && styles.textArea, error && styles.inputError]} />{error ? <Text style={styles.error}>{error}</Text> : null}</View>;

const styles = StyleSheet.create({
  flex: { flex: 1 }, container: { flex: 1, backgroundColor: '#08110C' }, header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#1F3327' }, closeButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#16211B', alignItems: 'center', justifyContent: 'center' }, headerCopy: { marginLeft: 13 }, subtitle: { color: '#4ADE80', fontSize: 9, fontWeight: '700', letterSpacing: 1.2 }, title: { color: '#F8FAFC', fontSize: 21, fontWeight: '800' }, form: { padding: 22, paddingBottom: 50 }, progress: { flexDirection: 'row', gap: 6, marginBottom: 20 }, progressActive: { height: 3, flex: 1, borderRadius: 2, backgroundColor: '#4ADE80' }, step: { color: '#4ADE80', fontSize: 12, fontWeight: '800', marginTop: 7, marginBottom: 11, textTransform: 'uppercase', letterSpacing: 0.8 },
  photo: { height: 135, backgroundColor: '#111C16', borderRadius: 16, borderWidth: 2, borderColor: '#33483B', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }, photoAdded: { borderColor: '#22C55E', backgroundColor: '#10251A' }, photoText: { color: '#F8FAFC', fontSize: 14, fontWeight: '700', marginTop: 7 }, hint: { color: '#94A3B8', fontSize: 11, marginTop: 3 }, field: { marginBottom: 17 }, label: { color: '#CBD5E1', fontSize: 12, fontWeight: '600', marginBottom: 7 }, input: { backgroundColor: '#111C16', borderRadius: 12, paddingHorizontal: 15, paddingVertical: 13, color: '#F8FAFC', fontSize: 15, borderWidth: 1, borderColor: '#294133' }, textArea: { minHeight: 105, textAlignVertical: 'top' }, inputError: { borderColor: '#EF4444' }, error: { color: '#F87171', fontSize: 11, marginTop: 5 }, counter: { color: '#64748B', fontSize: 10, textAlign: 'right', marginTop: -11, marginBottom: 18 }, options: { flexDirection: 'row', gap: 7, marginBottom: 17 }, option: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, backgroundColor: '#111C16', borderWidth: 1, borderColor: '#294133' }, optionText: { color: '#CBD5E1', fontSize: 12, fontWeight: '700' }, optionActiveText: { color: '#07120A' }, location: { flexDirection: 'row', gap: 11, alignItems: 'center', backgroundColor: '#10251A', borderRadius: 12, padding: 13, marginBottom: 23 }, locationTitle: { color: '#DCFCE7', fontSize: 12, fontWeight: '700' }, submit: { marginTop: 10, backgroundColor: '#4ADE80', borderRadius: 13, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }, submitText: { color: '#07120A', fontWeight: '800', fontSize: 15, marginLeft: 8 },
});
