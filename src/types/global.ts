export interface Subtask {
  title: string
  isComplete: boolean
}

export interface Task {
  id: number | string
  title: string
  subtasks: Subtask[]
}
