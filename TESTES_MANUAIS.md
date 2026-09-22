# Relatório de Testes Manuais — Sprint 3

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
