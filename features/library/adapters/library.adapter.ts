import type { BookSummary, LibraryBook, UpdateBookPayload } from '~/domain/book';
import type { SaveBookRequestDto } from '../dto/save-book.dto';
import type {
  LibraryBookApiDto,
  LibraryListResponseDto,
  UpdateBookRequestDto,
} from '../dto/library-list.dto';

export function buildCoverUrl(coverId?: number): string | undefined {
  return typeof coverId === 'number'
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : undefined;
}

export function mapLibraryApiToDomain(api: LibraryBookApiDto): LibraryBook {
  const coverId = api.cover_i;
    const authors = (api as any).authors ?? (api as any).author_name ?? [];

  return {
    id: api._id,
    openLibraryKey: api.openLibraryKey,
    title: api.title,
    author_name: authors,
    coverId,
    coverUrl: api.coverUrl ?? buildCoverUrl(coverId),
    firstPublishYear: api.firstPublishYear ?? null,
    rating: api.rating ?? 0,
    review: api.review ?? '',
    createdAt: api.createdAt,
    updatedAt: api.updatedAt,
  };
}

export function mapLibraryListToDomain(res: LibraryListResponseDto): {
  page: number;
  limit: number;
  total: number;
  items: LibraryBook[];
} {
  return {
    page: res.page,
    limit: res.limit,
    total: res.total,
    items: (res.items ?? []).map(mapLibraryApiToDomain),
  };
}

export function toSaveBookRequest(
  book: BookSummary,
  params: { review: string; rating: number }
): SaveBookRequestDto {
   const rating = Math.max(1, Math.min(5, Number(params.rating || 0)));
  return {
    openLibraryKey: book.openLibraryKey ?? `/works/${book.id}`,
    title: book.title,
    authors: book.author_name ?? [],
    cover_i: typeof book.coverId === 'number' ? book.coverId : undefined,
    firstPublishYear: book.firstPublishYear,
    coverUrl: book.coverUrl ?? buildCoverUrl(book.coverId),
    inMyLibrary: Boolean(book.inMyLibrary),
    review: params.review.trim(),
    rating,
  };
}

export function toUpdateBookRequest(payload: UpdateBookPayload): UpdateBookRequestDto {
  return { review: payload.review, rating: payload.rating };
}
