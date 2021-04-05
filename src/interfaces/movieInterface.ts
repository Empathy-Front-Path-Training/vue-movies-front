export interface MovieInterface {
  id: string;
  title: string;
  genres: string[];
  type: string;
  average_rating: string | number;
  votes: string | number;
  start_year: number;
  endYear?: number;
}
