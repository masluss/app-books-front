<template>
  <section class="home">
    <form class="search-box" @submit.prevent="onSubmit" role="search" aria-label="Buscar libros">
      <InputGeneral
        id="q"
        v-model="q"
        type="search"
        placeholder="Escribe el nombre de un Libro para continuar"
        inputClass="input--primary"
        aria-label="Consulta"
      />
      <ButtonGeneral
        id="btn-primary"
        text="Buscar"
        type="submit"
        buttonClass="btn--primary"
        textClass="btn--primary__text"
        :disabled="!q.trim() || store.loading"
      />
    </form>

    <p v-if="store.loading">Buscando…</p>
    <p v-else-if="store.showEmpty">No encontramos libros con el título ingresado</p>

    <ul v-else class="results-grid">
      <li v-for="b in store.results" :key="b.id" class="card">
        <ImgGeneral
          :src="b.coverUrl"
          :alt="`Portada de ${b.title}`"
          imgClass="card__img"
          :imgStyle="{ objectFit: 'cover', height: '280px', width: '100%' }"
        />
        <h3>{{ b.title }}</h3>
        <p v-if="b.author">{{ b.author }}</p>
        <NuxtLink :to="`/book/${b.id}`" @click.prevent="goDetail(b)">Ver detalle</NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/features/search/model/useSearchStore';
import ButtonGeneral from '~/components/shared/ui/ButtonGeneral.vue';
import ImgGeneral from '~/components/shared/ui/ImgGeneral.vue';
import InputGeneral from '~/components/shared/ui/InputGeneral.vue';
import type { BookSummary } from '~/domain/book';

const store = useSearchStore();
const q = ref('');

const onSubmit = async () => {
  const term = q.value.trim();
  if (!term) return;
  await store.searchBooks(term);
};

const goDetail = (book: BookSummary) => {
  store.setSelected(book);
  if (process.client) {
    sessionStorage.setItem('selectedBook', JSON.stringify(book));
  }
};
</script>

<style scoped lang="scss">
.home {
  min-height: 70dvh;
  display: grid;
  place-items: start center;
  gap: 1rem;
  padding: 2rem;
}
.search-box {
  display: flex;
  gap: 0.5rem;
  input {
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 12px;
    min-width: 28rem;
  }
  button {
    padding: 0.75rem 1rem;
    border-radius: 12px;
    border: 1px solid #ddd;
    cursor: pointer;
  }
}
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  width: 100%;
}
.card {
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 1rem;
  img {
    width: 100%;
    height: 280px;
    object-fit: cover;
    border-radius: 12px;
  }
  h3 {
    margin: 0.5rem 0 0;
    font-size: 1rem;
  }
  p {
    margin: 0;
    color: #666;
  }
  a {
    display: inline-block;
    margin-top: 0.5rem;
  }
}
</style>
