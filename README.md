<p align="center">
  <a href="https://www.atriajr.com.br/" target="blank"><img src="https://www.atriajr.com.br/wp-content/uploads/2020/08/atria_simbolo_branco_CMYK-3-1024x970.png" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">APA — Atria Project Assignor</h1>

<p align="center">
  Sistema de atribuição e gerenciamento de projetos para membros da <strong>Atria Jr.</strong>, construído com <a href="https://nestjs.com" target="_blank">NestJS</a> e TypeScript.
</p>

---

## Sobre o projeto

O **APA (Atria Project Assignor/Atribuidor de Projetos da Atria)** é o backend responsável por organizar a distribuição de projetos entre os membros da empresa júnior Atria Jr. Ele permite cadastrar membros, criar projetos, adicionar colaboradores a esses projetos, criar tarefas e notificar automaticamente os colaboradores via caixa de entrada (inbox) sempre que uma nova tarefa é criada.

---

## Funcionalidades

- **Cadastro de membros** com cargo (assessorx, coordenadorx, diretorx) e criação automática de inbox
- **Criação de projetos** com slug único gerado automaticamente
- **Atribuição de colaboradores** a projetos por e-mail
- **Criação de tarefas** com prioridade (alta, normal, baixa) vinculadas a projetos
- **Notificações automáticas** via inbox para todos os colaboradores do projeto ao criar uma tarefa

---

## Arquitetura

O sistema é dividido em cinco módulos principais:

```mermaid
graph TD
  A[MembersModule] -->|cria inbox| B[InboxesModule]
  C[ProjectsModule] -->|gerencia| D[CollaboratorsModule]
  C -->|gerencia| E[TasksModule]
  D -->|usa| A
  E -->|emite evento task.created| B
  B -->|usa| D
```

---

## Modelo de dados

```mermaid
erDiagram
  MEMBER {
    uuid id PK
    string name
    string email
    string role
  }
  INBOX {
    uuid id PK
  }
  MESSAGE {
    uuid id PK
    string content
    boolean read
    datetime createdAt
  }
  PROJECT {
    uuid id PK
    string name
    string slug
    string description
    datetime createdAt
    datetime updatedAt
  }
  COLLABORATOR {
    uuid id PK
    datetime createdAt
  }
  TASK {
    uuid id PK
    string name
    string description
    string priority
    datetime createdAt
  }

  MEMBER ||--|| INBOX : "possui"
  INBOX ||--o{ MESSAGE : "contém"
  PROJECT ||--o{ COLLABORATOR : "tem"
  PROJECT ||--o{ TASK : "tem"
  MEMBER ||--o{ COLLABORATOR : "participa como"
```

---

## Fluxo principal

### Cadastro de membro e criação de inbox

```mermaid
sequenceDiagram
  actor Cliente
  participant MembersController
  participant MembersService
  participant InboxesService

  Cliente->>MembersController: POST /members
  MembersController->>MembersService: register(dto)
  MembersService->>MembersService: verifica e-mail duplicado
  MembersService->>MembersService: cria Member (transação)
  MembersService->>InboxesService: create(member)
  InboxesService-->>MembersService: Inbox criada
  MembersService-->>MembersController: Member
  MembersController-->>Cliente: 201 Member
```

### Criação de tarefa e notificação de colaboradores

```mermaid
sequenceDiagram
  actor Cliente
  participant ProjectsController
  participant ProjectsService
  participant TasksService
  participant EventEmitter
  participant InboxesService
  participant CollaboratorsService

  Cliente->>ProjectsController: POST /projects/:id/tasks
  ProjectsController->>ProjectsService: addTask(projectId, dto)
  ProjectsService->>TasksService: create(project, dto)
  TasksService->>TasksService: salva Task no banco
  TasksService->>EventEmitter: emit('task.created', TaskCreatedEvent)
  EventEmitter->>InboxesService: handleTaskCreatedEvent(event)
  InboxesService->>CollaboratorsService: findAllByProjectIdWithMemberInbox(projectId)
  CollaboratorsService-->>InboxesService: lista de colaboradores
  InboxesService->>InboxesService: cria Message para cada colaborador
  InboxesService-->>EventEmitter: mensagens salvas
  TasksService-->>ProjectsService: Task
  ProjectsService-->>ProjectsController: Task
  ProjectsController-->>Cliente: 201 Task
```

### Adição de colaboradores a um projeto

```mermaid
sequenceDiagram
  actor Cliente
  participant ProjectsController
  participant ProjectsService
  participant CollaboratorsService
  participant MembersService

  Cliente->>ProjectsController: POST /projects/:id/collaborators
  ProjectsController->>ProjectsService: addCollaborators(projectId, dto)
  ProjectsService->>CollaboratorsService: addToProject(project, dto)
  loop Para cada e-mail
    CollaboratorsService->>MembersService: findByEmail(email)
    alt Membro encontrado
      CollaboratorsService->>CollaboratorsService: verifica duplicidade
      CollaboratorsService->>CollaboratorsService: salva Collaborator
    else Membro não encontrado
      CollaboratorsService-->>CollaboratorsService: registra falha
    end
  end
  CollaboratorsService-->>ProjectsService: CollaboratorInviteResult[]
  ProjectsService-->>ProjectsController: resultados
  ProjectsController-->>Cliente: 200 resultados
```

---

## Endpoints da API

### Membros

| Método | Rota       | Descrição              |
|--------|------------|------------------------|
| POST   | `/members` | Cadastra um novo membro |

### Projetos

| Método | Rota                          | Descrição                              |
|--------|-------------------------------|----------------------------------------|
| POST   | `/projects`                   | Cria um novo projeto                   |
| GET    | `/projects`                   | Lista todos os projetos                |
| GET    | `/projects/:id`               | Busca projeto por ID                   |
| POST   | `/projects/:id/collaborators` | Adiciona colaboradores ao projeto      |
| GET    | `/projects/:id/collaborators` | Lista colaboradores do projeto         |
| POST   | `/projects/:id/tasks`         | Cria uma tarefa no projeto             |
| GET    | `/projects/:id/tasks`         | Lista tarefas do projeto               |

---

## Cargos disponíveis

| Valor          | Descrição     |
|----------------|---------------|
| `assessorx`    | Assessorx     |
| `coordenadorx` | Coordenadorx  |
| `diretorx`     | Diretorx      |

## Prioridades de tarefa

| Valor    | Descrição |
|----------|-----------|
| `high`   | Alta      |
| `normal` | Normal    |
| `low`    | Baixa     |

---

## Tecnologias

- [NestJS](https://nestjs.com/) — framework Node.js
- [TypeORM](https://typeorm.io/) — ORM para banco de dados
- [SQLite](https://www.sqlite.org/) — banco de dados local
- [nanoid](https://github.com/ai/nanoid) — geração de IDs únicos para slugs
- [@nestjs/event-emitter](https://docs.nestjs.com/techniques/events) — sistema de eventos para notificações

---

## Configuração do projeto

```bash
npm install
```

## Executar o projeto

```bash
# desenvolvimento
npm run start

# modo watch
npm run start:dev

# produção
npm run start:prod
```

## Testes

```bash
# testes unitários
npm run test

# testes e2e
npm run test:e2e

# cobertura
npm run test:cov
```

---

## Licença

Este projeto está sob a licença MIT.
