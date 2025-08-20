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
  &.is-loading {
    opacity: .8;
    cursor: progress;

    .app-button__spinner {
      width: 1rem;
      height: 1rem;
      margin-right: .5rem;
      border: 2px solid var(--c-border);
      border-top-color: var(--c-primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
