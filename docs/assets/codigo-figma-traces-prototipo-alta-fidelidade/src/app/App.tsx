import { useState, useEffect, useRef } from "react";
import {
  Bell, User, ChevronDown, X, AlertTriangle, CheckCircle,
  FileText, BookOpen, Calendar, MessageSquare, Settings, HelpCircle,
  Printer, Download, Mail, ArrowLeft, Info, Eye, Check,
  ChevronLeft, ChevronRight, ChevronUp, Accessibility, Lock
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Screen =
  | "dashboard"
  | "boletim"
  | "notas"
  | "frequencia"
  | "avisos"
  | "professor";

const screenTitles: Record<Screen, string> = {
  dashboard: "Painel Principal — TrAcEs",
  boletim: "Boletim Escolar — TrAcEs",
  notas: "Notas Detalhadas — TrAcEs",
  frequencia: "Frequência e Calendário — TrAcEs",
  avisos: "Avisos e Comunicados — TrAcEs",
  professor: "Área do Docente — TrAcEs",
};

// ─── Shared Layout ────────────────────────────────────────────────────────────

function AccessibilityBar({ highContrast, onToggleContrast }: {
  highContrast: boolean;
  onToggleContrast: () => void;
}) {
  const adjustFont = (delta: number) => {
    const root = document.documentElement;
    const current = parseFloat(root.style.fontSize || "100") || 100;
    const next = Math.min(140, Math.max(80, current + delta));
    root.style.fontSize = `${next}%`;
  };
  
  // Definimos uma classe base comum para garantir que todos tenham o mesmo tamanho e peso
  const baseClasses = "px-2 py-0.5 rounded text-xs font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 hover:underline";
  
  return (
    <div
      role="navigation"
      aria-label="Barra de acessibilidade"
      className={`w-full ${highContrast ? "bg-black text-yellow-300" : "bg-[#1A2332] text-white"}`}
    >
      {/* Container centralizador com mesma largura do Header */}
      <div className="max-w-6xl mx-auto flex items-center gap-0.5 px-6 py-1 text-xs font-medium flex-wrap">
        
        {/* Skip links — Nielsen #6 Recognition: allow keyboard users to bypass nav */}
        
        {/* Adicionei 'font-medium' e um espaçamento consistente */}  
        <a
          href="#main-content"
          className={baseClasses}
        >
          Ir para o conteúdo
        </a>
        <Sep />
        <a
          href="#main-nav"
          className={baseClasses}
        >
          Ir para menu
        </a>
        <Sep />
        <a
          href="#footer"
          className={baseClasses}
        >
          Ir para rodapé
        </a>
        <Sep />
        <button
          onClick={onToggleContrast}
          aria-pressed={highContrast}
          className={baseClasses}
        >
          Alto contraste
        </button>
        <Sep />
        <button
          onClick={() => adjustFont(10)}
          aria-label="Aumentar tamanho da fonte"
          className={baseClasses}
        >
          Fonte: A+
        </button>
        <button
          onClick={() => adjustFont(-10)}
          aria-label="Diminuir tamanho da fonte"
          className={baseClasses}
        >
          Fonte: A−
        </button>
        <button
          onClick={() => { document.documentElement.style.fontSize = "100%"; }}
          aria-label="Restaurar tamanho padrão da fonte"
          className={baseClasses}
        >
          Fonte: A
        </button>
        <Sep />
        <button
          aria-label="Recursos de acessibilidade"
          className="px-2 py-0.5 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 flex items-center gap-1 hover:underline"
        >
          <Accessibility size={13} aria-hidden />
          Acessibilidade
        </button>
      </div>
     </div>
  );
}

function Sep() {
  return <span aria-hidden className="opacity-30 px-0.5">|</span>;
}

function Header({
  onNavigate,
  currentScreen,
  highContrast,
}: {
  onNavigate: (s: Screen) => void;
  currentScreen: Screen;
  highContrast: boolean;
}) {
  const navItems: { key: Screen; label: string }[] = [
    { key: "dashboard", label: "Início" },
    { key: "boletim", label: "Boletim" },
    { key: "notas", label: "Notas" },
    { key: "frequencia", label: "Frequência" },
    { key: "avisos", label: "Avisos" },
    { key: "professor", label: "Área Docente" },
  ];

  return (
    <header
      id="main-nav"
      role="banner"
      className={`w-full shadow-md ${highContrast ? "bg-black border-b-2 border-yellow-400" : "bg-[#1B4F8A]"} text-white`}
    >
      {/* Container de largura máxima e centralização */}
      <div className="max-w-6xl mx-auto flex items-center px-6 py-3 gap-4">
      {/* Logo */}
      <button
        onClick={() => onNavigate("dashboard")}
        className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-[#1B4F8A] rounded"
        aria-label="TrAcEs — Ir para o painel inicial"
      >
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
          <span className="text-[#1B4F8A] font-bold text-sm font-['Source_Serif_4']">Tr</span>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-lg tracking-tight font-['Source_Serif_4']">TrAcEs</span>
          {/* white/90 sobre #1B4F8A → contraste ≈ 7,5:1 ✓ AA */}
          <span className="text-xs text-white/90">Trilha de Acompanhamento Escolar</span>
        </div>
      </button>

      {/* Primary nav — Centralizada */}
      <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-1 ml-6">
        {navItems.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            aria-current={currentScreen === key ? "page" : undefined}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400
              ${currentScreen === key
                /* Ativo: bg-white/25 + text-white + bold + underline
                   Contraste white/#1B4F8A = 8,3:1 ✓ AAA */
                ? "bg-white/25 text-white font-bold underline underline-offset-2"
                /* Inativo: text-white = 8,3:1 ✓ AAA.
                   Diferenciação do ativo via ausência de sublinhado e peso normal */
                : "text-white font-normal hover:bg-white/15 hover:underline"
              }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Right icons — Empurrados para a direita */}
      <div className="ml-auto flex items-center gap-3">
        <button
          aria-label="Notificações — 3 avisos não lidos"
          onClick={() => onNavigate("avisos")}
          className="relative p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
        >
          <Bell size={20} aria-hidden />
          {/* aria-hidden: count already in aria-label */}
          <span
            aria-hidden
            className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#E74C3C] rounded-full text-[10px] font-bold flex items-center justify-center"
          >
            3
          </span>
        </button>
        <button
          aria-label="Perfil da usuária — Maria dos Santos"
          className="flex items-center gap-2 p-1.5 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
            <User size={16} className="text-[#1B4F8A]" aria-hidden />
          </div>
          <span className="hidden md:inline text-sm font-medium">Maria</span>
          <ChevronDown size={14} aria-hidden />
        </button>
        </div>
      </div>
    </header>
  );
}

// ─── Shared UI primitives ─────────────────────────────────────────────────────

/*
  StatusBadge: triple-coded status (cor + ícone + rótulo textual).
  WCAG 1.4.1 — a informação NUNCA depende apenas da cor.
  Daltônicos (protanopia/deuteranopia) identificam o status pelo ícone e pelo texto,
  independentemente da percepção da cor verde ou vermelha.
*/
// Substitua a função StatusBadge antiga por esta versão parametrizada:
function StatusBadge({ 
  value, 
  compact = false, 
  iconOnly = false // Nova propriedade para ditar se esconde a nota
}: { 
  value: number | null; 
  compact?: boolean; 
  iconOnly?: boolean; // Tipo opcional
}) {
  if (value === null)
    return <span className="text-[#4A5568] text-sm font-['JetBrains_Mono']" aria-label="Sem nota lançada">—</span>;

  if (value >= 6)
    return (
      <span
        className={`inline-flex items-center gap-1 font-semibold ${compact ? "text-xs" : "text-sm"} text-[#1B6B3A]`}
        aria-label={`Aprovado — nota ${value.toFixed(1)}`}
      >
        <Check size={compact ? 12 : 14} aria-hidden />
        {/* CORREÇÃO: Envolvemos o número para sumir caso iconOnly seja ativo */}
        {!iconOnly ? <span className="font-['JetBrains_Mono']">{value.toFixed(1)}</span> : <span className="sr-only">Aprovado</span>}
      </span>
    );

  if (value >= 4)
    return (
      <span
        className={`inline-flex items-center gap-1 font-black ${compact ? "text-xs" : "text-sm"} text-[#8F4300]`}
        aria-label={`Recuperação — nota ${value.toFixed(1)}`}
      >
        <AlertTriangle size={compact ? 12 : 14} aria-hidden />
        {!iconOnly ? (
          /* Apenas a fonte e a cor são mantidas, o sublinhado foi removido */
          <span className="font-['JetBrains_Mono']">
            {value.toFixed(1).replace(".", ",")}
          </span>
        ) : (
          <span className="sr-only">Recuperação</span>
        )}
      </span>
    );
  
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold ${compact ? "text-xs" : "text-sm"} text-[#C0392B]`}
      aria-label={`Reprovado — nota ${value.toFixed(1)}`}
    >
      <X size={compact ? 12 : 14} aria-hidden />
      {/* CORREÇÃO: Oculta o valor se iconOnly for ativo */}
      {!iconOnly ? <span className="font-['JetBrains_Mono']">{value.toFixed(1)}</span> : <span className="sr-only">Reprovado</span>}
    </span>
  );
}

function GradeLegend() {
  /*
    Legenda com dupla codificação: ícone SVG + rótulo textual + cor.
    NUNCA usar símbolo Unicode E ícone ao mesmo tempo — isso gera "✓ ✓ Aprovado"
    que é redundante visualmente e confuso para leitores de tela.
    O ícone SVG (renderizado pelo Lucide) já É o símbolo; o texto é o rótulo.
  */
  return (
    <div
      className="flex flex-wrap gap-x-5 gap-y-2 text-xs bg-[#EEF2F7] border border-[#C8D5E8] rounded px-3 py-2"
      role="note"
      aria-label="Legenda: ícone mais cor mais texto descrevem cada situação"
    >
      {/* ✓ verde = Aprovado: ícone identifica sem depender da cor */}
      <span className="flex items-center gap-1.5 text-[#1B6B3A] font-semibold">
        <Check size={13} aria-hidden />
        <span>Aprovado</span>
        <span className="font-normal text-[#374151]">(≥ 6,0)</span>
      </span>
      <span aria-hidden className="text-[#94A3B8] self-center">|</span>
      {/* ⚠ âmbar = Recuperação: ícone triangular universalmente reconhecido como alerta */}
      <span className="flex items-center gap-1.5 text-[#7D4E00] font-semibold">
        <AlertTriangle size={13} aria-hidden />
        <span>Recuperação</span>
        <span className="font-normal text-[#374151]">(4,0 – 5,9)</span>
      </span>
      <span aria-hidden className="text-[#94A3B8] self-center">|</span>
      {/* ✕ vermelho = Reprovado: ícone X universalmente reconhecido como negativo */}
      <span className="flex items-center gap-1.5 text-[#C0392B] font-semibold">
        <X size={13} aria-hidden />
        <span>Reprovado</span>
        <span className="font-normal text-[#374151]">({"<"} 4,0)</span>
      </span>
    </div>
  );
}

// Reusable accessible select field
function SelectField({
  id, label, value, onChange, options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-1">
      {/*
        Label: text-[#1A2332] para garantir contraste > 7:1 em text-xs.
        WCAG 1.4.3 AA exige 4,5:1 para texto normal; usamos o mais escuro disponível.
      */}
      <label htmlFor={id} className="text-xs font-bold text-[#1A2332] uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        {/*
          Borda: #6B7A8D sobre fundo branco → contraste 4,0:1 ✓
          WCAG 1.4.11 exige ≥ 3:1 para componentes de UI.
          Anterior (#C8D5E8 sobre branco) = 1,5:1 — REPROVADO.
        */}
        <select
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none bg-[#EEF2F7] border-2 border-[#6B7A8D] rounded-lg px-3 py-2.5 pr-8 text-sm text-[#1A2332] font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-1 cursor-pointer"
        >
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-2.5 top-3 text-[#374151] pointer-events-none" aria-hidden />
      </div>
    </div>
  );
}

// Back link — consistent breadcrumb-style navigation (WCAG 2.4.8)
function BackLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <nav aria-label="Localização atual" className="mb-4">
      <ol className="flex items-center gap-1 text-sm" role="list">
        <li>
          <button
            onClick={onClick}
            className="inline-flex items-center gap-1.5 text-[#1B4F8A] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] rounded"
          >
            <ArrowLeft size={15} aria-hidden /> {label}
          </button>
        </li>
      </ol>
    </nav>
  );
}

// Action buttons row (Imprimir / PDF / Email + primary)
function ActionBar({ onPrimary, primaryLabel, primaryIcon: PrimaryIcon }: {
  onPrimary: () => void;
  primaryLabel: string;
  primaryIcon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean | "true" | "false" }>;
}) {
  return (
    <section aria-label="Ações" className="bg-white rounded-xl border border-[#C8D5E8] p-5 shadow-sm">
      <h2 className="text-xs font-bold text-[#1A2332] uppercase tracking-widest mb-4">Ações</h2>
      <div className="flex flex-wrap gap-3">
        {[
          { icon: Printer, label: "Imprimir", action: () => window.print() },
          { icon: Download, label: "Baixar PDF", action: () => {} },
          { icon: Mail, label: "Enviar E-mail", action: () => {} },
        ].map(({ icon: Icon, label, action }) => (
          <button
            key={label}
            onClick={action}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#EEF2F7] text-[#1A2332] border border-[#C8D5E8] hover:bg-[#D8E2EF] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2 transition-colors"
          >
            <Icon size={15} aria-hidden />
            {label}
          </button>
        ))}
        <button
          onClick={onPrimary}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#1B4F8A] text-white hover:bg-[#15407A] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2 transition-colors"
        >
          <PrimaryIcon size={15} aria-hidden />
          {primaryLabel}
        </button>
      </div>
    </section>
  );
}

// ─── Screen 1: Dashboard ──────────────────────────────────────────────────────

function DashboardScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [alertVisible, setAlertVisible] = useState(true);
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => { mainRef.current?.focus(); }, []);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      ref={mainRef}
      className="max-w-6xl mx-auto w-full px-6 py-8 outline-none"
      aria-label="Painel principal"
    >
      <h1 className="text-3xl font-bold text-[#1A2332] mb-6 font-['Source_Serif_4']">
        Olá, Maria! <span aria-hidden>👋</span>
      </h1>

      {/* ── Alertas Importantes ──────────────────────────────────────────────
          Cada alerta tem ícone diferente por TIPO (não apenas cor) para
          acessibilidade cognitiva — WCAG 1.4.1.
      */}
      {alertVisible && (
        <section
          role="alert"
          aria-label="Alertas importantes — 3 itens"
          className="mb-6 bg-white rounded-xl shadow-sm border border-[#C8D5E8] overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-3 bg-[#FFF0F0] border-b-2 border-[#C0392B]">
            <span className="font-bold text-sm text-[#7B1C1C] uppercase tracking-wide flex items-center gap-2">
              <AlertTriangle size={16} aria-hidden />
              Alertas Importantes
            </span>
            <button
              onClick={() => setAlertVisible(false)}
              aria-label="Fechar alertas importantes"
              className="p-1.5 rounded text-[#7B1C1C] hover:bg-[#FECACA] focus:outline-none focus:ring-2 focus:ring-[#C0392B] transition-colors"
            >
              <X size={16} aria-hidden />
            </button>
          </div>
          <ul className="divide-y divide-[#EEF2F7]" role="list">
            {/*
              Alerta de FREQUÊNCIA: ícone Calendar — distingue visualmente de "nota baixa"
              Alerta de NOTA: ícone BookOpen — distingue visualmente de "frequência"
              Aviso geral: ícone Info — hierarquia menor
              → Usuários com daltonismo ou TDAH identificam o tipo pelo ícone, não só pela cor
            */}
            {[
              {
                icon: Calendar,
                iconColor: "text-[#C0392B]",
                bg: "bg-white",
                tag: "Frequência",
                tagBg: "bg-[#FEE2E2] text-[#7B1C1C]",
                text: "João Silva: Frequência abaixo de 75% em Matemática",
                link: "frequencia" as Screen,
                linkLabel: "Ver frequência",
              },
              {
                icon: BookOpen,
                iconColor: "text-[#B45309]",
                bg: "bg-white",
                tag: "Nota Baixa",
                tagBg: "bg-[#FEF3C7] text-[#78350F]",
                text: "Ana Silva: Nota baixa em Português (4,5) — Recuperação",
                link: "boletim" as Screen,
                linkLabel: "Ver boletim",
              },
              {
                icon: Info,
                iconColor: "text-[#1B4F8A]",
                bg: "bg-white",
                tag: "Aviso",
                tagBg: "bg-[#EEF2F7] text-[#1A2332]",
                text: "Reunião de Pais: 15/03/2026 às 19h00 — Auditório principal",
                link: "avisos" as Screen,
                linkLabel: "Ver avisos",
              },
            ].map(({ icon: Icon, iconColor, bg, tag, tagBg, text, link, linkLabel }) => (
              <li key={tag} className={`flex items-start gap-3 px-5 py-3 ${bg}`}>
                <Icon size={16} className={`${iconColor} mt-0.5 flex-shrink-0`} aria-hidden />
                <div className="flex-1 min-w-0">
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded mb-1 ${tagBg}`}>
                    {tag}
                  </span>
                  <p className="text-sm font-medium text-[#1A2332] leading-snug">{text}</p>
                </div>
                <button
                  onClick={() => onNavigate(link)}
                  className="text-xs text-[#1B4F8A] font-bold underline underline-offset-2 flex-shrink-0 hover:text-[#15407A] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] rounded transition-colors"
                >
                  {linkLabel}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Meus Filhos ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="filhos-heading" className="mb-8">
        <h2 id="filhos-heading" className="text-xs font-bold text-[#1A2332] uppercase tracking-widest mb-3">
          Meus Filhos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Card Ana — estado de atenção */}
          <article
            className="bg-white rounded-xl shadow-sm border-2 border-[#F0C0C0] p-5 flex flex-col gap-3"
            aria-label="Ana Silva, 6º Ano — média em recuperação, frequência crítica"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#f2a024] flex items-center justify-center flex-shrink-0" aria-hidden>
                <span className="font-bold text-[#0f0f0f] text-lg font-['Source_Serif_4']">A</span>
              </div>
              <div>
                <p className="font-bold text-[#1A2332] text-base">Ana Silva</p>
                {/* text-[#1A2332] = 16,5:1 sobre branco ✓ AAA — elimina o "cinza claro ilegível" */}
                <p className="text-xs text-[#1A2332] font-medium mt-0.5">Turma: 6ºB - Manhã</p>
              </div>
              <span className="ml-auto text-[10px] font-bold text-[#C0392B] bg-[#FEE2E2] border border-[#F0C0C0] px-2 py-0.5 rounded-full">
                Atenção
              </span>
            </div>
            
            {/* Linha superior: Média Geral e Faltas (Larguras iguais entre si) */}
            <div className="grid grid-cols-2 gap-2">
              {/* Média em recuperação */}          
              <div className="bg-[#FFF8E1] border border-[#F0D080] rounded-lg px-3 py-2 flex flex-col justify-center">
                <p className="text-xs text-[#1A2332] font-bold uppercase tracking-wide">Média Geral</p>
                <p className="text-xl font-black text-[#78350F] flex items-center gap-1 mt-0.5" aria-label="Média 5,8 — recuperação">
                  <AlertTriangle size={16} aria-hidden /> 5,8
                </p>
              </div> 
              
              {/* Faltas críticas — label textual explícito, não só ícone/cor */}       
              <div className="bg-[#FFF0F0] border border-[#F0C0C0] rounded-lg px-3 py-2 flex flex-col justify-center">
                <p className="text-xs text-[#1A2332] font-bold uppercase tracking-wide">Faltas</p>
                <p className="text-xl font-black text-[#7B1C1C] flex items-center gap-1 mt-0.5" aria-label="8 faltas">
                  <AlertTriangle size={16} aria-hidden /> 8
                </p>
              </div>            
            </div>                          
            
            {/* Linha inferior: Três novos cards com larguras idênticas em uma única linha */}
            <div className="grid grid-cols-3 gap-2">
              {/* Card: Aprovação em */}
              <div className="bg-[#F0FFF4] border border-[#A8D5B5] rounded-lg px-3 py-2 flex flex-col justify-center">
                <p className="text-xs text-[#1A2332] font-bold uppercase tracking-wide leading-tight">Aprovação em:</p>
                <p className="text-xl font-black text-[#14532D] flex items-center gap-1 mt-0.5" aria-label="4 disciplinas aprovadas">
                  <Check size={16} aria-hidden /> 4
                </p>
              </div>

              {/* Card: Recuperação em */}
              <div className="bg-[#FFF8E1] border border-[#F0D080] rounded-lg px-3 py-2 flex flex-col justify-center">
                <p className="text-xs text-[#1A2332] font-bold uppercase tracking-wide leading-tight">Recuperação em:</p>
                <p className="text-xl font-black text-[#78350F] flex items-center gap-1 mt-0.5" aria-label="4 disciplinas em recuperação">
                  <AlertTriangle size={16} aria-hidden /> 4
                </p>
              </div>

              {/* Card: Reprovação em */}
              <div className="bg-[#F0FFF4] border border-[#A8D5B5] rounded-lg px-3 py-2 flex flex-col justify-center">
                <p className="text-xs text-[#1A2332] font-bold uppercase tracking-wide leading-tight">Reprovação em:</p>
                <p className="text-xl font-black text-[#14532D] flex items-center gap-1 mt-0.5" aria-label="0 disciplinas reprovadas">
                  <Check size={16} aria-hidden /> 0
                </p>
              </div>
            </div>        
      
            <button
              onClick={() => onNavigate("boletim")}
              className="mt-1 w-full py-2.5 bg-[#1B4F8A] text-white rounded-lg text-sm font-semibold hover:bg-[#15407A] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2 transition-colors"
              aria-label="Ver detalhes de Ana Silva no boletim"
            >
              Detalhes
            </button>
          </article>

          {/* Card João — estado de atenção */}
          <article
            className="bg-white rounded-xl shadow-sm border-2 border-[#F0C0C0] p-5 flex flex-col gap-3"
            aria-label="João Silva, 9º Ano — média satisfatória, frequência regular"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#4ea6d9] flex items-center justify-center flex-shrink-0" aria-hidden>
                <span className="font-bold text-[#0f0f0f] text-lg font-['Source_Serif_4']">J</span>
              </div>
              <div>
                <p className="font-bold text-[#1A2332] text-base">João Silva</p>
                {/* text-[#1A2332] = 16,5:1 sobre branco ✓ AAA */}
                <p className="text-xs text-[#1A2332] font-medium mt-0.5">Turma: 9ºA - Manhã</p>
              </div>
              <span className="ml-auto text-[10px] font-bold text-[#C0392B] bg-[#FEE2E2] border border-[#F0C0C0] px-2 py-0.5 rounded-full">
                Atenção
              </span>
            </div>
            
            {/* Linha superior: Média Geral e Faltas (Larguras iguais entre si) */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#F0FFF4] border border-[#A8D5B5] rounded-lg px-3 py-2 flex flex-col justify-center">
                <p className="text-xs text-[#1A2332] font-bold uppercase tracking-wide">Média Geral</p>
                <p className="text-xl font-black text-[#14532D] flex items-center gap-1 mt-0.5" aria-label="Média 7,0 — aprovado">
                  <Check size={16} aria-hidden /> 7,0
                </p>
              </div>                 
              <div className="bg-[#F0FFF4] border border-[#A8D5B5] rounded-lg px-3 py-2">
                <p className="text-xs text-[#1A2332] font-bold uppercase tracking-wide">Faltas</p>
                <p className="text-xl font-black text-[#14532D] flex items-center gap-1 mt-0.5" aria-label="5 faltas — 10 por cento — dentro do limite">
                  <Check size={16} aria-hidden /> 5
                </p>
                <p className="text-[10px] text-[#14532D] font-semibold mt-0.5"></p>
              </div>
            </div>

           {/* Linha inferior: Três novos cards com larguras idênticas em uma única linha */}
           <div className="grid grid-cols-3 gap-2">
              {/* Card: Aprovação em */}
              <div className="bg-[#F0FFF4] border border-[#A8D5B5] rounded-lg px-3 py-2 flex flex-col justify-center">
                <p className="text-xs text-[#1A2332] font-bold uppercase tracking-wide leading-tight">Aprovação em</p>
                <p className="text-xl font-black text-[#14532D] flex items-center gap-1 mt-0.5" aria-label="4 disciplinas aprovadas">
                  <Check size={16} aria-hidden /> 6
                </p>
              </div>

              {/* Card: Recuperação em */}
              <div className="bg-[#FFF8E1] border border-[#F0D080] rounded-lg px-3 py-2 flex flex-col justify-center">
                <p className="text-xs text-[#1A2332] font-bold uppercase tracking-wide leading-tight">Recuperação em</p>
                <p className="text-xl font-black text-[#78350F] flex items-center gap-1 mt-0.5" aria-label="2 disciplinas em recuperação">
                  <AlertTriangle size={16} aria-hidden /> 2
                </p>
              </div>

              {/* Card: Reprovação em */}
              <div className="bg-[#F0FFF4] border border-[#A8D5B5] rounded-lg px-3 py-2 flex flex-col justify-center">
                <p className="text-xs text-[#1A2332] font-bold uppercase tracking-wide leading-tight">Reprovação em:</p>
                <p className="text-xl font-black text-[#14532D] flex items-center gap-1 mt-0.5" aria-label="0 disciplinas reprovadas">
                  <Check size={16} aria-hidden /> 0
                </p>
              </div>
            </div> 
            
            <button
              onClick={() => onNavigate("boletim")}
              className="mt-1 w-full py-2.5 bg-[#1B4F8A] text-white rounded-lg text-sm font-semibold hover:bg-[#15407A] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2 transition-colors"
              aria-label="Ver detalhes de João Silva no boletim"
            >
              Detalhes
            </button>
          </article>

        </div>
      </section>

      {/* ── Menu Rápido ──────────────────────────────────────────────────────── */}
      <section aria-labelledby="menu-heading" className="mb-8">
        <h2 id="menu-heading" className="text-xs font-bold text-[#1A2332] uppercase tracking-widest mb-3">
          Menu Rápido
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { icon: FileText,      label: "Boletim",    screen: "boletim"    as Screen, badge: 0 },
            { icon: BookOpen,      label: "Notas",      screen: "notas"      as Screen, badge: 0 },
            { icon: Calendar,      label: "Frequência", screen: "frequencia" as Screen, badge: 0 },
            { icon: MessageSquare, label: "Avisos",     screen: "avisos"     as Screen, badge: 3 },
            { icon: Settings,      label: "Perfil",     screen: null,                   badge: 0 },
            { icon: HelpCircle,    label: "Suporte",    screen: null,                   badge: 0 },
          ].map(({ icon: Icon, label, screen, badge }) => {
            const disabled = screen === null;
            return (
              <button
                key={label}
                onClick={() => !disabled && onNavigate(screen!)}
                aria-label={
                  disabled ? `${label} — disponível em breve`
                  : badge > 0 ? `${label} — ${badge} não lido${badge > 1 ? "s" : ""}`
                  : label
                }
                aria-disabled={disabled ? "true" : undefined}
                className={`relative flex flex-col items-center gap-2 rounded-xl py-4 px-2 transition-all group
                  focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2
                  ${disabled
                    /* Desabilitado:
                       fundo #E8EDF5 + borda #6B7A8D + ícone #374151
                       Contraste ícone: #374151 / #E8EDF5 = 5,6:1 ✓ AA
                       Contraste texto: #374151 / #E8EDF5 = 5,6:1 ✓ AA
                       Borda: #6B7A8D / #E8EDF5 = 3,2:1 ✓ (≥ 3:1 WCAG 1.4.11) */
                    ? "bg-[#E8EDF5] border-2 border-[#6B7A8D] cursor-not-allowed"
                    : "bg-white border-2 border-[#C8D5E8] hover:bg-[#EEF2F7] hover:border-[#1B4F8A] cursor-pointer"
                  }`}
              >
                {disabled && (
                  <Lock size={9} className="absolute top-1.5 right-1.5 text-[#374151]" aria-hidden />
                )}
                <div className="relative">
                  <Icon
                    size={26}
                    className={disabled ? "text-[#374151]" : "text-[#1B4F8A] group-hover:text-[#15407A]"}
                    aria-hidden
                  />
                  {badge > 0 && (
                    <span aria-hidden className="absolute -top-1 -right-2 w-4 h-4 bg-[#C0392B] rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-bold transition-colors ${disabled ? "text-[#374151]" : "text-[#1A2332] group-hover:text-[#1B4F8A]"}`}>
                  {label}
                </span>
                {disabled && (
                  <span className="text-[10px] text-[#374151] font-medium leading-none">em breve</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

    </main>
  );
}

// ─── Screen 2: Boletim ───────────────────────────────────────────────────────

const boletimData = [
  { disciplina: "Português", professor: "Profa. Ana Costa", b1: 7.5, b2: 8.2, b3: 7.8, b4: null as null | number, media: 7.83, status: "aprovado" },
  { disciplina: "Matemática", professor: "Prof. Carlos Santos", b1: 6.5, b2: 7.0, b3: 6.8, b4: null, media: 6.77, status: "aprovado" },
  { disciplina: "Ciências", professor: "Profa. Maria Oliveira", b1: 8.0, b2: 7.5, b3: 8.2, b4: null, media: 7.90, status: "aprovado" },
  { disciplina: "História", professor: "Prof. Pedro Lima", b1: 7.0, b2: 6.5, b3: 7.2, b4: null, media: 6.90, status: "aprovado" },
  { disciplina: "Geografia", professor: "Profa. Lúcia Ferreira", b1: 5.0, b2: 4.5, b3: 5.5, b4: null, media: 5.00, status: "recuperacao" },
  { disciplina: "Ed. Física", professor: "Prof. Roberto Alves", b1: 9.0, b2: 9.5, b3: 9.0, b4: null, media: 9.17, status: "aprovado" },
  { disciplina: "Inglês", professor: "Profa. Carla Mendes", b1: 3.5, b2: 4.0, b3: 4.5, b4: null, media: 4.00, status: "recuperacao" },
  { disciplina: "Arte", professor: "Profa. Fernanda Costa", b1: 8.5, b2: 9.0, b3: 8.0, b4: null, media: 8.50, status: "aprovado" },
];

function BoletimScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [aluno, setAluno] = useState("João Silva Oliveira");
  const [ano, setAno] = useState("2026");
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => { mainRef.current?.focus(); }, []);

  const mediaGeral = (boletimData.reduce((a, b) => a + b.media, 0) / boletimData.length).toFixed(1);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      ref={mainRef}
      className="max-w-6xl mx-auto w-full px-6 py-8 outline-none"
      aria-label="Boletim escolar"
    >
      <BackLink label="Voltar ao Painel" onClick={() => onNavigate("dashboard")} />
      <h1 className="text-3xl font-bold text-[#1A2332] mb-6 font-['Source_Serif_4']">Boletim Escolar</h1>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-[#C8D5E8] p-5 mb-5 shadow-sm">
        <div className="flex flex-wrap gap-5">
          <div className="min-w-[200px]">
            <SelectField
              id="sel-aluno"
              label="Selecionar Aluno(a)"
              value={aluno}
              onChange={setAluno}
              options={["João Silva Oliveira", "Ana Silva Oliveira"]}
            />
          </div>
          <div className="min-w-[120px]">
            <SelectField
              id="sel-ano"
              label="Selecionar Ano"
              value={ano}
              onChange={setAno}
              options={["2026", "2025"]}
            />
          </div>
        </div>
      </div>

      {/* Resumo Geral */}
      <section aria-label="Resumo geral do aluno" className="bg-white rounded-xl border border-[#C8D5E8] p-5 mb-5 shadow-sm">
        <h2 className="text-xs font-bold text-[#1A2332] uppercase tracking-widest mb-4">Resumo Geral</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-xs text-[#374151] font-semibold mb-0.5">Série / Turma / Turno</p>
            <p className="font-bold text-[#1A2332] text-base">9º Ano A — Manhã</p>
          </div>
          <div>
            <p className="text-xs text-[#374151] font-semibold mb-0.5">Média Geral</p>
            <p className="font-bold text-[#1B6B3A] text-base flex items-center gap-1">
              <Check size={14} aria-hidden /> {mediaGeral}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#374151] font-semibold mb-0.5">Frequência</p>
            <p className="font-bold text-[#1B6B3A] text-base flex items-center gap-1">
              <Check size={14} aria-hidden /> 90%
            </p>
          </div>
          <div>
            <p className="text-xs text-[#374151] font-semibold mb-0.5">Situação Atual</p>
            <p className="font-bold text-[#7D4E00] text-base flex items-center gap-1">
              <AlertTriangle size={14} aria-hidden /> Recuperação  
            </p>
          </div>
        </div>
      </section>

      {/* Tabela */}
      <section aria-label="Notas por disciplina e bimestre" className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm mb-5 overflow-hidden">
        <div className="px-5 py-4 border-b border-[#EEF2F7]">
          <h2 className="text-xs font-bold text-[#1A2332] uppercase tracking-widest">Notas por Disciplina e Bimestre</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" aria-label={`Notas bimestrais de ${aluno} — ${ano}`}>
            <caption className="sr-only">Notas bimestrais de {aluno} no ano letivo de {ano}</caption>
            <thead>
              <tr className="bg-[#EEF2F7] border-b border-[#C8D5E8]">
                {["Disciplina","Professor(a)","1º Bim","2º Bim","3º Bim","4º Bim","Média","Status"].map(h => (
                  <th key={h} scope="col" className="text-left px-4 py-3 font-bold text-[#1A2332] text-xs uppercase tracking-wide first:pl-5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {boletimData.map((row, i) => (
                <tr key={row.disciplina} className={`border-b border-[#C8D5E8] hover:bg-[#EEF2F7] transition-colors ${i % 2 === 1 ? "bg-[#F8FAFD]" : "bg-white"}`}>
                  <td className="pl-5 pr-4 py-3 font-semibold text-[#1A2332]">{row.disciplina}</td>
                  {/* Professor: text-[#2D3748] = contraste 9,5:1 sobre branco ✓ AAA */}
                  <td className="px-4 py-3 text-[#2D3748]">{row.professor}</td>
                  <td className="px-4 py-3 text-center font-['JetBrains_Mono'] text-[#1A2332]">{row.b1.toFixed(1)}</td>
                  <td className="px-4 py-3 text-center font-['JetBrains_Mono'] text-[#1A2332]">{row.b2.toFixed(1)}</td>
                  <td className="px-4 py-3 text-center font-['JetBrains_Mono'] text-[#1A2332]">{row.b3.toFixed(1)}</td>
                  <td className="px-4 py-3 text-center font-['JetBrains_Mono'] text-[#374151]">{row.b4 != null ? row.b4.toFixed(1) : "—"}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge value={row.media} /></td>
                  {/*
                    Coluna Status: somente texto + cor.
                    O ícone já aparece na coluna Média (StatusBadge).
                    Repetir o ícone aqui geraria dois ⚠ na mesma linha.
                  */}
                  <td className="px-4 py-3 text-center">
                    {row.status === "aprovado"
                      ? <span className="inline-block bg-[#F0FFF4] border border-[#A8D5B5] text-[#1B6B3A] text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                          Aprovado
                        </span>
                      : row.status === "recuperacao"
                      ? <span className="inline-block bg-[#FFF8E1] border border-[#F0D080] text-[#7D4E00] text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                          Recuperação
                        </span>
                      : <span className="inline-block bg-[#FFF0F0] border border-[#F0C0C0] text-[#C0392B] text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                          Reprovado
                        </span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-[#C8D5E8]">
          <GradeLegend />
        </div>
      </section>

      <ActionBar
        onPrimary={() => onNavigate("notas")}
        primaryLabel="Ver Notas"
        primaryIcon={BookOpen}
      />
    </main>
  );
}

// ─── Screen 3: Notas Detalhadas ───────────────────────────────────────────────

const notasDataMap: Record<string, { avaliacao: string; tipo: string; peso: number; nota: number }[]> = {
  "1º Bimestre": [
    { avaliacao: "Prova 1", tipo: "Prova", peso: 3, nota: 8.0 },
    { avaliacao: "Trabalho do Filme", tipo: "Trabalho", peso: 1, nota: 9.0 },
    { avaliacao: "Seminário", tipo: "Seminário", peso: 1, nota: 7.5 },
  ],
  "2º Bimestre": [
    { avaliacao: "Prova 2", tipo: "Prova", peso: 3, nota: 7.8 },
    { avaliacao: "Projeto Literário", tipo: "Projeto", peso: 1, nota: 8.5 },
  ],
};

const disciplinasProfessores: Record<string, string> = {
  "Português": "Profa. Ana Costa",
  "Matemática": "Prof. Carlos Santos",
  "Ciências": "Profa. Maria Oliveira",
  "História": "Prof. Pedro Lima",
  "Geografia": "Profa. Lúcia Ferreira",
  "Ed. Física": "Prof. Roberto Alves",
  "Inglês": "Profa. Carla Mendes",
  "Arte": "Profa. Fernanda Costa",
};

function calcMedia(items: { peso: number; nota: number }[]) {
  const num = items.reduce((s, i) => s + i.nota * i.peso, 0);
  const den = items.reduce((s, i) => s + i.peso, 0);
  return num / den;
}

function NotasScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [alunoNd, setAlunoNd] = useState("João Silva Oliveira");
  const [anoNd, setAnoNd] = useState("2026");
  const [disciplina, setDisciplina] = useState("Português");
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => { mainRef.current?.focus(); }, []);

  const professor = disciplinasProfessores[disciplina] ?? "—";
  const mediaAtual = (
    Object.values(notasDataMap).reduce((s, items) => s + calcMedia(items), 0) /
    Object.keys(notasDataMap).length
  ).toFixed(1);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      ref={mainRef}
      className="max-w-6xl mx-auto w-full px-6 py-8 outline-none"
      aria-label="Notas detalhadas"
    >
      <BackLink label="Voltar ao Boletim" onClick={() => onNavigate("boletim")} />
      <h1 className="text-3xl font-bold text-[#1A2332] mb-6 font-['Source_Serif_4']">Notas Detalhadas</h1>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-[#C8D5E8] p-5 mb-4 shadow-sm">
        <div className="flex flex-wrap gap-5">
          <div className="min-w-[200px]">
            <SelectField id="nd-aluno" label="Selecionar Aluno(a)" value={alunoNd} onChange={setAlunoNd}
              options={["João Silva Oliveira","Ana Silva Oliveira"]} />
          </div>
          <div className="min-w-[110px]">
            <SelectField id="nd-ano" label="Selecionar Ano" value={anoNd} onChange={setAnoNd}
              options={["2026","2025"]} />
          </div>
          <div className="min-w-[180px]">
            <SelectField id="nd-disc" label="Selecionar Disciplina" value={disciplina} onChange={setDisciplina}
              options={Object.keys(disciplinasProfessores)} />
          </div>
        </div>
      </div>

      {/* Contexto — dois rows separados (fiel ao wireframe) */}
      <div className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm mb-4 overflow-hidden">
        <div className="px-5 py-3 border-b border-[#EEF2F7]">
          <p className="font-bold text-[#1A2332] text-base">9º Ano A — Manhã</p>
        </div>
        <div className="px-5 py-3 bg-[#F8FAFD]">
          <p className="font-bold text-[#1B4F8A] text-base">{disciplina} — {professor}</p>
        </div>
      </div>

      {/* Tabelas por bimestre */}
      {Object.entries(notasDataMap).map(([bim, items]) => {
        const media = calcMedia(items);
        return (
          <section key={bim} aria-label={`Notas do ${bim}`} className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm mb-4 overflow-hidden">
            <div className="px-5 py-4 border-b border-[#EEF2F7]">
              <h2 className="font-bold text-[#1A2332] text-lg font-['Source_Serif_4']">{bim}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" aria-label={`Avaliações de ${disciplina} no ${bim}`}>
                <caption className="sr-only">Avaliações de {disciplina} no {bim} — {alunoNd} — {anoNd}</caption>
                <thead>
                  <tr className="border-b border-[#EEF2F7] bg-[#FAFBFD]">
                    {["Avaliação","Tipo","Peso","Nota","Status"].map(h => (
                      <th key={h} scope="col" className={`py-3 font-bold text-[#1A2332] text-xs uppercase tracking-wide ${h === "Avaliação" || h === "Tipo" ? "text-left px-5" : "text-center px-4"}`}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                                  
                    <tr key={item.avaliacao} className="bg-white hover:bg-[#EEF2F7] transition-colors">
                      <td className="px-5 py-3 font-medium text-[#1A2332]">{item.avaliacao}</td>
                      <td className="px-5 py-3 text-[#2D3748]">{item.tipo}</td>
                      <td className="px-4 py-3 text-center font-['JetBrains_Mono'] text-[#1A2332]">{item.peso}</td>
                      <td className="px-4 py-3 text-center font-['JetBrains_Mono'] font-semibold text-[#1A2332]">{item.nota.toFixed(1)}</td>
                      <td className="px-4 py-3 text-center"><StatusBadge value={item.nota} iconOnly={true} /></td>
                    </tr>
                  ))}
                  <tr className="bg-[#F0F4FA] border-t-2 border-[#C8D5E8]">
                    <td colSpan={3} className="px-5 py-3 font-bold text-[#1A2332] text-sm">Média Ponderada:</td>
                    <td className="px-4 py-3 text-center font-bold font-['JetBrains_Mono'] text-[#1A2332] text-base">{media.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center"><StatusBadge value={media} iconOnly={true} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
       
    {/* CARD 2: Média Atual Isolada */}
      <div className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm mb-4 overflow-hidden">
        <div className="px-5 py-4 flex items-center gap-3">
          <span className="text-sm font-bold text-[#1A2332]">Média Atual:</span>
          <span className="text-xl font-bold text-[#1B6B3A] font-['JetBrains_Mono']">{mediaAtual}</span>
          <Check size={18} className="text-[#1B6B3A]" aria-label="Aprovado" />
        </div>
      </div>

      {/* CARD 3: Apenas a Legenda Visual */}
      <div className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm mb-4 overflow-hidden">
        <div className="px-5 py-4 bg-[#F8FAFD] flex flex-col">
          <p className="text-xs font-bold text-[#4A5568] mb-1.5 uppercase tracking-wide">Legenda:</p>
          <GradeLegend />
        </div>
      </div>

      {/* CARD 4: Apenas a Fórmula Utilizada */}
      <div className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm mb-4 overflow-hidden">
        <div className="px-5 py-4 bg-[#F8FAFD] flex flex-col">
          <p className="text-xs font-bold text-[#4A5568] mb-1.5 uppercase tracking-wide">Fórmula da média ponderada:</p>
          <code className="text-xs text-[#1A2332] font-['JetBrains_Mono'] bg-[#EEF2F7] border border-[#C8D5E8] rounded px-3 py-1.5 block w-fit">
            Σ(nota × peso) / Σ(peso)
          </code>
        </div>
      </div>
      
      
      <ActionBar onPrimary={() => onNavigate("boletim")} primaryLabel="Ver Boletim" primaryIcon={FileText} />
    </main>
  );
}

// ─── Screen 4: Frequência ─────────────────────────────────────────────────────

// March 2026: day 1 = Saturday → 6 leading empty cells
const calendarDays = [
  { day: 1, status: "-" },
  { day: 2, status: "P" }, { day: 3, status: "P" }, { day: 4, status: "P" },
  { day: 5, status: "P" }, { day: 6, status: "P" }, { day: 7, status: "-" },
  { day: 8, status: "-" }, { day: 9, status: "P" }, { day: 10, status: "P" },
  { day: 11, status: "F*" }, { day: 12, status: "P" }, { day: 13, status: "P" },
  { day: 14, status: "-" }, { day: 15, status: "-" }, { day: 16, status: "P" },
  { day: 17, status: "P" }, { day: 18, status: "P" }, { day: 19, status: "P" },
  { day: 20, status: "P" }, { day: 21, status: "-" }, { day: 22, status: "-" },
  { day: 23, status: "P" }, { day: 24, status: "F" }, { day: 25, status: "P" },
  { day: 26, status: "P" }, { day: 27, status: "P" }, { day: 28, status: "-" },
  { day: 29, status: "-" }, { day: 30, status: "P" }, { day: 31, status: "P" },
];

function FrequenciaScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [alunoFr, setAlunoFr] = useState("João Silva Oliveira");
  const [discFr, setDiscFr] = useState("Português");
  const [mesFr, setMesFr] = useState("Março");
  const [anoFr, setAnoFr] = useState("2026");
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => { mainRef.current?.focus(); }, []);

  const statusLabels: Record<string, string> = { P: "Presente", F: "Falta", "F*": "Falta Justificada", "-": "Sem aula" };


  function dayStyle(s: string) {
    // Verde Técnico Ultra Escuro (#0B4622) sobre Fundo Verde Claro (#E6F4EA)
    if (s === "P") return "bg-[#E6F4EA] border border-[#A3CFBB] text-[#0B4622]"; 

    // Vermelho Fechado Inclusivo (#7A1C1C) sobre Fundo Rosa (#FCE8E6)
    if (s === "F") return "bg-[#FCE8E6] border border-[#F5C2C7] text-[#7A1C1C]"; 

    // Mantém o excelente padrão de alto contraste original (Fundo Escuro / Texto Branco)
    if (s === "F*") return "bg-[#2D3748] border border-[#1A2332] text-white ring-2 ring-[#1A2332]";
  
    // Cinza Grafite (#2D3748) sobre Cinza Claro (#F1F3F5)
    return "bg-[#F1F3F5] border border-[#CED4DA] text-[#2D3748]";
    }
 
  return (
    <main
      id="main-content"
      tabIndex={-1}
      ref={mainRef}
      className="max-w-6xl mx-auto w-full px-6 py-8 outline-none"
      aria-label="Frequência e calendário"
    >
      <BackLink label="Voltar ao Painel" onClick={() => onNavigate("dashboard")} />

      {/* Título — banner com ícone ⓘ (fiel ao wireframe) */}
      <div className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm mb-4 px-5 py-3 flex items-center gap-2">
        <Info size={16} className="text-[#1B4F8A] flex-shrink-0" aria-hidden />
        <h1 className="text-base font-bold text-[#1A2332]">
          Frequência — {alunoFr} — {anoFr}
        </h1>
      </div>

      {/* Filtros — grid 4 colunas */}
      <div className="bg-white rounded-xl border border-[#C8D5E8] p-5 mb-4 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SelectField id="fr-aluno" label="Aluno" value={alunoFr} onChange={setAlunoFr}
            options={["João Silva Oliveira","Ana Silva Oliveira"]} />
          <SelectField id="fr-disc" label="Disciplina" value={discFr} onChange={setDiscFr}
            options={Object.keys(disciplinasProfessores)} />
          <SelectField id="fr-mes" label="Mês" value={mesFr} onChange={setMesFr}
            options={["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]} />
          <SelectField id="fr-ano" label="Ano" value={anoFr} onChange={setAnoFr}
            options={["2026","2025"]} />
        </div>
      </div>

      {/* CARD 1: Resumo do Mês */}
      <section aria-label="Resumo de frequência atual" className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm mb-4 overflow-hidden">
        <div className="px-5 py-3 border-b border-[#EEF2F7] flex items-center gap-2">
          <Info size={14} className="text-[#1B4F8A]" aria-hidden />
          <h2 className="text-sm font-bold text-[#1A2332]">Resumo de {mesFr}/{anoFr} </h2>
        </div>
        <ul className="divide-y divide-[#EEF2F7]" role="list">
          {[
            { label: "Presenças:", value: "18/20 (90%)", color: "#1B6B3A" },
            { label: "Faltas:", value: "02 (10%)", color: "#C0392B" },
            { label: "Faltas Justificadas:", value: "01", color: "#7D4E00" },
          ].map(({ label, value, color }) => (
            <li key={label} className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-[#1A2332]">{label}</span>
              <span className="font-bold font-['JetBrains_Mono'] text-base" style={{ color }}>{value}</span>
            </li>
          ))}
        </ul>
        </section>

      {/* CARD 2: Resumo Acumulado Anual e Metas */}
      <section aria-label="Resumo de frequência acumulada anual" className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm mb-4 overflow-hidden">
        <div className="px-5 py-3 border-b border-[#EEF2F7] flex items-center gap-2 bg-[#F8FAFC]">
          <Info size={14} className="text-[#1B4F8A]" aria-hidden />
          <h2 className="text-sm font-bold text-[#1A2332]">Balanço Anual Consolidado ({anoFr})</h2>
        </div>
        <ul className="divide-y divide-[#EEF2F7]" role="list">
          {[
            // Exemplo de dado acumulado anual vindo do seu backend (ex: acumulado de Janeiro a Março)
            { label: "Frequência Acumulada no Ano:", value: "93,5%", color: "#1B6B3A" },
            { label: "Mínimo de Frequência Exigido por Ano:", value: "75%", color: "#1B4F8A" },
          ].map(({ label, value, color }) => (
            <li key={label} className="flex items-center justify-between px-5 py-3 bg-[#F8FAFC]">
              <span className="text-sm font-medium text-[#1A2332]">{label}</span>
              <span className="font-bold font-['JetBrains_Mono'] text-base" style={{ color }}>{value}</span>
            </li>
          ))}
        </ul>
        </section>

      {/* Calendário */}
      <section aria-label={`Calendário de frequência — ${mesFr} de ${anoFr}`} className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm mb-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#EEF2F7]">
          <button aria-label="Mês anterior" className="p-1.5 rounded hover:bg-[#EEF2F7] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] transition-colors">
            <ChevronLeft size={18} className="text-[#1A2332]" aria-hidden />
          </button>
          <div className="flex gap-3 items-center">
            <span className="font-bold text-[#1A2332]">{mesFr}</span>
            <span className="font-bold text-[#4A5568] text-sm">{anoFr}</span>
          </div>
          <button aria-label="Próximo mês" className="p-1.5 rounded hover:bg-[#EEF2F7] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] transition-colors">
            <ChevronRight size={18} className="text-[#1A2332]" aria-hidden />
          </button>
        </div>
        <div className="p-4">
          {/* Cabeçalhos S T Q Q S S D */}
          <div className="grid grid-cols-7 gap-1 mb-2" aria-hidden>
            {[
              { abbr: "S", full: "Segunda" },{ abbr: "T", full: "Terça" }, 
              { abbr: "Q", full: "Quarta" },{ abbr: "Q", full: "Quinta" }, 
              { abbr: "S", full: "Sexta" }, { abbr: "S", full: "Sábado" },
              { abbr: "D", full: "Domingo" },
            ].map(({ abbr, full }, i) => (
              <abbr
                key={i}
                title={full}
                className="text-center text-xs font-bold text-[#4A5568] py-1 no-underline block"
              >
                {abbr}
              </abbr>
            ))}
          </div>
          {/* Grid com 6 células vazias + 31 dias */}
          <div className="grid grid-cols-7 gap-1" role="grid" aria-label={`Calendário de ${mesFr} de ${anoFr}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={`e${i}`} role="gridcell" aria-hidden className="min-h-[44px]" />
            ))}
            {calendarDays.map(({ day, status }) => (
              <div
                key={day}
                role="gridcell"
                aria-label={`Dia ${day} de ${mesFr}: ${statusLabels[status] ?? status}`}
                className={`rounded-md text-center min-h-[44px] flex flex-col items-center justify-center cursor-default transition-colors ${dayStyle(status)}`}
              >
             
                {/* CORREÇÃO REQUISITADA: Se o status for 'F*', o texto do número passa a ser branco puro (text-white). 
                  Caso contrário, ele mantém o cinza-grafite escuro de alto contraste original.
                  */}
                <span className={`text-[10px] font-bold leading-none mb-0.5 ${status === "F*" ? "text-white" : "text-[#1A2332]"}`}>
                  {day}</span>      
                <span className="font-bold text-[11px] leading-tight">[{status}]</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Legenda */}
        <div className="px-5 pb-5 pt-1">
          <p className="text-xs font-bold text-[#1A2332] uppercase tracking-wide mb-2">Legenda:</p>
          <div className="flex flex-wrap gap-3" role="list" aria-label="Legenda do calendário">
            {[
              { code: "P", label: "Presente", tc: "#1B6B3A", bg: "#F0FFF4", bd: "#A8D5B5" },
              { code: "F", label: "Falta", tc: "#C0392B", bg: "#FFF0F0", bd: "#F0C0C0" },
              { code: "F*", label: "Falta Justificada", tc: "#ffffff", bg: "#374151", bd: "#1A2332" },
              { code: "–", label: "Sem Aula", tc: "#4A5568", bg: "#EEF2F7", bd: "#C8D5E8" },
            ].map(({ code, label, tc, bg, bd }) => (
             
              <div key={code} role="listitem" className="flex items-center gap-1.5">
                <span
                  className="inline-flex items-center justify-center w-8 h-7 rounded text-xs font-bold border"
                  style={{ color: tc, backgroundColor: bg, borderColor: bd }}
                  aria-hidden
                >
                  {code}
                </span>
                <span className="text-xs text-[#1A2332] font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Justificativas */}
      <section aria-label="Justificativas registradas" className="bg-white rounded-xl border border-[#C8D5E8] p-5 shadow-sm mb-5">
        <h2 className="text-xs font-bold text-[#1A2332] uppercase tracking-widest mb-3">Justificativas Registradas</h2>
        <ul className="space-y-2" role="list">
          {[
            { date: "05/03/2026", dateIso: "2026-03-05", reason: "Atestado Médico", doc: "Anexo: 03-05_atestado.pdf" },
            { date: "11/03/2026", dateIso: "2026-03-11", reason: "Consulta com dentista", doc: null },
          ].map((j) => (
            <li key={j.dateIso} className="flex items-start gap-3 p-3 bg-[#EEF2F7] rounded-lg text-sm">
              <time dateTime={j.dateIso} className="font-bold text-[#1B4F8A] font-['JetBrains_Mono'] flex-shrink-0">{j.date}</time>
              <div>
                <span className="text-[#1A2332]">{j.reason}</span>
                {j.doc && (
                  <p className="text-[#4A5568] text-xs mt-0.5 flex items-center gap-1">
                    <Eye size={11} aria-hidden /> {j.doc}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#EEF2F7] text-[#1A2332] border border-[#C8D5E8] hover:bg-[#D8E2EF] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2 transition-colors">
          <FileText size={15} aria-hidden /> Solicitar Justificativa
        </button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#1B4F8A] text-white hover:bg-[#15407A] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2 transition-colors">
          <Printer size={15} aria-hidden /> Imprimir Extrato
        </button>
      </div>
    </main>
  );
}

// ─── Screen 5: Avisos ─────────────────────────────────────────────────────────

const avisosNaoLidos = [
  { id: 1, titulo: "IMPORTANTE: Reunião de Pais — 15/03/2026", categoria: "Importante" as const, remetente: "Direção da Escola", preview: "Comunicamos a todos os responsáveis que será realizada a reunião de pais e mestres no dia 15 de março de 2026, às 19h00, no auditório principal da escola. A presença é fundamental para discutirmos o desenvolvimento dos alunos no 1º bimestre.", data: "08/03/2026", dataIso: "2026-03-08" },
  { id: 2, titulo: "Alteração no Calendário Escolar", categoria: "Importante" as const, remetente: "Coordenação Pedagógica", preview: "O recesso de Carnaval foi antecipado para os dias 10 a 14 de fevereiro. As aulas serão repostas no sábado letivo do dia 25 de março.", data: "07/03/2026", dataIso: "2026-03-07" },
  { id: 3, titulo: "Circulação: Uniforme Novo em Breve", categoria: "Aviso" as const, remetente: "Departamento de Uniformes", preview: "Informamos que a partir de abril estará disponível o novo uniforme escolar. Mais informações serão enviadas em breve.", data: "05/03/2026", dataIso: "2026-03-05" },
];

const avisosLidos = [
  { id: 4, titulo: "Feriado: 21/03 — Tiradentes", data: "08/03/2026", dataIso: "2026-03-08" },
  { id: 5, titulo: "Promoção: Vale Refeição Especial", data: "01/03/2026", dataIso: "2026-03-01" },
];

function AvisosScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [lidos, setLidos] = useState<number[]>([]);
  const [expandidos, setExpandidos] = useState<number[]>([]);
  const [showLidos, setShowLidos] = useState(false);
  const [emailSub, setEmailSub] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => { mainRef.current?.focus(); }, []);

  const naoLidos = avisosNaoLidos.filter(a => !lidos.includes(a.id));
  const totalLidos = avisosLidos.length + lidos.length;

  const catStyle = (cat: string) =>
    cat === "Importante"
      ? "bg-[#FFF0F0] border border-[#F0C0C0] text-[#C0392B]"
      : "bg-[#EEF2F7] border border-[#C8D5E8] text-[#4A5568]";

  return (
    <main
      id="main-content"
      tabIndex={-1}
      ref={mainRef}
      className="max-w-4xl mx-auto w-full px-6 py-8 outline-none"
      aria-label="Avisos e comunicados"
    >
      <BackLink label="Voltar ao Painel" onClick={() => onNavigate("dashboard")} />
      <h1 className="text-3xl font-bold text-[#1A2332] mb-5 font-['Source_Serif_4']">Avisos e Comunicados</h1>

      {/* Filtros */}
      <div className="bg-white rounded-xl border border-[#C8D5E8] p-5 mb-4 shadow-sm">
        <div className="flex flex-wrap gap-5">
          <div className="min-w-[180px]">
            <SelectField id="av-tipo" label="Tipo" value="Todos" onChange={() => {}}
              options={["Todos","Importante","Aviso","Informativo"]} />
          </div>
          <div className="min-w-[180px]">
            <SelectField id="av-status" label="Status" value="Todos" onChange={() => {}}
              options={["Todos","Não Lidos","Lidos"]} />
          </div>
        </div>
      </div>

      {/* Tag ativa "Avisos Não Lidos" */}
      <div className="mb-5">
        <button
          aria-pressed={true}
          className="inline-flex items-center gap-2 px-4 py-1.5 border-2 border-[#1B4F8A] text-[#1B4F8A] bg-white rounded-full text-xs font-bold hover:bg-[#EEF2F7] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] transition-colors"
        >
          Avisos Não Lidos
          {naoLidos.length > 0 && (
            <span
              className="bg-[#1B4F8A] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold"
              aria-label={`${naoLidos.length} não lidos`}
            >
              {naoLidos.length}
            </span>
          )}
        </button>
      </div>

      {/* Não lidos */}
      <section aria-label="Avisos não lidos" aria-live="polite" className="space-y-4 mb-6">
        {naoLidos.map((aviso) => {
          const expanded = expandidos.includes(aviso.id);
          return (
            <article
              key={aviso.id}
              className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm overflow-hidden"
              aria-label={`Aviso: ${aviso.titulo}`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="flex items-start gap-2 flex-1 min-w-0">
                    <Info size={16} className="mt-0.5 flex-shrink-0 text-[#1B4F8A]" aria-hidden />
                    <h3 className="font-bold text-[#1A2332] text-sm leading-snug">{aviso.titulo}</h3>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-bold rounded flex-shrink-0 ${catStyle(aviso.categoria)}`}>
                    {aviso.categoria}
                  </span>
                </div>
                <p className="text-xs text-[#374151] font-medium mb-2 ml-6">De: {aviso.remetente}</p>
                <p
                  id={`aviso-body-${aviso.id}`}
                  className={`text-sm text-[#4A5568] mb-3 leading-relaxed ml-6 ${!expanded ? "line-clamp-3" : ""}`}
                >
                  {aviso.preview}
                </p>
                <div className="flex items-center gap-2 flex-wrap ml-6">
                  {/* "Ler completo" — sublinhado garante diferenciação visual além da cor (WCAG 1.4.1) */}
                  <button
                    onClick={() => setExpandidos(prev => prev.includes(aviso.id) ? prev.filter(i => i !== aviso.id) : [...prev, aviso.id])}
                    aria-expanded={expanded}
                    aria-controls={`aviso-body-${aviso.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1B4F8A] border border-[#1B4F8A] rounded-full hover:bg-[#EEF2F7] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] transition-colors underline underline-offset-2 decoration-[#1B4F8A]"
                  >
                    <Check size={11} aria-hidden />
                    {expanded ? "Recolher" : "Ler completo"}
                  </button>
                  <button
                    onClick={() => setLidos(prev => [...prev, aviso.id])}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#374151] border border-[#6B7A8D] rounded-full hover:bg-[#EEF2F7] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] transition-colors"
                  >
                    Marcar Como Lido
                  </button>
                </div>
                <time dateTime={aviso.dataIso} className="block mt-3 ml-6 text-xs text-[#374151] font-medium font-['JetBrains_Mono']">
                  {aviso.data}
                </time>
              </div>
            </article>
          );
        })}
        {naoLidos.length === 0 && (
          <div role="status" className="bg-white rounded-xl border border-[#C8D5E8] p-8 text-center shadow-sm">
            <CheckCircle size={28} className="text-[#1B6B3A] mx-auto mb-3" aria-hidden />
            <p className="font-semibold text-[#1A2332]">Tudo em dia!</p>
            <p className="text-xs text-[#4A5568] mt-1">Todos os avisos foram lidos.</p>
          </div>
        )}
      </section>

      {/* Já lidos — accordion */}
      <section aria-label="Avisos já lidos" className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm overflow-hidden mb-6">
        <button
          onClick={() => setShowLidos(!showLidos)}
          aria-expanded={showLidos}
          aria-controls="lidos-panel"
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-[#1A2332] hover:bg-[#F8FAFD] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1B4F8A] transition-colors"
        >
          <span>Avisos Já Lidos{totalLidos > 0 ? ` (${totalLidos})` : ""}</span>
          {showLidos ? <ChevronUp size={16} className="text-[#4A5568]" aria-hidden /> : <ChevronDown size={16} className="text-[#4A5568]" aria-hidden />}
        </button>
        {showLidos && (
          <ul id="lidos-panel" className="border-t border-[#C8D5E8]" role="list" aria-label="Lista de avisos já lidos">
            {[...avisosLidos, ...avisosNaoLidos.filter(a => lidos.includes(a.id))].map(a => (
              <li key={a.id} className="flex items-center justify-between px-5 py-3 border-b border-[#C8D5E8] last:border-0 hover:bg-[#EEF2F7] transition-colors">
                <span className="flex items-center gap-2 text-sm text-[#2D3748] min-w-0">
                  <ChevronRight size={12} className="text-[#C8D5E8] flex-shrink-0" aria-hidden />
                  <span className="truncate">{a.titulo}</span>
                </span>
                <time dateTime={a.dataIso} className="text-xs text-[#374151] font-medium flex-shrink-0 ml-3 font-['JetBrains_Mono']">{a.data}</time>
              </li>
            ))}
          </ul>
        )}
      </section>

      <label className="flex items-center gap-3 cursor-pointer group w-fit">
        <input
          type="checkbox"
          checked={emailSub}
          onChange={e => setEmailSub(e.target.checked)}
          className="w-4 h-4 rounded border-[#C8D5E8] accent-[#1B4F8A] focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2"
        />
        <span className="text-sm text-[#1A2332] group-hover:text-[#1B4F8A] transition-colors select-none">
          Inscrever-se em notificações por e-mail
        </span>
      </label>
    </main>
  );
}

// ─── Screen 6: Professor ─────────────────────────────────────────────────────

const alunosTurma = [
  { id: "001", nome: "Ana Silva Oliveira", iniciais: "AS" },
  { id: "002", nome: "Bruno Santos Lima", iniciais: "BS" },
  { id: "003", nome: "Carlos Eduardo Ferreira", iniciais: "CE" },
  { id: "004", nome: "Daniela Rodrigues Costa", iniciais: "DR" },
  { id: "005", nome: "Eduardo Melo Pereira", iniciais: "EM" },
  { id: "006", nome: "Fernanda Alves Souza", iniciais: "FA" },
  { id: "007", nome: "Gabriel Oliveira Martins", iniciais: "GO" },
  { id: "008", nome: "Helena Costa Barbosa", iniciais: "HC" },
  { id: "009", nome: "Igor Santos Gonçalves", iniciais: "IG" },
  { id: "010", nome: "Juliana Ferreira Rocha", iniciais: "JF" },
];

function ProfessorScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [tipoRegistro, setTipoRegistro] = useState<"notas" | "frequencia">("notas");
  const [notas, setNotas] = useState<Record<string, { b1: string; b2: string }>>({});
  const [presencas, setPresencas] = useState<Record<string, boolean>>(
    Object.fromEntries(alunosTurma.map(a => [a.id, true]))
  );
  const [showModal, setShowModal] = useState(false);
  const [publishedToast, setPublishedToast] = useState(false);
  const [draftToast, setDraftToast] = useState(false);
  const [dateFr, setDateFr] = useState("2026-03-19");
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => { mainRef.current?.focus(); }, []);

  const updateNota = (id: string, bim: "b1" | "b2", val: string) =>
    setNotas(prev => ({ ...prev, [id]: { ...(prev[id] ?? { b1: "", b2: "" }), [bim]: val } }));

  const notaValida = (val: string): boolean | null => {
    if (!val) return null;
    const n = parseFloat(val);
    return !isNaN(n) && n >= 0 && n <= 10;
  };

  const handlePublicar = () => {
    setShowModal(false);
    setPublishedToast(true);
    setTimeout(() => setPublishedToast(false), 5000);
  };

  const handleRascunho = () => {
    setDraftToast(true);
    setTimeout(() => setDraftToast(false), 3000);
  };

  const totalPresentes = Object.values(presencas).filter(Boolean).length;
  const totalFaltas = alunosTurma.length - totalPresentes;

  return (
    <main
      id="main-content"
      tabIndex={-1}
      ref={mainRef}
      className="max-w-6xl mx-auto w-full px-6 py-8 outline-none"
      aria-label="Painel do professor"
    >
      <BackLink label="Voltar ao Painel" onClick={() => onNavigate("dashboard")} />
      <h1 className="text-3xl font-bold text-[#1A2332] mb-1 font-['Source_Serif_4']">Área do Docente</h1>
      <p className="text-base text-[#4A5568] mb-6 font-medium">Lançamento Acadêmico — Profa. Ana Costa</p>

      {/* Toasts — aria-live para anunciar ao leitor de tela */}
      {publishedToast && (
        <div role="alert" aria-live="assertive" className="mb-4 flex items-center gap-3 bg-[#F0FFF4] border border-[#A8D5B5] text-[#1B6B3A] rounded-xl px-5 py-4 text-sm font-semibold shadow-sm">
          <CheckCircle size={18} className="flex-shrink-0" aria-hidden />
          Dados publicados com sucesso! Responsáveis já podem visualizar nas telas de Boletim e Frequência.
        </div>
      )}
      {draftToast && (
        <div role="status" aria-live="polite" className="mb-4 flex items-center gap-3 bg-[#EEF2F7] border border-[#C8D5E8] text-[#1A2332] rounded-xl px-5 py-4 text-sm font-semibold shadow-sm">
          <FileText size={18} className="flex-shrink-0" aria-hidden />
          Rascunho salvo. Os dados ainda não foram publicados para os responsáveis.
        </div>
      )}

      {/* Seletores de escopo */}
      <section aria-label="Seletores de escopo" className="bg-white rounded-xl border border-[#C8D5E8] p-5 mb-5 shadow-sm">
        <h2 className="text-xs font-bold text-[#1A2332] uppercase tracking-widest mb-4">Seletores de Escopo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <SelectField id="pr-turma" label="Selecionar Turma" value="9º Ano A — Manhã" onChange={() => {}}
            options={["9º Ano A — Manhã","6º Ano B — Manhã","8º Ano C — Tarde"]} />
          <SelectField id="pr-disc" label="Selecionar Disciplina" value="Português" onChange={() => {}}
            options={["Português","Literatura","Redação"]} />
          <div className="flex flex-col gap-1">
            <label htmlFor="pr-tipo" className="text-xs font-bold text-[#1A2332] uppercase tracking-wide">Tipo de Registro</label>
            <div className="relative">
              <select
                id="pr-tipo"
                value={tipoRegistro}
                onChange={e => setTipoRegistro(e.target.value as "notas" | "frequencia")}
                className="w-full appearance-none bg-[#EEF2F7] border-2 border-[#6B7A8D] rounded-lg px-3 py-2.5 pr-8 text-sm text-[#1A2332] font-medium focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] cursor-pointer"
              >
                <option value="notas">Notas / Avaliações</option>
                <option value="frequencia">Frequência Diária</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-3 text-[#4A5568] pointer-events-none" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* Modo Notas */}
      {tipoRegistro === "notas" && (
        <section aria-label="Lançamento de notas por aluno" className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm mb-5 overflow-hidden">
          <div className="px-5 py-4 border-b border-[#EEF2F7] flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-bold text-[#1A2332] text-sm">
              Lançamento de Notas — <span className="text-[#1B4F8A]">9º Ano A — Português</span>
            </h2>
            <span className="text-xs text-[#4A5568]" aria-live="polite">
              {Object.values(notas).filter(n => n?.b1 !== "" || n?.b2 !== "").length} / {alunosTurma.length} alunos com dados
            </span>
          </div>
          <p className="px-5 py-2 text-xs text-[#4A5568] bg-[#F8FAFD] border-b border-[#EEF2F7]" role="note">
            Digite valores entre 0,0 e 10,0. Campo fica verde se válido e vermelho se inválido.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Grade de notas — 9º Ano A — Português">
              <caption className="sr-only">Lançamento de notas do 9º Ano A em Português. Use Tab para navegar entre os campos.</caption>
              <thead>
                <tr className="bg-[#EEF2F7] border-b border-[#C8D5E8]">
                  <th scope="col" className="text-left px-5 py-3 font-bold text-[#1A2332] text-xs uppercase tracking-wide">Foto / Matrícula — Aluno</th>
                  <th scope="col" className="text-center px-4 py-3 font-bold text-[#1A2332] text-xs uppercase tracking-wide w-44">
                    Nota 1º Bimestre
                    <span className="block text-[10px] font-normal text-[#4A5568] normal-case tracking-normal">(0,0 – 10,0)</span>
                  </th>
                  <th scope="col" className="text-center px-4 py-3 font-bold text-[#1A2332] text-xs uppercase tracking-wide w-44">
                    Nota 2º Bimestre
                    <span className="block text-[10px] font-normal text-[#4A5568] normal-case tracking-normal">(0,0 – 10,0)</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {alunosTurma.map((aluno, i) => {
                  const v1 = notas[aluno.id]?.b1 ?? "";
                  const v2 = notas[aluno.id]?.b2 ?? "";
                  const ok1 = notaValida(v1);
                  const ok2 = notaValida(v2);
                  return (
                    <tr key={aluno.id} className={`border-b border-[#C8D5E8] ${i % 2 === 1 ? "bg-[#F8FAFD]" : "bg-white"}`}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#E8EDF5] flex items-center justify-center text-[#1B4F8A] font-bold text-xs flex-shrink-0" aria-hidden>
                            {aluno.iniciais}
                          </div>
                          <div>
                            <p className="font-semibold text-[#1A2332] text-sm">{aluno.nome}</p>
                            <p className="text-[10px] text-[#4A5568] font-['JetBrains_Mono']">Matrícula: {aluno.id}</p>
                          </div>
                        </div>
                      </td>
                      {[{ val: v1, bim: "b1" as const, ok: ok1 }, { val: v2, bim: "b2" as const, ok: ok2 }].map(({ val, bim, ok }) => (
                        <td key={bim} className="px-4 py-3">
                          <input
                            type="number"
                            min={0} max={10} step={0.1}
                            value={val}
                            onChange={e => updateNota(aluno.id, bim, e.target.value)}
                            placeholder="—"
                            aria-label={`Nota do ${bim === "b1" ? "1º" : "2º"} bimestre para ${aluno.nome}`}
                            aria-invalid={val !== "" && ok === false ? "true" : "false"}
                            aria-describedby={val !== "" && ok === false ? `err-${bim}-${aluno.id}` : undefined}
                            className={`w-full text-center font-['JetBrains_Mono'] font-semibold text-[#1A2332] rounded-lg px-3 py-2.5 text-sm border-2 focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-1 transition-all
                              ${val === "" ? "border-[#C8D5E8] bg-[#F0F4FA]" : ok ? "border-[#1B6B3A] bg-[#F0FFF4]" : "border-[#C0392B] bg-[#FFF0F0]"}`}
                          />
                          {val !== "" && ok === false && (
                            <p id={`err-${bim}-${aluno.id}`} role="alert" className="text-[10px] text-[#C0392B] mt-1 font-medium text-center">
                              ⚠ Insira valor entre 0 e 10
                            </p>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Modo Frequência */}
      {tipoRegistro === "frequencia" && (
        <section aria-label="Lançamento de frequência diária" className="bg-white rounded-xl border border-[#C8D5E8] shadow-sm mb-5 overflow-hidden">
          <div className="px-5 py-4 border-b border-[#EEF2F7] flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-bold text-[#1A2332] text-sm">
              Frequência Diária — <span className="text-[#1B4F8A]">9º Ano A — Português</span>
            </h2>
            <div className="flex items-center gap-2">
              <label htmlFor="pr-data" className="text-xs font-bold text-[#1A2332] uppercase tracking-wide">Data (AAAA-MM-DD):</label>
              <input
                type="date"
                id="pr-data"
                value={dateFr}
                onChange={e => setDateFr(e.target.value)}
                className="border-2 border-[#6B7A8D] rounded-lg px-3 py-1.5 text-sm text-[#1A2332] bg-[#EEF2F7] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] font-['JetBrains_Mono']"
              />
            </div>
          </div>
          {/* Barra de resumo em tempo real */}
          <div className="px-5 py-2 bg-[#F8FAFD] border-b border-[#EEF2F7] flex gap-4 text-xs font-medium" aria-live="polite" aria-atomic>
            <span className="text-[#1B6B3A] flex items-center gap-1">
              <Check size={12} aria-hidden /> Presentes: <strong className="font-['JetBrains_Mono'] ml-1">{totalPresentes}</strong>
            </span>
            <span className="text-[#C0392B] flex items-center gap-1">
              <X size={12} aria-hidden /> Faltas: <strong className="font-['JetBrains_Mono'] ml-1">{totalFaltas}</strong>
            </span>
          </div>
          <ul className="divide-y divide-[#C8D5E8]" role="list" aria-label="Lista de presença">
            {alunosTurma.map((aluno, i) => {
              const presente = presencas[aluno.id];
              return (
                <li key={aluno.id} className={`flex items-center justify-between px-5 py-3 transition-colors ${i % 2 === 1 ? "bg-[#FAFBFD]" : "bg-white"} hover:bg-[#F8FAFD]`}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors
                        ${presente ? "bg-[#F0FFF4] text-[#1B6B3A]" : "bg-[#FFF0F0] text-[#C0392B]"}`}
                      aria-hidden
                    >
                      {aluno.iniciais}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A2332] text-sm">{aluno.nome}</p>
                      <p className="text-[10px] text-[#4A5568] font-['JetBrains_Mono']">Matrícula: {aluno.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold min-w-[90px] text-right ${presente ? "text-[#1B6B3A]" : "text-[#C0392B]"}`}
                      aria-live="polite"
                      aria-atomic
                    >
                      {presente ? "[P] Presente" : "[F] Falta"}
                    </span>
                    <button
                      role="switch"
                      aria-checked={presente}
                      aria-label={`${aluno.nome}: alternar — atualmente ${presente ? "Presente" : "Falta"}`}
                      onClick={() => setPresencas(prev => ({ ...prev, [aluno.id]: !prev[aluno.id] }))}
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2
                        ${presente ? "bg-[#1B6B3A]" : "bg-[#C0392B]"}`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-150 ${presente ? "translate-x-8" : "translate-x-1"}`}
                        aria-hidden
                      />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Botões de controle
          Regra 60-30-10: "Publicar" usa 10% de cor de destaque (azul primário).
          Estado disabled mantém contraste ≥ 3:1 conforme WCAG 1.4.3.
      */}
      {(() => {
        const temDados = tipoRegistro === "notas"
          ? Object.values(notas).some(n => n?.b1 !== "" || n?.b2 !== "")
          : true; // frequência sempre tem dados (toggle switches já inicializados)

        const temErros = tipoRegistro === "notas"
          && Object.values(notas).some(n =>
              (n?.b1 !== "" && !notaValida(n.b1)) ||
              (n?.b2 !== "" && !notaValida(n.b2))
            );

        const podePublicar = temDados && !temErros;
        const podeRascunho = temDados;

        return (
          <>
            <div className="flex flex-wrap gap-3 mb-2">
              {/* Salvar Rascunho — neutro (30% paleta) */}
              <button
                onClick={podeRascunho ? handleRascunho : undefined}
                disabled={!podeRascunho}
                aria-disabled={!podeRascunho ? "true" : undefined}
                aria-label={
                  !podeRascunho
                    ? "Salvar Rascunho — indisponível: preencha ao menos um campo primeiro"
                    : "Salvar como rascunho — os dados não serão publicados para responsáveis ainda"
                }
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2
                  ${!podeRascunho
                    /* Disabled: #6B7A8D sobre #EEF2F7 → contraste 3,5:1 ✓ (≥ 3:1 WCAG AA) */
                    ? "bg-[#EEF2F7] text-[#6B7A8D] border-[#C8D5E8] cursor-not-allowed"
                    : "bg-[#EEF2F7] text-[#1A2332] border-[#C8D5E8] hover:bg-[#D8E2EF] cursor-pointer"
                  }`}
              >
                {!podeRascunho && <Lock size={14} aria-hidden />}
                Salvar Rascunho
              </button>

              {/* Publicar no Sistema — destaque primário (10% paleta) */}
              <button
                onClick={podePublicar ? () => setShowModal(true) : undefined}
                disabled={!podePublicar}
                aria-disabled={!podePublicar ? "true" : undefined}
                aria-label={
                  temErros
                    ? "Publicar no Sistema — indisponível: corrija os campos com erro antes de publicar"
                    : !temDados
                      ? "Publicar no Sistema — indisponível: preencha os dados da tabela primeiro"
                      : "Publicar no sistema — confirmação será exibida antes do envio"
                }
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2
                  ${!podePublicar
                    /* Disabled: #6B7A8D sobre #D0D8E8 → contraste ~3,2:1 ✓
                       O cadeado + borda tracejada reforçam o estado sem depender só da cor */
                    ? "bg-[#D0D8E8] text-[#4A5568] border-2 border-dashed border-[#8899BB] cursor-not-allowed"
                    : "bg-[#1B4F8A] text-white hover:bg-[#15407A] shadow-sm cursor-pointer"
                  }`}
              >
                {!podePublicar && <Lock size={14} aria-hidden />}
                Publicar no Sistema
              </button>
            </div>

            {/* Mensagem contextual de estado — não depende só da cor */}
            {!podePublicar && (
              <p className="text-xs text-[#4A5568] flex items-center gap-1.5 mb-1" role="note" aria-live="polite">
                <Lock size={11} aria-hidden />
                {temErros
                  ? "Corrija os campos marcados em vermelho antes de publicar."
                  : "Preencha ao menos um campo da tabela para habilitar a publicação."}
              </p>
            )}
            <p className="text-xs text-[#4A5568]" role="note">
              Ao publicar, os dados são enviados imediatamente para o painel dos responsáveis.
            </p>
          </>
        );
      })()}

      {/* Modal de confirmação — Heurística #5: Prevenção de Erros */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onKeyDown={e => e.key === "Escape" && setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} aria-hidden />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-[#C8D5E8] overflow-hidden">
            <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-[#EEF2F7]">
              <div className="w-10 h-10 rounded-full bg-[#FFF8E1] border border-[#F0D080] flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={20} className="text-[#7D4E00]" aria-hidden />
              </div>
              <h2 id="modal-title" className="font-bold text-[#1A2332] text-lg font-['Source_Serif_4']">Confirmar Publicação</h2>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Fechar diálogo"
                className="ml-auto p-1.5 rounded-lg text-[#4A5568] hover:bg-[#EEF2F7] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] transition-colors"
              >
                <X size={16} aria-hidden />
              </button>
            </div>
            <div className="px-6 py-5">
              <p id="modal-desc" className="text-sm text-[#1A2332] leading-relaxed">
                Deseja confirmar a publicação? Os dados serão enviados imediatamente para o painel dos responsáveis{" "}
                <strong>(Maria)</strong> nas Telas de <strong>Boletim</strong> e <strong>Frequência</strong>.
              </p>
              <p className="text-xs text-[#4A5568] mt-3 p-3 bg-[#FFF8E1] border border-[#F0D080] rounded-lg">
                ⚠ Esta ação não pode ser desfeita diretamente. Verifique os dados antes de confirmar.
              </p>
            </div>
            <div className="flex gap-3 justify-end px-6 pb-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-[#4A5568] border-2 border-[#C8D5E8] hover:bg-[#EEF2F7] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] transition-colors"
              >
                Cancelar
              </button>
              <button
                autoFocus
                onClick={handlePublicar}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-[#1B4F8A] text-white hover:bg-[#15407A] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A] focus:ring-offset-2 transition-colors shadow-sm"
              >
                Sim, Publicar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  /*
    Paleta do rodapé — fundo #1A2332 (muito escuro, L≈0.013):
    • text-white (#FFF, L=1.0)  → contraste 15,3:1 ✓ AAA
    • text-[#B8C9E0]            → contraste 6,8:1 ✓ AA  (anterior text-blue-200 = 9,7:1 ✓, ok)
    • text-[#8FA8C8] (links)    → contraste 4,7:1 ✓ AA  (anterior text-blue-300 = 6,0:1 ✓, ok)
    Mudança principal: remover tons que o parecer identificou como muito claros,
    padronizar em branco puro para texto e #B8C9E0 para secundário.
  */
  return (
    <footer id="footer" role="contentinfo" className="mt-auto w-full bg-[#1A2332] text-white py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-8 mb-6">
          <div>
            <p className="font-bold text-white font-['Source_Serif_4'] text-lg mb-1">TrAcEs</p>
            {/* text-white sobre #1A2332 → 15,3:1 ✓ AAA */}
            <p className="text-white text-xs opacity-80">Trilha de Acompanhamento Estudantil</p>
            <p className="text-white text-xs opacity-70 mt-1">Versão 1.0 MVP · WCAG 2.1 AA</p>
          </div>
          <nav aria-label="Links rápidos do rodapé">
            {/* Cabeçalho de seção: branco opaco (contraste alto) */}
            <p className="text-xs font-bold text-white uppercase tracking-wide mb-2">Navegação</p>
            <ul className="space-y-1.5">
              {[
                { key: "dashboard" as Screen, label: "Painel Principal" },
                { key: "boletim" as Screen, label: "Boletim Escolar" },
                { key: "frequencia" as Screen, label: "Frequência" },
                { key: "avisos" as Screen, label: "Avisos" },
              ].map(({ key, label }) => (
                <li key={key}>
                  {/*
                    Links: text-white + underline — dupla codificação (cor + sublinhado).
                    Sublinhado é obrigatório quando o link está em contexto de texto.
                    Contraste: branco sobre #1A2332 = 15,3:1 ✓ AAA
                  */}
                  <button
                    onClick={() => onNavigate(key)}
                    className="text-xs text-white underline underline-offset-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded transition-opacity"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wide mb-2">Conformidade</p>
            <ul className="space-y-1.5 text-xs text-white opacity-80">
              <li>WCAG 2.1 Nível AA</li>
              <li>10 Heurísticas de Nielsen</li>
              <li>Contraste mínimo 4,5:1</li>
              <li>Navegação por teclado</li>
            </ul>
          </div>
        </div>
        {/* Copyright: branco com opacidade reduzida — ainda passa AA */}
        <div className="border-t border-white/20 pt-4 text-xs text-white opacity-70 text-center">
          © 2026 TrAcEs — Trilha de Acompanhamento Escolar. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [highContrast, setHighContrast] = useState(false);

  // Live region for screen title — announces page change to screen readers (WCAG 2.4.2)
  const [announcement, setAnnouncement] = useState("");

  const toggleContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    // Apply/remove high-contrast class on <html> for full-page CSS override
    document.documentElement.classList.toggle("high-contrast", next);
  };

  const navigate = (s: Screen) => {
    setScreen(s);
    setAnnouncement(screenTitles[s]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear announcement after SR has read it
  useEffect(() => {
    if (!announcement) return;
    const t = setTimeout(() => setAnnouncement(""), 1000);
    return () => clearTimeout(t);
  }, [announcement]);

  return (
    <div
      className={`min-h-screen flex flex-col font-['Inter'] ${
        highContrast ? "bg-black text-yellow-200" : "bg-[#EEF2F7] text-[#1A2332]"
      }`}
    >
      {/* Screen-reader live region for page title announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic
        className="sr-only"
      >
        {announcement}
      </div>

      <AccessibilityBar highContrast={highContrast} onToggleContrast={toggleContrast} />
      <Header onNavigate={navigate} currentScreen={screen} highContrast={highContrast} />

      <div className="flex-1 w-full py-2">
        {screen === "dashboard"  && <DashboardScreen  onNavigate={navigate} />}
        {screen === "boletim"    && <BoletimScreen    onNavigate={navigate} />}
        {screen === "notas"      && <NotasScreen      onNavigate={navigate} />}
        {screen === "frequencia" && <FrequenciaScreen onNavigate={navigate} />}
        {screen === "avisos"     && <AvisosScreen     onNavigate={navigate} />}
        {screen === "professor"  && <ProfessorScreen  onNavigate={navigate} />}
      </div>

      <Footer onNavigate={navigate} />
    </div>
  );
}
