import type { SearchBooksResponseDto } from '../model/dto/search.dto';

export const useBooksApi = () => {
  const { $api } = useNuxtApp();
  const search = (q: string, signal?: AbortSignal) =>
    $api<SearchBooksResponseDto>('books/search', { params: { q }, signal });
  return { search };
};
