<template>
  <section class="library-page">
    <header class="library-page__header">
      <h1>Mi biblioteca</h1>
      <div class="controls">
        <InputGeneral
          id="search"
          v-model="search"
          type="search"
          placeholder="Buscar por título o autor…"
          label="Buscar"
          inputClass="input--md"
        />
        <label class="sort">
          Ordenar por calificación:
          <select v-model="sortDir" class="app-select">
            <option value="desc">Descendente</option>
            <option value="asc">Ascendente</option>
          </select>
        </label>
        <label class="checkbox">
          <input type="checkbox" v-model="excludeNoReview" />
          Excluir libros sin review
        </label>
      </div>
    </header>

    <div v-if="store.loading" class="state">Cargando…</div>
    <div v-else-if="store.error" class="state state--error">{{ store.error }}</div>
    <div v-else-if="filteredBooks.length === 0" class="state">No hay libros para mostrar.</div>

    <ul v-else class="grid">
      <li v-for="book in filteredBooks" :key="book.id" class="card">
        <div class="card__media">
          <ImgGeneral :src="book.coverUrl" :alt="book.title" imgClass="cover" />
        </div>
        <div class="card__body">
          <h3 class="title">{{ book.title }}</h3>
          <p class="authors">
            <strong>Autor(es):</strong>
            <span>{{ book.author_name?.join(', ') || 'Desconocido' }}</span>
          </p>
          <p v-if="book.firstPublishYear" class="meta">Publicado: {{ book.firstPublishYear }}</p>
          <p class="meta"><strong>Calificación:</strong> {{ book.rating ?? 0 }}/5</p>
          <p class="review" v-if="book.review"><strong>Review:</strong> {{ book.review }}</p>
        </div>
        <div class="card__actions">
          <ButtonGeneral
            :id="`edit-${book.id}`"
            text="Editar"
            type="button"
            buttonClass="btn--secondary"
            textClass="btn--secondary__text"
            @emitButton="openEdit(book)"
          />
          <ButtonGeneral
            :id="`del-${book.id}`"
            text="Eliminar"
            type="button"
            buttonClass="btn--danger"
            textClass="btn--danger__text"
            @emitButton="confirmDelete(book)"
          />
        </div>
      </li>
    </ul>
    <NuxtLink to="/">Regresar</NuxtLink>

    <div v-if="editing" class="modal" role="dialog" aria-modal="true">
      <div class="modal__content">
        <h2>Editar libro</h2>
        <p class="modal__subtitle">{{ editing.title }}</p>

        <div class="form">
          <label for="rating">Calificación (Entre 1 y 5)</label>
          <input
            id="rating"
            type="number"
            min="0"
            max="5"
            step="1"
            v-model.number="form.rating"
            class="app-input"
          />

          <label for="review">Review</label>
          <textarea
            id="review"
            v-model="form.review"
            rows="5"
            class="app-textarea"
            placeholder="Escribe tu opinión…"
          />
        </div>

        <div class="modal__actions">
          <ButtonGeneral
            id="btn-cancel-edit"
            text="Cancelar"
            type="button"
            buttonClass="btn--ghost"
            textClass="btn--ghost__text"
            @emitButton="closeEdit"
          />
          <ButtonGeneral
            id="btn-save-edit"
            :text="saving ? 'Guardando…' : 'Guardar cambios'"
            :loading="saving"
            type="button"
            buttonClass="btn--primary"
            textClass="btn--primary__text"
            @emitButton="saveEdit"
          />
        </div>
      </div>
      <div class="modal__backdrop" @click="closeEdit" />
      <NuxtLink to="/">Regresar</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useLibraryStore } from '~/features/library/model/useLibraryStore';

import ButtonGeneral from '@/components/shared/ui/ButtonGeneral.vue';
import InputGeneral from '@/components/shared/ui/InputGeneral.vue';
import ImgGeneral from '@/components/shared/ui/ImgGeneral.vue';
import type { LibraryBook } from '~/domain/book';

const store = useLibraryStore();
const search = ref('');
const sortDir = ref<'asc' | 'desc'>('desc');
const excludeNoReview = ref(false);

const filteredBooks = computed(() => {
  const searchInput = search.value.trim().toLowerCase();
  let list = store.items.slice();

  if (searchInput) {
    list = list.filter((b) => {
      const inTitle = b.title?.toLowerCase().includes(searchInput);
      const inAuthor = (b.author_name || []).some((a) => a.toLowerCase().includes(searchInput));
      return inTitle || inAuthor;
    });
  }

  if (excludeNoReview.value) {
    list = list.filter((b) => b.review && b.review.trim().length > 0);
  }

  list.sort((a, b) => {
    const ar = a.rating ?? 0;
    const br = b.rating ?? 0;
    return sortDir.value === 'asc' ? ar - br : br - ar;
  });

  return list;
});

onMounted(() => {
  store.fetchAll();
});

const editing = ref<LibraryBook | null>(null);
const form = ref<{ rating: number; review: string }>({ rating: 0, review: '' });
const saving = ref(false);

function openEdit(book: LibraryBook) {
  editing.value = book;
  form.value = {
    rating: book.rating ?? 0,
    review: book.review ?? '',
  };
}

function closeEdit() {
  if (saving.value) return;
  editing.value = null;
}

async function saveEdit() {
  if (!editing.value) return;
  saving.value = true;
  const ok = await store.updateBook(editing.value.id, {
    rating: form.value.rating,
    review: form.value.review,
  });
  saving.value = false;
  if (ok) closeEdit();
}

async function confirmDelete(book: LibraryBook) {
  console.log('book ', book);
  const ok = window.confirm(`¿Eliminar permanentemente "${book.title}" de tu biblioteca?`);
  if (!ok) return;
  console.log('book.di ', book.id);
  await store.deleteBook(book.id);
}
</script>

<style scoped>
.library-page {
  display: grid;
  gap: 1rem;
  padding: 1rem;
}
.library-page__header {
  display: grid;
  gap: 0.75rem;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: end;
}
.input--md {
  min-width: 280px;
}

.app-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
}
.checkbox {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}
.state {
  padding: 1rem;
  opacity: 0.8;
}
.state--error {
  color: #b00020;
}

.grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.card {
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fff;
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
}
.card__media {
  aspect-ratio: 3 / 4;
  overflow: hidden;
}
.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card__body {
  padding: 0.75rem 0.9rem;
  display: grid;
  gap: 0.35rem;
}
.title {
  font-size: 1.05rem;
  line-height: 1.3;
}
.authors,
.meta,
.review {
  font-size: 0.92rem;
}

.card__actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 0.9rem;
  border-top: 1px solid #f0f0f0;
  justify-content: flex-end;
  flex-wrap: wrap;
}

/* Modal simple */
.modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 60;
}
.modal__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}
.modal__content {
  position: relative;
  z-index: 61;
  width: min(680px, 92vw);
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: grid;
  gap: 0.75rem;
}
.modal__subtitle {
  opacity: 0.8;
  margin-top: -0.25rem;
}
.form {
  display: grid;
  gap: 0.5rem;
}
.app-textarea {
  width: 100%;
  min-height: 120px;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
}
.modal__actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}
</style>
