import { RouteProps } from "react-router-dom"
import { HomePageAsync } from "../../src/pages/HomePage/HomePage.async";
import { MoviePageAsync } from "../../src/pages/MoviePage/MoviePage.async";

export enum AppRoutes {
  HOME = "home",
  SINGLE_FILM = "single-film",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.SINGLE_FILM]: "/:id"
}

export const AppRouter: Record<AppRoutes, RouteProps> = {
  [AppRoutes.HOME]: {
    path: RoutePath[AppRoutes.HOME],
    element: <HomePageAsync />
  },
  [AppRoutes.SINGLE_FILM]: {
    path: RoutePath[AppRoutes.SINGLE_FILM],
    element: <MoviePageAsync />
  }
}
