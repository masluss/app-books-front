import type { BookSummary } from '~/domain/book';
import type { SaveBookRequestDto } from '../dto/save-book.dto';

export function toSaveBookRequest(
  book: BookSummary,
  params: { review: string; rating: number }
): SaveBookRequestDto {
  const workPath = `/works/${book.id}`;
  const rating = Math.max(1, Math.min(5, Number(params.rating || 0)));

  return {
    openLibraryKey: workPath,
    title: book.title,
    author_name: book.author ? [book.author] : [],
    cover_i: book.coverId ? Number(book.coverId) : undefined,
    first_publish_year: book.year,
    coverUrl: book.coverUrl ?? (book.coverId ? `https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg` : undefined),
    inMyLibrary: Boolean(book.inMyLibrary),
    review: params.review.trim(),
    rating
  };
}
