import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_OCORRENCIAS } from '../data/mock';
import { Ocorrencia } from '../types';

const STORAGE_KEY = '@motiva-verde/ocorrencias/v1';

export const loadOccurrences = async (): Promise<Ocorrencia[]> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (!stored) return MOCK_OCORRENCIAS;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : MOCK_OCORRENCIAS;
  } catch {
    return MOCK_OCORRENCIAS;
  }
};

export const saveOccurrences = async (occurrences: Ocorrencia[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(occurrences));
  } catch {
    // A falha de gravação não deve interromper o uso em campo; o estado em memória continua válido.
  }
};

export const resetOccurrences = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
  return MOCK_OCORRENCIAS;
};
