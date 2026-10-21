# Relatório de Testes — Sprints 3 e 4

Data da execução: 21/09/2026  
Ambiente: Expo Web, navegador Chromium, build de produção Web e Expo Go em emulador Android
Responsável: equipe Motiva Verde

| ID | Cenário testado | Procedimento | Resultado esperado | Resultado obtido | Status |
| --- | --- | --- | --- | --- | --- |
| CT-01 | Consultar e filtrar o mapa | Abrir o app, alternar rodovia e risco e pesquisar por KM | Exibir apenas marcadores compatíveis e atualizar a contagem | Busca e filtros atualizaram os pontos georreferenciados e a legenda corretamente | Passou |
| CT-02 | Busca sem resultados | Pesquisar por um trecho inexistente | Exibir estado vazio e opção para limpar filtros | Mensagem “Nenhum ponto encontrado” e botão de limpeza exibidos | Passou |
| CT-03 | Validar formulário vazio | Abrir “Nova ocorrência” e enviar sem preencher | Impedir cadastro e indicar todos os campos inválidos | Erros de KM, altura e descrição foram exibidos sem travamento | Passou |
| CT-04 | Registrar ocorrência válida | Informar KM 155, altura 90, risco alto e descrição válida | Criar o registro e direcionar ao histórico | Registro criado no topo, total alterado de 5 para 6 e status Pendente | Passou |
| CT-05 | Buscar e filtrar o histórico | Digitar termos de busca e alternar entre os quatro filtros | Listar somente registros compatíveis ou estado vazio | Lista e estado vazio responderam corretamente aos critérios | Passou |
| CT-06 | Consultar detalhes | Selecionar o registro do KM 155 e expandir a linha do tempo | Exibir inspeção, risco, prioridade, tags e eventos | Todos os dados foram exibidos e a linha do tempo expandiu/recolheu | Passou |
| CT-07 | Despachar equipe | Em uma ocorrência Pendente, acionar “Despachar equipe” | Alterar status, prazo e histórico; impedir novo despacho | Status mudou para Em análise, prazo para 24 h e ação ficou desabilitada | Passou |
| CT-08 | Consultar perfil | Abrir Perfil e acionar itens do menu | Mostrar totais coerentes e feedback para cada ação | Estatísticas refletiram os mocks e todas as ações responderam | Passou |
| CT-09 | Navegação completa | Percorrer Mapa, Relatar, Histórico, Detalhes, voltar e Perfil | Nenhuma tela sem saída, crash ou navegação quebrada | Todos os destinos e retornos funcionaram | Passou |
| CT-10 | Retorno contextual | Abrir uma ocorrência pelo Mapa e usar o botão voltar | Retornar ao Mapa, preservando a origem do fluxo | O detalhe retornou corretamente ao Mapa | Passou |
| CT-11 | Confirmação de despacho | Abrir uma ocorrência Pendente, abrir o modal e cancelar; repetir e confirmar | Cancelar sem alterar dados; confirmar com toast e atualização do histórico | Os dois caminhos funcionaram de forma idêntica na Web e no fluxo mobile | Passou |
| CT-12 | Preferências do perfil | Alternar notificações e abrir Segurança, Ajuda e Sair | Atualizar o controle e exibir feedback sem bloquear a navegação | Switch e avisos globais responderam corretamente | Passou |
| CT-13 | Voltar no Android | Em Detalhes, Formulário, Histórico e Perfil, pressionar o botão físico voltar | Retornar ao fluxo anterior sem encerrar inesperadamente o app | Tratamento de `hardwareBackPress` implementado para todas as telas internas | Repetir no emulador |
| CT-14 | Interagir com o mapa geográfico | Arrastar o mapa, alterar a região visualizada e tocar em um marcador | Movimentar o mapa livremente e abrir os detalhes da ocorrência selecionada | OpenStreetMap respondeu ao gesto de arraste e o marcador da SP-270 abriu o KM 32 corretamente | Passou |
| CT-15 | Retornar pelo cabeçalho do Histórico | Abrir Histórico pelo menu inferior e tocar na seta do cabeçalho | Retornar ao mapa sem interromper a sessão | O botão retornou ao mapa e preservou os dados da sessão | Passou |

## Verificações técnicas

| Verificação | Resultado | Status |
| --- | --- | --- |
| `npx tsc --noEmit` | Nenhum erro de tipagem | Passou |
| `npx expo export --platform web` | Bundle gerado em `dist/` | Passou |

## Pontos observados

- Os dados são intencionalmente temporários e voltam ao estado inicial quando o aplicativo é reiniciado.
- Foto, geolocalização e mapa são simulados para permitir demonstração estável sem permissões externas.
- A confirmação de despacho usa diálogo nativo no Android/iOS e feedback direto na Web, preservando o mesmo resultado funcional.
- A validação final em dispositivo físico deve ser repetida antes da gravação do vídeo.

---

# Sprint 4 — Correções e validação da versão final

Data da execução: 21/10/2026
Ambientes: build de produção Web (Chromium, viewport 375×812) e APK de release instalado em emulador Android (API 34) pelo GitHub Actions

## Correção dos pontos observados na Sprint 3

| Ponto observado | Correção |
| --- | --- |
| Dados voltavam ao estado inicial quando o app era reiniciado | Persistência local com AsyncStorage (`src/services/storage.ts`) |
| Foto simulada | Câmera e galeria reais com `expo-image-picker`, pré-visualização e remoção |
| Geolocalização simulada | GPS com `expo-location`, precisão exibida e fallback por rodovia quando a permissão é negada |
| CT-13 pendente de repetição no emulador | Repetido no APK instalado (CT-21) |
| Validação em dispositivo nativo | APK instalado e percorrido automaticamente no emulador (CT-20) |

## Casos de teste da Sprint 4

| ID | Cenário testado | Procedimento | Resultado esperado | Resultado obtido | Status |
| --- | --- | --- | --- | --- | --- |
| CT-16 | Persistência após reinício | Registrar ocorrência (KM 155) e recarregar o app | Ocorrência continua no histórico | Histórico manteve 6 ocorrências depois do recarregamento | Passou |
| CT-17 | Localização negada | Abrir "Nova ocorrência" com a permissão de localização negada | Aviso e uso da referência da rodovia | Aviso "Permissão de localização negada" e coordenadas da BR-101 com a tag "Localização aproximada" | Passou |
| CT-18 | Ciclo completo de atendimento | Despachar e depois concluir a ocorrência KM 155 | Status Pendente → Em análise → Concluído, com 3 eventos na linha do tempo | Os status e os 3 eventos foram registrados e as ações foram confirmadas por modal | Passou |
| CT-19 | Restaurar dados de demonstração | Perfil > Restaurar dados > Confirmar | Volta às 5 ocorrências iniciais | Relatos passaram de 6 para 5 e o toast de confirmação apareceu | Passou |
| CT-20 | Instalação do APK | Instalar o APK de release e abrir o app no emulador | App instala, abre o mapa e não encerra | APK instalado. O mapa carregou os tiles do OpenStreetMap e os 5 marcadores, e não houve FATAL EXCEPTION no logcat | Passou |
| CT-21 | Botão voltar no Android (repete o CT-13) | Abrir Formulário e Histórico e pressionar o botão voltar | Retorna ao mapa sem fechar o app | Formulário → voltar e Histórico → voltar retornaram ao mapa, com o processo do app ainda ativo | Passou |
| CT-22 | Foto pela câmera em aparelho físico | Relatar > Tirar foto > Enviar e abrir os detalhes | A foto aparece no topo dos detalhes | Validar na gravação do vídeo final | Validar no aparelho |

## Verificações técnicas da Sprint 4

| Verificação | Resultado | Status |
| --- | --- | --- |
| `npm run typecheck` | Nenhum erro de tipagem | Passou |
| `npm run build:web` | Bundle gerado em `dist/` | Passou |
| `npx expo-doctor` | 21 de 22 verificações. Única falha: a regressão conhecida do Hermes no SDK 56 | Passou com ressalva |
| Build do APK (GitHub Actions) | `motiva-verde.apk` gerado por Expo Prebuild + Gradle, com o GPS capturado no emulador (precisão de 5 m) | Passou |

## Ajuste após a validação no APK

- Os filtros do Histórico ficavam parcialmente encobertos pela lista no Android por causa de uma altura fixa. A altura agora se ajusta ao conteúdo.

Capturas do APK no emulador: [mapa](./docs/screenshots/01-mapa.png), [formulário com GPS](./docs/screenshots/02-formulario.png) e [perfil](./docs/screenshots/06-perfil.png).
