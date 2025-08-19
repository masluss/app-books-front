export interface SaveBookRequestDto {
  openLibraryKey: string;                         
  title: string;
  author_name: string[];               
  cover_i?: number;                    
  first_publish_year?: number;           
  coverUrl?: string;                   
  inMyLibrary?: boolean;               
  review: string;                      
  rating: number;                      
}

export interface SaveBookResponseDto {
  id: string;                          
}
