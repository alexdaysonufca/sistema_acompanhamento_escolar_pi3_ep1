# Sitemap - Painel de Acompanhamento Escolar

**Versão:** 1.0  
**Data:** 08/03/2026  
**MVP Focus:** Responsáveis (Pais/Mães)

---

## 📊 Estrutura de Navegação Visual

![Mapa Visual do Sistema](assets/sitemap_visual.png)

```
┌─────────────────────────────────────────────────────────────────┐
│                        DASHBOARD / HOME                          │
│  (Visão geral, alertas, cards de filhos e acessos rápidos)       │
└────────┬────────────────┬────────────────┬──────────────┬──────┘
         │                │                │              │
         ▼                ▼                ▼              ▼
     [BOLETIM]   [NOTAS DETALHADAS]  [FREQUÊNCIA]      [AVISOS]

         ┌──────────────────────────────────────────┐
         │   [PERFIL]* [SUPORTE]* [SAIR]            │
         │   *Não detalhados neste MVP              │
         └──────────────────────────────────────────┘
```

---

## 🗺️ Mapa de Navegação Detalhado

### Nível 1: Dashboard (Hub Central)
```
DASHBOARD / HOME
├── Barra de Acessibilidade Global (Topo)
│   ├── Skip links (Ir para conteúdo/menu)
│   ├── Alto contraste
│   └── Ajuste de Fonte (A+, A-, A)
├── Header Persistente
│   ├── Logo (Painel escolar)
│   ├── Notificações (Sino)
│   └── Perfil de Usuário
├── Saudação personalizada com nome
├── Alertas Críticos (widget destacado)
│   ├── Frequência baixa
│   ├── Notas vermelhas
│   └── Avisos urgentes
├── Cards de Filhos (grid)
│   ├── [Filho 1] - resumo (Ana Silva)
│   └── [Filho 2] - resumo (João Silva)
└── Menu Rápido (6 botões)
    ├── 📋 Boletim
    ├── 📖 Notas
    ├── 📅 Frequência
    ├── 💬 Avisos
    ├── ⚙️ Perfil (Não detalhado no MVP)
    └── ❓ Suporte (Não detalhado no MVP)
```

### Nível 2: Seções Principais

#### BOLETIM E NOTAS
```
📊 BOLETIM E NOTAS
├── Dashboard → [Menu Rápido "Boletim" ou "Notas"]
├── TELA: BOLETIM ESCOLAR
│   ├── Selecionar Aluno(a) / Ano
│   ├── Resumo Geral (Média, Frequência, Situação)
│   └── Tabela: Notas por Disciplina e Bimestre
└── TELA: NOTAS DETALHADAS
    ├── Selecionar Aluno(a) / Ano / Disciplina
    ├── Tabela: Avaliações do 1º ao 4º Bimestre (Peso, Nota, Status)
    ├── Cálculo da Média Ponderada
    └── Ações: Imprimir, Baixar PDF, Enviar Email
```

#### FREQUÊNCIA
```
📅 FREQUÊNCIA
├── Dashboard → [Menu Rápido "Frequência"]
├── TELA: FREQUÊNCIA
│   ├── Seletores: Aluno, Disciplina, Mês
│   ├── Resumo Atual (Presenças, Faltas, Limite)
│   ├── Calendário Visual (Tabela de dias úteis)
│   │   ├── [P] Presente
│   │   ├── [F] Falta
│   │   ├── [F*] Falta Justificada
│   │   └── [-] Sem aula
│   ├── Justificativas Registradas (Lista)
│   └── Ações: [Solicitar Justificativa] e [Imprimir Extrato]
└── Voltar ao Dashboard
```

#### COMUNICADOS / AVISOS
```
💬 COMUNICADOS
├── Dashboard → [Menu Rápido "Avisos"]
├── TELA: AVISOS E COMUNICADOS
│   ├── Filtros: Tipo, Status
│   ├── Seção: Avisos Não Lidos (Destaque)
│   │   └── Cards expansíveis com [⚠️] Alerta
│   ├── Seção: Avisos Já Lidos (Colapsável)
│   └── Opção: Inscrever-se em notificações por email
└── Voltar ao Dashboard
```

## 🔄 Fluxos de Navegação Principais

### Fluxo 1: Visualização do Dashboard
```
1. Usuário acessa o painel (já autenticado)
2. → DASHBOARD (Home)
3. Visualiza Alertas Importantes no topo
4. Vê o resumo nos cards de "Meus Filhos"
5. Tem acesso aos atalhos no "Menu Rápido"
6. Perfil e Suporte disponíveis (não detalhados no MVP)
```

### Fluxo 2: Acompanhar Boletim e Notas Detalhadas
```
1. Usuário no DASHBOARD
2. Clica em [Detalhes] no card do filho ou no menu [Boletim]
3. → BOLETIM ESCOLAR
4. Visualiza a tabela de médias gerais
5. Para aprofundar, clica no menu rápido [Notas] ou na ação [Ver Notas]
6. → NOTAS DETALHADAS
7. Visualiza tabela de provas, trabalhos e pesos por bimestre
```

### Fluxo 3: Verificar Frequência e Justificativas
```
1. Usuário no DASHBOARD
2. Clica no menu [Frequência]
3. → TELA DE FREQUÊNCIA
4. Seleciona o mês e a disciplina desejada
5. Analisa os dias letivos na tabela do calendário
6. Consulta a lista de "Justificativas Registradas" no rodapé
```

### Fluxo 4: Ler Avisos e Comunicados
```
1. Usuário no DASHBOARD
2. Clica no menu [Avisos]
3. → TELA DE AVISOS E COMUNICADOS
4. Vê os cards em destaque na seção "Não Lidos"
5. Clica em [Ler Completo] para expandir a mensagem
6. Clica em [Marcar Como Lido] para mover o aviso de seção
```
---

## 🎯 Mapa Mental do Usuário (Responsável)

```
        ┌─ BOLETIM ── Ver visão geral, situação e médias anuais
        │             └─ [Ações: Imprimir, Baixar PDF, Enviar Email]
        │
        ├─ NOTAS ──── Acompanhar notas por avaliação e eventos
        │             └─ [Ações: Imprimir, Baixar PDF, Enviar Email]
        │
DASHBOARD ─┼─ FREQUÊNCIA ─ Ver presenças e acompanhar % de faltas
        │             └─ [Ações: Solicitar Justificativa, Imprimir Extrato]
        │
        ├─ AVISOS ─── Ler comunicados da escola
        │             └─ [Ações: Ver Completo, Marcar como Lido]
        │
        └─ PERFIL / SUPORTE (Ações secundárias - Não detalhadas)
```

---

## 📱 Responsividade

### Desktop (1920px+)
- Sidebar navegação esquerda
- 2-3 colunas para cards
- Tabelas com scroll horizontal completo

### Tablet (768px - 1024px)
- Menu hamburger superior
- 1-2 colunas para cards
- Tabelas scrolláveis

### Mobile (320px - 767px)
- Menu hamburger
- Stack vertical (1 coluna)
- Calendário em formato de lista
- Tabelas em cards/acordeão

---

## 🔐 Permissões e Acesso

```
RESPONSÁVEL PODE:
✅ Ver dados apenas de seus filhos
✅ Ler comunicados da escola
✅ Ver notas e frequência

❌ RESPONSÁVEL NÃO PODE:
❌ Ver dados de outros filhos/alunos
❌ Editar notas
❌ Deletar registros
❌ Ver dados de outros responsáveis
```

---

## ✅ Escopo Coberto pelo MVP

O sitemap cobre:
- Visualização de dados (boletim, notas, frequência)
- Comunicação (avisos)
- Navegação intuitiva e consistente
- Mobile-first design
- Acessibilidade (Barra global)
- Responsividade

---

**Versão:** 1.0 
**Status:** ✅ Aprovado para Desenvolvimento  
