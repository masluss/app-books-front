export interface BookSummary {
  id: string;
  title: string;
  author?: string;
  year?: number;
  coverUrl?: string;
  coverId?: string;
  inMyLibrary?: boolean;
}
