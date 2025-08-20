export interface BookSummary {
  id: string;
  openLibraryKey: string;
  title: string;
  author_key?: string[];
  author_name?: string[];
  firstPublishYear?: number;
  coverId?: number;
  coverUrl?: string;
  inMyLibrary?: boolean;
}

export interface LibraryBook {
  id: string; 
  openLibraryKey: string;
  title: string;
  author_key?: string[];
  author_name?: string[];
  coverId?: number; 
  coverUrl?: string; 
  firstPublishYear?: number | null;
  rating: number; 
  review: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateBookPayload {
  review?: string;
  rating?: number;
}
