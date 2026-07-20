# Prototipação de Alta Fidelidade - TrAcEs (Trilha de Acompanhamento Escolar)

**Versão:** 3.0 (Entregável Parcial 1 - Prototipação de Alta Fidelidade)
**Data da Última Atualização:** 20/06/2026
**Status:** ✅ Prototipação de Alta Fidelidade Concluída
**Estudantes:** Antonio Alex Dayson Tomaz e Maria Alexsandra Tomaz

---

## 📋 Índice

- [Prototipação de Alta Fidelidade - TrAcEs (Trilha de Acompanhamento Escolar)](#prototipação-de-alta-fidelidade---traces-trilha-de-acompanhamento-escolar)
  - [📋 Índice](#-índice)
  - [1. Visão Geral do MVP](#1-visão-geral-do-mvp)
    - [Objetivo do Sistema](#objetivo-do-sistema)
    - [Público-alvo](#público-alvo)
  - [2. Telas do Sistema (Prototipação de Alta Fidelidade)](#2-telas-do-sistema-prototipação-de-alta-fidelidade)
    - [Tela 1: Dashboard do Responsável (Home dos Pais)](#tela-1-dashboard-do-responsável-home-dos-pais)
    - [Tela 2: Boletim Escolar](#tela-2-boletim-escolar)
    - [Tela 3: Notas Detalhadas](#tela-3-notas-detalhadas)
    - [Tela 4: Frequência e Calendário](#tela-4-frequência-e-calendário)
    - [Tela 5: Avisos e Comunicados](#tela-5-avisos-e-comunicados)
    - [Tela 6: Área do Docente (Módulo Operacional)](#tela-6-área-do-docente-módulo-operacional)
  - [3. Design System \& Componentes Reutilizáveis](#3-design-system--componentes-reutilizáveis)
    - [3.1 Tipografia](#31-tipografia)
    - [3.2 Paleta de Cores (Tema Shadcn \& Semântica do Protótipo)](#32-paleta-de-cores-tema-shadcn--semântica-do-protótipo)
    - [3.3 Espaçamentos e Grid](#33-espaçamentos-e-grid)
  - [4. Análise Crítica de Usabilidade (10 Heurísticas de Nielsen)](#4-análise-crítica-de-usabilidade-10-heurísticas-de-nielsen)
  - [5. Acessibilidade Web (WCAG 2.1 AA)](#5-acessibilidade-web-wcag-21-aa)
    - [5.1 Barra de Acessibilidade (Navegação Global)](#51-barra-de-acessibilidade-navegação-global)
    - [5.2 Relações de Contraste Otimizadas (WCAG 1.4.3 \& 1.4.11)](#52-relações-de-contraste-otimizadas-wcag-143--1411)
    - [5.3 Codificação Tripla de Informação (Status Acadêmicos - WCAG 1.4.1)](#53-codificação-tripla-de-informação-status-acadêmicos---wcag-141)
  - [6. Componente Extensionista e Utilidade Social](#6-componente-extensionista-e-utilidade-social)

---

## 1. Visão Geral do MVP

### Objetivo do Sistema

O **TrAcEs (Trilha de Acompanhamento Escolar)** é um ecossistema digital de gestão acadêmica e monitoramento pedagógico que conecta de forma simbiótica a Secretaria Escolar, o Corpo Docente e os Responsáveis Legais. A plataforma foca em:

- ✅ Visualização consolidada e detalhada de notas e médias pedagógicas.
- ✅ Controle de frequência absoluta e anual comparada ao limite regulatório.
- ✅ Gestão de avisos escolares e comunicados bidirecionais.
- ✅ Lançamento ágil e seguro de notas por parte do corpo docente.
- ✅ Inclusão digital por meio de recursos avançados de acessibilidade baseados na WCAG 2.1 AA.

### Público-alvo

- **Pais/Mães/Responsáveis Legais** com diversos níveis de letramento digital e faixa etária variando de 25 a 70 anos.
- **Corpo Docente (Professores)** necessitando de um ambiente de escrita limpo e intuitivo para lançamento de dados em lote.
- **Estudantes** interessados no acompanhamento autônomo do próprio rendimento escolar.

---

## 2. Telas do Sistema (Prototipação de Alta Fidelidade)

As seis principais telas e fluxos foram prototipados em alta fidelidade no Figma, garantindo fidelidade de design, transições fluidas e consistência visual rigorosa.

### Tela 1: Dashboard do Responsável (Home dos Pais)

**Descrição:**
Atua como o Hub centralizador da experiência do usuário (modelo de navegação *Hub-and-Spoke*). Apresenta atalhos diretos, alertas críticos consolidados de todos os dependentes e navegação fluida.

**Protótipo de Alta Fidelidade:**
![Dashboard](Telas/Prototipação%20-%20Tela%201%20-%20Dashboard.png)

**Componentes Principais:**

- **Barra Global de Acessibilidade:** Localizada no topo absoluto, contendo controles de magnificação de fonte (A+/A-) e links de atalho (Skip Links).
- **Header Institucional:** Logo do TrAcEs, sistema de notificações, seletor de perfil e logout.
- **Widget de Alertas Importantes:** Mecanismo de revelação progressiva que destaca notas baixas ou faltas críticas de forma imediata pós-login.
- **Cards Dinâmicos de Filhos:** Exibição sintética de cada estudante vinculado (ex: Ana Silva e João Silva), mostrando série, turma e status acadêmico rápido.
- **Menu Rápido de Atalhos:** Botões para Boletim, Notas Detalhadas, Frequência e Avisos. Módulos como "Perfil" e "Suporte" apresentam indicator de bloqueio temporário (disabled com cadeado) por estarem fora do escopo do MVP.

---

### Tela 2: Boletim Escolar

**Descrição:**
Apresenta o rendimento acadêmico tabular do aluno selecionado, calculando médias e status de aprovação de maneira automatizada.

**Protótipo de Alta Fidelidade:**
![Boletim Escolar](Telas/Prototipação%20-%20Tela%202%20-%20Boletim%20Escolar.png)

**Componentes Principais:**

- **Botão de Retorno:** Ação clara de "⬅️ Voltar ao Painel" para facilitar a navegação.
- **Filtros de Escopo:** Dropdowns para selecionar o Aluno e o Ano Letivo corrente.
- **Card de Resumo Geral:** Bloco destacado contendo Média Geral Consolidada, Taxa de Frequência Absoluta e a Situação Acadêmica Atual.
- **Tabela de Rendimento Semântico:** Listagem das disciplinas, professores regentes, notas bimestrais fracionadas, média final e badges coloridos de status ("Aprovado", "Recuperação").
- **Ações Físicas/Digitais:** Botões rápidos de "Imprimir", "Baixar PDF" e "Enviar por E-mail".

---

### Tela 3: Notas Detalhadas

**Descrição:**
Fornece granularidade máxima sobre a composição das notas contidas no boletim, exibindo avaliações individuais, pesos e a fórmula de cálculo pedagógico.

**Protótipo de Alta Fidelidade:**
![Notas Detalhadas](Telas/Prototipação%20-%20Tela%203%20-%20Notas%20Detalhadas.png)

**Componentes Principais:**

- **Filtro Focado por Disciplina:** Dropdown de seleção específica (ex: "Português - Profa. Ana Costa").
- **Tabelas Seccionadas por Bimestre:** Divisão cronológica listando o nome da atividade (Prova 1, Seminário, Trabalho), tipo de avaliação, peso na média ponderada e a nota real obtida.
- **Transparência Algorítmica:** Exibição visual e textual da fórmula matemática da média ponderada no rodapé das tabelas.

---

### Tela 4: Frequência e Calendário

**Descrição:**
Interface focada na assiduidade do estudante, permitindo o acompanhamento preventivo de faltas para mitigar o risco de reprovação ou evasão escolar.

**Protótipo de Alta Fidelidade:**
![Frequência](Telas/Prototipação%20-%20Tela%204%20-%20Frequência.png)

**Componentes Principais:**

- **Balanço Consolidado de Faltas:** Cards com o resumo do mês atual e o acumulado anual comparativo, disparando alertas caso a frequência caia abaixo do limite regulatório de 75%.
- **Grid de Calendário Visual:** Malha mensal interativa com codificação dupla de status utilizando cores e siglas universais ([P] Presente, [F] Falta, [F*] Falta Justificada, [-] Sem Aula).
- **Repositório de Justificativas:** Tabela inferior com histórico de atestados cadastrados pela secretaria da escola.

---

### Tela 5: Avisos e Comunicados

**Descrição:**
Central de mensagens e avisos institucionais enviados pela direção ou corpo docente para a comunidade escolar.

**Protótipo de Alta Fidelidade:**
![Avisos e Comunicados](Telas/Prototipação%20-%20Tela%205%20-%20Avisos%20e%20Comunicados.png)

**Componentes Principais:**

- **Filtros de Criticidade:** Opções para ordenar comunicados por urgência (Urgente, Geral, Pedagógico) e status de leitura.
- **Badge Numérico:** Indicador na aba de mensagens pendentes (ex: "Avisos Não Lidos (3)").
- **Cards Expansíveis (Accordion):** Mensagens colapsadas que mostram apenas título e remetente, abrindo o texto completo sob demanda.
- **Histórico Arquivado:** Seção colapsável inferior contendo mensagens já visualizadas ("Avisos Já Lidos").

---

### Tela 6: Área do Docente (Módulo Operacional)

**Descrição:**
Interface operacional voltada à entrada de dados por parte do professor. Alimenta diretamente as telas de Boletim, Notas e Frequência visualizadas pelos responsáveis.

**Protótipo de Alta Fidelidade:**
![Área do Docente](Telas/Prototipação%20-%20Tela%206%20-%20Área%20do%20Docente.png)

**Componentes Principais:**

- **Seletores de Escopo:** Filtros suspensos obrigatórios para seleção de Turma (ex: "9º Ano A — Manhã"), Disciplina ("Português") e Tipo de Registro ("Notas/Avaliações" ou "Frequência").
- **Grid de Lançamento de Notas:** Tabela com lista oficial de alunos, foto/iniciais, matrícula e campos de digitação numérica configurados para validação em tempo real.
- **Barra de Controle de Ações:** Botões com forte contraste de hierarquia visual: "Salvar Rascunho" (salvamento seguro offline/temporário) e "Publicar no Sistema" (com gatilho de modal de confirmação).

---

## 3. Design System & Componentes Reutilizáveis

O protótipo de alta fidelidade utiliza um padrão visual moderno baseado no framework **Shadcn UI** e estruturado no Figma, garantindo elegância e acessibilidade.

### 3.1 Tipografia

O protótipo utiliza uma escala tipográfica estruturada para otimizar a legibilidade de dados acadêmicos complexos:

- **Títulos de Marca e Telas (Brand):** **Source Serif 4** (serifada, elegante e institucional), aplicada nas saudações e títulos principais (H1: 32px, Bold).
- **Textos de Interface, Botões e Filtros:** **Inter / Roboto** (sans-serif, moderna e altamente legível), aplicada em títulos de seção (H2: 24px), subtítulos (H3: 18px), e texto corrido (14px/16px).
- **Valores Numéricos, Notas e Frequências:** **JetBrains Mono** (mono-espaçada), garantindo que números fiquem perfeitamente alinhados verticalmente nas tabelas e no calendário de assiduidade.
- **Escala de Hierarquia:**
  - **H1 (Título de Tela):** 32px, Bold, Cor `#1A2332` (Source Serif 4)
  - **H2 (Seções):** 24px, Bold, Cor `#1A2332` (Inter / Roboto)
  - **H3 (Subseções/Grupos):** 18px, Semi-Bold, Cor `#717182` (Inter / Roboto)
  - **Corpo e Tabelas:** 14px ou 16px, Regular, Cor `#1A2332` (Inter / Roboto / JetBrains Mono)
  - **Labels e Legendas:** 12px, Medium/Bold, Cor `#6B7A8D` (Inter / Roboto)

### 3.2 Paleta de Cores (Tema Shadcn & Semântica do Protótipo)

A paleta de cores foi refinada para satisfazer a conformidade WCAG de contraste mínimo, abandonando a paleta puramente cinza e adotando tons modernos de azul e cores semânticas de status:

- **Header Global (Navegação):** `#1B4F8A` (Azul Médio Escolar, contraste superior a 7:1)
- **Barra de Acessibilidade:** `#1A2332` (Azul Escuro Profundo)
- **Fundo de Tela (Background):** `#ffffff` (Branco puro)
- **Textos Principais (Foreground):** `#1A2332` / `oklch(0.145 0 0)` (Cinza Escuro Neutro)
- **Elementos Neutros / Muted:** `#ececf0` / `#EEF2F7` (Cinza claro para fundos de tabelas, inputs e legendas)
- **Bordas e Contornos de Inputs:** `#6B7A8D` (Cinza médio, garantindo contraste mínimo de 4:1 com o fundo branco)
- **Ações Primárias / Destaques:** `#1B4F8A` (Azul com texto branco)
- **Ações Secundárias / Neutras:** `#EEF2F7` (Fundo cinza claro com texto `#1A2332`)
- **Cores Semânticas de Rendimento (Tripla Codificação):**
  - **Aprovado (Sucesso):** `#1B6B3A` (Verde escuro de alta legibilidade, acompanhado de ícone de check `✓`)
  - **Recuperação (Atenção):** `#8F4300` / `#7D4E00` (Laranja/Castanho queimado, acompanhado de ícone de alerta `⚠️`)
  - **Reprovado / Alerta Crítico (Erro):** `#C0392B` / `#d4183d` (Vermelho escuro, acompanhado de ícone de fechar `✕`)

### 3.3 Espaçamentos e Grid

- **Grid Interno:** Múltiplos de 8px (padrão de espaçamento de 16px para padding e gutters).
- **Margens Globais:** 40px em Desktop (resolução 1920x1080) e breakpoints responsivos de 16px em dispositivos Mobile.

---

## 4. Análise Crítica de Usabilidade (10 Heurísticas de Nielsen)

As 10 heurísticas de usabilidade foram aplicadas de maneira explícita no design de alta fidelidade:

1. **Visibilidade do Estado do Sistema:** Cards de resumo, badges de status de leitura (Tela 5) e feedbacks de carregamento mantêm o usuário informado sobre as ações em execução.
2. **Compatibilidade com o Mundo Real:** Terminologias escolares conhecidas (média ponderada, boletim, faltas justificadas) em vez de códigos de banco de dados.
3. **Controle e Liberdade do Usuário:** Possibilidade de voltar à tela anterior ("⬅️ Voltar ao Painel"), expandir/colapsar avisos e fechar widgets de alertas manualmente.
4. **Consistência e Padronização:** Header fixo persistente, barra de acessibilidade unificada e mesmo padrão visual de badges em todo o sistema.
5. **Prevenção de Erros:** Na Área do Docente (Tela 6), os campos numéricos limitam a digitação a notas válidas (0.0 a 10.0) e há um modal de confirmação obrigatório antes de publicar as notas permanentemente.
6. **Reconhecimento em vez de Recall:** Legendas estáticas nas tabelas e no rodapé do calendário de frequência (Tela 4), além da exibição explícita das fórmulas matemáticas das médias.
7. **Flexibilidade e Eficiência de Uso:** Atalhos rápidos no Dashboard para usuários frequentes e botões de exportação (PDF, Imprimir) direto no boletim.
8. **Estética e Design Minimalista:** Uso inteligente do espaço em branco, limitando elementos na tela para reduzir a carga cognitiva (Lei de Miller).
9. **Diagnóstico e Recuperação de Erros:** Bordas de inputs na cor vermelha (`--destructive`) com mensagens em texto explicando a causa do erro na validação de notas na Tela 6.
10. **Ajuda e Documentação:** Módulo de suporte planejado e legendas de regras de aprovação integradas na própria interface escolar.

---

## 5. Acessibilidade Web (WCAG 2.1 AA)

A acessibilidade é pilar central de desenvolvimento do TrAcEs e está codificada na raiz de sua interface em conformidade com as diretrizes da WCAG 2.1 AA:

### 5.1 Barra de Acessibilidade (Navegação Global)

- **Links de Salto (Skip Links):** Atalhos colocados no topo absoluto para permitir que usuários de leitores de tela e navegação por teclado saltem a navegação repetitiva. Os skip links direcionam para:
  - Ir para o conteúdo (`#main-content`)
  - Ir para o menu (`#main-nav`)
  - Ir para o rodapé (`#footer`)
- **Alto Contraste Dinâmico:** Um controle acessível de clique (`highContrast`) altera os temas visuais instantaneamente:
  - A barra de acessibilidade muda do fundo azul-escuro `#1A2332` para preto absoluto (`bg-black text-yellow-300`).
  - O header principal passa do azul escolar `#1B4F8A` para preto absoluto com borda amarela destacada (`bg-black border-b-2 border-yellow-400`).
- **Magnificação Dinâmica da Fonte:** Controle de tamanho de fonte baseado em rem/percentual aplicado diretamente no elemento raiz (`html`), com limitadores de segurança (mínimo de `80%` e máximo de `140%`) para evitar a quebra do layout ou transbordamento de texto:
  - **A+** (Aumenta o tamanho da fonte em +10%)
  - **A-** (Diminui o tamanho da fonte em -10%)
  - **A** (Restaura o tamanho padrão de 100%)

### 5.2 Relações de Contraste Otimizadas (WCAG 1.4.3 & 1.4.11)

- **Contraste de Texto de Navegação:** Texto branco (`#ffffff`) sobre fundo azul do header (`#1B4F8A`), proporcionando um contraste de **8.3:1** (superando com folga a meta WCAG AAA de 7:1).
- **Contraste da Identidade (Logo):** Elementos em branco/90 sobre fundo `#1B4F8A`, atingindo uma proporção de contraste de **7.5:1** (nível AAA).
- **Contraste em Componentes de Formulário (SelectField):**
  - Os rótulos (`labels`) utilizam a cor `#1A2332` para legibilidade extrema em tamanhos pequenos (contraste > 7:1).
  - O contorno/borda do seletor foi definido como `#6B7A8D` sobre fundo branco, garantindo contraste de **4.0:1** (WCAG 1.4.11 exige contraste mínimo de 3:1 para limites de componentes de interface; o antigo cinza `#C8D5E8` de 1.5:1 foi reprovado).

### 5.3 Codificação Tripla de Informação (Status Acadêmicos - WCAG 1.4.1)

Para garantir que daltônicos (protanopia, deuteranopia, tritanopia) ou pessoas com baixa visão compreendam os dados sem depender unicamente da percepção das cores, os badges de status de rendimento e alertas usam **cor, ícones do Lucide e rótulo de texto explicativo**:

- **Aprovado:** Texto verde escuro `#1B6B3A` + Ícone check `✓` + Nota visível ou rótulo textual "Aprovado".
- **Recuperação:** Texto castanho/laranja `#8F4300` ou `#7D4E00` + Ícone triângulo de alerta `⚠️` + Nota visível ou rótulo textual "Recuperação".
- **Reprovado:** Texto vermelho `#C0392B` + Ícone X `✕` + Nota visível ou rótulo textual "Reprovado".
- **Sem Nota Lançada:** Texto cinza escuro `#4A5568` + Símbolo traço `—` + Rótulo textual "Sem nota lançada".

---

## 6. Componente Extensionista e Utilidade Social

O projeto foi validado para implementação em cenários práticos da comunidade, incluindo:

- **Escolas Comunitárias e de Pequeno Porte:** Democratizando a gestão acadêmica digital em infraestruturas locais com computadores simples e internet de banda estreita.
- **ONGs e Projetos Sociais:** Auxiliando no controle de frequência de alunos beneficiados e prestação de contas robusta a financiadores.
- **Capacitação Corporativa:** Servindo de controle de progressão de competências e treinamentos internos.
