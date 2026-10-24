# Plano de Negócio — Motiva Verde

> Documento da Sprint 4. Os valores são estimativas da equipe para orientar uma conversa comercial com a Motiva. Não são dados oficiais da empresa e precisam ser validados em um piloto.

## 1. Problema

A Motiva opera concessões rodoviárias, como os corredores da SP-270 (Raposo Tavares) e da SP-280 (Castello Branco), e os contratos de concessão estabelecem parâmetros de desempenho para a conservação da faixa de domínio. Vegetação alta tampa placas, reduz a visibilidade em curvas e acessos, aumenta o risco de incêndio às margens da pista e pode gerar notificações do poder concedente (ARTESP/ANTT).

Hoje a gestão de roçagem costuma funcionar assim:

- **Cronograma fixo de roçagem**, que corta trechos que ainda não precisam e deixa para depois trechos críticos;
- **Registro de campo disperso**, em planilhas, fotos de celular e mensagens, sem georreferenciamento padronizado;
- **Pouca rastreabilidade** entre a constatação, o despacho da equipe e a conclusão do serviço, o que dificulta comprovar o atendimento na fiscalização.

## 2. Proposta de valor

**O Motiva Verde transforma a roçagem de calendário em roçagem por risco.** Cada ocorrência é registrada em campo com foto, GPS, KM, altura estimada e classificação de risco. A central passa a ver o mapa das prioridades e a despachar equipes, e cada atendimento fica registrado em uma linha do tempo auditável.

| Para quem              | Ganho                                                                           |
| ---------------------- | ------------------------------------------------------------------------------- |
| Inspetor de campo      | Registro em menos de 1 minuto, com foto e localização automáticas, sem planilha |
| Central de operações   | Mapa de risco por rodovia e fila de despacho priorizada                         |
| Gestão de conservação  | Menos roçagem desnecessária e equipes direcionadas aos trechos críticos         |
| Regulação e compliance | Evidência com data, foto e coordenadas para responder ao poder concedente       |
| Usuário da rodovia     | Sinalização visível e menos risco de acidentes e incêndios                      |

## 3. Público-alvo e personas

**Cliente principal:** a Motiva, pelas diretorias de engenharia e conservação das concessionárias rodoviárias do grupo. **Mercado secundário:** outras concessionárias de rodovias no Brasil e terceirizadas de conservação que atendem a essas concessionárias.

| Persona                                     | Perfil                                                             | Dor                                             | Como o app ajuda                                            |
| ------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------- | ----------------------------------------------------------- |
| **Carlos, inspetor de tráfego/conservação** | 35 anos, percorre cerca de 150 km por turno de viatura             | Anota em papel e manda fotos soltas no WhatsApp | Formulário guiado com câmera, GPS e validação               |
| **Ana, coordenadora do CCO**                | Supervisiona despacho de equipes de várias rodovias                | Não sabe qual trecho atender primeiro           | Mapa com filtros por risco e rodovia e despacho em um toque |
| **Roberto, gerente de conservação**         | Responde pelo orçamento de roçagem e pelos indicadores contratuais | Custo alto e pouca evidência de atendimento     | Histórico, taxa de resolução e prazo recomendado por risco  |

## 4. Modelo de receita

Modelo **SaaS B2B com licença por quilômetro monitorado**. O preço acompanha o tamanho da malha, que é a unidade com que a concessionária já planeja a conservação.

| Item                                                     | Modelo                        | Valor estimado                                                                                                         |
| -------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Piloto (90 dias, 1 concessionária, até 200 km)           | Preço fechado                 | R$ 25.000                                                                                                              |
| Implantação (integração, cadastro da malha, treinamento) | Taxa única por concessionária | R$ 15.000 a R$ 40.000                                                                                                  |
| Licença da plataforma (app + painel)                     | Assinatura mensal por km      | R$ 40/km/mês (Essencial) · R$ 65/km/mês (Profissional, com IA e integrações)                                           |
| Serviço gerenciado (opcional)                            | Mensal                        | A partir de R$ 8.000/mês por concessionária, com análise de imagens e relatórios regulatórios feitos pela nossa equipe |

**Exemplo:** uma concessionária com 500 km no plano Essencial paga 500 × R$ 40 = **R$ 20.000/mês (R$ 240 mil/ano)**. Com 3.000 km da malha do grupo, a receita recorrente seria de cerca de **R$ 120 mil/mês**.

## 5. Custos operacionais estimados

| Categoria                                         | Ano 1 (piloto + 2 concessionárias)     | Observação                                             |
| ------------------------------------------------- | -------------------------------------- | ------------------------------------------------------ |
| Equipe (2 devs, 1 produto/CS, 0,5 dados)          | R$ 52.000/mês                          | Regime PJ, incluindo encargos estimados                |
| Nuvem (API, banco, armazenamento de fotos, mapas) | R$ 4.000/mês                           | Cresce com o volume de fotos; com política de retenção |
| Lojas, ferramentas e monitoramento                | R$ 1.500/mês                           | Google Play, Apple Developer, Sentry, CI               |
| Suporte e treinamento em campo                    | R$ 3.000/mês                           | Deslocamento até as bases operacionais                 |
| **Total**                                         | **≈ R$ 60.500/mês (≈ R$ 726 mil/ano)** |                                                        |

**Ponto de equilíbrio:** cerca de 1.500 km no plano Essencial (1.500 × R$ 40 = R$ 60 mil/mês), algo como três concessionárias médias.

## 6. Impacto esperado para a Motiva

As premissas abaixo devem ser medidas no piloto:

- **Redução de 15% a 25% nas roçagens desnecessárias** ao trocar o cronograma fixo pela priorização por risco. Em um contrato de conservação verde de R$ 1 milhão/ano em um trecho, isso equivale a R$ 150 mil a R$ 250 mil por ano, valor que supera o custo da licença.
- **Atendimento mais rápido de trechos críticos:** o risco alto já recebe prazo de até 24 horas no app, com o status acompanhado do registro à conclusão.
- **Menos exposição a notificações e multas contratuais**, graças a evidências com foto, data e coordenadas.
- **Segurança viária:** sinalização e visibilidade preservadas, o que contribui para os indicadores de segurança da concessão.
- **ESG:** menos deslocamentos e roçagens inúteis, com menor consumo de combustível e emissões das equipes, e prevenção de queimadas às margens da rodovia.

**Indicadores do piloto:** tempo médio entre registro e conclusão, número de roçagens evitadas, porcentagem de ocorrências com foto e GPS, notificações recebidas comparadas ao período anterior e adoção pelos inspetores (registros por turno).

## 7. Diferenciais competitivos

| Alternativa atual                           | Limitação                                                | Diferencial do Motiva Verde                                |
| ------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| Planilhas e WhatsApp                        | Sem padrão, sem georreferência e sem trilha de auditoria | Registro estruturado, com mapa e linha do tempo            |
| ERPs e sistemas de manutenção genéricos     | Caros e pouco práticos para o inspetor na viatura        | App focado em vegetação, pensado para o uso em campo       |
| Contratação de imagens de satélite isoladas | Não fecha o ciclo com o despacho da equipe               | Une a constatação, o despacho e a conclusão em um só fluxo |

Outros diferenciais:

- **Multiplataforma**, com uma única base em React Native e Expo para Android, iOS e Web (painel).
- **Funciona com conectividade instável:** os dados ficam salvos no aparelho, e a sincronização offline está prevista no roadmap.
- **Classificação de risco e prazo recomendado** padronizados para toda a malha.

## 8. Principais riscos e mitigação

| Risco                                                 | Probabilidade | Mitigação                                                                                      |
| ----------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------- |
| Baixa adesão dos inspetores                           | Média         | Fluxo de até 1 minuto, treinamento nas bases e indicadores de uso                              |
| Integração com sistemas legados da Motiva             | Alta          | API aberta, exportação CSV e integração feita na fase de implantação                           |
| Falta de sinal em trechos rurais                      | Alta          | Persistência local já implementada e sincronização offline no roadmap                          |
| Segurança e LGPD (fotos e localização dos inspetores) | Média         | Coleta de localização só durante o registro, controle de acesso por perfil e retenção definida |
| Ciclo de venda longo em grande empresa                | Alta          | Piloto pago e curto, com metas de ROI definidas antes do início                                |
| Concorrência de grandes fornecedores de software      | Média         | Foco no nicho de vegetação e preço por km acessível                                            |

## 9. Roadmap pós-Sprint 4

1. **Piloto (0–3 meses):** backend com autenticação, sincronização offline e painel web da central.
2. **Escala (3–9 meses):** notificações push, relatórios regulatórios automáticos e integração com o sistema de ordens de serviço.
3. **Inteligência (9–18 meses):** estimativa de altura da vegetação por visão computacional nas fotos e previsão de crescimento com base em clima e sazonalidade.
