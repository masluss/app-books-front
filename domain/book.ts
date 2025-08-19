export interface BookSummary {
  id: string;
  openlibraryKey: string;
  title: string;
  author?: string;
  year?: number;
  coverUrl?: string;
  coverId?: string;
  inMyLibrary?: boolean;
}

export interface LibraryBook {
  id: string;
  openLibraryKey: string;
  title: string;
  author?: string;
  year?: number;
  coverBase64: string;   
  review: string;        
  rating: number;        
  createdAt?: string;
  updatedAt?: string;
}