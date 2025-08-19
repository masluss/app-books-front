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
    :minlength="minlength"
    :maxlength="maxlength"
    class="app-input"
    :class="inputClass"
    @input="onInput"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
  id: string;
  modelValue: string;
  type?: 'text' | 'search' | 'email' | 'number' | 'password' | 'url';
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  autocomplete?: string;
  minlength?: number;
  maxlength?: number;
  inputClass?: string;   
  label?: string;        
  labelClass?: string;   
}>(), {
  type: 'text',
  disabled: false,
  required: false
});

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>();

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}
</script>

<style scoped lang="scss">
.app-input {
  width: 100%;
  padding: .6rem 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  outline: none;
  transition: border-color .15s ease, background .15s ease;

  &:focus {
    border-color: #3a6ff8;
    background: #f6f8ff;
  }

  &:disabled {
    opacity: .6;
    cursor: not-allowed;
  }
}

.app-input__label {
  display: inline-block;
  margin-bottom: .35rem;
  color: #333;
  font-weight: 500;
}
</style>
