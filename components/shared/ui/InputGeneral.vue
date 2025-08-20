<template>
  <label v-if="label" :for="id" class="app-input__label" :class="labelClass">{{ label }}</label>
  <input
    :id="id"
    :name="name || id"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    :autocomplete="autocomplete"
    :minlength?="minlength"
    :maxlength?="maxlength"
    :min="min"
    :max="max"
    :step="step"
    class="app-input"
    :class="inputClass"
    @input="onInput"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    id: string;
    modelValue: string | number;
    modelModifiers?: { number?: boolean; trim?: boolean };
    type?: 'text' | 'search' | 'email' | 'number' | 'password' | 'url';
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    autocomplete?: string;
    minlength?: number;
    maxlength?: number;
    min?: number;
    max?: number;
    step?: number;
    inputClass?: string;
    label?: string;
    labelClass?: string;
  }>(),
  {
    type: 'text',
    disabled: false,
    required: false,
  },
);

const emit = defineEmits<{ (e: 'update:modelValue', v: string | number): void }>();

function onInput(e: Event) {
  const el = e.target as HTMLInputElement;
  let val: string | number = el.value;

  if (props.modelModifiers?.trim && typeof val === 'string') {
    val = val.trim();
  }
  if (props.modelModifiers?.number) {
    val = val === '' ? '' : Number(val);
  }

  emit('update:modelValue', val);
}
</script>

<style scoped lang="scss">

.app-input__wrapper {
  display: grid;
  gap: .35rem;
}

.app-input {
  &.is-full { width: 100%; }

  &.is-invalid {
    border-color: color-mix(in oklab, var(--c-border), red 60%);
    background: color-mix(in oklab, var(--c-surface), red 6%);
  }
}

.app-input__help {
  font-size: .875rem;
  color: color-mix(in oklab, var(--c-text), black 35%);
  margin: 0;
}

.app-input__error {
  font-size: .875rem;
  margin: 0;
  color: #b42318; 
}
</style>
