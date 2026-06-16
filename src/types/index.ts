export type Risco = 'baixo' | 'medio' | 'alto';

export type StatusOcorrencia = 'Pendente' | 'Em análise' | 'Concluído';

export interface Ocorrencia {
  id: string;
  local: string;
  rodovia: string;
  risco: Risco;
  descricao: string;
  data: string;
  alturaGrama: string;
  distancia?: string;
  latitude: string;
  longitude: string;
  status: StatusOcorrencia;
  inspetor: string;
  foto?: string;
}
