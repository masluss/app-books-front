export interface AddLibraryBookRequestDto {
  workId: string;        
  title: string;
  author?: string;
  year?: number;
  coverBase64: string;   
  review: string;        
  rating: number;        
}

export interface AddLibraryBookResponseDto {
  id: string;            
}
