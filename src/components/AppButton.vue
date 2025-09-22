<template>
  <button @click="handleClick">{{ props.text }}</button>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])
const props = defineProps(['text'])

const handleClick = () => emit('click')
</script>

<style lang="scss" scoped>
button {
  border: none;
  outline: none;
  cursor: pointer;
  color: $text-white;
  background-color: $active;
  font-size: 2rem;
  min-height: 48px;
  min-width: 192px;
  padding: 0px 15px;
  border-radius: 24px;
  transition: 0.6s;
  &:hover {
    background-color: $hoveredWhite;
    color: $active;
  }
}
</style>
