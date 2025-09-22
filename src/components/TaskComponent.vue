<template>
  <div class="task">
    <h1>{{ task.taskName }}</h1>
    <span>{{ subtasksStatus }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Subtask } from '@/stores/types'
import { computed } from 'vue'

const { task } = defineProps(['task'])

const subtasksStatus = computed(
  () =>
    `${task.subtasks.filter((subtask: Subtask) => subtask.isComplete).length} of ${task.subtasks.length} subtasks`,
)
</script>

<style scoped lang="scss">
.task {
  width: 100%;
  min-height: 80px;
  background-color: $primary;
  border-radius: 15px;
  color: $text-white;

  h1 {
    padding-left: 15px;
    font-size: 1.8rem;
  }

  span {
    padding-left: 15px;
    color: $text-light;
    font-size: 1.4rem;
  }
}
</style>
