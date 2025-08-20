<template>
  <section class="book-detail container">
    <div v-if="!selected" class="empty">
      <p>No encontramos el libro seleccionado. Vuelve a la búsqueda.</p>
      <NuxtLink to="/">Ir al inicio</NuxtLink>
    </div>

    <div v-else class="grid">
      <div class="cover">
        <ImgGeneral
          :src="coverSrc"
          :alt="`Portada de ${selected.title}`"
          imgClass="card__img"
          :imgStyle="{ objectFit: 'cover', height: '180px', width: '100%' }"
        />
      </div>

      <div class="info">
        <h1 class="title">{{ selected.title }}</h1>
        <p class="meta">
          <span v-if="selected.author_name">
            <strong>Autor:</strong>
            {{ selected.author_name }}
          </span>
          <span v-if="selected.firstPublishYear"
            ><strong>Año:</strong> {{ selected.firstPublishYear }}</span
          >
        </p>

        <div class="form">
          <TextAreaGeneral
            id="review"
            v-model.trim="review"
            :maxlength="500"
            :rows="6"
            label="Escribe tu reseña (máximo 500)"
            placeholder="Escribe una breve reseña..."
            textareaClass="textarea--review"
            counterClass="counter--muted"
          />
          <div class="rating-row">
            <label for="rating">Calificación de 1 a 5</label>
            <InputGeneral
              id="ratingBook"
              v-model.number="rating"
              type="number"
              :min="1"
              :max="5"
              :step="1"
              inputClass="input--rating"
              aria-label="Calificación (1 a 5)"
            />
          </div>
          <div class="actions">
            <ButtonGeneral
              id="btn-save-book"
              text="Guardar en Mi biblioteca"
              loadingText="Guardando…"
              :loading="library.pending"
              :disabled="!isValid"
              @emitButton="save"
            />
          </div>

          <p v-if="success" class="success">{{ success }}</p>
          <p v-if="error" class="error">{{ error }}</p>
        </div>
      </div>

      <NuxtLink to="/">Regresar</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/features/search/model/useSearchStore';
import { useLibraryStore } from '@/features/library/model/useLibraryStore';
import type { BookSummary } from '~/domain/book';
import { toSaveBookRequest } from '~/features/library/adapters/library.adapter';
import ImgGeneral from '~/components/shared/ui/ImgGeneral.vue';
import ButtonGeneral from '~/components/shared/ui/ButtonGeneral.vue';
import InputGeneral from '~/components/shared/ui/InputGeneral.vue';
import TextAreaGeneral from '~/components/shared/ui/TextAreaGeneral.vue';

const search = useSearchStore();
const library = useLibraryStore();
const selected = ref<BookSummary | null>(search.selectedBook || null);

const review = ref('');
const rating = ref<number>(0);
const success = ref('');
const error = ref('');

if (!selected.value && import.meta.client) {
  const raw = sessionStorage.getItem('selectedBook');
  if (raw) selected.value = JSON.parse(raw) as BookSummary;
}

const coverSrc = computed(() => selected.value?.coverUrl || '');

const isValid = computed(
  () =>
    !!selected.value && review.value.trim().length <= 500 && rating.value >= 1 && rating.value <= 5,
);

async function save() {
  error.value = '';
  success.value = '';
  if (!selected.value || !isValid.value) {
    error.value =
      'La calificación debe estar entre 1 y 5 y que el review no debe superar los 500 caracteres.';
    return;
  }

  try {
    const bookSelectedToSave = toSaveBookRequest(selected.value, {
      review: review.value,
      rating: rating.value,
    });
    await library.addToLibrary(bookSelectedToSave);
    success.value = '¡Guardado con éxito en Mi biblioteca!';
    selected.value.inMyLibrary = true;
    await new Promise((r) => setTimeout(r, 800));
  } catch {
    error.value = library.error || 'No pudimos guardar el libro. Inténtalo de nuevo.';
  }
}
</script>

<style scoped lang="scss">
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 2rem;
  align-items: start;
}
.cover img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}
.placeholder {
  width: 100%;
  height: 460px;
  border-radius: 12px;
  background: #f1f1f1;
  display: grid;
  place-items: center;
  color: #777;
}
.title {
  margin: 0 0 0.25rem;
}
.meta {
  display: flex;
  gap: 1rem;
  color: #666;
  margin-bottom: 1rem;
  span {
    display: inline-block;
  }
}
.form {
  display: grid;
  gap: 0.75rem;
}
textarea {
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  resize: vertical;
}
.counter {
  text-align: right;
  color: #888;
  font-size: 0.85rem;
}
.rating-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-top: 0.5rem;
}
button {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
}
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.success {
  color: #1f7a1f;
}
.error {
  color: #b00020;
}
.empty {
  text-align: center;
  display: grid;
  gap: 0.5rem;
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .cover img,
  .placeholder {
    max-width: 420px;
    margin: 0 auto;
  }
}
</style>
