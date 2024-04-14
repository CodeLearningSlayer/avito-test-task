export interface ReviewsService {
  GetReviewsByMovieId(req: GetReviewsByMovieIdRequest): Promise<GetReviewsByMovieIdResponse>;
}

export interface GetReviewsByMovieIdRequest {
  page: number;
  limit?: number;
  movieId: string;
}

export interface IReview {
  author: string;
  title: string;
  type: "Нейтральный" | "Позитивный" | "Негативный";
  review: string;
  createdAt: string;
  id: string;
}

export interface GetReviewsByMovieIdResponse {
  docs: IReview[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
