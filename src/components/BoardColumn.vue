<template>
  <div class="column">
    <div class="column__title">
      <div class="column__title__indicator" />
      <h1>{{ column.columnName }}</h1>
    </div>
    <div class="column__task__list">
      <TaskComponent v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTasksStore } from '@/stores/tasks.store'
import { computed } from 'vue'
import TaskComponent from './TaskComponent.vue'

const { column } = defineProps(['column'])
const tasksStore = useTasksStore()

const tasks = computed(() => {
  return tasksStore.getTasks(column.tasksOrder)
})
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
