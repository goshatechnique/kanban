<template>
  <div class="board">
    <BoardColumn v-for="column in columns" :key="column.id" :column="column" />
    <div v-if="selectedBoard" class="button__create-column" @click="handleOpenModal">
      <h1>+ New Column</h1>
    </div>

    <AppModal v-if="isOpen" @close="handleCloseModal">
      <template #header>
        <h1 class="modal-heading">Create column</h1>
      </template>
      <template #content>
        <label for="title" class="modal-label">Column name</label>
        <input
          type="text"
          class="modal-input"
          id="title"
          placeholder="e.g. TODO"
          v-model="columnName"
        />
      </template>
      <template #footer>
        <AppButton @click="createColumn" text="Create column" />
      </template>
    </AppModal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useBoardsStore } from '@/stores/boards.store'
import { useColumnsStore } from '@/stores/columns.store'
import { useModal } from '@/composables/useModal'
import BoardColumn from './BoardColumn.vue'
import AppModal from './AppModal.vue'
import AppButton from './AppButton.vue'
import { generateId } from '@/helpers'

const boardsStore = useBoardsStore()
const columnsStore = useColumnsStore()

const { selectedBoard } = storeToRefs(boardsStore)
const { isOpen, open: handleOpenModal, close: handleCloseModal } = useModal()

const columns = computed(() => {
  return selectedBoard.value ? columnsStore.getColumns(selectedBoard.value.columnsOrder) : []
})

const columnName = ref('')

const createColumn = () => {
  const newColumnId = generateId()
  if (!selectedBoard.value) return
  const boardId = selectedBoard.value.id

  const column = {
    id: newColumnId,
    columnName: columnName.value,
    boardId: boardId,
    tasksOrder: [],
  }

  columnsStore.createColumn(column)
  boardsStore.updateBoardsOrder(boardId, newColumnId)
  columnName.value = ''
  handleCloseModal()
}
</script>

<style lang="scss" scoped>
.button__create-column {
  min-width: 300px;
}

.modal {
  &-heading {
    color: $text-white;
  }

  &-label {
    font-size: 1.3rem;
    color: $text-white;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
  }

  &-input {
    background-color: $primary;
    border: 1px solid $text-light;
    border-radius: 5px;
    outline: none;
    font-size: 1.6rem;
    font-weight: normal;
    color: $text-light;
    height: 48px;
    padding-left: 15px;
  }
}

.board {
  background-color: $secondary;
  padding: 0 10px;
  display: flex;
  gap: 1rem;
  overflow-x: auto;

  .button__create-column {
    background-color: rgba($primary, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    h1 {
      padding-left: 15px;
      font-size: 2.4rem;
      color: $text-light;
    }
  }
}
</style>
