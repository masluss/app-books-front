import type { BookSummary } from "~/domain/book";
import type { BookDocDto } from "../model/dto/search.dto";

const buildCoverUrl = (coverId?: number) =>
  typeof coverId === 'number' ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : undefined;

export function toBookSummary(doc: BookDocDto): BookSummary {
  const rawKey = doc.openLibraryKey || doc.key || '';
  const id = rawKey.replace(/^\/works\//, '');
  const coverId = doc.cover_i;

  return {
    id,
    openLibraryKey: doc.key,              
    title: doc.title,
    author_name: Array.isArray(doc.author_name) ? doc.author_name : [],     
    firstPublishYear: doc.first_publish_year,
    coverId,
    coverUrl: doc.coverUrl ?? buildCoverUrl(coverId),
    inMyLibrary: Boolean(doc.inMyLibrary),
  };
}
