export interface SearchBooksResponseDto {
  start: number;
  num_found: number;
  numFound: number;
  numFoundExact: boolean;
  q: string;
  docs: BookDocDto[];
}

export interface BookDocDto {
  key: string;                         
  title: string;
  author_key?: string[];
  author_name?: string[];              
  cover_edition_key?: string;
  cover_i?: number;                    
  first_publish_year?: number;         
  openLibraryKeyNormalized?: string;   
  coverUrl?: string;                   
  inMyLibrary?: boolean;
}
