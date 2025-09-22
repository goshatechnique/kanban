import { defineStore } from 'pinia'
import type { Task, ID } from './types'

interface TasksStore {
  tasks: Task[]
}

export const useTasksStore = defineStore('tasks', {
  state: (): TasksStore => ({
    tasks: [
      {
        id: 1,
        taskName: 'Crowdfunding',
        columnId: 1,
        subtasks: [
          {
            id: 1,
            subtaskName: 'Find',
            isComplete: true,
          },
          {
            id: 2,
            subtaskName: 'Money',
            isComplete: false,
          },
        ],
      },
      {
        id: 2,
        taskName: 'Design',
        columnId: 1,
        subtasks: [],
      },
      {
        id: 3,
        taskName: 'Model View Preview',
        columnId: 2,
        subtasks: [],
      },
    ],
  }),
  actions: {
    createTask(task: Task) {
      this.tasks.push(task)
      console.log(this.tasks)
    },
  },
  getters: {
    getTasks(state) {
      return function (tasksIds: ID[]) {
        return state.tasks.filter((task) => tasksIds.includes(task.id))
      }
    },
  },
})
