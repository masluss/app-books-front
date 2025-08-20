export interface SaveBookRequestDto {
  openLibraryKey: string;
  title: string;
  authors: string[];  
  cover_i?: number;
  firstPublishYear?: number;
  coverUrl?: string;
  inMyLibrary?: boolean;
  review: string;
  rating: number;
}

export interface SaveBookResponseDto {
  id: string;
}
