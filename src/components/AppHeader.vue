<template>
  <header class="header">
    <h1 class="header__title">{{ selectedBoard?.boardName }}</h1>
    <AppButton text="+ Add New Task" @click="handleOpenModal"></AppButton>
    <AppModal v-if="isOpen" @close="handleCloseModal">
      <template #header>
        <h1 class="modal-heading">Create task</h1>
      </template>

      <template #content>
        <label for="title" class="modal-label">Title</label>
        <input
          type="text"
          class="modal-input"
          id="title"
          placeholder="e.g. Take coffee break"
          v-model="title"
        />

        <label for="Description" class="modal-label">Description</label>
        <textarea
          id="Description"
          class="modal-textarea"
          :placeholder="areaPlaceholder"
          v-model="description"
        ></textarea>

        <label class="modal-label">Subtasks</label>
        <div v-for="(task, id) in subtasks" :key="id" class="subtask">
          <input
            type="text"
            class="modal-input"
            id="title"
            placeholder="e.g. Take coffee break"
            v-model="task.subtaskName"
          />
          <button class="subtask__btn" @click="removeSubtask(task.id)">&times;</button>
        </div>
        <button class="button white" @click="addSubtask">+ Add new subtask</button>

        <label for="status" class="modal-label">Status</label>
        <pre></pre>
        <select id="status" class="modal-select" v-model="columnId">
          <option value="" disabled selected>Select status:</option>
          <option v-for="column in columns" :key="column.id" :value="column.id">
            {{ column.columnName }}
          </option>
        </select>
      </template>

      <template #footer>
        <AppButton @click="createTask" text="Create task" />
      </template>
    </AppModal>
  </header>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useModal } from '@/composables/useModal'
import { useBoardsStore } from '@/stores/boards.store'
import { useTasksStore } from '@/stores/tasks.store'
import { useColumnsStore } from '@/stores/columns.store'
import type { ID, Subtask } from '@/stores/types'

import AppModal from './AppModal.vue'
import AppButton from './AppButton.vue'
import { generateId } from '@/helpers'

const { isOpen, open: handleOpenModal, close: handleCloseModal } = useModal()

const title = ref('')
const description = ref('')
const subtasks = ref<Subtask[]>([])
const columnId = ref<ID>('')

const taskStore = useTasksStore()
const columnsStore = useColumnsStore()
const boardsStore = useBoardsStore()

const { selectedBoard } = storeToRefs(boardsStore)

const columns = computed(() => {
  return selectedBoard.value ? columnsStore.getColumns(selectedBoard.value.columnsOrder) : []
})

const addSubtask = () => {
  subtasks.value.push({
    id: Date.now(),
    subtaskName: '',
    isComplete: false,
  })
}

const resetFields = () => {
  title.value = ''
  description.value = ''
  subtasks.value = []
  columnId.value = ''
}

const removeSubtask = (id: string | number) =>
  (subtasks.value = subtasks.value.filter((subtask) => subtask.id !== id))

const areaPlaceholder = `e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little.`

const createTask = () => {
  const newTaskId = generateId()

  const task = {
    id: newTaskId,
    taskName: title.value,
    subtasks: [],
    columnId: columnId.value,
  }

  taskStore.createTask(task)
  columnsStore.updateTasksOrder(task.columnId, newTaskId)
  resetFields()
  handleCloseModal()
}
</script>

<style lang="scss" scoped>
.header {
  grid-area: header;
  background-color: $primary;
  border-bottom: 1px solid $border;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px;
  color: $text-white;
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

  &-textarea {
    background-color: $primary;
    border: 1px solid $text-light;
    border-radius: 5px;
    outline: none;
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: normal;
    color: $text-light;
    height: 48px;
    padding-left: 15px;
    resize: none;
    height: 8rem;
  }
  .subtask {
    display: grid;
    grid-template-columns: 1fr 40px;
    grid-template-rows: 1fr;
    &__btn {
      box-sizing: border-box;
      font-size: 3rem;
      color: $text-light;
      outline: none;
      border: none;
      background-color: $primary;
      padding: 0;
      margin: 0;
      cursor: pointer;
      min-width: 52px;
    }
  }

  &-select {
    background-color: $primary;
    border: 1px solid $text-light;
    border-radius: 5px;
    outline: none;
    font-size: 1.6rem;
    font-weight: normal;
    color: $text-white;
    height: 48px;
    padding-left: 15px;
  }
}
</style>
