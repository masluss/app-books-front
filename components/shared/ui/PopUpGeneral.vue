<template>
  <Transition name="toast-fade">
    <div
      v-if="modelValue && message"
      class="popup"
      :class="`popup--${type}`"
      role="alert"
      aria-live="assertive"
    >
      <span class="popup__msg">{{ message }}</span>
      <button
        v-if="closable"
        class="popup__close"
        aria-label="Cerrar notificación"
        @click="close"
      >×</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: boolean;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  closable?: boolean;
}>(), {
  type: 'info',
  duration: 3000,
  closable: true
});

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
  (e: 'closed'): void;
}>();

let timer: ReturnType<typeof setTimeout> | null = null;

function startTimer() {
  clearTimer();
  if (props.duration && props.duration > 0) {
    timer = setTimeout(() => close(), props.duration);
  }
}
function clearTimer() {
  if (timer) { clearTimeout(timer); timer = null; }
}
function close() {
  clearTimer();
  emit('update:modelValue', false);
  emit('closed');
}

watch(() => props.modelValue, (v) => {
  if (v) startTimer(); else clearTimer();
}, { immediate: true });

onBeforeUnmount(clearTimer);
</script>

<style scoped lang="scss">

</style>
