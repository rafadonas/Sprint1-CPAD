# Motiva App - Gestão de Vegetação Rodoviária (Sprint 2)

O **Motiva App** é uma solução mobile desenvolvida para a concessionária Motiva, focada na monitoração e gestão de vegetação nas faixas de domínio das rodovias. O aplicativo permite que inspetores de campo identifiquem, registrem e acompanhem pontos críticos de vegetação alta que possam comprometer a segurança viária.

## 🚀 Funcionalidades Principais

*   **Mapa de Riscos**: Visualização interativa com fundo geográfico (São Paulo) e marcadores coloridos que indicam o nível de risco (Baixo, Médio, Alto).
*   **Fluxo de Registro**: Formulário completo para cadastro de ocorrências, incluindo quilometragem (KM), altura da grama, nível de risco e descrição detalhada.
*   **Histórico Dinâmico**: Lista de todas as ocorrências registradas com atualização em tempo real após novos cadastros.
*   **Detalhes da Ocorrência**: Tela rica em informações com fotos do local, status de risco, detalhes do inspetor e botão para despacho de equipe de roçagem.
*   **Perfil do Inspetor**: Área dedicada ao usuário com estatísticas de relatos feitos e resolvidos.
*   **Navegação Fluida**: Menu inferior funcional que permite transições rápidas entre todas as áreas do MVP.

## 🛠️ Tecnologias Utilizadas

*   **Framework**: [Expo](https://expo.dev/) (React Native)
*   **Linguagem**: TypeScript
*   **Ícones**: @expo/vector-icons (MaterialCommunityIcons)
*   **Estilização**: StyleSheet (Padrão React Native) com design Dark Mode.
*   **Gerenciamento de Estado**: React Hooks (useState, useEffect).

## 📂 Estrutura do Projeto

```text
motiva-app/
├── assets/             # Imagens e ícones do projeto
├── src/
│   ├── components/     # Componentes reutilizáveis (BottomNav, OccurrenceCard)
│   ├── screens/        # Telas (Map, History, Report, Detail, Profile)
│   ├── types/          # Definições de tipos TypeScript (Interfaces)
│   └── data/           # Mock de dados iniciais para a Sprint
├── App.tsx             # Componente raiz e lógica de navegação principal
└── package.json        # Dependências e scripts do projeto
```

## 📋 Como Rodar o Projeto

1.  **Pré-requisitos**: Ter o Node.js instalado e o app **Expo Go** no celular (ou um emulador configurado).
2.  **Instalação**:
    ```bash
    npm install
    ```
3.  **Execução**:
    ```bash
    npx expo start
    ```
4.  **Acesso**:
    *   Escaneie o QR Code com o app **Expo Go** (Android) ou Câmera (iOS).
    *   Pressione `w` no terminal para abrir a versão Web no navegador.

## 🔄 Fluxo de Teste Sugerido

1.  Abra o **Mapa** para ver os pontos críticos iniciais.
2.  Clique no botão **"+"** verde no mapa ou acesse a aba **Relatar**.
3.  Preencha o formulário e clique em **"Enviar Ocorrência"**.
4.  Você será redirecionado para o **Histórico**, onde sua nova ocorrência aparecerá no topo.
5.  Clique na ocorrência criada para ver os **Detalhes** e testar o botão **"Despachar Equipe"**.

## 🎥 Demonstração em Vídeo

Confira o vídeo com a demonstração do fluxo completo do aplicativo:
*   [Link do Vídeo no YouTube](https://youtu.be/vOX8zfhRCqA)

## 👥 Integrantes

*   Pedro Henrique dos Santos Cardoso - RM: 563268
*   Gabriel Gibin Leoncio – RM: 565462
*   Rafael do Nascimento Silva – RM: 566263
*   Rai Augusto Ribeiro – RM: 562870
*   Guilherme Morais de Assis - RM: 564198
*   Lucas Werpp Franco - RM: 556044

---
*Projeto desenvolvido para a disciplina de Cross-Platform Application Development.*
