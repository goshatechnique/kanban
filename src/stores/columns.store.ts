import { defineStore } from 'pinia'
import type { Column, ID } from './types'

interface ColumnsStore {
  columns: Column[]
}

export const useColumnsStore = defineStore('columns', {
  state: (): ColumnsStore => ({
    columns: [
      {
        id: 1,
        columnName: 'First Column',
        boardId: 1,
        tasksOrder: [1, 2],
      },
      {
        id: 2,
        columnName: 'Second Column',
        boardId: 1,
        tasksOrder: [3],
      },
    ],
  }),
  actions: {
    updateTasksOrder(columnId: ID, taskId: ID) {
      const column = this.columns.find((col) => col.id === columnId)
      if (column) {
        column.tasksOrder.push(taskId)
      }
    },
    createColumn(column: Column) {
      this.columns.push(column)
    },
    updateTaskOrder(columnId: ID, newTaskOrder: ID[]) {
      const column = this.columns.find((col) => col.id === columnId)
      if (column) {
        column.tasksOrder = newTaskOrder
      }
    },
  },
  getters: {
    getColumns(state) {
      return function (columnsIds: ID[] | null) {
        if (!columnsIds) return []
        return state.columns.filter((column) => columnsIds.includes(column.id))
      }
    },
  },
})
