export interface FilmService {
  GetMovies(req: GetMoviesListRequest): Promise<GetMoviesListResponse>;
}

export interface GetMoviesListRequest {
  page: number;
  limit: number;
}

export interface IMovieRating {
  kp: number;
  imdb: number;
}

export interface IMovie {
  id: number;
  type: "movie" | "series";
  name: string;
  alternativeName: string;
  description: string;
  year: number;
  poster: {
    url: string;
    previewUrl: string;
  };
  ageRating: number;
  rating: IMovieRating;
  genres: Array<{ name: string }>;
}

export interface GetMoviesListResponse {
  docs: IMovie[];
}
