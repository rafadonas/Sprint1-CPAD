# 🛣️ Motiva App | Gestão de Vegetação

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

> Projeto desenvolvido para a **Sprint 1** do desafio Motiva. Focado na ideação, prototipagem e estruturação inicial de um aplicativo mobile para otimizar o mapeamento de rodovias.

---

## 📌 O Problema
A falta de visibilidade e a dificuldade na gestão para o envio de equipes de roçada nas rodovias. Atualmente, o gestor não consegue visualizar de forma rápida e geográfica quais trechos são críticos e apresentam vegetação alta atrapalhando a pista.

## 👥 Público-Alvo
O aplicativo foi desenhado para duas frentes de atuação:
1. **🧑‍🔧 Operador de campo:** Registra os dados da via diretamente do local.
2. **👨‍💻 Gestor de operações:** Utiliza o mapa interativo para analisar dados e despachar equipes.

## 🎯 Ação Principal
Registrar as condições da vegetação e fornecer ao gestor um **mapa interativo com indicadores de calor/risco** (marcadores em verde, amarelo e vermelho). Isso centraliza a informação e agiliza a tomada de decisão.

---

## ⚙️ Escopo do MVP (Produto Mínimo Viável)
Aqui estão as funcionalidades essenciais mapeadas para o protótipo e desenvolvimento:

- [x] **Cadastro de Ocorrência:** Formulário com KM da rodovia, foto da situação, descrição, altura da grama e captura automática de GPS (Lat/Long).
- [x] **Listagem em Mapa:** Visualização panorâmica de todas as ocorrências registradas em uma interface estilo Google Maps.
- [x] **Classificação de Risco:** Tradução visual da urgência através de cores (🟢 Baixo | 🟡 Médio | 🔴 Alto).
- [x] **Detalhes da Ocorrência:** Tela aprofundada com a foto real do trecho e botão para despacho de equipe.

---

## 📂 Estrutura do Projeto
O projeto já se encontra estruturado para o início do desenvolvimento na Sprint 2, utilizando as melhores práticas de organização de pastas:
```text
📦 motiva-app
 ┣ 📂 src
 ┃ ┣ 📂 components   # Componentes visuais reutilizáveis (Botões, Inputs, Cards)
 ┃ ┣ 📂 screens      # Telas completas do aplicativo (Mapa, Formulário, Detalhes)
 ┃ ┗ 📂 types        # Definições de tipagem do TypeScript
 ┣ 📜 App.tsx        # Arquivo raiz do projeto
 ┗ 📜 README.md