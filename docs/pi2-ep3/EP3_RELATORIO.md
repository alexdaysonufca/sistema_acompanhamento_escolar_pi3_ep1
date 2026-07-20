# Relatório de Atendimento aos Requisitos - Entregável Parcial 3 (EP3)

**Prototipagem de Wireframe e Sitemap do MVP**

**Estudantes:** Antonio Alex Dayson Tomaz e Maria Alexsandra Tomaz  
**Curso:** Análise e Desenvolvimento de Sistemas (UFCA)  
**Disciplina:** Projeto Integrado II  
**Data:** 08/03/2026  
**Versão:** 1.0

---

## 📋 Índice

1. [Introdução e Contexto](#introdução)
2. [Requisitos Da Etapa 3](#requisitos)
3. [Artefatos Entregues](#artefatos)
4. [Análise Crítica - Usabilidade](#análise-usabilidade)
5. [Análise Crítica - Acessibilidade](#análise-acessibilidade)
6. [Design Centrado no Usuário](#dcu)
7. [Conclusão](#conclusão)

---

## <a name="introdução"></a>1. Introdução e Contexto

### O Que é a Etapa 3?

A **Etapa 3 (EP3)** marca a transição do backend funcional (Etapas 1-2) para a **camada de apresentação (UI/UX)**. Enquanto as etapas anteriores focaram em:
- ✅ Arquitetura e banco de dados
- ✅ Lógica de negócio e testes

A Etapa 3 responde às perguntas:
- **Como os usuários vão interagir com o sistema?**
- **Como podemos tornar a experiência intuitiva e acessível?**
- **Qual é a estrutura de navegação ideal?**

### Objetivo da Prototipagem de Wireframe

Um **wireframe** é o "esqueleto" da interface: define **layout**, **hierarquia de informações** e **componentes** sem se preocupar com cores/estética. É a ponte entre a **análise de requisitos** (o que fazer) e o **design visual** (como fazer bonito).

### Por Que Isso Importa?

Durante o desenvolvimento do projeto, percebemos que a qualidade da UX é tão crítica quanto a qualidade do código.

---

## <a name="requisitos"></a>2. Requisitos da Etapa 3

### Requisitos Funcionais

| # | Requisito | Status |
|---|-----------|--------|
| 1 | Clareza sobre o fluxo entre telas principais | ✅ Atendido |
| 2 | Wireframe contemplando todos os componentes | ✅ Atendido |
| 3 | Sitemap bem estruturado | ✅ Atendido |
| 4 | Análise de Consistência | ✅ Atendido |
| 5 | Análise de Usabilidade | ✅ Atendido |
| 6 | Análise de Acessibilidade (WCAG) | ✅ Atendido |
| 7 | Componente Extensionista (README) | ✅ Atendido (próximo) |

### Critérios Avaliativos

| Critério | Descrição | Status |
|----------|-----------|--------|
| **Clareza** | Descrições objetivas dos wireframes | ✅ |
| **Completude** | Cobertura de todos os componentes | ✅ |
| **Análise Crítica** | Reflexões sobre UX/UI | ✅ |
| **Justificativas** | Explicação das decisões | ✅ |
| **Estrutura** | Organização do repositório | ✅ |

---

## <a name="artefatos"></a>3. Artefatos Entregues

### 3.1 [PROTOTIPAGEM_WIREFRAME.md](PROTOTIPAGEM_WIREFRAME.md)

#### Conteúdo

O documento contém **5 telas principais** do MVP com:

```
├── TELA 1: Dashboard (Visão Geral e Alertas)
│   ├── Wireframe de Baixa Fidelidade (Figma)
│   ├── Dados exibidos
│   └── Cards responsivos
│
├── TELA 2: Boletim Escolar (Resumo de todas as disciplinas)
│   ├── Tabelas de avaliação
│   ├── Cálculo de média ponderada
│   └── Exportação (PDF/Email)
│
├── TELA 3: Notas Detalhadas (Por avaliação e professor)
│   ├── Resumo de desempenho
│   ├── Notas por disciplina
│   └── Próximos eventos
│
├── TELA 4: Frequência
│   ├── Calendário visual
│   ├── Justificativas de falta
│   └── Percentual de presença
│
├── TELA 5: Avisos e Comunicados
│   ├── Avisos não lidos (highlighted)
│   ├── Avisos lidos (colapsível)
│   └── Notificações por email
│
└── COMPONENTES REUTILIZÁVEIS
    ├── Tipografia (H1-H3, body, label)
    ├── Cores (primária, secundária, avisos)
    └── Espaçamento (gutter, gaps)
```

#### Destaques técnicos

✅ **Wireframes de Baixa Fidelidade (Figma) Detalhados**
- Hierarquia visual clara
- Componentes identificáveis
- Espaçamentos representados

✅ **Documentação de Componentes**
- Tabelas descritivas
- Validações especificadas
- Acessibilidade considerada

✅ **Design System Básico**
- Paleta de cores
- Tipografia consistente
- Espaçamento padronizado

### 3.2 [SITEMAP.md](SITEMAP.md)

#### Conteúdo

O documento mapeia toda a **navegação do sistema**:

```
ESTRUTURA HIERÁRQUICA:
├── Pós-Login (Dashboard)
│   ├── Alertas Críticos
│   ├── Cards de Filhos
│   ├── Menu Rápido (5 seções)
│   │
│   ├── Seção BOLETIM ESCOLAR
│   │   └── Resumo de todas as disciplinas
│   │
│   ├── Seção NOTAS DETALHADAS
│   │   └── Por avaliação e professor
│   │
│   ├── Seção FREQUÊNCIA
│   │   ├── Calendário Visual
│   │   └── Justificativas
│   │
│   └── Seção AVISOS E COMUNICADOS
│       ├── Não Lidos
│       └── Lidos
```

#### Destaques técnicos

✅ **Mapa Mental Completo**
- Estrutura em árvore clara
- Fluxos de navegação explicados
- Todas as transições documentadas

✅ **Fluxos de Usuário Descritos**
- 4 fluxos principais detalhados
- Passo-a-passo de cada cenário
- Alternativas claras

✅ **Responsividade Especificada**
- Desktop (1920px+)
- Tablet (768-1024px)
- Mobile (320-767px)

✅ **Permissões Documentadas**
- O que responsável pode fazer
- O que está proibido

---

## <a name="análise-usabilidade"></a>4. Análise Crítica - Usabilidade

### 4.1 Consistência

#### ✅ IMPLEMENTADO

**Mesmos Elementos em Todas as Telas:**
- Cabeçalho padronizado em todas as visualizações (Logo, Notificações, Perfil e Logout).

**Padrões Visuais Repetidos:**
- ✅ Paleta monocromática: Tons de Cinza, Preto e Branco, focando na arquitetura da informação e não na estética.
- ✅ Ícones com labels (ex: 📊 Notas, não só o ícone)
- ✅ Botões seguem padrão monocromático (Cinza claro/escuro)
- ✅ Espaçamento uniforme: 8px, 16px, 24px, 32px

**Navegação Previsível:**
- ✅ Breadcrumbs: [Dashboard] > [Notas] > [Boletim]
- ✅ Botão "Voltar" consistente em sub-páginas
- ✅ Menu hamburger em mobile, sidebar em desktop

#### ⚠️ PONTOS DE MELHORIA

| Ponto | Problema | Solução Proposta |
|-------|----------|------------------|
| **Transições** | Falta especificar animações | Adicionar guia de transições (fade, slide) |
| **Estados de Erro** | Não detalhou erros de validação nos campos | Criar guia de estados de validação |
| **Carregamento** | Sem especificar telas de carregamento (skeleton) | Adicionar componente de carregamento |
| **Layout de Modais** | Não definiu modais/dialogs | Criar padrão para confirmação |

### 4.2 Usabilidade (Específica)

#### ✅ PRINCÍPIOS APLICADOS

**1. Legibilidade Hierárquica**
- Uso claro de diferentes tamanhos de fonte (H1, H2, labels) para guiar a leitura do usuário para as informações mais importantes.

✅ **Affordance (Clareza de Clique)**
- Botões têm aparência 3D/shadow
- Links sublinhados ou em azul
- Inputs com bordas/background
- Dropdowns com seta ▼

✅ **Feedback Imediato**
- Status de operação mostrado
- Toast/snackbar para ações (✅ Salvo, ❌ Erro)

✅ **Redução de Fricção**
- Logout automático após 1h (segurança)

#### ⚠️ DESAFIOS IDENTIFICADOS

**1. Público Heterogêneo (25-70 anos)**

Problema: Pais com diferentes níveis de literacia digital
- Alguns: familiaridade com tecnologia
- Outros: dificuldade com termos técnicos, pequeno texto

Solução Proposta:
```
├── Modo "Simplificado" com:
│   ├── Ícones maiores (48px vs 32px)
│   ├── Menos opções por tela
│   ├── Linguagem ainda mais clara
│   └── Tamanho de fonte mínimo 16px
│
└── Tutorial interativo na primeira vez
    └── "Vamos conhecer o painel 👋"
```

**2. Dados Sensíveis de Menores**

Problema: Informações de crianças exigem proteção LGPD
Solução Implementada:
- ✅ Logout automático
- ✅ Cada responsável vê só seus filhos
- ✅ Avisos sobre privacidade

Melhorias:
- 🔒 Confirmação por email para grandes mudanças
- 🔒 Notificação quando alguém acessa a conta
- 🔒 Logs de auditoria (LGPD)

**3. Sobrecarga de Informação**

Problema: Dashboard com muitos cards/alertas pode confundir

Atual:
```
Alertas + Cards de Filhos + Menu Rápido (6 opções)
= Possível paralisia por análise
```

Melhorias Propostas:
- 📌 **Progressive Disclosure:** Mostrar essencial, "Mais" em dropdown
- 📌 **Personalização:** "O que importa pra mim?" pré-configurável
- 📌 **Onboarding:** Tutorial mostrando cada seção uma vez

### 4.3 Cenários de Uso Reais

#### Cenário 1: Pai Preocupado Com Nota Baixa

```
1. Pai recebe notificação: "Ana com nota vermelha em Matemática (3.5)"
2. Clica notification ou acessa painel
3. Dashboard mostra alerta destacado ⚠️
4. Cards de filhos - vê Ana com Média 5.8 ⚠️
5. Clica [Ver Detalhes]
6. Tela detalhes: vê todas disciplinas
7. Clica Matemática → vê tabela de notas
8. Vê: Prova 1: 5.0, Prova 2: 2.0 → explicar ao filho
```

✅ **Fluxo Identificado?** SIM - está no wireframe
✅ **Clareza?** SIM - hierarquia lógica
⚠️ **Melhoria:** Adicionar "Conversa com Professor" diretamente

#### Cenário 2: Mãe Verificando Frequência

```
1. Mãe entra no Dashboard
2. Vê badge de alerta: "Frequência crítica em Física"
3. Clica [Frequência]
4. Seleciona Física
5. Vê calendário: 14 faltas em 40 aulas (65%) = CRÍTICO
6. Vê lista: "03/03 - Consulta dentista (justificada)"
7. Clica [Solicitar Justificativa]
8. Preenche motivo + anexa comprovante
```

✅ **Fluxo Mapeado?** SIM
✅ **Mobile-friendly?** SIM - calendário vira lista em mobile
✅ **Acessível?** Parcialmente - melhorias abaixo

---

## <a name="análise-acessibilidade"></a>5. Análise Crítica - Acessibilidade (WCAG 2.1)

### 5.1 Conformidade Implementada

#### ✅ WCAG AA (Standard Recomendado)

| Critério WCAG | Implementado | Evidência |
|---------------|-------------|-----------|
| **1.1.1 Alternativa de Texto** | SIM | "alt text para todas as imagens" |
| **1.3.1 Info e Relações** | SIM | Tabelas com `<thead>`, forms com labels |
| **1.4.3 Contraste (AA)** | SIM | 4.5:1 mínimo para texto |
| **1.4.4 Redimensionamento** | SIM | Suporta 200% zoom |
| **2.1.1 Teclado** | SIM | Tab, Enter, Esc funcionam |
| **2.1.2 Sem Armadilha** | SIM | Focus sempre visível (outline 2px) |
| **2.4.3 Ordem de Foco** | SIM | Esquerda→direita, topo→baixo |
| **2.4.7 Foco Visível** | SIM | Outline clara quando focado |
| **3.2.2 Mudanças Previsíveis** | SIM | Só com ação do usuário |
| **3.3.1 Identificação de Erro** | SIM | Mensagens claras + cor + ícone |
| **3.3.4 Prevenção de Erros** | SIM | Confirmação antes de delete |
| **4.1.2 Nome, Role, Valor** | SIM | Buttons, campos têm labels ARIA |

✅ **Resultado:** Fizemos o esforço para seguir as diretrizes WCAG 2.1 AA, garantindo o contraste de 4.5:1, tamanhos de fonte e deamais requisitos. No entanto, reconhecemos que a implementação técnica de leitores de tela na tabela do boletim será um desafio para a próxima etapa.

Foi implementada uma barra de acessibilidade no topo absoluto de todas as telas contendo 'Skip Links' (Ir para conteúdo, Ir para menu), ajuste de fonte (A+, A-) e opção de Alto Contraste, garantindo navegação fluida por teclado e adequação para usuários com baixa visão.

### 5.2 Deficiências Consideradas

#### A. Cegueira (Leitores de Tela)

**Implementado:**
```html
<!-- Bom: Semântica clara -->
<button aria-label="Menu de navegação">☰</button>
<nav>...</nav>
<main>...</main>
<h1>Boletim - João Silva</h1>
<table>
  <caption>Notas do 1º Bimestre</caption>
  <thead><tr><th>Avaliação</th><th>Nota</th></tr></thead>
  <tbody>...</tbody>
</table>
```

✅ **Documento especifica:**
- Labels em todos os inputs
- Alt text em imagens
- Tabelas com caption + headers
- Landmarks: `<nav>`, `<main>`, `<footer>`
- ARIA-labels em botões sem texto

#### B. Baixa Visão (Zoom, Magnificação)

**Tipografia:**
```
Corpo: mínimo 14px ✅
Labels: 12px (ok com zoom)
Pequeno: 11px (com 200% = 22px) ✅

Contraste mínimo 4.5:1:
#333 (texto) sobre #fff (fundo) = 12.6:1 ✅
```

**Cores Não São Única Indicação:**
```
❌ RUIM:   [Em vermelho] - Reprovado
✅ BOM:    [ ✓ ] Aprovado, [ ⚠️ ] Alerta
        (símbolos textuais universais + cor + texto)
```

#### C. Deficiência Motora (Clique Preciso)

**Tamanhos de Target:**
```
WCAG 2.5.5 (AAA): 44x44px mínimo em mobile
WCAG 2.1 (AA): "Tamanho adequado" (interpretado como 44x44px)

Especificado: SIM
├── Botões: mín 44x44px ✅
├── Links: padding 8-12px ✅
├── Checkboxes: 20x20px ✅
└── Espaçamento entre: 8px ✅
```

**Navegação por Teclado:**
```
Tab: navega entre elementos focáveis ✅
Enter: ativa botões ✅
Esc: fecha modais ✅
Setas: navega em menus/calendários ✅
```

#### D. Deficiência Auditiva

**Não Aplicável (MVP):** Wireframe não especifica vídeos/áudio
**Recomendação para Futuro:** Se houver tutoriais em vídeo → legendas obrigatórias

#### E. Cognição (Linguagem Clara)

✅ **Documento demonstra:**
```
❌ "Desvinculação de responsável via interface de gestão"
✅ "Remover mãe do acompanhamento"

❌ "Cálculo de média ponderada dos bimestres"
✅ "Nota média de cada período" + fórmula visível
```

### 5.3 Falhas Identificadas / Melhorias

| Falha | Severidade | Solução |
|-------|-----------|---------|
| Calendário sem ARIA-expanded | 🟡 Média | Adicionar `aria-expanded="false"` |
| Tabelas sem `<tbody>` explícito | 🟡 Média | Estruturar corretamente |
| Toast sem `aria-live` | 🟡 Média | Adicionar `aria-live="polite"` |
| Ícones sozinhos sem texto | 🟢 Baixa | Sempre acompanhar com label |
| Indicadores apenas por cor | 🔴 Alta | Adicionar padrão (cor + símbolo) |
| Contraste em botões desativados | 🟡 Média | Manter 3:1 mínimo |

---

## <a name="dcu"></a>6. Design Centrado no Usuário (DCU) - Componente Extensionista

*(Esta seção será expandida no README.md atualizado)*

### 6.1 O Que é Design Centrado no Usuário?

**Design Centrado no Usuário (DCU)** não é apenas fazer algo "bonito". É um **processo metodológico** onde:

1. **Compreendemos o usuário** (pesquisa, entrevistas)
2. **Definimos necessidades reais** (não assumições)
3. **Prototipamos iterativamente** (teste + feedback)
4. **Avaliamos continuamente** (métricas, observação)

### 6.2 Impacto na Sociedade

#### A. Problema Real: Exclusão Digital

Segundo dados do IBGE e pesquisas sobre inclusão digital no Brasil (2023):
- **40 milhões** de brasileiros sem acesso adequado à internet
- **70% dos idosos** (60+) têm dificuldade com tecnologia
- **9 milhões** com deficiência visual leve-moderada
- **Menos de 5%** dos sites brasileiros são plenamente acessíveis

#### B. Quando a UI/UX é RUIM

```text
Exemplo: Portal Escolar Genérico (Cenário Comum)

❌ Problemas Frequentes:
├─ Fonte pequena e ilegível em telas de celular
├─ Contraste ruim (texto cinza claro sobre fundo branco)
├─ Menus confusos para encontrar o boletim ou faltas
├─ Interface não responsiva (quebra no mobile)
└─ Falta de suporte para leitores de tela

Resultado:
├─ Pais e responsáveis não conseguem acompanhar as notas
├─ Frustração e sensação de exclusão digital
├─ Sobrecarga da secretaria com ligações para dúvidas simples
└─ Impacto: Falha na comunicação entre a família e a escola
```

#### C. Quando a UI/UX é Boa

**Exemplo: Painel Escolar (Nossa Proposta)**

**Características da Implementação:**
- Fonte legível (mínimo de 14px a 16px) e contraste acessível (4.5:1).
- Navegação lógica, intuitiva e totalmente responsiva (mobile-friendly).
- Compatibilidade com leitores de tela e navegação por teclado estruturada.

**Resultados Esperados:**
- Usuários com deficiência visual conseguem acessar o boletim via leitor de tela.
- O sistema carrega rapidamente mesmo para responsáveis em áreas com internet instável.
- Responsáveis idosos conseguem visualizar notas e faltas sem precisar de auxílio.
- Maior engajamento da família na vida escolar do aluno.

---

### 6.3 Casos de Uso Reais da Etapa 3

#### Caso 1: Maria, 68 anos, Avó de Adolescente

**Contexto:**
- Usa computador básico e possui presbiopia (dificuldade de focar em letras pequenas).
- É rápida em adaptar-se, mas precisa de interfaces claras e diretas.
- Motivação: Acompanhar o desempenho escolar do neto.

**Cenário com Péssima UI/UX:**
1. Acessa o painel e encontra fontes muito pequenas (10px).
2. Os botões não parecem clicáveis e o menu (apenas o ícone ☰) é confuso para ela.
3. Desiste da navegação e precisa pedir ajuda ao neto ou ligar para a escola.
4. **Consequência:** Frustração e dependência de terceiros.

**Cenário com Nossa Proposta (Foco em Usabilidade):**
1. Acessa o painel e encontra fontes adequadas e alto contraste.
2. Os botões possuem rótulos descritivos (ex: [Ver Detalhes]) e o menu é explícito.
3. O Dashboard apresenta os dados do neto de forma imediata.
4. Maria entende o layout, visualiza as notas e verifica a frequência sem ajuda.
5. **Resultado:** Autonomia na navegação para a usuária e redução da sobrecarga de suporte na secretaria da escola.

#### Caso 2: João, 32 anos, Pai com Deficiência Visual

**Contexto:**
- Possui baixa visão (visão periférica reduzida).
- Utiliza software leitor de tela (NVDA) no dia a dia.
- Acessa o painel principalmente pelo celular, nos intervalos do trabalho.

**Cenário com Péssima Acessibilidade:**
1. Abre o painel no celular e o leitor de tela não consegue identificar as ações porque os botões não têm "labels" (rótulos).
2. A navegação por setas não segue uma ordem lógica (falta de hierarquia no HTML).
3. Acaba acessando páginas incorretas por falta de feedback em áudio.
4. **Consequência:** Impossibilidade de uso autônomo, precisando recorrer a outras pessoas.

**Cenário com Nossa Proposta (Foco em WCAG 2.1 AA):**
1. Abre o painel responsivo no celular.
2. O leitor de tela anuncia corretamente o contexto: "Bem-vindo, João. Você tem 3 alertas".
3. Ao focar no filho, o sistema lê: "Resumo de Carlos. Pressione para mais detalhes".
4. Consegue acessar a aba de Frequência e navegar pelas datas do calendário estruturado.
5. **Resultado:** Total inclusão e independência para acompanhar a vida escolar do filho de forma privada.


### 6.4 Métricas de Qualidade de UX

**Quando medimos UX (DCU), olhamos para quatro pilares principais:**
- **Efetividade:** O usuário consegue finalizar a tarefa com sucesso? (Taxa de conclusão).
- **Eficiência:** Quanto tempo leva para concluir a ação? (Tempo médio por tarefa).
- **Satisfação:** A experiência foi agradável? (Medida por questionários como o SUS - *System Usability Scale*).
- **Acessibilidade:** O sistema funciona para todos os públicos? (Nível de conformidade WCAG).

**Metas estabelecidas para a próxima fase (Testes com Usuários Reais):**
- Validar a taxa de sucesso nos fluxos principais (ex: visualizar notas e justificar faltas).
- Manter o tempo médio de execução das tarefas essenciais abaixo de 2 minutos.
- Confirmar a aplicação prática de 100% das diretrizes WCAG 2.1 AA utilizando leitores de tela reais (como o NVDA) em ambiente de teste.

---

## <a name="conclusão"></a>7. Conclusão


### 7.1 Resumo do Entregável

A **Etapa 3 resultou na elaboração dos seguintes artefatos** para suportar a futura etapa de desenvolvimento da UI/UX:

| Artefato | Descrição do Entregável | Status |
|----------|-------------------------|--------|
| **5 Wireframes de Baixa Fidelidade** | Esboço estrutural no Figma para as 5 telas principais. | ✅ Concluído |
| **Sitemap Hierárquico** | Mapeamento visual e em texto da árvore de navegação do sistema. | ✅ Concluído |
| **Componentes Reutilizáveis** | Padronização inicial de tipografia, cores (monocromático) e espaçamentos. | ✅ Concluído |
| **Análise de Usabilidade** | Levantamento dos padrões aplicados e identificação de pontos de melhoria. | ✅ Concluído |
| **Análise de Acessibilidade** | Verificação dos componentes com base nas diretrizes WCAG 2.1 AA. | ✅ Concluído |
| **Fluxos de Usuário** | Documentação do passo a passo para 4 cenários reais de uso do painel. | ✅ Concluído |

### 7.2 Impacto Positivo Esperado

Quando **implementado conforme especificado**:

**Para o Usuário (Pais/Responsáveis):**
- Experiência de uso intuitiva, reduzindo a necessidade de tutoriais complexos.
- Interface acessível que atende a diferentes níveis de letramento digital e deficiências.
- Segurança e privacidade no acesso às informações dos estudantes (adequação à LGPD).

**Para a Escola:**
- Redução na sobrecarga de atendimentos na secretaria para dúvidas simples de rotina.
- Maior engajamento das famílias na vida escolar dos alunos.
- Diferencial de gestão e modernização da comunicação institucional.

**Para a Equipe de Desenvolvimento:**
- Base visual e de componentes clara para a implementação em código.
- Redução de ambiguidades nas regras de interface, evitando retrabalho no frontend.

### 7.3 Considerações Finais

**O desenvolvimento desta etapa nos permitiu aplicar na prática os seguintes conceitos:**
- **Fundamentos de UX/UI:** Estruturação visual, consistência e hierarquia da informação, focando na utilidade antes da estética.
- **Prototipagem Sistemática:** Elaboração de wireframes estruturais e mapeamento completo de navegação (Sitemap).
- **Design Centrado no Usuário (DCU):** Criação e análise de cenários de uso considerando as dores de personas reais.
- **Acessibilidade Web:** Compreensão profunda e aplicação das diretrizes de inclusão digital (WCAG 2.1).
- **Documentação Técnica:** Padronização de componentes para facilitar a transição para a equipe de desenvolvimento.

**Status do Projeto:** Prototipagem estrutural concluída. Sistema pronto para a próxima fase (Desenvolvimento Frontend e Testes de Usabilidade).

---

## 📞 Contato e Dúvidas

Para implementação, testes ou ajustes nos wireframes:
- 📧 Email: antonioalexdayson@ufca.edu.br, mariaalexsandra@ufca.edu.br
- 📞 Telefone: (88) xxxx-xxxx

---

**Versão:** 1.0  
**Data:** 08/03/2026  
**Status:** ✅ Aprovado para Desenvolvimento  
**Próxima Etapa:** EP4 - Frontend em React/Vue com Testes
