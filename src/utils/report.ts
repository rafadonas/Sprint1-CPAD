import { GpsState } from '../hooks/useDeviceLocation';
import { Ocorrencia, Risco, Rodovia } from '../types';

export interface ReportForm {
  km: string;
  altura: string;
  descricao: string;
  risco: Risco;
  rodovia: Rodovia;
}

export type ReportErrors = Partial<Record<'km' | 'altura' | 'descricao', string>>;

// Marcos quilométricos reais usados quando o GPS do aparelho não está disponível.
export const ROAD_FALLBACK: Record<Rodovia, { latitude: number; longitude: number }> = {
  'BR-101': { latitude: -23.41352, longitude: -45.03344 }, // KM 40, Ubatuba
  'SP-270': { latitude: -23.52072, longitude: -47.43644 }, // KM 97, Sorocaba
  'SP-280': { latitude: -23.38047, longitude: -47.39785 }, // KM 85, Sorocaba
};

const toNumber = (value: string) => Number(value.replace(',', '.'));

export const validateReport = ({ km, altura, descricao }: ReportForm): ReportErrors => {
  const errors: ReportErrors = {};
  const kmNumber = toNumber(km);
  const heightNumber = toNumber(altura);

  if (!km.trim() || Number.isNaN(kmNumber) || kmNumber < 0 || kmNumber > 999) {
    errors.km = 'Informe um KM válido entre 0 e 999.';
  }
  if (!altura.trim() || Number.isNaN(heightNumber) || heightNumber < 0 || heightNumber > 500) {
    errors.altura = 'Informe uma altura válida entre 0 e 500 cm.';
  }
  if (descricao.trim().length < 10) {
    errors.descricao = 'Descreva a situação com pelo menos 10 caracteres.';
  }
  return errors;
};

const RECOMMENDED_DEADLINE: Record<Risco, string> = {
  alto: 'Imediata',
  medio: 'Até 72 horas',
  baixo: 'Monitoramento',
};

export const buildOccurrence = (
  form: ReportForm,
  gps: GpsState,
  photoUri: string | null,
): Ocorrencia => {
  const now = new Date().toISOString();
  const coords = gps.status === 'ok' ? gps : ROAD_FALLBACK[form.rodovia];
  const riskTags =
    form.risco === 'alto' ? ['Vegetação densa', 'Prioridade alta'] : ['Inspeção de campo'];
  const locationTag = gps.status === 'ok' ? 'GPS do dispositivo' : 'Localização aproximada';

  return {
    id: `occ-${Date.now()}`,
    local: `KM ${form.km.replace(',', '.')}`,
    rodovia: form.rodovia,
    risco: form.risco,
    descricao: form.descricao.trim(),
    data: now,
    alturaGrama: form.altura.replace(',', '.'),
    latitude: coords.latitude.toFixed(5),
    longitude: coords.longitude.toFixed(5),
    status: 'Pendente',
    inspetor: 'Carlos M.',
    foto: photoUri ?? undefined,
    tags: [...riskTags, locationTag],
    previsaoIntervencao: RECOMMENDED_DEADLINE[form.risco],
    historico: [
      {
        data: now,
        titulo: 'Ocorrência registrada',
        descricao: 'Registro enviado pelo aplicativo de campo.',
      },
    ],
  };
};
