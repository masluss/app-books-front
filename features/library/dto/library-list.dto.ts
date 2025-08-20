export interface LibraryBookApiDto {
  _id: string;
  openLibraryKey: string;
  userId: string;
  author_name: string[];          
  cover_i?: number;           
  firstPublishYear?: number | null;
  rating: number;
  review: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  coverUrl?: string;          
}

export interface LibraryListResponseDto {
  page: number;
  limit: number;
  total: number;
  items: LibraryBookApiDto[];
}

export interface UpdateBookRequestDto {
  review?: string;
  rating?: number;
}

export type UpdateBookResponseDto = LibraryBookApiDto;

