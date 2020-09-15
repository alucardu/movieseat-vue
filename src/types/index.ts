export type Movie = {
  title: string;
  release_date: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  selected: boolean;
}

export type RatingObject = {
  rating: number;
  movie: Movie;
}

export type SortingConfiguration = {
  sortType: string;
  ascOrder: boolean;
}
