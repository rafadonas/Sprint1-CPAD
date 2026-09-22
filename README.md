# Motiva Verde — Gestão Inteligente de Vegetação

Aplicativo multiplataforma desenvolvido para apoiar a gestão das áreas verdes nas rodovias operadas pela Motiva. A solução reúne ocorrências de campo, classificação de risco, histórico de intervenções e recomendação do prazo de atendimento em uma experiência única para equipes de inspeção e operação.

## 🎥 Demonstração da Sprint 3

### [▶ Assistir ao vídeo completo no YouTube](https://youtu.be/QX9XWHr-NKw)

[![Demonstração do Motiva Verde](https://img.youtube.com/vi/QX9XWHr-NKw/maxresdefault.jpg)](https://youtu.be/QX9XWHr-NKw)

## Status da Sprint 3

O protótipo funcional está navegável por meio do Expo e foi validado em um emulador Android com Expo Go. A aplicação também possui suporte a iOS e Web pela mesma base de código. Todos os fluxos previstos para esta sprint utilizam dados mockados locais e possuem tratamento para sucesso, erro de formulário, busca sem resultados e listas vazias.

| Funcionalidade | Status | Cobertura atual |
| --- | --- | --- |
| Mapa operacional | Concluída | OpenStreetMap interativo, zoom, arraste, pontos georreferenciados, busca, filtros, legenda e acesso aos detalhes |
| Registro de ocorrência | Concluída | Foto simulada, rodovia, KM, altura, risco, descrição, localização e validações |
| Histórico | Concluída | Busca, filtros por status, estado vazio e atualização após novo registro |
| Detalhes e prioridade | Concluída | Dados da inspeção, recomendação, tags e linha do tempo expansível |
| Despacho de equipe | Concluída | Confirmação no mobile, alteração para “Em análise” e registro no histórico |
| Perfil | Concluída | Estatísticas derivadas dos mocks e ações com feedback |
| Estados alternativos | Concluída | Erros de validação, zero resultados, lista vazia e ação já executada |
| Experiência e acessibilidade | Concluída | Toasts, modal multiplataforma, áreas seguras do sistema, alvos acessíveis, labels e navegação contextual |
| API e persistência | Pendente para Sprint 4 | Estado mantido apenas durante a sessão atual |
| Câmera e GPS nativos | Pendente para Sprint 4 | Captura de imagem e localização do aparelho ainda são simuladas |

## Fluxos implementados

1. Consultar os pontos de vegetação no mapa e alternar filtros.
2. Buscar uma ocorrência por KM, rodovia ou descrição.
3. Registrar uma ocorrência com validação completa dos campos.
4. Consultar e filtrar o histórico por etapa de atendimento.
5. Abrir os detalhes, consultar a linha do tempo e despachar uma equipe.
6. Consultar o perfil e as estatísticas do inspetor.

### Refinamentos de produto

- Navegação contextual: detalhes e formulário retornam à tela que originou o fluxo.
- Feedback global não bloqueante para cadastro, despacho e preferências.
- Confirmação de despacho própria e consistente em Android, iOS e Web.
- Filtros adaptáveis para telas estreitas e cartões resistentes a textos maiores.
- Perfil com indicadores operacionais, taxa de resolução e preferências interativas.
- Nomes de risco, estados selecionados e controles revisados para leitores de tela.
- Respeito às áreas seguras do Android e iOS, evitando sobreposição com relógio, bateria e barra de gestos.
- Mapa geográfico interativo com OpenStreetMap, movimentação, zoom e marcadores ligados às coordenadas das ocorrências.

## Dados mockados

Os mocks cobrem três rodovias (`BR-101`, `SP-270` e `SP-280`), os riscos baixo, médio e alto e os status Pendente, Em análise e Concluído. Cada ocorrência contém coordenadas, altura estimada, responsável, tags, prazo recomendado e eventos históricos. Novos registros e mudanças de status atualizam toda a interface durante a sessão.

## Tecnologias

- Expo 56 e React Native 0.85
- React 19 e TypeScript
- React Native Web
- OpenStreetMap, Leaflet e React Native WebView
- Material Community Icons
- Estado local com React Hooks

Não houve migração para Flutter; o projeto permanece em React Native com Expo, preservando a stack adotada nas sprints anteriores.

## Como executar

Pré-requisito: Node.js 20 ou superior.

```bash
npm install
npm start
```

No terminal do Expo, pressione `a` para Android, `i` para iOS ou `w` para Web. Também é possível escanear o QR Code usando o Expo Go.

### Executar no emulador Android

1. Abra o Android Studio e acesse **More Actions > Virtual Device Manager**.
2. Inicie um dispositivo virtual Android.
3. Na raiz do projeto, execute:

```bash
npm install
npx expo start --android
```

O Expo abrirá o aplicativo no emulador. Se o servidor já estiver em execução, pressione `a` no terminal. Para atualizar o bundle após uma alteração, pressione `r`.

> O Expo Go é o aplicativo que carrega o projeto; o dispositivo virtual criado pelo Android Studio é o emulador utilizado na demonstração.

### Validação técnica

```bash
npm run typecheck
npx expo install --check
npx expo export --platform web
```

As verificações de tipos e dependências foram executadas com sucesso em 21/09/2026. O aplicativo também foi iniciado e inspecionado no emulador Android. O relatório detalhado está em [TESTES_MANUAIS.md](./TESTES_MANUAIS.md).

## Pendências e plano para a Sprint 4

- Substituir os mocks por API autenticada e banco de dados persistente.
- Integrar GPS e captura real de imagens e avaliar suporte offline ao mapa.
- Incorporar dados de sensoriamento remoto e classificação por IA.
- Sincronizar registros feitos sem conexão quando a rede retornar.
- Adicionar autenticação, permissões por perfil e notificações push.
- Automatizar testes de componentes e fluxos críticos.
- Realizar testes de acessibilidade e desempenho em aparelhos físicos.
- Migrar para Expo SDK 57 após a avaliação: o `expo-doctor` aponta uma regressão de memória do Hermes incluído no SDK 56, mantido nesta entrega por exigência do projeto.

## Integrantes

- Pedro Henrique dos Santos Cardoso — RM 563268
- Gabriel Gibin Leoncio — RM 565462
- Rafael do Nascimento Silva — RM 566263
- Rai Augusto Ribeiro — RM 562870
- Guilherme Morais de Assis — RM 564198
- Lucas Werpp Franco — RM 556044

Projeto acadêmico da disciplina Cross-Platform Application Development, ministrada por Hercules Lima Ramos.
