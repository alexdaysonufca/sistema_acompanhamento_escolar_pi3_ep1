# Prototipagem de Wireframe - Painel de Acompanhamento Escolar

**Versão:** 1.0  
**Data:** 08/03/2026  
**Status:** MVP - Entregável Parcial 3 (EP3)  
**Estudantes:** Antonio Alex Dayson Tomaz e Maria Alexsandra Tomaz

---

## 📋 Índice

1. [Visão Geral do MVP](#visão-geral)
2. [Telas do Sistema](#telas-do-sistema)
   - [1. Dashboard (Visão Geral e Alertas)](#tela-1-dashboard)
   - [2. Boletim Escolar (Resumo de todas as disciplinas)](#tela-2-boletim)
   - [3. Notas Detalhadas (Por avaliação e professor)](#tela-3-notas)
   - [4. Frequência](#tela-4-frequência)
   - [5. Avisos e Comunicados](#tela-5-avisos)
3. [Componentes Reutilizáveis](#componentes-reutilizáveis)
4. [Análise Crítica de Usabilidade](#análise-crítica-ux)
5. [Acessibilidade (WCAG 2.1)](#acessibilidade)

---

## <a name="visão-geral"></a>1. Visão Geral do MVP

### Objetivo do Sistema
Criar um painel intuitivo para que **pais e responsáveis** acompanhem o desempenho acadêmico de seus filhos em tempo real, incluindo:
- ✅ Visualização de notas e médias
- ✅ Controle de frequência
- ✅ Recebimento de avisos da escola
- ✅ Geração automática de boletins

### Público-alvo
- **Pais/Mães/Responsáveis** com diversos níveis de letramento digital
- **Faixa etária:** 25-70 anos
- **Dispositivos:** Desktop (80%), Mobile (20%)
- **Acessibilidade:** Devem ser capazes de usar mesmo com deficiências visuais, auditivas ou motoras

### Princípios de Design
1. **Simplicidade:** Linguagem clara, sem jargão técnico
2. **Hierarquia:** Informações críticas em primeiro plano
3. **Acessibilidade:** Contraste, tamanhos de fonte, navegação por teclado
4. **Consistência:** Design pattern repetido em todas as telas

---

## <a name="telas-do-sistema"></a>2. Telas do Sistema

### <a name="tela-1-dashboard"></a>TELA 1: Dashboard (Visão Geral e Alertas)

#### Descrição
Tela principal após login. Mostra **resumo dos filhos matriculados**, **alertas críticos**, e **atalhos** para as seções principais.

#### Wireframe
![Dashboard](assets/Wireframe - Painel escolar - Tela 1.png)

#### Componentes

| Componente | Descrição |
|-----------|-----------|
| **Header** | Logo, Menu hamburger, Notificações, Perfil, Logout |
| **Saudação** | "Olá, [Nome]!" com ícone |
| **Caixa de Alertas** | Card destacado com ícones de alertas críticos (⚠️) |
| **Cards de Filhos** | Grid 1-3 colunas com foto, nome, turma, média, faltas |
| **Menu Rápido** | 5 ícones com links para seções principais |
| **Rodapé** | Informações da escola, links úteis |

#### Dados Exibidos
```
Para cada filho:
├── Nome completo
├── Série e turma
├── Média atual com símbolos de status (✓ >=6, ⚠️ 4-6, ❌ <4)
├── Número de faltas
├── Status de boletim (Completo/Incompleto)
└── Botão "Ver Detalhes"
```

#### Acessibilidade
- 🔊 Usar landmarks HTML5 (`<main>`, `<nav>`, `<aside>`)
- 🎨 Status visual com cor + ícone (não apenas cor)
- ⌨️ Todos os cards focáveis com Enter
- 📱 Responsivo: 1 coluna em mobile, 2-3 em desktop

---

### <a name="tela-2-boletim"></a>TELA 2: Boletim Escolar (Resumo de todas as disciplinas)

#### Descrição
Visão detalhada de todas as **avaliações** de um aluno, com **cálculos de média ponderada** por disciplina e bimestre.

#### Wireframe
![Boletim Escolar](assets/Wireframe - Painel escolar - Tela 2.png)

#### Componentes

| Componente | Descrição |
|-----------|-----------|
| **Filtros** | Dropdown disciplina, bimestre, buscador de avaliação |
| **Cabeçalho** | Nome, ano letivo |
| **Card por Disciplina** | Agrupa por disciplina + professor |
| **Seção por Bimestre** | Tabela com avaliações do bimestre |
| **Tabela** | Avaliação, tipo, peso, nota, status |
| **Média Ponderada** | Cálculo visível e fórmula educativa |
| **Botões de Ação** | Imprimir, PDF, Email |

#### Dados Mostrados

```
Para cada avaliação:
├── Título
├── Tipo (Prova, Trabalho, Seminário, etc)
├── Peso (ex: 3, 1, etc)
├── Nota obtida (0-10)
├── Status (✅ Aprovado, ⚠️ Atenção, ❌ Reprovado)
└── Data

Cálculo: Média = Σ(nota × peso) / Σ(peso)
```

#### Acessibilidade
- 📊 Tabelas com `<caption>` explicativo
- 🎨 Símbolos de status
- 📱 Tabelas scrolláveis em mobile
- 👁️ Fórmulas em linguagem clara

---

### <a name="tela-3-notas"></a>TELA 3: Notas Detalhadas (Por avaliação e professor)

#### Descrição
Visão completa e resumida do desempenho de um aluno. Mostra **médias bimestrais**, **frequência atual**, e **próximos eventos**.

#### Wireframe
![Notas Detalhadas](assets/Wireframe - Painel escolar - Tela 3.png)

#### Componentes

| Componente | Descrição |
|-----------|-----------|
| **Header com Dados** | Nome, série, turma, matrícula |
| **Card Resumo** | Média geral, frequência, situação |
| **Seletor de Disciplinas** | Abas/tabs para trocar entre disciplinas |
| **Tabela de Notas** | 1º-4º bimestres, média, símbolos de status |
| **Link Detalhes** | Acesso às avaliações específicas |
| **Eventos** | Lista de próximas provas/trabalhos |
| **Ações Rápidas** | Botões para outras seções |

#### Validações
- ✅ Mostrar apenas disciplinas do aluno
- ✅ Cálculos de média devem coincidir com backend
- ✅ Símbolos de status: ✓ (>=6), ⚠️ (4-6), ❌ (<4)

#### Acessibilidade
- 🔊 Tabs acessíveis (ARIA-selected)
- 📊 Tabelas com header (`<th>`) e labels
- 👓 Texto mínimo 12px em tabelas

---

### <a name="tela-4-frequência"></a>TELA 4: Frequência

#### Descrição
Histórico de presenças e faltas do aluno, com calendário visual e possibilidade de visualizar **justificativas de falta**.

#### Wireframe
![Frequência](assets/Wireframe - Painel escolar - Tela 4.png)

#### Componentes

| Componente | Descrição |
|-----------|-----------|
| **Resumo** | Total presentes/faltas, %, limite mínimo, aviso se crítico |
| **Calendário** | Visual em grid com dia da semana e mês |
| **Status do Dia** | [P] Presente, [F] Falta, [F]* Justificada, [-] Sem aula |
| **Justificativas** | Lista de faltas justificadas com datas e motivos |
| **Botões** | Solicitar justificativa, imprimir extrato |

#### Validações
- ✅ Percentual deve ser: (presentes / total_aulas) × 100
- ✅ Alertar se % < 75% (risco de reprovação)
- ✅ Mostrar apenas dias letivos

#### Acessibilidade
- 🔊 Calendário acessível com ARIA roles
- ⌨️ Navegação por setas entre datas
- 👓 Ícones + texto (não apenas símbolos)
- 📱 Mobile: versão em lista ao invés de grid

---

### <a name="tela-5-avisos"></a>TELA 5: Avisos e Comunicados

#### Descrição
Central de comunicação entre **escola e responsáveis**. Exibe avisos, circulares e mensagens importantes.

#### Wireframe
![Avisos e Comunicados](assets/Wireframe - Painel escolar - Tela 5.png)

#### Componentes

| Componente | Descrição |
|-----------|-----------|
| **Badge de Notificações** | Numero de mensagens não lidas (ex: 🔔(3)) |
| **Filtros** | Por tipo, data, status (lido/não lido) |
| **Seção "Não Lidos"** | Cards com borda destacada e ícone de alerta |
| **Card de Aviso** | Ícone de tipo, remetente, preview, botões de ação |
| **Seção "Lidos"** | Colapsável/expandível com sumário |
| **Botões** | Ler completo, Marcar como lido, Deletar |
| **Notificações Email** | Checkbox para permitir notificações |

#### Dados Mostrados

```
Para cada aviso:
├── Tipo (Importante, Aviso, Informativo, etc)
├── Remetente (Direção, Pedagógico, etc)
├── Título
├── Preview (primeira 100 caracteres)
├── Data e hora
├── Status (Lido/Não lido)
└── Anexos (se houver)
```

#### Acessibilidade
- 🔔 Notificação sonora opcional para novos avisos
- 🎨 Badge com número ALÉM de ícone (acessível)
- 👁️ Seções expandíveis com setas ARIA
- 📱 Lista única em mobile

---

## <a name="componentes-reutilizáveis"></a>3. Componentes Reutilizáveis (Design System)

### 3.1 Tipografia

```
Título Principal (H1): 32px, Bold, Cinza escuro (#333333)
Título Secundário (H2): 24px, Bold, Cinza escuro
Título Terciário (H3): 18px, Bold, Cinza escuro (#333)
Corpo de Texto: 14px, Regular, Cinza escuro (#555)
Label: 12px, Medium, Cinza escuro
Pequeno/Helper: 11px, Regular, Cinza médio (#999)
```

### 3.2 Cores

| Uso | Cor | Código |
|-----|-----|--------|
| **Primária** | Cinza escuro | #333333 |
| **Secundária** | Cinza médio | #666666 |
| **Aviso** | Cinza claro | #999999 |
| **Erro** | Preto | #000000 |
| **Sucesso** | Branco | #ffffff |
| **Background** | Branco/Cinza claro | #f5f5f5 |
| **Texto** | Cinza escuro | #333333 |

Paleta estritamente Monocromática (Tons de Cinza, Preto e Branco), focando na arquitetura da informação e não na estética.

### 3.3 Espaçamento

```
Gutter (padding interno): 16px
Espaço entre elementos: 8px, 16px, 24px
Espaço entre seções: 32px ou 48px
Margem das páginas: 20px (mobile), 40px (desktop)
```

---

## <a name="análise-crítica-ux"></a>4. Análise Crítica de Usabilidade

### 4.1 Consistência

✅ **O que foi feito:**
- Mesmo header em todas as páginas (logo, menu, notificações, perfil, logout)
- Navegação breadcrumb presente em sub-páginas
- Uso de símbolos de status (✓ e ⚠️) consistentes
- Tipografia uniforme

⚠️ **Pontos a melhorar:**
- Todos os botões devem seguir padrão (primário/secundário/terciário)
- Formulários devem ter height mínimo para input (44px em mobile para touch)

### 4.2 Usabilidade Identificada

✅ **Progressive Disclosure:** Mostrar essencial, detalhes sob demanda
✅ **Feedback Imediato:** Erros e sucessos visíveis
✅ **Affordance:** Buttons parecem clicáveis, ícones com labels
✅ **Segurança:** Confirmações para ações destrutivas
✅ **Símbolos Textuais Universais:** Substituição do uso exclusivo de cores (que prejudica daltônicos) por símbolos como [ ✓ ] para aprovado e [ ⚠️ ] para alerta nas notas

⚠️ **Desafios:**
- Público heterogêneo com diferentes níveis digitais
- Dados sensíveis de menores exigem cuidado especial
- Equilíbrio entre funcionalidade e simplicidade

---

## <a name="acessibilidade"></a>5. Acessibilidade (WCAG 2.1)

### 5.1 Conformidade Implementada

| Critério | Implementação |
|----------|-----------------|
| **1.4.3 Contraste (AA)** | Mínimo 4.5:1 para texto normal |
| **2.1.1 Teclado** | Para a etapa de desenvolvimento, projetamos a interface prevendo a navegação via teclado (ordem lógica de Tab) |
| **2.1.2 Sem Armadilha** | Focus sempre visível |
| **2.4.7 Foco Visível** | Outline 2px quando focado |
| **3.3.1 Identificação de Erro** | Mensagens claras (texto + símbolos + ícone) |
| **4.1.2 Nome, Role, Valor** | Buttons/campos têm labels e roles |

Foi implementada uma barra de acessibilidade no topo absoluto de todas as telas contendo 'Skip Links' (Ir para conteúdo, Ir para menu), ajuste de fonte (A+, A-) e opção de Alto Contraste, garantindo navegação fluida por teclado e adequação para usuários com baixa visão.

### 5.2 Deficiências Consideradas

- 🔊 **Cegueira:** Leitores de tela, alt text, ARIA labels
- 👁️ **Baixa visão:** Contraste 4.5:1, zoom até 200%
- 🖱️ **Física:** Elementos 44x44px, teclado navigation
- 🧠 **Intelectual:** Linguagem clara, sem jargão

---

**Versão:** 1.0  
**Data:** 08/03/2026  
**Status:** ✅ Pronto para desenvolvimento
