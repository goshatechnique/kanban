<template>
  <div class="navigator">
    <div class="navigator-logo">kanban</div>
    <ul class="navigator-list">
      <h1 class="navigator-list__header">All boards ({{ boards.length }})</h1>
      <li
        :class="`navigator-list__link ${board.boardName === selectedBoard?.boardName ? 'active' : ''}`"
        v-for="board in boards"
        :key="board.id"
        @click="setSelectedBoard(board)"
      >
        <img src="#" alt="#" class="navigator-list__link__icon" />
        <span>{{ board.boardName }}</span>
      </li>
      <li class="navigator-list__link create" @click="handleOpenModal">
        <img src="#" alt="#" class="navigator-list__link__icon" />
        <span>Create New Board</span>
      </li>
    </ul>

    <AppModal v-if="isOpen" @close="handleCloseModal">
      <template #header>
        <h1 class="modal-heading">Create board</h1>
      </template>
      <template #content>
        <label for="title" class="modal-label">Board name</label>
        <input
          type="text"
          class="modal-input"
          id="title"
          placeholder="e.g. Sales plan"
          v-model="boardName"
        />
      </template>
      <template #footer>
        <AppButton @click="createBoardHandler" text="Create board" />
      </template>
    </AppModal>
  </div>
</template>

<script lang="ts" setup>
import { useBoardsStore } from '@/stores/boards.store'
import type { Board } from '@/stores/types'
import { storeToRefs } from 'pinia'
import { useModal } from '../composables/useModal'
import AppButton from './AppButton.vue'
import AppModal from './AppModal.vue'
import { ref } from 'vue'
import { generateId } from '@/helpers'

const { isOpen, open: handleOpenModal, close: handleCloseModal } = useModal()

const boardsStore = useBoardsStore()

const { selectedBoard, boards } = storeToRefs(boardsStore)

const boardName = ref('')

const setSelectedBoard = (board: Board) => boardsStore.setSelectedBoard(board)

const createBoardHandler = () => {
  const newBoard = {
    id: generateId(),
    boardName: boardName.value,
    columnsOrder: [],
  }
  boardsStore.createBoard(newBoard)
  boardName.value = ''
  handleCloseModal()
}
</script>

<style lang="scss" scoped>
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

.navigator {
  grid-area: navigator;
  background-color: $primary;
  border-right: 1px solid $border;

  &-logo {
    font-size: 4rem;
    color: $text-white;
    font-weight: bold;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-list {
    font-size: 2rem;
    color: $text-light;
    padding: 0 25px 0 0;

    h1 {
      font-size: 1.4rem;
      padding: 0;
      margin: 0;
      text-transform: uppercase;
      padding: 0 0 15px 15px;
    }

    &__link {
      font-size: 1.8rem;
      list-style: none;
      padding: 15px 0 15px 15px;
      &:hover {
        cursor: pointer;
      }

      &__icon {
        width: 24px;
        height: 24px;
        margin-right: 15px;
      }
    }

    .active {
      background-color: $active;
      border-radius: 25px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      color: $text-white;
    }

    .create {
      color: $text-purple;
    }
  }
}
</style>
