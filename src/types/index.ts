export type Movie = {
  title: string;
  release_date: string;
  id: number;
  backdrop_path: string;
}

export type RatingObject = {
  rating: number;
  movie: Movie;
}

export type SortingConfiguration = {
  sortType: string;
  ascOrder: boolean;
}
