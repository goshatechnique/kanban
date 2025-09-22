<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppBoard from './components/AppBoard.vue'
import AppNavigator from './components/AppNavigator.vue'
</script>

<template>
  <div class="app">
    <AppHeader />
    <AppNavigator />
    <AppBoard />
  </div>
</template>

<style lang="scss">
html {
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  padding: 0;
  margin: 0;
}

.app {
  display: grid;
  height: 100vh;
  width: 100vw;
  grid-template-columns: 300px 1fr;
  grid-template-rows: 120px 1fr;
  grid-template-areas:
    'navigator header'
    'navigator board';
}
</style>
