"""
Sistema de Acompanhamento Escolar
Demonstração prática do sistema acadêmico

Execução:
    python main.py
"""

import os
import sys
from datetime import date, timedelta
from decimal import Decimal

# Configurar encoding UTF-8 no Windows
if sys.platform == 'win32':
    import locale
    if sys.stdout.encoding != 'utf-8':
        # getattr é uma forma segura de chamar um método que pode não existir
        reconfigure_stdout = getattr(sys.stdout, 'reconfigure', None)
        if reconfigure_stdout:
            reconfigure_stdout(encoding='utf-8')

        reconfigure_stderr = getattr(sys.stderr, 'reconfigure', None)
        if reconfigure_stderr:
            reconfigure_stderr(encoding='utf-8')

# Adicionar diretório raiz ao path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from src.infrastructure.database import (
    get_database,
    StudentRepository,
    TeacherRepository,
    ParentRepository,
    ClassroomRepository,
    GradeRepository,
    AttendanceRepository,
    AssessmentRepository
)

from src.application.services import (
    ServicosDoAluno, ServicosSecretaria
)

from src.domain.models import Student, Teacher, Parent, Assessment, Grade, Attendance, Classroom
from src.domain.models import Bimester, AssessmentType, EducationLevel, Shift


# ========================================
# FUNÇÕES AUXILIARES
# ========================================

def print_header(title, subtitle=""):
    """Imprime cabeçalho."""
    print("\n" + "=" * 70)
    print(title.center(70))
    if subtitle:
        print(subtitle.center(70))
    print("=" * 70)

def print_separator(text):
    """Imprime separador."""
    print(f"\n{'-' * 50}")
    print(f"{text}")
    print(f"{'-' * 50}")

def print_success(text):
    """Imprime mensagem de sucesso."""
    print(f"✅ {text}")

def print_error(text):
    """Imprime mensagem de erro."""
    print(f"❌ {text}")

def create_sample_student(name, registration, email):
    """Cria estudante de exemplo."""
    return Student(name=name, registration=registration, email=email)

def create_sample_classroom(year, identifier, shift, level):
    """Cria turma de exemplo."""
    return Classroom(year=year, identifier=identifier, shift=shift, level=level)

def create_sample_assessment(title, subject, description, assessment_type, weight, bimester, assessment_date, academic_year=2024):
    """Cria avaliação de exemplo."""
    return Assessment(
        title=title, subject=subject, description=description,
        assessment_type=assessment_type, weight=weight,
        assessment_date=assessment_date, bimester=bimester,
        academic_year=academic_year
    )


print_header(
    "PAINEL DE ACOMPANHAMENTO ESCOLAR",
    "Gestão Acadêmica | Python 3.10+ | SQLite"
)


# ========================================
# 1. INICIALIZAÇÃO DO BANCO DE DADOS
# ========================================

print_separator("Inicializando Banco de Dados")

db = get_database()

# Resetar banco para garantir dados limpos a cada execução
if os.path.exists(db.db_path):
    db.reset_database()

db.initialize_database()
print_success(f"Banco de dados criado: {db.db_path}")

# Verificar tabelas
conn = db.get_connection()
cursor = conn.cursor()
cursor.execute("SELECT COUNT(*) as count FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
table_count = cursor.fetchone()['count']
conn.close()
print_success(f"{table_count} tabelas disponíveis")


# ========================================
# 2. INSTANCIAR REPOSITÓRIOS
# ========================================

print_separator("Instanciando Repositórios")

# Obter database manager
db = get_database()

student_repo = StudentRepository(db)
teacher_repo = TeacherRepository(db)
parent_repo = ParentRepository(db)
assessment_repo = AssessmentRepository(db)
grade_repo = GradeRepository(db)
attendance_repo = AttendanceRepository(db)
classroom_repo = ClassroomRepository(db)

print("✅ StudentRepository")
print("✅ TeacherRepository")
print("✅ ParentRepository")
print("✅ AssessmentRepository")
print("✅ GradeRepository")
print("✅ AttendanceRepository")
print("✅ ClassroomRepository")


# ========================================
# 3. INSTANCIAR SERVIÇOS
# ========================================

print("\n" + "=" * 70)
print("Injetando Dependências nos Serviços")
print("=" * 70)

srv_aluno = ServicosDoAluno(grade_repo, assessment_repo, student_repo, attendance_repo)
secretaria = ServicosSecretaria(student_repo, classroom_repo, parent_repo)

print("✅ ServicosDoAluno")
print("✅ ServicosSecretaria")


# ========================================
# 4. POPULAR DADOS DE EXEMPLO
# ========================================

print("\n" + "=" * 70)
print("Populando Dados de Exemplo")
print("=" * 70)

# 4.1 Professor
print("\n👨‍🏫 Criando professor...")
professor = Teacher(name="Carlos Mendes", email="carlos.mendes@escola.com", registration="PROF001", subjects=["Matemática", "Física"])
teacher_repo.save(professor)
assert professor.id is not None
print_success(f"{professor.name} (ID: {professor.id}) - Disciplinas: {', '.join(professor.subjects)}")

# Demonstrar métodos de disciplinas
professor.add_subject("Geometria")
teacher_repo.save(professor)
print_success(f"Disciplina adicionada: Geometria → [{', '.join(professor.subjects)}]")
print_success(f"Leciona Matemática? {professor.teaches_subject('Matemática')}")
print_success(f"Leciona História? {professor.teaches_subject('História')}")
professor.remove_subject("Geometria")
teacher_repo.save(professor)
print_success(f"Disciplina removida: Geometria → [{', '.join(professor.subjects)}]")

# 4.2 Responsáveis
print("\n👪 Criando responsáveis...")
responsavel1 = Parent(name="Roberto Silva", email="roberto.silva@email.com", cpf="52998224725", phone="(85) 99999-0001")
responsavel2 = Parent(name="Ana Santos", email="ana.santos@email.com", cpf="11144477735", phone="(85) 99999-0002")
parent_repo.save(responsavel1)
assert responsavel1.id is not None
parent_repo.save(responsavel2)
assert responsavel2.id is not None
print_success(f"{responsavel1.name} (ID: {responsavel1.id}) - CPF: {responsavel1.cpf}")
print_success(f"{responsavel2.name} (ID: {responsavel2.id}) - CPF: {responsavel2.cpf}")

# 4.3 Estudantes
print("\n📚 Criando estudantes...")
aluno1 = create_sample_student(name="João Silva", registration="2024001", email="joao.silva@escola.com")
aluno2 = create_sample_student(name="Maria Santos", registration="2024002", email="maria.santos@escola.com")
aluno3 = create_sample_student(name="Pedro Costa", registration="2024003", email="pedro.costa@escola.com")

student_repo.save(aluno1)
assert aluno1.id is not None
student_repo.save(aluno2)
assert aluno2.id is not None
student_repo.save(aluno3)
assert aluno3.id is not None

for aluno in [aluno1, aluno2, aluno3]:
    print_success(f"{aluno.name} (ID: {aluno.id})")

# 4.4 Turma
print("\n🏫 Criando turma...")
turma = create_sample_classroom(
    year="6º Ano",
    identifier="A",
    shift=Shift.MANHA,
    level=EducationLevel.FUNDAMENTAL_II
)
turma.teacher_id = professor.id
classroom_repo.save(turma)
assert turma.id is not None
print_success(f"{turma.year}{turma.identifier} - {turma.shift.value} (ID: {turma.id}) - Prof. {professor.name}")

# 4.5 Matrículas (via ServicosSecretaria)
print("\n📝 Matriculando estudantes...")
secretaria.matricular_aluno(aluno1.id, turma.id, 2024)
secretaria.matricular_aluno(aluno2.id, turma.id, 2024)
secretaria.matricular_aluno(aluno3.id, turma.id, 2024)
print_success("3 estudantes matriculados na turma 6ºA")

# 4.6 Vínculos Responsável-Aluno
print("\n🔗 Vinculando responsáveis aos alunos...")
secretaria.vincular_responsavel(responsavel1.id, aluno1.id, "Pai")
secretaria.vincular_responsavel(responsavel2.id, aluno2.id, "Mãe")
secretaria.vincular_responsavel(responsavel2.id, aluno3.id, "Mãe")
print_success(f"{responsavel1.name} → {aluno1.name} (Pai)")
print_success(f"{responsavel2.name} → {aluno2.name} (Mãe)")
print_success(f"{responsavel2.name} → {aluno3.name} (Mãe)")

# 4.7 Avaliações
print("\n📋 Criando avaliações...")
prova1 = create_sample_assessment(
    title="Prova de Matemática - 1º Bim",
    subject="Matemática",
    description="Equações do 1º grau",
    assessment_type=AssessmentType.PROVA,
    weight=Decimal("3.0"),
    bimester=Bimester.PRIMEIRO,
    assessment_date=date(2024, 3, 15)
)

trabalho1 = create_sample_assessment(
    title="Trabalho de Matemática - 1º Bim",
    subject="Matemática",
    description="Pesquisa sobre Pitágoras",
    assessment_type=AssessmentType.TRABALHO,
    weight=Decimal("1.0"),
    bimester=Bimester.PRIMEIRO,
    assessment_date=date(2024, 3, 20)
)

assessment_repo.save(prova1)
assert prova1.id is not None
assessment_repo.save(trabalho1)
assert trabalho1.id is not None
print_success(f"{prova1.title} (peso {prova1.weight})")
print_success(f"{trabalho1.title} (peso {trabalho1.weight})")


# ========================================
# 5. DEMONSTRAÇÕES DOS SERVIÇOS
# ========================================

print("\n" + "=" * 70)
print("Demonstrações dos Serviços")
print("=" * 70)

# Lançar Notas
print("\n🎯 Lançando notas...")
try:
    srv_aluno.lancar_nota(
        student_id=aluno1.id,
        assessment_id=prova1.id,
        score=8.5,
        graded_by="Prof. Carlos"
    )
    print_success(f"{aluno1.name}: Nota 8.5 em {prova1.title}")
    
    srv_aluno.lancar_nota(
        student_id=aluno1.id,
        assessment_id=trabalho1.id,
        score=9.0,
        graded_by="Prof. Carlos"
    )
    print_success(f"{aluno1.name}: Nota 9.0 em {trabalho1.title}")
    
    srv_aluno.lancar_nota(
        student_id=aluno2.id,
        assessment_id=prova1.id,
        score=7.5,
        graded_by="Prof. Carlos"
    )
    print_success(f"{aluno2.name}: Nota 7.5 em {prova1.title}")
    
except ValueError as e:
    print_error(f"Erro: {e}")

# Testar validação de nota máxima
print("\n⚠️  Testando validação (nota > max_score)...")
try:
    srv_aluno.lancar_nota(
        student_id=aluno3.id,
        assessment_id=prova1.id,
        score=11.0,
        graded_by="Prof. Carlos"
    )
    print_error("Erro: deveria ter sido rejeitado!")
except ValueError as e:
    print_success(f"Validação funcionou: {e}")

# Calcular Média Bimestral
print("\n📊 Calculando média bimestral ponderada...")
media = srv_aluno.calcular_media_bimestral(
    student_id=aluno1.id,
    subject="Matemática",
    bimester=Bimester.PRIMEIRO,
    year=2024
)
print(f"✅ {aluno1.name}: Média = {media:.2f}")
print(f"   Fórmula: (8.5 × 3 + 9.0 × 1) / (3 + 1) = {media:.2f}")

# Registrar Frequência
print("\n✅ Registrando frequência...")
data_aula = date.today() - timedelta(days=2)

presenca1 = Attendance(
    student=aluno1,
    subject="Matemática",
    attendance_date=data_aula,
    is_present=True
)
attendance_repo.save(presenca1)
print_success(f"{aluno1.name}: Presente em Matemática ({data_aula.strftime('%d/%m')})")

falta1 = Attendance(
    student=aluno2,
    subject="Matemática",
    attendance_date=data_aula,
    is_present=False
)
attendance_repo.save(falta1)
print_success(f"{aluno2.name}: Faltou em Matemática ({data_aula.strftime('%d/%m')})")

# Justificar falta
print("\n📝 Justificando falta...")
falta1.justify("Atestado médico")
attendance_repo.save(falta1)
print_success(f"{aluno2.name}: Falta justificada - {falta1.justification}")

# Consultar Extrato de Presença
print("\n📋 Consultando extrato de presença...")
extrato = srv_aluno.consultar_extrato(
    student_id=aluno1.id,
    subject="Matemática",
    start_date=date.today() - timedelta(days=10),
    end_date=date.today()
)
print(f"✅ {aluno1.name}:")
print(f"   Total de aulas: {extrato.total_aulas}")
print(f"   Presenças: {extrato.presencas}")
print(f"   Percentual: {extrato.percentual_presenca:.1f}%")

# Gerar Boletim
print("\n📊 Gerando boletim...")
boletim = srv_aluno.gerar_boletim(
    student_id=aluno1.id,
    subject="Matemática",
    year=2024
)
print(f"✅ {aluno1.name} - {boletim.disciplina}:")
print(f"   1º Bim: {boletim.media_1bim:.2f}")
print(f"   Situação: {boletim.situacao}")

# Consultar vínculos
print("\n🔍 Consultando vínculos...")
alunos_da_ana = secretaria.listar_alunos_do_responsavel(responsavel2.id)
print_success(f"Alunos de {responsavel2.name}: IDs {alunos_da_ana}")
resps_do_joao = secretaria.listar_responsaveis_do_aluno(aluno1.id)
print_success(f"Responsáveis de {aluno1.name}: IDs {resps_do_joao}")

# Desvincular responsável
print("\n✂️  Desvinculando responsável...")
secretaria.desvincular_responsavel(responsavel2.id, aluno3.id)
print_success(f"{responsavel2.name} desvinculada de {aluno3.name}")
alunos_da_ana = secretaria.listar_alunos_do_responsavel(responsavel2.id)
print_success(f"Alunos restantes de {responsavel2.name}: IDs {alunos_da_ana}")

# Consultar repositórios (find_by_id / list_all)
print("\n🔎 Consultando repositórios...")
aluno_encontrado = student_repo.find_by_id(aluno1.id)
assert aluno_encontrado is not None
print_success(f"find_by_id({aluno1.id}): {aluno_encontrado.name} - {aluno_encontrado.email}")
todos_alunos = student_repo.list_all()
print_success(f"list_all(): {len(todos_alunos)} estudantes ativos")

# Desativar / Ativar aluno
print("\n🔄 Desativando e reativando aluno...")
aluno3.deactivate()
student_repo.save(aluno3)
ativos = student_repo.list_all()
print_success(f"{aluno3.name} desativado → {len(ativos)} ativos")
aluno3.activate()
student_repo.save(aluno3)
ativos = student_repo.list_all()
print_success(f"{aluno3.name} reativado → {len(ativos)} ativos")


# ========================================
# 6. ESTATÍSTICAS DO BANCO
# ========================================

print("\n" + "=" * 70)
print("Estatísticas do Banco de Dados")
print("=" * 70)

conn = db.get_connection()
cursor = conn.cursor()

stats = {}
for table in ['students', 'teachers', 'teacher_subjects', 'parents', 'student_parent', 'classrooms', 'classroom_enrollments', 'assessments', 'grades', 'attendance']:
    cursor.execute(f"SELECT COUNT(*) as count FROM {table}")
    stats[table] = cursor.fetchone()['count']

conn.close()

print("\nRegistros por tabela:")
print(f"   Estudantes: {stats['students']}")
print(f"   Professores: {stats['teachers']}")
print(f"   Disciplinas: {stats['teacher_subjects']}")
print(f"   Responsáveis: {stats['parents']}")
print(f"   Vínculos (resp-aluno): {stats['student_parent']}")
print(f"   Turmas: {stats['classrooms']}")
print(f"   Matrículas: {stats['classroom_enrollments']}")
print(f"   Avaliações: {stats['assessments']}")
print(f"   Notas: {stats['grades']}")
print(f"   Frequência: {stats['attendance']}")



# ========================================
# 7. RESUMO FINAL
# ========================================

print("\n" + "=" * 70)
print("RESUMO DA DEMONSTRAÇÃO")
print("=" * 70)

print("""
✅ MODELOS:
   - 7 entidades + 4 enums (models.py)
   - Validações em Python (utils.py)

✅ SERVIÇOS:
   - Notas, médias e boletim
   - Frequência e faltas
   - Matrículas e vínculos

✅ BANCO DE DADOS:
   - 7 repositórios (database.py)
   - SQLite com schema.sql
   - Dados iniciais pré-carregados
""")

print("=" * 70)
print("DEMONSTRAÇÃO CONCLUÍDA COM SUCESSO!")
print(f"Banco de dados: {db.db_path}")
print("=" * 70)
