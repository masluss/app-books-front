import { defineStore } from 'pinia';
import type { LibraryBook } from '~/domain/book';
import type { SaveBookRequestDto } from '../dto/save-book.dto';
import { useLibraryApi } from '../services/library.api';
import { mapLibraryApiToDomain, mapLibraryListToDomain } from '../adapters/library.adapter';

export type UpdateBookPayload = Pick<LibraryBook, 'review' | 'rating'>;

export const useLibraryStore = defineStore('library', {
  state: () => ({
    items: [] as LibraryBook[],
    total: 0,
    loading: false,
    pending: false,
    error: '' as string | null,
  }),

  getters: {
    count: (s) => s.items.length,
    byId: (s) => (id: string) => s.items.find((b) => (b as any).id === id || (b as any).id === id),
  },

  actions: {
    async fetchAll() {
      const api = useLibraryApi();
      this.loading = true;
      this.error = '';
      try {
        const res = await api.list(); 
        const mapped = mapLibraryListToDomain(res); 
        this.items = mapped.items;
        this.total = mapped.total;
      } catch (e: any) {
        this.error = e?.data?.message || e?.message || 'No se pudo cargar tu biblioteca.';
      } finally {
        this.loading = false;
      }
    },

    async addToLibrary(payload: SaveBookRequestDto) {
      if (this.pending) return;
      const api = useLibraryApi();
      this.pending = true;
      this.error = '';

      try {
        const res = await api.add(payload);
        const created = (res as any)?.item ?? (res as any) ?? null;
        if (created) {
          this.items.unshift(created as LibraryBook);
        }
        return created as LibraryBook | null;
      } catch (e: any) {
        this.error = e?.data?.message || e?.message || 'No pudimos guardar el libro. Inténtalo nuevamente.';
        throw e;
      } finally {
        this.pending = false;
      }
    },

    async updateBook(id: string, payload: UpdateBookPayload) {
      const api = useLibraryApi();
      this.pending = true;
      this.error = '';
      try {
        const updatedApi = await api.update(id, payload);  
        const updated = mapLibraryApiToDomain(updatedApi); 
        const idx = this.items.findIndex(b => b.id === id);
        if (idx !== -1) this.items[idx] = updated;
        return true;
      } catch (e: any) {
        this.error = e?.data?.message || e?.message || 'No se pudo actualizar el libro';
        return false;
      } finally {
        this.pending = false;
      }
    },

    async deleteBook(id: string) {
      const api = useLibraryApi();
      this.pending = true;
      this.error = '';
      try {
        await api.removeById(id);
        this.items = this.items.filter(b => b.id !== id);
        return true;
      } catch (e: any) {
        this.error = e?.data?.message || e?.message || 'No se pudo eliminar el libro';
        return false;
      } finally {
        this.pending = false;
      }
    },
  },
});
