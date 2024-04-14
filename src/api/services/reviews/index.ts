import { type AxiosInstance, AxiosError } from "axios";
import type {
  GetReviewsByMovieIdRequest,
  GetReviewsByMovieIdResponse,
  ReviewsService,
} from "@/api/specs/reviews";

export class AxiosReviewsService implements ReviewsService {
  private instance: AxiosInstance;
  private selectFields: string[];
  private selectFieldsParams: URLSearchParams;
  private querySuffix: string;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
    this.selectFields = [
      "author",
      "title",
      "type",
      "review",
      "createdAt",
      "id"
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

  public async GetReviewsByMovieId(
    req: GetReviewsByMovieIdRequest
  ): Promise<GetReviewsByMovieIdResponse> {

    const params = new URLSearchParams();
    params.append("movieId", req.movieId);
    params.append("page", req.page.toString());
    params.append("limit", (req.limit ?? 10).toString());

    const res = await this.instance.get<GetReviewsByMovieIdResponse>(`/v1.4/review?${this.querySuffix}`, {params});
    return res.data;
  }
 }
