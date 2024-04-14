import { type AxiosInstance, AxiosError } from "axios";
import type {
  GetPostersByMovieIdResponse,
  PosterService,
} from "@/api/specs/posters";

export class AxiosPostersService implements PosterService {
  private instance: AxiosInstance;
  private selectFields: string[];
  private selectFieldsParams: URLSearchParams;
  private querySuffix: string;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
    this.selectFields = [
      "movieId",
      "url",
      "previewUrl"
      
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

  public async GetPostersByMovieId(
    id: string
  ): Promise<GetPostersByMovieIdResponse> {

    const params = new URLSearchParams();
    params.append("movieId", id);
    params.append("page", "1");
    params.append("limit", "15");
    params.append("type", "cover");
    params.append("type", "promo");
    params.append("type", "frame");

    const res = await this.instance.get<GetPostersByMovieIdResponse>(`/v1.4/image?${this.querySuffix}`, {params});
    return res.data;
  }
 }
