<template>
  <button
    :id="id"
    :type="type"
    class="app-button"
    :class="[{ 'is-loading': loading }, buttonClass]"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="emit('emitButton', id)"
  >
    <span v-if="loading" class="app-button__spinner" aria-hidden="true" />
    <span class="app-button__text" :class="textClass">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id: string;
    text?: string;
    loadingText?: string;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    buttonClass?: string;
    textClass?: string;
  }>(),
  {
    text: 'Continuar',
    loadingText: 'Procesando…',
    loading: false,
    type: 'button',
    disabled: false,
  },
);

const emit = defineEmits<{ (e: 'emitButton', id: string): void }>();

const label = computed(() => (props.loading ? props.loadingText || props.text : props.text));
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
