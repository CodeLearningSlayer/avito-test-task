import axios from "axios";
import type { FilmService } from "@/api/specs/films";
import { AxiosFilmService } from "@/api/services/films";
import { PosterService } from "@/api/specs/posters";
import { AxiosPostersService } from "@/api/services/posters";

export const useAPI = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.BASE_API_URL,
    headers: { "X-API-KEY": process.env.API_KEY },
  });
  const authorizedAxiosInstance = axios.create({
    baseURL: process.env.BASE_API_URL,
  });

  const filmService: FilmService = new AxiosFilmService(axiosInstance);
  const posterService: PosterService = new AxiosPostersService(axiosInstance);

  return { filmService, posterService };
};
