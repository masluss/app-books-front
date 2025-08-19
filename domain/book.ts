export interface BookSummary {
  id: string;
  title: string;
  author?: string;
  year?: number;
  coverUrl?: string;
  coverId?: string;
  inMyLibrary?: boolean;
}

export interface LibraryBook {
  id: string;
  workId: string;
  title: string;
  author?: string;
  year?: number;
  coverBase64: string;   
  review: string;        
  rating: number;        
  createdAt?: string;
  updatedAt?: string;
}