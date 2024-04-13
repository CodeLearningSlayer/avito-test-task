export interface FilmService {
  GetMovies(req: GetMoviesListRequest): Promise<GetMoviesListResponse>;
  SearchMovieByName(req: SearchMovieByNameRequest): Promise<SearchMovieByNameResponse>;
  GetCountriesList(): Promise<GetCountriesListResponse>;
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
  movieLength: number;
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
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export interface SearchMovieByNameRequest {
  query: string;
  page?: number;
  limit?: number;
}

export interface SearchMovieByNameResponse {
  docs: IMovie[];
}

export interface ICountry {
  name: string;
  slug: string;
}

export type GetCountriesListResponse = ICountry[]
