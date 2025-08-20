import type {
  LibraryListResponseDto,
  LibraryBookApiDto,
  UpdateBookRequestDto,
} from '../dto/library-list.dto';
import type { SaveBookRequestDto, SaveBookResponseDto } from '../dto/save-book.dto';


export const useLibraryApi = () => {
  const { $api } = useNuxtApp();
  const base = 'books/my-library';

  const list = () =>
    $api<LibraryListResponseDto>(`${base}`);

  const add = (body: SaveBookRequestDto) =>
    $api<SaveBookResponseDto>(base, { method: 'POST', body });

  const getById = (id: string) =>
    $api<LibraryBookApiDto>(`${base}/${id}`);

  const update = (id: string, data: UpdateBookRequestDto) =>
    $api<LibraryBookApiDto>(`${base}/${id}`, { method: 'PUT', body: data });

  const removeById = (id: string) =>
    $api(`${base}/${id}`, { method: 'DELETE' });

  return { list, add, getById, update, removeById };
};
