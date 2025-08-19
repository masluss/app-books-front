import type { BookSummary } from "~/domain/book";
import type { BookDocDto } from "../model/dto/search.dto";

export function toBookSummary(doc: BookDocDto): BookSummary {
  const raw = doc.openLibraryKeyNormalized || doc.key || '';
  const id = raw.replace(/^\/works\//, '');

  return {
    id,
    openlibraryKey: doc.key,
    title: doc.title,
    author: doc.author_name?.[0] ?? undefined,
    year: doc.first_publish_year,
    coverUrl: doc.coverUrl,
    coverId: doc.cover_i ? String(doc.cover_i) : undefined,
    inMyLibrary: Boolean(doc.inMyLibrary)
  };
}
