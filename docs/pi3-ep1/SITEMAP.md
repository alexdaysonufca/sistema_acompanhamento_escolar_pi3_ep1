<!-- markdownlint-disable MD013 -->

# Sitemap - TrAcEs (Trilha de Acompanhamento Escolar)

**Versão:** 3.0 (Entregável Parcial 1 - Prototipação de Alta Fidelidade)
**Data da Última Atualização:** 20/06/2026
**MVP Focus:** Responsáveis (Pais/Mães/Estudantes) e Corpo Docente (Professores)

---

## 📊 Estrutura de Navegação Visual (Hub-and-Spoke)

```text
┌────────────────────────────────────────────────────────────────────────────────┐
│                           BARRA DE ACESSIBILIDADE GLOBAL                       │
│     (Skip Links: Conteúdo/Menu/Rodapé | Alto Contraste | Zoom A+/A-/A)         │
└───────────────────────────────────────┬────────────────────────────────────────┘
                                        ▼
┌────────────────────────────────────────────────────────────────────────────────┐
│                           HEADER PERSISTENTE (TrAcEs)                          │
│ (Logo | Notificações | Perfil/Papel: Responsável vs Docente | Logout)          │
└───────────────────┬────────────────────────────────────────┬───────────────────┘
                    │                                        │
                    ▼                                        ▼
  ┌──────────────────────────────────┐     ┌──────────────────────────────────┐
  │     PERFIL: RESPONSÁVEL (Home)   │     │      PERFIL: DOCENTE (Escrita)   │
  │  (Alertas Críticos, Cards Filhos)│     │  (Lançamento em Lote por Turma)  │
  └──────┬───┬───┬───┬───────────────┘     └───────────────┬──────────────────┘
         │   │   │   │                                     │
         │   │   │   └───────────────┐                     │
         ▼   ▼   ▼                   ▼                     ▼
    [BOLETIM ESCOLAR]         [AVISOS E COMUNICADOS]  [ÁREA DO DOCENTE]
    (Médias e Status)         (Cards Expansíveis)     ├── Lançamento de Notas
            │                                         │   (Validação Real-Time)
            ▼                                         └── Lançamento de Frequência
    [NOTAS DETALHADAS]                                    (Toggle switches)
    (Avaliações Individuais)
            │
            ▼
    [FREQUÊNCIA E CALENDÁRIO]
    (Calendário Visual e Justificativas)

Nota: Os módulos [PERFIL DE CONFIGURAÇÃO]* e [SUPORTE AO CLIENTE]* estão inativos
(com opacidade reduzida e ícone de cadeado 🔒) por estarem fora do escopo do MVP.
```

---

## 🗺️ Mapa de Navegação Detalhado

### Nível 1: Dashboard / Home (Hub Central do Responsável)

```text
DASHBOARD / HOME (PERFIL DO RESPONSÁVEL)
├── Barra de Acessibilidade Global (Topo Absoluto)
│   ├── Skip links (Acesso rápido via teclado: Ir para Conteúdo [#main-content] / Menu [#main-nav] / Rodapé [#footer])
│   ├── Alto contraste dinâmico (Chaveamento instantâneo do tema para fundo Preto, textos e bordas Amarelos)
│   └── Magnificação de Fonte (A+, A-, A) (Ajuste dinâmico do tamanho dos caracteres no elemento raiz entre 80% e 140%)
├── Header Persistente (Acessibilidade garantida por meio de semântica de marcos HTML)
│   ├── Logo TrAcEs (Botão com link de retorno ao Dashboard, contraste 7.5:1)
│   ├── Links de Navegação Principal (Início, Boletim, Notas, Frequência, Avisos, Área Docente)
│   ├── Notificações (Ícone de Sino com indicador visual de novidades)
│   └── Perfil de Usuário & Logout
├── Saudação personalizada com nome ("Olá, Maria!")
├── Alertas Críticos (Revelação Progressiva com controle de fechamento manual para reduzir carga cognitiva)
│   ├── Frequência baixa (Sinalizador vermelho `#C0392B` / `✕` para assiduidade anual < 75%)
│   ├── Notas vermelhas (Média bimestral em recuperação `#8F4300` / `#7D4E00` / `⚠️` ou reprovada `#C0392B` / `✕`)
│   └── Avisos urgentes pendentes de leitura
├── Cards Dinâmicos de Filhos (Grid responsivo)
│   ├── [Filho 1] Ana Silva (Resumo do status acadêmico, série, turma, média e link rápido para detalhes)
│   └── [Filho 2] João Silva (Resumo do status acadêmico, série, turma, média e link rápido para detalhes)
└── Menu Rápido de Atalhos (6 botões táteis)
    ├── 📋 Boletim Escolar (Acesso direto à visualização do boletim estruturado)
    ├── 📖 Notas Detalhadas (Acesso direto ao detalhamento de provas e pesos)
    ├── 📅 Frequência e Calendário (Acesso direto ao calendário de assiduidade)
    ├── 💬 Avisos e Comunicados (Acesso direto à central de mensagens)
    ├── 🔒⚙️ Perfil (Opacidade reduzida, indicador de bloqueio 🔒 - Fora do MVP)
    └── 🔒❓ Suporte (Opacidade reduzida, indicador de bloqueio 🔒 - Fora do MVP)
```

---

### Nível 2: Seções Principais (Spokes)

#### A. BOLETIM ESCOLAR

```text
📊 TELA: BOLETIM ESCOLAR
├── Navegação: Dashboard → [Atalho "Boletim" ou Botão "Detalhes" no Card de Filho]
├── Botão de Retorno: "⬅️ Voltar ao Painel" (Controle e liberdade do usuário - Heurística #3)
├── Filtros de Escopo (Dropdowns semânticos com etiquetas de acessibilidade para leitores de tela)
│   ├── Selecionar Dependente (Ana Silva / João Silva)
│   └── Selecionar Ano Letivo (Ex: 2026)
├── Card de Resumo Geral (Rendimento Consolidado)
│   ├── Dados do Aluno: Série, Turma e Turno
│   ├── Média Geral Consolidada
│   ├── Taxa de Frequência Absoluta (%)
│   └── Situação Acadêmica Atual (Aprovado / Recuperação / Reprovado)
├── Tabela de Rendimento Semântico (Componente tabular acessível com legenda e caption)
│   ├── Colunas: Disciplina, Professor Regente, Bimestres (1º ao 4º), Média Final, Status
│   └── Codificação Tripla de Status Acadêmico (WCAG 1.4.1 - Não depende unicamente de cores):
│       ├── 🟢 [Aprovado]: Cor verde `#1B6B3A` + Ícone check `✓` + Rótulo textual "Aprovado"
│       ├── 🟡 [Recuperação]: Cor laranja `#8F4300` / `#7D4E00` + Ícone alerta `⚠️` + Rótulo textual "Recuperação"
│       ├── 🔴 [Reprovado]: Cor vermelha `#C0392B` + Ícone fechar `✕` + Rótulo textual "Reprovado"
│       └── ⚪ [Sem nota lançada]: Cor cinza `#4A5568` + Símbolo traço `—` + Rótulo textual "Sem nota lançada"
├── Legenda Explicativa Integrada (Caixa informativa no rodapé da tabela com as regras de aprovação escolar)
├── Ações de Exportação Física/Digital
│   ├── 🖨️ Imprimir Boletim (Abre diálogo de impressão do sistema operacional)
│   ├── 📥 Baixar PDF (Faz download da versão otimizada do boletim em PDF)
│   └── ✉️ Enviar por E-mail (Envia o boletim em formato digital para o e-mail cadastrado)
└── Link de Detalhamento: Ação "Ver Notas" nas linhas das disciplinas para detalhamento contextual
```

#### B. NOTAS DETALHADAS

```text
📖 TELA: NOTAS DETALHADAS
├── Navegação: Dashboard → [Atalho "Notas"] ou Boletim → [Ação "Ver Notas"]
├── Botão de Retorno: "⬅️ Voltar ao Painel" ou "⬅️ Voltar ao Boletim"
├── Filtros de Disciplina (Dropdown focado de seleção rápida)
│   └── Selecionar Disciplina (Ex: "Português — Profa. Ana Costa")
├── Tabelas Seccionadas por Bimestre (Divisão cronológica de 1º a 4º Bimestre)
│   ├── Colunas: Nome da Atividade (ex: Prova 1, Seminário, Trabalho), Tipo, Peso, Nota Obtida, Status de Validação
│   └── Tipografia Otimizada (JetBrains Mono para valores numéricos, garantindo alinhamento vertical legível)
└── Transparência Algorítmica (Exibição da fórmula matemática da Média Ponderada legível no rodapé da tabela)
```

#### C. FREQUÊNCIA E CALENDÁRIO

```text
📅 TELA: FREQUÊNCIA E CALENDÁRIO
├── Navegação: Dashboard → [Atalho "Frequência"]
├── Botão de Retorno: "⬅️ Voltar ao Painel"
├── Balanço Consolidado de Faltas (Cards informativos simplificados)
│   ├── Resumo Mensal: Presenças, Faltas absolutas e Faltas justificadas (exibidas em fração e percentual)
│   └── Balanço Anual Acumulado: Faltas Totais confrontadas diretamente com o limite legal (75% de presença exigido por lei)
├── Grid de Calendário Visual Inclusivo (Tabela mensal representativa dos dias letivos)
│   ├── Células diárias com dupla codificação (cores de baixo contraste agressivo e sigla textual):
│   │   ├── [P] Presente (Fundo verde claro suave)
│   │   ├── [F] Falta (Fundo vermelho claro suave)
│   │   ├── [F*] Falta Justificada (Fundo laranja suave com borda destacada)
│   │   └── [-] Sem Aula (Fundo cinza claro neutro)
│   └── Destaque de alto contraste nas células com ocorrências para foco imediato
├── Repositório de Justificativas Registradas (Tabela histórica inferior)
│   └── Histórico de atestados médicos ou justificativas homologadas (Data, Motivo, Documento, Status da homologação)
└── Ações Rápidas
    ├── 📝 Solicitar Justificativa (Abre fluxo de envio de atestado - Simulado no MVP)
    └── 🖨️ Imprimir Extrato (Gera extrato de assiduidade física)
```

#### D. AVISOS E COMUNICADOS

```text
💬 TELA: AVISOS E COMUNICADOS
├── Navegação: Dashboard → [Atalho "Avisos"]
├── Botão de Retorno: "⬅️ Voltar ao Painel"
├── Filtros de Categorização (Dropdowns de refinamento de mensagens)
│   ├── Filtrar por Tipo (Urgente, Geral, Pedagógico)
│   └── Filtrar por Status de Leitura (Lido, Não Lido)
├── Seção: Avisos Não Lidos (Destaque visual de atenção com Badge Numérico de mensagens pendentes)
│   └── Cards de Mensagens Expansíveis (Acordeão / Accordion para evitar sobrecarga visual - Heurística #8)
│       ├── Metadados: Ícone de criticidade, Título, Remetente, Data de Publicação, Tag de Urgência
│       ├── Ação: "Ler completo" (revelação progressiva do corpo do aviso)
│       └── Ação: "Marcar Como Lido" (move o comunicado automaticamente para a seção de lidos)
├── Seção: Avisos Já Lidos (Painel colapsável no rodapé)
│   └── Histórico de avisos arquivados (oculta mensagens antigas por padrão para despoluir a tela)
└── Mecanismo de Notificação Externa
    └── Checkbox para inscrição e recebimento de avisos por e-mail/push em tempo real
```

#### E. ÁREA DO DOCENTE (Módulo Operacional de Escrita)

```text
⚙️ TELA: ÁREA DO DOCENTE (PERFIL DO PROFESSOR)
├── Navegação: Header Global → [Opção "Área Docente"]
├── Botão de Retorno: "⬅️ Voltar ao Painel"
├── Identificação Profissional: Nome do professor regente ("Profa. Ana Costa")
├── Toasts de Feedback do Estado (Aria-live assertivo/polite para acessibilidade):
│   ├── Sucesso: "Dados publicados com sucesso! Responsáveis já podem visualizar nas telas de Boletim e Frequência."
│   └── Rascunho: "Rascunho salvo. Os dados ainda não foram publicados para os responsáveis."
├── Seletores Centrais de Escopo (Filtros suspensos obrigatórios e encadeados)
│   ├── Selecionar Turma (Ex: "9º Ano A — Manhã", "6º Ano B — Manhã", "8º Ano C — Tarde")
│   ├── Selecionar Disciplina (Ex: "Português", "Literatura", "Redação")
│   └── Selecionar Tipo de Registro (Dropdown com opções "Notas / Avaliações" e "Frequência Diária")
├── SUB-TELA 1: LANÇAMENTO DE NOTAS (Ativo se Tipo de Registro = "Notas")
│   ├── Cabeçalho de Status: Resumo em tempo real ("X / Y alunos com dados lançados")
│   ├── Nota Informativa de Limites: "Digite valores entre 0,0 e 10,0. Borda verde se válido e vermelha se inválido."
│   └── Grid de Entrada de Notas (Tabela com foco na acessibilidade de entrada de dados)
│       ├── Colunas: Foto/Iniciais do Aluno, Nome e Matrícula (JetBrains Mono), Nota 1º Bimestre, Nota 2º Bimestre
│       └── Validação em Tempo Real de Domínio (Inputs com tratamento de erros - Heurística #5 e #9):
│           ├── Campo Vazio: Borda cinza `#C8D5E8`, fundo azulado `#F0F4FA`, placeholder `—`
│           ├── Valor Válido (0,0 a 10,0): Borda verde `#1B6B3A`, fundo verde claro `#F0FFF4`
│           └── Valor Inválido (< 0 ou > 10): Borda vermelha `#C0392B`, fundo vermelho claro `#FFF0F0`, sinalizador de erro textual abaixo do input (ex: "⚠ Insira valor entre 0 e 10")
├── SUB-TELA 2: LANÇAMENTO DE FREQUÊNCIA (Ativo se Tipo de Registro = "Frequência")
│   ├── Seletor de Data (Input date padrão configurado para a data corrente)
│   ├── Barra de Resumo de Presença: Contagem dinâmica de Presentes (verde) e Faltas (vermelho)
│   └── Lista de Presença Diária (Lista sequencial de alunos para simplificar operação)
│       ├── Avatar/Iniciais do aluno
│       ├── Status atual textual de assiduidade (ex: "[P] Presente" ou "[F] Falta")
│       └── Interruptor de Estado (Toggle Switch funcional, acessível via teclado e leitores de tela)
├── Barra de Controle de Ações (Rodapé de controle de estado do lançamento)
│   ├── Botão "Salvar Rascunho" (Salva dados no banco local sem publicar. Desativado 🔒 com contraste de acessibilidade se nenhum dado preenchido)
│   └── Botão "Publicar no Sistema" (Publicação definitiva. Desativado 🔒 se houver erros na tabela ou nenhum dado preenchido)
└── Modal de Confirmação de Publicação (Prevenção de Erros - Heurística #5)
    ├── Gatilho: Clique em "Publicar no Sistema"
    ├── Título: "Confirmar Publicação" com Ícone de Alerta `⚠️`
    ├── Texto descritivo do impacto: "Deseja confirmar a publicação? Os dados serão enviados imediatamente para o painel dos responsáveis (Maria) nas Telas de Boletim e Frequência."
    ├── Alerta de irreversibilidade: "⚠ Esta ação não pode ser desfeita diretamente. Verifique os dados antes de confirmar."
    └── Botões de Decisão: [Cancelar] (Fecha modal sem alterar estado) e [Confirmar] (Envia dados, atualiza banco, exibe toast e atualiza telas dos responsáveis)
```

---

## 🔄 Fluxos de Navegação Principais (Fluxos de Usuário)

### Fluxo 1: Visualização do Dashboard pelo Responsável

1. Responsável faz login no sistema.
2. → **TELA 1: DASHBOARD (Home)**
3. O usuário visualiza Alertas Críticos no topo (ex: frequência abaixo da média regulatória ou notas baixas).
4. Analisa os cards individuais de rendimento para cada filho vinculado (Ana Silva e João Silva).
5. Utiliza atalhos rápidos no "Menu Rápido" ou o botão "Detalhes" nos cards de dependentes para acessar páginas internas.

### Fluxo 2: Acompanhar Boletim e Notas Detalhadas (Responsável)

1. Responsável está no **DASHBOARD**.
2. Clica no atalho [Boletim] ou no botão [Detalhes] no card de um dos filhos.
3. → **TELA 2: BOLETIM ESCOLAR**
4. Seleciona o dependente e o ano letivo nos filtros superiores.
5. Analisa a tabela de médias gerais e identifica que Geografia está em "Recuperação" (cor laranja, ícone `⚠️`).
6. Para compreender a nota, clica em [Ver Notas] na linha de Geografia ou no menu principal [Notas].
7. → **TELA 3: NOTAS DETALHADAS**
8. Visualiza a divisão das avaliações do bimestre e a nota obtida em cada teste (Prova, Trabalho, Seminário).
9. Entende o cálculo da nota final através da fórmula matemática da Média Ponderada no rodapé.
10. Utiliza as ações [Baixar PDF] ou [Imprimir] para arquivamento.

### Fluxo 3: Verificar Frequência e Assiduidade (Responsável)

1. Responsável está no **DASHBOARD**.
2. Clica no atalho [Frequência].
3. → **TELA 4: FREQUÊNCIA E CALENDÁRIO**
4. Analisa os cards de balanço de faltas mensais e anuais comparados com o limite regulatório de 75% de presença.
5. Navega no Calendário Visual, identificando faltas (`[F]` em vermelho) ou faltas justificadas (`[F*]` em laranja).
6. Consulta a lista de "Justificativas Registradas" no rodapé para certificar-se da homologação de atestados médicos.
7. Se desejar enviar um novo comprovante, clica em [Solicitar Justificativa] para iniciar o processo.

### Fluxo 4: Ler Avisos e Comunicados (Responsável)

1. Responsável está no **DASHBOARD**.
2. Clica no atalho [Avisos].
3. → **TELA 5: AVISOS E COMUNICADOS**
4. Identifica que há "Avisos Não Lidos (3)" através do badge numérico em destaque.
5. Clica em [Ler completo] no card do aviso de maior urgência.
6. O card expande (Accordion) revelando o texto integral do comunicado enviado pela direção da escola.
7. Clica em [Marcar como Lido]: o aviso é movido para o painel colapsado de "Avisos Já Lidos" no rodapé.

### Fluxo 5: Lançamento e Publicação de Notas pelo Docente

1. Docente acessa o sistema e clica em [Área Docente] no Header.
2. → **TELA 6: ÁREA DO DOCENTE**
3. Seleciona a Turma (9º Ano A), Disciplina (Português) e Tipo de Registro (Notas / Avaliações) nos seletores de escopo.
4. O grid com a lista de alunos e os inputs numéricos é renderizado na tela.
5. O professor inicia o lançamento de notas:
   - Digita "7.5" para Ana Silva → Campo fica com borda verde (Nota válida de domínio).
   - Digita "12.0" para João Silva → Campo fica com borda vermelha e exibe aviso "⚠ Insira valor entre 0 e 10" (Validação em tempo real).
   - Corrige a nota de João para "6.5" → Borda do campo torna-se verde.
6. Clica em [Salvar Rascunho] para persistência offline provisória → O sistema exibe um Toast de sucesso e os dados ficam salvos de forma privada no banco local, sem visibilidade para os pais.
7. Ao finalizar o trabalho, clica no botão primário [Publicar no Sistema].
8. O sistema exibe o **Modal de Confirmação** (Prevenção de Erros), alertando que as notas serão compartilhadas com as famílias.
9. Docente revisa o aviso e clica em [Confirmar].
10. O Modal fecha, exibe um Toast de sucesso definitivo e atualiza instantaneamente o SQLite. O responsável correspondente, ao acessar as Telas de Boletim ou Notas Detalhadas, visualizará os novos lançamentos.

### Fluxo 6: Lançamento e Publicação de Frequência Diária pelo Docente

1. Docente acessa a **[Área Docente]** no Header.
2. Define Turma (9º Ano A), Disciplina (Português) e Tipo de Registro (Frequência Diária) nos seletores de escopo.
3. Escolhe a data correspondente do dia letivo (ex: 19/03/2026) no seletor de data.
4. A lista de presença com todos os alunos é carregada (todos iniciam como "[P] Presente" com toggles ativos).
5. O professor identifica os alunos ausentes e clica em seus interruptores de presença (Toggle switches):
   - O status de João Silva muda para "[F] Falta" em vermelho, e o interruptor muda de cor.
   - A barra de resumo superior atualiza instantaneamente o balanço ("Presentes: 23 | Faltas: 1").
6. Clica em [Publicar no Sistema] → O modal de confirmação reforça o impacto pedagógico do envio das faltas.
7. O docente clica em [Confirmar] → O sistema persiste a assiduidade no SQLite, exibe toast de sucesso e atualiza a frequência no painel dos pais.

---

## 🎯 Mapa Mental do Usuário (Estrutura Mental do TrAcEs)

```text
                                 ┌── [INÍCIO / DASHBOARD] (Hub Central)
                                 │   ├── Alertas Críticos de Notas e Faltas
                                 │   └── Cards de Filhos Cadastrados (Acesso rápido)
                                 │
                                 ├── [BOLETIM ESCOLAR] (Média final e situação anual)
                                 │   └── Ações: Imprimir, Baixar PDF, Enviar Boletim por E-mail
                                 │
                                 ├── [NOTAS DETALHADAS] (Divisão analítica de notas)
                                 │   └── Visualização da fórmula de Média Ponderada
            ┌── RESPONSÁVEL ─────┤
            │   (Visualização)   ├── [FREQUÊNCIA E CALENDÁRIO] (Assiduidade mensal/anual)
            │                    │   ├── Calendário interativo com legenda ([P], [F], [F*], [-])
            │                    │   └── Histórico de justificativas médicas homologadas
            │                    │
            │                    ├── [AVISOS E COMUNICADOS] (Avisos da direção e docentes)
            │                    │   ├── Mensagens Não Lidas (Accordion expansível)
            │                    │   └── Painel colapsável de Mensagens Lidas (Histórico)
            │                    │
            │                    └── [PERFIL / SUPORTE]* (Ações de configuração - Inativas no MVP 🔒)
TRACES ─────┤
            │
            │                    ┌── [SELEÇÃO DE ESCOPO] (Filtros iniciais do trabalho)
            │                    │   └── Turma, Disciplina e Tipo de Lançamento (Notas vs Frequência)
            │                    │
            │                    ├── [LANÇAMENTO DE NOTAS] (Tabela de lançamento de dados)
            │                    │   ├── Validação em tempo real (Notas entre 0,0 e 10,0)
            │                    │   └── Indicação cromática e textual de erros de digitação
            └── DOCENTE ─────────┤
                (Lançamento)     ├── [LANÇAMENTO DE FREQUÊNCIA] (Lista sequencial de data)
                                 │   ├── Seletor de data e contador dinâmico de alunos presentes/faltantes
                                 │   └── Toggle switches rápidos para alteração de presença
                                 │
                                 └── [AÇÕES DE CONTROLE & CONFIRMAÇÃO]
                                     ├── Salvar Rascunho (Persistência local temporária)
                                     ├── Publicar no Sistema (Dispara validações finais)
                                     └── Modal de Prevenção de Erros (Confirmação antes de enviar aos pais)
```

---

## 📱 Responsividade e Adaptação Física de Tela

### Desktop (1920px+)

- Layout em grade com cabeçalho persistente e alinhamento central em container max-width de 1152px (`max-w-6xl`).
- Exibição de cards de filhos em grids de 2 ou 3 colunas.
- Tabelas pedagógicas completas exibem todas as colunas lado a lado sem quebra de conteúdo (JetBrains Mono nos valores).
- Grid de Calendário com layout clássico mensal de dias letivos (malha 7x5).
- Área do Docente exibe filtros horizontais em 3 colunas e tabela de notas com inputs amplos alinhados por colunas.

### Tablet (768px - 1024px)

- Menu de cabeçalho responsivo para telas intermediárias (hamburger).
- Cards de filhos exibidos em 1 ou 2 colunas.
- Tabelas escolares e de lançamento de notas ganham scroll horizontal nativo com indicadores táteis nas bordas para evitar quebra de colunas.
- Filtros de escopo da Área do Docente adaptam-se para 2 colunas, empilhando o terceiro filtro abaixo.

### Mobile (320px - 767px)

- Menu hamburger superior para navegação e alternância de telas.
- Layout de coluna única (stack vertical) para todos os cards e blocos informativos.
- Calendário de frequência é convertido de malha de dias para formato de lista vertical sequencial com scroll ou ocorrências destacadas.
- Tabelas pedagógicas e de notas complexas são transformadas em blocos expansíveis (Cards/Accordions) por disciplina ou estudante para evitar scroll horizontal excessivo.
- Na Área do Docente, a tabela de notas é convertida em cards verticais por aluno, com os campos de entrada de notas 1º e 2º Bimestre empilhados ao lado do nome do estudante.

---

## 🔐 Matriz de Permissões e Segurança de Dados

O sistema opera com base no isolamento de privilégios entre os perfis do ecossistema:

| Funcionalidade / Ação | Perfil: Responsável Legal | Perfil: Corpo Docente | Perfil: Secretaria/Admin* |
| :--- | :---: | :---: | :---: |
| Visualizar resumo do Dashboard | ✅ Apenas filhos vinculados | ❌ Não disponível | ✅ Apenas fins de auditoria |
| Visualizar Boletim e Frequência | ✅ Apenas filhos vinculados | ❌ Não disponível | ✅ Leitura completa |
| Justificar faltas (Solicitação) | ✅ Envia solicitação/atestado | ❌ Não disponível | ✅ Homologa e registra |
| Ler Avisos e Comunicados | ✅ Apenas visualização e leitura | ❌ Apenas visualização | ✅ Cria, edita e publica |
| Lançar Notas de Avaliações | ❌ Sem permissão de escrita | ✅ Apenas turmas/matérias dele | ✅ Permissão administrativa |
| Lançar Frequência Diária | ❌ Sem permissão de escrita | ✅ Apenas turmas/matérias dele | ✅ Permissão administrativa |
| Salvar Rascunho / Publicar Dados | ❌ Sem permissão de escrita | ✅ Apenas turmas dele | ✅ Permissão administrativa |
| Alterar Dados Publicados | ❌ Sem permissão | ❌ Bloqueado sem justificativa | ✅ Com justificativa auditada |

*\*Ações de perfil administrativo/secretaria e financeiro não detalhadas e fora do escopo deste MVP. Os dados de alunos e responsáveis são blindados, garantindo que um responsável acesse estritamente os dependentes sob seu vínculo legal, respeitando as leis de proteção de dados.*

---

## ♿ Conformidade de Acessibilidade Web (WCAG 2.1 AA)

O Sitemap foi concebido de acordo com as seguintes diretrizes de acessibilidade integradas:

1. **Acessibilidade de Navegação Global (WCAG 2.4.1):** Skip links permitem que usuários com leitor de tela pulem o menu e acessem diretamente o conteúdo principal (`#main-content`), menu principal (`#main-nav`) ou rodapé (`#footer`).
2. **Redimensionamento de Texto (WCAG 1.4.4):** Controles de magnificação (A+/A-) alteram o tamanho da fonte em incrementos de 10% no elemento raiz HTML (de 80% a 140%) mantendo a integridade do layout.
3. **Contraste de Interface (WCAG 1.4.3 e 1.4.11):**
   - Relação de contraste de texto normal sobre fundo escolar em **8.3:1** (superando com folga a meta AAA de 7:1).
   - Componentes de input utilizam contornos na cor `#6B7A8D` sobre fundo branco, garantindo contraste mínimo de **4.0:1** (WCAG exige 3:1 para limites de componentes de interface).
4. **Uso de Cores (WCAG 1.4.1):** A visualização de status pedagógicos não depende unicamente de cores. Elementos usam tripla codificação (Cor + Ícone do Lucide + Texto de Status).
5. **Acessibilidade de Leitores de Tela:** A Área do Docente e Toasts utilizam tags de estado como `aria-live="assertive"` ou `aria-live="polite"`, e inputs possuem marcações explícitas de `aria-invalid` e `aria-describedby` para descrever erros de digitação em tempo real.

---

**Versão:** 3.0
**Status:** ✅ Aprovado para Desenvolvimento e Integração com Backend
**Próximo Passo:** Desenvolvimento das Views React/Vite com persistência no SQLite via Clean Architecture em Python.
