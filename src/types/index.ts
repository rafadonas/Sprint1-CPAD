export type Risco = 'baixo' | 'medio' | 'alto';

export type StatusOcorrencia = 'Pendente' | 'Em análise' | 'Concluído';

export type Rodovia = 'BR-101' | 'SP-270' | 'SP-280';

export interface Ocorrencia {
  id: string;
  local: string;
  rodovia: Rodovia;
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
  tags: string[];
  previsaoIntervencao: string;
  historico: {
    data: string;
    titulo: string;
    descricao: string;
  }[];
}
