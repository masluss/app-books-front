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
.app-input {
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  outline: none;
  transition:
    border-color 0.15s ease,
    background 0.15s ease;

  &:focus {
    border-color: #3a6ff8;
    background: #f6f8ff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.app-input__label {
  display: inline-block;
  margin-bottom: 0.35rem;
  color: #333;
  font-weight: 500;
}
</style>
