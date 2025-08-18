import { defineStore } from 'pinia';
import { useBooksApi } from '@/features/books/services/books.api';
import { toBookSummary } from '@/features/books/adapters/book.adapter';
import type { BookSummary } from '~/domain/book';

export const useSearchStore = defineStore('search', {
  state: () => ({
    q: '' as string,
    results: [] as BookSummary[],
    loading: false as boolean,
    error: '' as string,
  }),
  actions: {
    async searchBooks(q: string) {
      this.q = q.trim();
      if (!this.q) {
        this.results = [];
        return;
      }
      this.loading = true;
      this.error = '';
      try {
        const { docs } = await useBooksApi().search(this.q);
        this.results = docs.map(toBookSummary).slice(0, 10);
      } catch (e) {
        this.error = 'No pudimos buscar en este momento. Intenta de nuevo.';
        this.results = [];
      } finally {
        this.loading = false;
      }
    },
  },
});
