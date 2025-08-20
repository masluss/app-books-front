<template>
  <label v-if="label" :for="id" class="app-textarea__label" :class="labelClass">
    {{ label }}
  </label>

  <textarea
    :id="id"
    :name="name || id"
    :rows="rows"
    :maxlength="maxlength"
    :placeholder="placeholder"
    :disabled="disabled"
    :required="required"
    class="app-textarea"
    :class="textareaClass"
    :value="modelValue"
    @input="onInput"
    v-bind="$attrs"
  />

  <div v-if="showCounter" class="app-textarea__counter" :class="counterClass">
    {{ (modelValue?.length || 0) }} / {{ maxlength }}
  </div>
</template>

<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
  id: string;
  modelValue: string;
  modelModifiers?: { trim?: boolean };   
  label?: string;
  name?: string;
  placeholder?: string;
  rows?: number;
  maxlength?: number;
  disabled?: boolean;
  required?: boolean;
  textareaClass?: string;
  labelClass?: string;
  counterClass?: string;
  showCounter?: boolean;
}>(), {
  rows: 6,
  maxlength: 500,
  disabled: false,
  required: false,
  showCounter: true
});

const emit = defineEmits<{ (e: 'update:modelValue', val: string): void }>();

function onInput(e: Event) {
  const el = e.target as HTMLTextAreaElement;
  let val = el.value ?? '';
  if (props.modelModifiers?.trim) val = val.trimStart(); 
  emit('update:modelValue', val);
}
</script>

<style scoped lang="scss">

</style>
