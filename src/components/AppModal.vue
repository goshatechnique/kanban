<template>
  <Teleport to="body">
    <div class="background">
      <div class="modal">
        <div class="close" @click="handleClose">&times;</div>
        <slot name="header">
          <h1>Modal title</h1>
        </slot>
        <slot name="content"></slot>
        <slot name="footer">
          <button @click="handleClose">Close modal</button>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])

const handleClose = () => emit('close')
</script>

<style scoped lang="scss">
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(black, 0.4);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  min-width: 550px;
  background-color: $primary;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  position: relative;

  .close {
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 3rem;
    width: 3rem;
    height: 3rem;
    color: $text-white;
    cursor: pointer;
    user-select: none;
    transition: 0.6s;
    &:hover {
      color: $hoveredWhite;
    }
  }

  &__title {
    color: $text-white;
  }

  &__label {
    font-size: 1.3rem;
    color: $text-white;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
  }

  &__input {
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

  &__textarea {
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
    }
  }

  &__select {
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

.button {
  border: none;
  outline: none;
  cursor: pointer;
  color: $text-white;
  background-color: $active;
  font-size: 2rem;
  height: 48px;
  min-width: 192px;
  padding: 0px 15px;
  border-radius: 24px;
}

.white {
  background-color: $text-white;
  color: $active;
}
</style>
