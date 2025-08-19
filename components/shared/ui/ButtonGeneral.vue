<template>
  <button
    :id="id"
    :type="type"
    class="app-button"
    :class="buttonClass"
    :disabled="disabled"
    @click="emit('emitButton', id)"
  >
    <span class="app-button__text" :class="textClass">{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id: string;
    text?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    buttonClass?: string;
    textClass?: string;
  }>(),
  {
    text: 'Continuar',
    type: 'button',
    disabled: false,
  },
);
const { id } = toRefs(props);
const emit = defineEmits<{ (e: 'emitButton', id: string): void }>();
</script>

<style scoped lang="scss">
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #fff;
  color: #111;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
  &:hover:not(:disabled) {
    background: #f6f8ff;
    border-color: #cfd7ff;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
.app-button__text {
  font-weight: 500;
  line-height: 1;
}
</style>
