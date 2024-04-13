import { type AxiosInstance, AxiosError } from "axios";
import type {
  FilmService,
  GetCountriesListResponse,
  GetMoviesListRequest,
  GetMoviesListResponse,
} from "@/api/specs/films";
import type {
  SearchMovieByNameRequest,
  SearchMovieByNameResponse,
} from "@/api/specs/films";

export class AxiosFilmService implements FilmService {
  private instance: AxiosInstance;
  private selectFields: string[];
  private selectFieldsQuery: Array<Object>;
  private selectFieldsParams: URLSearchParams;
  private querySuffix: string;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
    this.selectFields = [
      "id",
      "type",
      "name",
      "alternativeName",
      "description",
      "year",
      "movieLength",
      "poster",
      "ageRating",
      "rating",
      "genres",
      
    ];
    this.selectFieldsParams = new URLSearchParams();
    this.createSelectFieldsParams();
    this.querySuffix = this.selectFieldsParams.toString()
  }

  private createSelectFieldsParams() {
    this.selectFields.forEach(field => {
      this.selectFieldsParams.append("selectFields", field);
    });
  }

  public async GetMovies(
    req: GetMoviesListRequest
  ): Promise<GetMoviesListResponse> {

    const params = {
      ...(req.page ? { page: req.page } : { page: 1 }),
      ...(req.limit ? { limit: req.limit } : { limit: 50 }),
    };

    const res = await this.instance.get<GetMoviesListResponse>(`/v1.4/movie?${this.querySuffix}`, {params});
    return res.data;
  }

  public async SearchMovieByName(
    req: SearchMovieByNameRequest
  ): Promise<SearchMovieByNameResponse> {
    const params = {
      ...(req.page ? { page: req.page } : { page: 1 }),
      ...(req.limit ? { limit: req.limit } : { limit: 50 }),
      query: req.query
    };
    
    const res = await this.instance.get<SearchMovieByNameResponse>(
      "/v1.4/movie/search",
      {params}
    );
    return res.data;
  }

  public async GetCountriesList(): Promise<GetCountriesListResponse> {
    const res = await this.instance.get<GetCountriesListResponse>("/v1/movie/possible-values-by-field?field=countries.name");
    return res.data;
  }
}
