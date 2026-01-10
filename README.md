A lógica de ordenação de tarefas no arquivo sortTasks.ts utiliza uma métrica composta por relevância, simplicidade e urgência, com pesos definidos na constante tableScore. A função getScore calcula uma pontuação ponderada com base nesses critérios, e a função sortScoredTasks ordena as tarefas de acordo com essa pontuação, priorizando as tarefas com maior pontuação (mais relevantes, simples e urgentes).

Especificamente, a prioridade de tarefas é determinada pela soma ponderada dessas três métricas, onde:

Relevância e urgência têm peso maior (0.3 e 0.8, respectivamente).
Simplicidade tem peso menor (0.6).
A ordenação é feita de forma decrescente, ou seja, tarefas com maior pontuação aparecem primeiro, indicando maior prioridade.

```tsx
import { Task } from './types/_Task'
interface Metric {
  relevance: number
  simplicity: number
  urgency: number
}

const tableScore: Metric = {
  simplicity: 0.6,
  relevance: 0.3,
  urgency: 0.8,
}

export function getScore(p: Metric) {
  const score = Object.entries(p).map(([key, value]) => {
    return tableScore[key as keyof typeof tableScore] * value
  })
  return score.reduce((a, b) => a + b)
}

interface Sortable {
  relevance?: number
  simplicity?: number
  urgency?: number
}

export function sortScoredTasks(tasks: Task[]) {
  const sorted = tasks.sort((a, b) => {
    const scoreA = getScore({
      relevance: Number(a.folder?.relevance || a.relevance || 0),
      simplicity: a.simplicity || 0,
      urgency: Number(a.folder?.urgency || a.urgency || 0),
    })
    const scoreB = getScore({
      relevance: Number(b.folder?.relevance || b.relevance || 0),
      simplicity: b.simplicity || 0,
      urgency: Number(b.folder?.urgency || b.urgency || 0),
    })
    return scoreB - scoreA
  })

  return sorted
}
```

---

A estrutura de pastas e projetos no sistema funciona de forma hierárquica, onde as pastas (folders) atuam como categorias ou agrupamentos de tarefas e projetos. Cada pasta possui atributos que podem ser herdados ou passados para as tarefas (tasks) contidas nela, como relevância, urgência, prioridade, entre outros. Isso permite uma organização mais eficiente, onde atributos globais podem influenciar o comportamento e a visualização das tarefas dentro de uma pasta.

O funcionamento do sistema de tarefas é baseado em uma sequência, onde ao marcar uma tarefa como concluída, o sistema automaticamente exibe a próxima tarefa na sequência, ao invés de mostrar todas de uma vez. Essa abordagem facilita o foco do usuário na tarefa atual, promovendo uma execução mais controlada e organizada, especialmente em fluxos de trabalho que dependem de uma ordem específica de execução.

Resumindo:
- Pastas atuam como categorias ou agrupamentos com atributos que influenciam tarefas.
- Tarefas possuem atributos próprios, que podem ser herdados ou sobrescritos pelas pastas.
- O sistema exibe uma tarefa de cada vez na sequência, avançando para a próxima ao concluir a atual.
- Essa lógica ajuda a manter o foco e a organização, evitando sobrecarga de informações.


O aplicativo organiza tarefas em uma estrutura hierárquica, onde pastas (folders) e projetos têm atributos que influenciam o comportamento das tarefas, como relevância, urgência, e atributos adicionais. Essas informações passam para as tarefas, que podem estar relacionadas a uma sequência de ações, onde ao marcar uma tarefa, a próxima na sequência é exibida, facilitando o fluxo de trabalho sequencial.

### Funcionalidades principais do core do app:
- **Gestão de pastas e projetos**: Pastas podem conter atributos que influenciam a prioridade das tarefas, e projetos agrupam tarefas relacionadas.
- **Tarefas sequenciais**: Quando uma tarefa é concluída, o sistema exibe automaticamente a próxima tarefa na sequência, não todas de uma vez, promovendo foco e organização.
- **Atributos de tarefas**: Relevância, urgência, simplicidade, que podem passar de pastas ou projetos para tarefas específicas.
- **Carregamento e exibição**: Usa hooks e APIs para carregar tarefas e projetos, e o componente `DashBoard` gerencia a visualização e o fluxo de tarefas.

### Trechos de código relevantes:
```tsx
const dataTasks = useTasks('64de7201df61c3c518e7a83b', { inMainView: true })
const { data: stepTasks } = useQuery<StepTask[]>(['stepTasks'], async () => {
  const { data } = await axiosNextApi.get<StepTask[]>('/tasks?dashboard=true')
  return data
})
let tasks: Task[] = []
if (stepTasks) tasks = [...tasks, ...stepTasks]
if (dataTasks?.tasks) tasks = [...tasks, ...dataTasks?.tasks]
```
- O componente `DashBoard` que gerencia a visualização e o fluxo de tarefas.

---

A funcionalidade "Done Today" no aplicativo exibe todas as tarefas concluídas no dia, independentemente de estarem dentro de uma pasta ou projeto. Essa visualização mostra o histórico de tarefas finalizadas, proporcionando uma visão geral do que foi realizado no dia, facilitando o acompanhamento do progresso diário.

Essa abordagem ajuda a manter o foco na produtividade diária, além de oferecer uma maneira rápida de revisar tarefas concluídas, mesmo que estejam agrupadas em diferentes pastas ou projetos.


---

Dashboard & Home Page (src/pages/index.tsx + DashBoard.tsx)
Hardcoded user ID (64de7201df61c3c518e7a83b) for data loading (likely dev/default user).
Merges stepTasks (dashboard=true API) + main view tasks (inMainView: true).
Daily Productivity Score: Breakdown of summed metrics from today's done tasks (relevance + urgency + simplicity*0.4), color-coded progress vs. dailyGoal (green >=100%, yellow >=60%, red <60%). Icons for metrics (FaBolt simplicity, FaBullseye relevance, FaFire urgency).
Todo Section: Sorted undone tasks (or recurring not done today), paginated/sliced (default 9, expandable), grid layout.
Projects Grid: Lists projects with images, names, progress bars (ProjectItem).
Filtering: Excludes today's recurring done tasks from todo list.
CRUD & Data Management
React Query Hooks:
useTasks: Fetches/filterable tasks, full CRUD (create/update/delete) with optimistic UI updates, invalidates related queries (tasks, stepTasks, subtasks by parentId).
Similar hooks: useFolders, useProjects, useStepTasks, useTasksIn, useFolder, useProject.
Zustand Stores: useTaskStore (selected task, task ID, historic), useFolderStore.
API Routes (Next.js): /api/tasks (CRUD), /api/folders (list/get/duplicate/tasks-by-folder), /api/projects, /api/users.
Axios wrappers (axiosApi, axiosNextApi) for frontend/backend calls.
Task Handling Details
Subtasks/Nested Tasks: parentId links, fetched/filtered separately (useTasksIn?), TodoStep.tsx for sequential subtasks.
Recurring Tasks: Daily reset logic (is_recurring && doneDate checks if done today).
Due Date Prioritization: Home shows tasks with dueDate == today or inMainView=true (from idea.txt).
Toggle Done: Updates done/doneDate, optimistic, advances sequences.
UI/UX Components (Atomic Design)
Atoms: Buttons (Add/Delete/Done/Simple/Toggle), Input, Container (grid/paginated), Group, SquareImg.
Molecules: Header, ProjectItem (progress), SideBar (navigation?).
Organisms: WrapperApp (layout), TaskModal/FolderModal (create/edit), WrapperTaskModal.
Components: todo.tsx (TodoItem), TodoStep (steps).
Templates: DashBoard, ProjectTemplate.tsx.
Tailwind CSS, React Icons, React Modal.
Other Pages & Views
/inbox.tsx: Likely unassigned/all tasks inbox.
/note.tsx: Notes functionality (separate from tasks?).
/project/[id].tsx: Project details, tasks/folders within.
Backend & Config
Custom server (server.js, middlewares.js).
Legacy FaunaDB (fauna.ts), json-server (dev DB mock?).
Scripts: dev/front-back with concurrently, Prisma generate postinstall.
Mocks: projectsMock.json.
Integrations & Utils
doneDayScore.ts: Metric summation for daily score.
tableTrindade.ts: Unknown scoring table (likely custom weights).
Habitica folder: Possible integration.
Tags: Planned (idea.txt: tasks_by_tag index).


O aplicativo trabalha com tarefas que podem existir dentro ou fora de pastas. A diferença entre esses dois cenários não afeta o funcionamento do sistema, apenas a origem dos atributos usados no cálculo de prioridade.

Quando uma tarefa está dentro de uma pasta, ela possui apenas o atributo de simplicidade definido diretamente nela. Os outros dois atributos — relevância e urgência — pertencem à pasta. Esses valores são herdados pela tarefa automaticamente, já que a pasta atua como um contexto global para todas as tarefas que ela contém.

Quando uma tarefa está fora de qualquer pasta, ela passa a ter os três atributos diretamente associados a ela: relevância, urgência e simplicidade.

Se uma tarefa for removida de uma pasta, ela deixa de herdar os atributos da pasta e volta a possuir os três atributos de forma independente, como qualquer tarefa fora de pasta.

Do ponto de vista do aplicativo, não existe distinção operacional entre esses casos. Internamente, toda tarefa sempre é tratada como se tivesse os três atributos. Quando ela está dentro de uma pasta, dois desses valores vêm da pasta (relevância e urgência) e um vem da própria tarefa (simplicidade). Ou seja, mesmo uma tarefa “interna” funciona como se tivesse sua própria relevância, urgência e simplicidade — apenas com a origem desses dados distribuída entre tarefa e pasta.

Essa abordagem mantém o modelo simples, consistente e flexível, permitindo que pastas definam contexto estratégico enquanto as tarefas definem o esforço individual, sem impactar a lógica de ordenação ou execução do sistema.