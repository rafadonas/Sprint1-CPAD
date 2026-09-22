import { Risco, StatusOcorrencia } from '../types';

export const RISK_COLORS: Record<Risco, string> = {
  alto: '#EF4444',
  medio: '#F59E0B',
  baixo: '#22C55E',
};

export const STATUS_COLORS: Record<StatusOcorrencia, string> = {
  Pendente: '#F59E0B',
  'Em análise': '#60A5FA',
  Concluído: '#22C55E',
};

export const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const riskLabel = (risk: Risco) => ({
  baixo: 'Baixo',
  medio: 'Médio',
  alto: 'Alto',
}[risk]);

export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));

export const relativeDate = (date: string) => {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(date).getTime()) / 60000));
  if (minutes < 1) return 'Agora';
  if (minutes < 60) return `Há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Há ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Há ${days}d`;
};
