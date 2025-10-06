<template>
  <div class="column">
    <div class="column__title">
      <div class="column__title__indicator" />
      <h1>{{ column.columnName }}</h1>
    </div>
    <draggable
      v-model="tasks"
      item-key="id"
      animation="200"
      class="column__task__list"
      group="tasks"
      @change="onChange"
    >
      <template #item="{ element: task }">
        <TaskComponent :task="task" />
      </template>
    </draggable>
  </div>
</template>

<script lang="ts" setup>
import { useTasksStore } from '@/stores/tasks.store'
import { computed, toRaw } from 'vue'
import draggable from 'vuedraggable'
import TaskComponent from './TaskComponent.vue'
import { useColumnsStore } from '@/stores/columns.store'

const { column } = defineProps(['column'])

const tasksStore = useTasksStore()
const columnsStore = useColumnsStore()

const tasks = computed({
  get() {
    return tasksStore.getTasks(column.tasksOrder)
  },
  set(newTasks) {
    const newOrder = newTasks.map((task) => task.id)
    columnsStore.updateTaskOrder(column.id, newOrder)
  },
})

function onChange(event: any) {
  if (event.added) {
    const { id } = toRaw(event.added.element)
    tasksStore.updateTask(id, column.id)
  }
}
</script>

<style lang="scss" scoped>
.column {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  min-width: 300px;

  &__title {
    padding: 15px 15px 0 0;
    font-size: 2.5rem;
    color: $text-light;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    h1 {
      padding: 0;
      margin: 0;
      font-size: 1.8rem;
      font-weight: normal;
    }

    &__indicator {
      width: 16px;
      height: 16px;
      border-radius: 8px;
      background-color: red;
      margin: 0 10px;
    }
  }

  &__task__list {
    padding: 15px 0px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
