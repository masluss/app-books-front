<template>
  <div class="app-layout">
    <header class="app-header">
      <NuxtLink to="/" class="brand">Libros</NuxtLink>

      <div class="spacer" />

      <ButtonGeneral
        id="btn-my-library"
        text="Mi biblioteca"
        type="button"
        buttonClass="btn--primary"
        textClass="btn--primary__text"
        @emitButton="goLibrary"
      />
    </header>

    <main class="app-main">
      <slot />
    </main>

    <footer class="app-footer">
      <p>📚 Esta es una SPA de libros.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import ButtonGeneral from '~/components/shared/ui/ButtonGeneral.vue';

const goLibrary = () => {
  navigateTo('/library');
};
</script>

<style scoped lang="scss">

</style>


