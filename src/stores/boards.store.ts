import { defineStore } from 'pinia'
import type { Board, ID } from './types'
import { generateId } from '@/helpers'

interface BoardsState {
  selectedBoard: Board | null
  boards: Board[]
}

export const useBoardsStore = defineStore('boards', {
  state: (): BoardsState => ({
    selectedBoard: null,
    boards: [
      {
        id: 1,
        boardName: 'Platform Launch',
        columnsOrder: [1, 2],
      },
      {
        id: 2,
        boardName: 'Marketing plan',
        columnsOrder: [],
      },
      {
        id: 3,
        boardName: 'Roadmap',
        columnsOrder: [],
      },
    ],
  }),
  actions: {
    createBoard(board: Board) {
      this.boards.push(board)
    },
    setSelectedBoard(board: Board) {
      this.selectedBoard = board
    },
    updateBoardsOrder(boardID: ID, columnID: ID) {
      const board = this.boards.find((board) => board.id === boardID)
      if (board) {
        board.columnsOrder.push(columnID)
      }
    },
  },
})
