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
  navigateTo('/my-library');
};
</script>

<style scoped lang="scss">
.app-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid #eee;
}
.brand {
  text-decoration: none;
  color: #111;
  font-weight: 600;
  font-size: 1.05rem;
}
.spacer {
  margin-left: auto; 
}

.app-main {
  padding: 1.5rem 2rem;
  min-height: calc(100dvh - 140px);
}

.app-footer {
  padding: 1rem 2rem;
  border-top: 1px solid #eee;
  color: #666;
  font-size: .9rem;
  text-align: center;
}
</style>


