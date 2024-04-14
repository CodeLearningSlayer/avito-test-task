export interface PosterService {
  GetPostersByMovieId(req: GetPostersByMovieIdRequest): Promise<GetPostersByMovieIdResponse>;
}

export interface GetPostersByMovieIdRequest {

}

export interface IPoster {
  url: string;
  previewUrl: string;
  movieId: number;
  id: string;
}

export interface GetPostersByMovieIdResponse {
  docs: IPoster[];
}
