<template>
  <span class="app-image" :class="wrapperClass">
    <img
      :src="currentSrc"
      :alt="alt"
      class="app-image__img"
      :class="imgClass"
      :style="imgStyle"
      @error="onError"
      v-bind="$attrs"
    />
  </span>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import defaultImg from '~/assets/images/ImgDefault.jpg'; 

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
  src?: string | null;
  alt?: string;
  defaultSrc?: string;
  imgClass?: string;
  wrapperClass?: string;
  imgStyle?: CSSProperties;
}>(), {
  src: null,
  alt: 'Imagen',
  defaultSrc: defaultImg
});

const currentSrc = ref<string>(props.src || props.defaultSrc);
watch(() => props.src, (v) => {
  currentSrc.value = v || props.defaultSrc;
});

function onError() {
  if (currentSrc.value !== props.defaultSrc) {
    currentSrc.value = props.defaultSrc;
  }
}
</script>

<style scoped lang="scss">
.app-image {
  display: inline-block;

  .app-image__img {
    display: block;
    max-width: 100%;
    height: auto;
    border-radius: 12px; 
  }
}
</style>
