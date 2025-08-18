import type { SearchBooksResponseDto } from '../model/dto/search.dto';

export function useBooksApi() {
  const { $api } = useNuxtApp();

  const search = (q: string) =>
    $api<SearchBooksResponseDto>('books/search', {
      params: { q },
    });

  return { search };
}
