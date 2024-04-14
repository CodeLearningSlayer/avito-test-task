export interface FilmService {
  GetMovies(req: GetMoviesListRequest): Promise<GetMoviesListResponse>;
  SearchMovieByName(req: SearchMovieByNameRequest): Promise<SearchMovieByNameResponse>;
  GetCountriesList(): Promise<GetCountriesListResponse>;
  GetMovieById(id: string): Promise<GetMovieByIdResponse>;
  GetSeasonsById(req: GetSeasonsByIdRequest): Promise<GetSeasonsByIdResponse>;
}

export interface GetMoviesListRequest {
  page: number;
  limit: number;
  year?: string;
  ageRating?: string;
  "countries.name"?: string;
}

export interface IMovieRating {
  kp: number;
  imdb: number;
}

export interface IMovie {
  id: number;
  type: "movie" | "tv-series";
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

export type ISimilarMovie = Pick<IMovie, "id" | "rating" | "year" | "name" | "alternativeName" | 'type' | "poster">; 

export interface IPerson {
  id: number;
  photo: string;
  name: string;
  description: string;
  profession: string;
  enProfession: string;
}

export interface IMovieExtended extends IMovie {
  premiere: {
    world: string;
  };
  similarMovies: ISimilarMovie[];
  isSeries: boolean;
  persons: IPerson[];
  countries: {name: string}[];
  seasonsInfo?: Array<{
    number: number;
    episodesCount: number;
  }>
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

export interface GetMovieByIdResponse extends IMovieExtended {}

export interface IEpisode {
  number: number;
  name: string;
  enName: string;
  description: string;
  enDescription: string;
  airDate?: string;
}

export interface GetSeasonsByIdResponse {
  docs: Array<{
    movieId: number;
    number: number;
    episodes: IEpisode[];
    episodesCount: number;
    name: string;
    id: string;
  }>
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface GetSeasonsByIdRequest {
  page: number;
  limit?: number;
  movieId: number;
}
