import { defineStore } from 'pinia';
import { useBooksApi } from '@/features/books/services/books.api';
import type { BookSummary } from '~/domain/book';
import { toBookSummary } from '~/features/books/adapters/book.adapter';

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '' as string,
    results: [] as BookSummary[],
    selectedBook: null as BookSummary | null,
    loading: false as boolean,
    errorMessage: '' as string,
    abortController: null as AbortController | null,
    lastQuery: '' as string,
  }),
  getters: {
    hasQuery: (s) => s.query.trim().length > 0,
    hasResults: (s) => s.results.length > 0,
    showEmpty: (s) =>
      !s.loading && s.query.trim().length > 0 && s.results.length === 0 && !s.errorMessage,
  },
  actions: {
    setSelected(book: BookSummary | null) {
      this.selectedBook = book;
    },

    selectBook(b: BookSummary) {
      this.selectedBook = b;
      if (import.meta.client) {
        sessionStorage.setItem('selectedBook', JSON.stringify(b));
      }
      navigateTo(`/books/${b.id}`);
    },

    async searchBooks(value: string) {
      const nextValue = value.trim();
      this.query = nextValue;

      if (!nextValue) {
        this.results = [];
        this.errorMessage = '';
        return;
      }
      if (this.lastQuery === nextValue && this.results.length) return;

      if (this.abortController) this.abortController.abort();
      this.abortController = new AbortController();

      this.loading = true;
      this.errorMessage = '';
      try {
        const { docs } = await useBooksApi().search(nextValue, this.abortController.signal);
        this.results = docs.map(toBookSummary).slice(0, 10);
        this.lastQuery = nextValue;
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          this.errorMessage = 'No pudimos buscar en este momento. Intenta de nuevo.';
          this.results = [];
        }
      } finally {
        this.loading = false;
        this.abortController = null;
      }
    },
  },
});
