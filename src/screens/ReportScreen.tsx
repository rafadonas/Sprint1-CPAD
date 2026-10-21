import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ocorrencia, Risco, Rodovia } from '../types';
import { riskLabel, RISK_COLORS } from '../utils/occurrence';

interface ReportScreenProps { onAddOccurrence: (occurrence: Ocorrencia) => void; onCancel: () => void; }
type Errors = Partial<Record<'km' | 'altura' | 'descricao', string>>;
const ROADS: Rodovia[] = ['BR-101', 'SP-270', 'SP-280'];
const ROAD_FALLBACK: Record<Rodovia, { latitude: number; longitude: number }> = {
  'BR-101': { latitude: -23.5505, longitude: -46.6333 },
  'SP-270': { latitude: -23.5074, longitude: -47.4588 },
  'SP-280': { latitude: -23.5037, longitude: -47.2766 },
};
type GpsState =
  | { status: 'loading' }
  | { status: 'ok'; latitude: number; longitude: number; accuracy: number | null }
  | { status: 'unavailable'; reason: string };

export const ReportScreen = ({ onAddOccurrence, onCancel }: ReportScreenProps) => {
  const [km, setKm] = useState(''); const [altura, setAltura] = useState(''); const [descricao, setDescricao] = useState('');
  const [risco, setRisco] = useState<Risco>('medio'); const [rodovia, setRodovia] = useState<Rodovia>('BR-101'); const [photoUri, setPhotoUri] = useState<string | null>(null); const [photoError, setPhotoError] = useState<string | null>(null); const [errors, setErrors] = useState<Errors>({});
  const [gps, setGps] = useState<GpsState>({ status: 'loading' });
  const captureLocation = useCallback(async () => {
    setGps({ status: 'loading' });
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) { setGps({ status: 'unavailable', reason: 'Permissão de localização negada' }); return; }
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setGps({ status: 'ok', latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy });
    } catch {
      setGps({ status: 'unavailable', reason: 'GPS indisponível no momento' });
    }
  }, []);
  useEffect(() => { captureLocation(); }, [captureLocation]);
  const pickPhoto = async (source: 'camera' | 'library') => {
    setPhotoError(null);
    try {
      if (source === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) { setPhotoError('Permissão de câmera negada. Use a galeria ou libere o acesso nas configurações.'); return; }
      }
      const options: ImagePicker.ImagePickerOptions = { mediaTypes: ['images'], quality: 0.6, allowsEditing: false };
      const result = source === 'camera' ? await ImagePicker.launchCameraAsync(options) : await ImagePicker.launchImageLibraryAsync(options);
      if (!result.canceled && result.assets[0]) setPhotoUri(result.assets[0].uri);
    } catch {
      setPhotoError('Não foi possível acessar a câmera neste dispositivo. Tente pela galeria.');
    }
  };
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
    const coords = gps.status === 'ok' ? gps : ROAD_FALLBACK[rodovia];
    const baseTags = risco === 'alto' ? ['Vegetação densa', 'Prioridade alta'] : ['Inspeção de campo'];
    const occurrence: Ocorrencia = { id: `occ-${Date.now()}`, local: `KM ${km.replace(',', '.')}`, rodovia, risco, descricao: descricao.trim(), data: now, alturaGrama: altura.replace(',', '.'), latitude: coords.latitude.toFixed(5), longitude: coords.longitude.toFixed(5), status: 'Pendente', inspetor: 'Carlos M.', foto: photoUri ?? undefined, tags: gps.status === 'ok' ? [...baseTags, 'GPS do dispositivo'] : [...baseTags, 'Localização aproximada'], previsaoIntervencao: risco === 'alto' ? 'Imediata' : risco === 'medio' ? 'Até 72 horas' : 'Monitoramento', historico: [{ data: now, titulo: 'Ocorrência registrada', descricao: 'Registro enviado pelo aplicativo de campo.' }] };
    onAddOccurrence(occurrence);
  };
  const update = (setter: (value: string) => void, field: keyof Errors) => (value: string) => { setter(value); if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined })); };

  return <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}><KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
    <View style={styles.header}><TouchableOpacity onPress={onCancel} style={styles.closeButton} accessibilityRole="button" accessibilityLabel="Cancelar e voltar"><MaterialCommunityIcons name="close" size={24} color="#F8FAFC" /></TouchableOpacity><View style={styles.headerCopy}><Text style={styles.subtitle}>INSPEÇÃO DE CAMPO</Text><Text style={styles.title}>Nova ocorrência</Text></View></View>
    <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
      <View style={styles.progress}><View style={styles.progressActive} /><View style={styles.progressActive} /><View style={styles.progressActive} /></View>
      <Text style={styles.step}>1 · Evidência</Text>{photoUri ? <View style={styles.preview}><Image source={{ uri: photoUri }} style={styles.previewImage} accessibilityLabel="Foto anexada à ocorrência" /><TouchableOpacity style={styles.removePhoto} onPress={() => setPhotoUri(null)} accessibilityRole="button" accessibilityLabel="Remover foto"><MaterialCommunityIcons name="trash-can-outline" size={18} color="#F8FAFC" /><Text style={styles.removePhotoText}>Remover</Text></TouchableOpacity></View> : <View style={styles.photoActions}><TouchableOpacity style={styles.photo} onPress={() => pickPhoto('camera')} accessibilityRole="button" accessibilityLabel="Tirar foto com a câmera"><MaterialCommunityIcons name="camera-plus-outline" size={30} color="#94A3B8" /><Text style={styles.photoText}>Tirar foto</Text><Text style={styles.hint}>Câmera do aparelho</Text></TouchableOpacity><TouchableOpacity style={styles.photo} onPress={() => pickPhoto('library')} accessibilityRole="button" accessibilityLabel="Escolher foto da galeria"><MaterialCommunityIcons name="image-plus" size={30} color="#94A3B8" /><Text style={styles.photoText}>Galeria</Text><Text style={styles.hint}>Imagem existente</Text></TouchableOpacity></View>}
      {photoError ? <Text style={[styles.error, styles.photoError]}>{photoError}</Text> : null}
      <Text style={styles.step}>2 · Localização</Text><Text style={styles.label}>Rodovia</Text><View style={styles.options}>{ROADS.map((road) => <Option key={road} label={road} active={rodovia === road} onPress={() => setRodovia(road)} />)}</View>
      <Field label="Quilômetro da rodovia" value={km} onChangeText={update(setKm, 'km')} placeholder="Ex.: 142,5" keyboardType="decimal-pad" error={errors.km} />
      <TouchableOpacity style={[styles.location, gps.status === 'unavailable' && styles.locationWarning]} onPress={captureLocation} disabled={gps.status === 'loading'} accessibilityRole="button" accessibilityLabel="Atualizar localização">{gps.status === 'loading' ? <ActivityIndicator size="small" color="#4ADE80" /> : <MaterialCommunityIcons name={gps.status === 'ok' ? 'crosshairs-gps' : 'crosshairs-question'} size={21} color={gps.status === 'ok' ? '#4ADE80' : '#F59E0B'} />}<View style={styles.flex}><Text style={styles.locationTitle}>{gps.status === 'loading' ? 'Obtendo localização...' : gps.status === 'ok' ? 'Localização capturada' : gps.reason}</Text><Text style={styles.hint}>{gps.status === 'ok' ? `${gps.latitude.toFixed(5)}, ${gps.longitude.toFixed(5)}${gps.accuracy ? ` · precisão de ${Math.round(gps.accuracy)} m` : ''}` : gps.status === 'loading' ? 'Aguardando o GPS do aparelho' : `Será usada a referência da ${rodovia}. Toque para tentar novamente.`}</Text></View>{gps.status !== 'loading' ? <MaterialCommunityIcons name="refresh" size={18} color="#94A3B8" /> : null}</TouchableOpacity>
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
  photoActions: { flexDirection: 'row', gap: 10, marginBottom: 24 }, photo: { flex: 1, height: 125, backgroundColor: '#111C16', borderRadius: 16, borderWidth: 2, borderColor: '#33483B', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' }, preview: { height: 190, borderRadius: 16, overflow: 'hidden', marginBottom: 24, borderWidth: 2, borderColor: '#22C55E' }, previewImage: { width: '100%', height: '100%' }, removePhoto: { position: 'absolute', right: 10, bottom: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(8,17,12,0.88)', borderRadius: 16, paddingHorizontal: 11, paddingVertical: 7 }, removePhotoText: { color: '#F8FAFC', fontSize: 12, fontWeight: '700', marginLeft: 5 }, photoError: { marginTop: -16, marginBottom: 18 }, locationWarning: { backgroundColor: '#2A2210' }, photoText: { color: '#F8FAFC', fontSize: 14, fontWeight: '700', marginTop: 7 }, hint: { color: '#94A3B8', fontSize: 11, marginTop: 3 }, field: { marginBottom: 17 }, label: { color: '#CBD5E1', fontSize: 12, fontWeight: '600', marginBottom: 7 }, input: { backgroundColor: '#111C16', borderRadius: 12, paddingHorizontal: 15, paddingVertical: 13, color: '#F8FAFC', fontSize: 15, borderWidth: 1, borderColor: '#294133' }, textArea: { minHeight: 105, textAlignVertical: 'top' }, inputError: { borderColor: '#EF4444' }, error: { color: '#F87171', fontSize: 11, marginTop: 5 }, counter: { color: '#64748B', fontSize: 10, textAlign: 'right', marginTop: -11, marginBottom: 18 }, options: { flexDirection: 'row', gap: 7, marginBottom: 17 }, option: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, backgroundColor: '#111C16', borderWidth: 1, borderColor: '#294133' }, optionText: { color: '#CBD5E1', fontSize: 12, fontWeight: '700' }, optionActiveText: { color: '#07120A' }, location: { flexDirection: 'row', gap: 11, alignItems: 'center', backgroundColor: '#10251A', borderRadius: 12, padding: 13, marginBottom: 23 }, locationTitle: { color: '#DCFCE7', fontSize: 12, fontWeight: '700' }, submit: { marginTop: 10, backgroundColor: '#4ADE80', borderRadius: 13, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }, submitText: { color: '#07120A', fontWeight: '800', fontSize: 15, marginLeft: 8 },
});
