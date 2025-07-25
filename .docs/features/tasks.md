# Feature: Tasks Management

## Clarified Objectives

- Implement a task management feature with:
  - Tasks related to a World and 1+ Users (author, assignees)
  - Custom statuses and tags (user-editable)
  - Priorities (low, medium, high; editable by author only)
  - Kanban and list views (Kanban columns = statuses, cards ordered by priority)
  - Drag-n-drop in Kanban (react-dnd, latest)
  - Flat, plain-text comments
  - History of all changes except comments
  - Tasks and comments visible to all users in a World
  - Frontend visuals matching the provided design
  - All Prisma schema for tasks in task.prisma
  - No notifications, no threaded comments, no markdown/attachments, no test code

## Sequential Breakdown

### Data Modelling (Backend)

- Create task.prisma with:
  - Task, TaskStatus, TaskTag, TaskPriority, TaskHistory, TaskComment models
  - Relations: Task ↔ World, Task ↔ Users (author, assignees), Task ↔ Status, Tag, Priority, History, Comments
- API Endpoints
  - CRUD for Tasks, Statuses, Tags, Priorities, Comments, and History
  - Endpoints for Kanban/List views (filtering, sorting by priority)
- Frontend State & Data
  - State management for tasks, statuses, tags, priorities, comments, and history
  - Data fetching/mutation hooks
- UI/UX Implementation
  - Kanban board (react-dnd, latest)
  - List view
  - Task details (history, comments, assignees, tags, priority)
  - Visuals matching the provided design

## Concrete Steps & Deliverables

### Steps

- Backend Data Modelling
  - Create backend/prisma/schema/task.prisma with all required models and relations
- Backend API
  - Implement endpoints for all CRUD operations and Kanban/List data
- Frontend State & Data
  - Implement data fetching/mutation logic
- Frontend UI/UX
  - Build Kanban and List views
  - Implement drag-n-drop with react-dnd
  - Build task details, comments, and history UI

### Deliverables

- task.prisma file
- Backend API endpoints
- Frontend Kanban/List UI
- No test files

## Impacted Files

- backend/prisma/schema/task.prisma (new)
- Backend API files (to be created/modified)
- Frontend: likely new/modified files in frontend/src/pages/, frontend/src/services/, frontend/src/components/

## Dependencies & Obstacles

- Dependencies: User and World models, authentication, react-dnd, i18n (future)
- Obstacles: Ensuring drag-n-drop is robust, history tracking, design fidelity
