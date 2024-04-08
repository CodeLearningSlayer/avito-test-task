import  {type AxiosInstance, AxiosError} from "axios";
import type { FilmService, GetMoviesListRequest, GetMoviesListResponse } from "@/api/specs/films";

export class AxiosFilmService implements FilmService {
  private instance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  public async GetMovies(req: GetMoviesListRequest): Promise<GetMoviesListResponse> {
    const {limit, page} = req;
    const res = await this.instance.get<GetMoviesListResponse>("/movie", {params: {limit, page}});
    return res.data;
  };
}
