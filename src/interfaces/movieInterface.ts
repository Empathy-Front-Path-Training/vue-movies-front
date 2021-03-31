export interface MovieMockInterface {
  Title: string;
  Year: number | string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieInterface {
  id: string;
  title: string;
  genres: string[];
  type: string;
  averageRating: string | number;
  votes: string | number;
  startYear: number;
  endYear?: number;
}
