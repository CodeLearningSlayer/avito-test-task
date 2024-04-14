import React, { useEffect, useState } from "react";
import * as classes from "./moviePage.module.scss";
import { useParams } from "react-router-dom";
import { useAPI } from "@/hooks/useAPI";
import { IMovieExtended, IPerson } from "@/api/specs/films";
import FilmCardExtended from "@/components/FilmCardExtended/FilmCardExtended";
import { Button, Pagination, Spin, message } from "antd";
import { ArrowLeftOutlined, BackwardOutlined } from "@ant-design/icons";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import { isMobile } from "react-device-detect";
import ActorsList from "@/components/ActorsList/ActorsList";
import PosterCarousel from "@/components/PosterCarousel/PosterCarousel";
import { IPoster } from "@/api/specs/posters";
import SeasonsAndSeriesList from "@/components/SeasonsAndSeriesList/SeasonsAndSeriesList";
import ReviewsList from "@/components/ReviewsList/ReviewsList";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovieExtended>();
  const [actorsPage, setActorsPage] = useState(1);
  const [posters, setPosters] = useState<IPoster[]>([]);
  const { filmService, posterService, reviewsService } = useAPI();
  const [messageApi, contextHolder] = message.useMessage();
  // прописать хук useFetch, чтобы не плодить переменные для состояний
  const [isPostersLoading, setIsPostersLoading] = useState(false);
  const [isSeasonsLoading, setIsSeasonsLoading] = useState(false);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);

  const scrollToEl = (
    id: string,
    options?: { block: "center" | "start" | "end" }
  ) => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "center",
      ...options,
    });
  };

  const success = (messageStr: string) => {
    message.open({
      type: "success",
      content: messageStr,
    });
  };

  const error = (messageStr: string) => {
    message.open({
      type: "error",
      content: messageStr,
    });
  };

  const getActors = (persons: IPerson[]) => {
    return persons.filter((item) => item.enProfession === "actor");
  };

  const handleShareMobile = async (shareData: { url: string }) => {
    if (navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData); // доступно только через https
      } catch (error) {
        throw new Error("navigator is not available on your device");
      }
    }
  };

  const handleShareClick = async () => {
    try {
      const shareData = {
        url: location.origin + location.pathname,
      };

      const isSecure = window.location.protocol.includes("https");

      if (isMobile && isSecure) {
        await handleShareMobile(shareData);
      } else {
        await navigator.clipboard.writeText(
          location.origin + location.pathname
        );
        success("Ссылка успешно скопирована");
      }
    } catch (e) {
      error("Возникла ошибка при копировании");
      console.log(e);
    }
  };

  const handleActorsPageChange = (page: number, limit: number) => {
    console.log(page);
    setActorsPage(page);
    setTimeout(() => scrollToEl("actors-list"), 10);
  };

  const handlePostersIntersect = async () => {
    try {
      setIsPostersLoading(true);
      const posters = await posterService.GetPostersByMovieId(movie.id);
      setPosters(posters.docs);
    } catch (e) {
      error("Ошибка при подгрузке постеров, перезагрузите страницу");
    } finally {
      setIsPostersLoading(false);
    }
  };

  const fetchSeason = async (page: number) => {
    try {
      setIsSeasonsLoading(true);
      const res = await filmService.GetSeasonsById({ movieId: movie.id, page });
      return res;
    } catch (e) {
      console.log(e);
    } finally {
      setIsSeasonsLoading(false);
    }
  };

  const fetchReviews = async (page: number) => {
    try {
      setIsReviewsLoading(true);
      const res = await reviewsService.GetReviewsByMovieId({
        movieId: movie.id.toString(),
        page,
        limit: 3,
      });
      return res;
    } catch (e) {
      console.log(e);
    } finally {
      setIsReviewsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      filmService.GetMovieById(id).then((res) => {
        setMovie(res);
      }).catch(e => {
        error("Произошла ошибка, перезагрузите страницу");
        console.log(e);
      });
    }
  }, []);

  return (
    <>
      <div className={classes.moviePage}>
        <div className={classes.moviePageInner}>
          <Button
            onClick={() => history.back()}
            type="link"
            style={{
              marginTop: 10,
              padding: 0,
              width: "fit-content",
            }}
            icon={<ArrowLeftOutlined />}
          >
            Вернуться к выдаче
          </Button>
          {movie && (
            <>
              <div>
                <h1 className={classes.movieName}>{movie?.name}</h1>
                <div className={classes.alternativeName}>
                  {movie.alternativeName}
                </div>
              </div>
              <div className={classes.topCardButtons}>
                <Button onClick={() => scrollToEl("description")}>
                  Описание
                </Button>
                <Button
                  onClick={() => scrollToEl("reviews", { block: "start" })}
                >
                  Отзывы
                </Button>
                <Button onClick={() => scrollToEl("actors")}>Актеры</Button>
              </div>
              <FilmCardExtended movie={movie} onShare={handleShareClick} />
              <div id="description">
                <h2 className={classes.blockTitle}>Описание</h2>
                <p>{movie.description}</p>
              </div>

              <div id="actors">
                <h2 className={classes.blockTitle}>Актёрский состав</h2>
                <ActorsList
                  page={actorsPage}
                  limit={10}
                  actorsList={getActors(movie.persons)}
                />
                <div id="pagination">
                  <Pagination
                    defaultCurrent={actorsPage}
                    total={getActors(movie.persons).length}
                    showSizeChanger={false}
                    style={{ marginTop: 12 }}
                    onChange={handleActorsPageChange}
                  />
                </div>
              </div>

              <div>
                <h2 className={classes.blockTitle}>Постеры</h2>
                <Spin
                  spinning={isPostersLoading}
                  tip="Загрузка..."
                  size="large"
                  style={{ margin: "0 auto", display: "block" }}
                >
                  <PosterCarousel
                    posters={posters}
                    fetchPosters={handlePostersIntersect}
                  />
                </Spin>
              </div>

              {movie.isSeries && (
                <div>
                  <Spin spinning={isSeasonsLoading}>
                    <h2 className={classes.blockTitle}>Сезоны и серии</h2>
                    <SeasonsAndSeriesList
                      seasonsInfo={movie.seasonsInfo}
                      fetchSeasons={fetchSeason}
                    />
                  </Spin>
                </div>
              )}

              <div>
                <Spin spinning={isReviewsLoading}>
                  <h2 className={classes.blockTitle}>Отзывы пользователей</h2>
                  <ReviewsList fetchReviews={fetchReviews} />
                </Spin>
              </div>
            </>
          )}
        </div>
        <Sidebar active={false}>
          <div className={classes.ads}> Реклама может быть) </div>
        </Sidebar>
      </div>
    </>
  );
};

export default MoviePage;
