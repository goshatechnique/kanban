export type ID = number | string

export interface Board {
  id: ID
  boardName: string
  columnsOrder: ID[]
}

export interface Column {
  id: ID
  columnName: string
  boardId: ID
  tasksOrder: ID[]
}

export interface Task {
  id: ID
  taskName: string
  columnId: ID
  subtasks: Subtask[]
}

export interface Subtask {
  id: ID
  subtaskName: string
  isComplete: boolean
}
