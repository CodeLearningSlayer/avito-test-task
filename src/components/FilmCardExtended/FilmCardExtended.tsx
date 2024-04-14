import React, { type FC } from "react";
import * as classes from "./filmCardExtended.module.scss";
import { IMovieExtended } from "@/api/specs/films";
import { convertDate } from "@/helpers/convertDate";
import { convertDuration } from "@/helpers/convertDuration";
import { Button } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";

const FilmCardExtended: FC<{ movie: IMovieExtended, onShare: () => void; }> = ({ movie, onShare }) => {
  return (
    <div>
      <div className={classes.filmCardLayout}>
        <div>
          <img
            src={movie.poster.url}
            alt={movie.name}
            className={classes.poster}
          />
        </div>
        <div className={classes.infoWrapper}>
          <ul className={classes.infoList}>
            <li className={classes.infoListItem}>
              <span className={classes.cardSpan}>Дата выхода:</span> {convertDate(movie.premiere.world)}
            </li>
            <li className={classes.infoListItem}>
              <span className={classes.cardSpan}>Страна:</span>{" "}
              {movie.countries.map((item) => item.name).join(", ")}
            </li>
            <li className={classes.infoListItem}>
              <span className={classes.cardSpan}>Жанры:</span>{" "}
              {movie.genres.map((item) => item.name).join(", ")}
            </li>
            <li className={classes.infoListItem}>
              <span className={classes.cardSpan}>Длительность:</span> {convertDuration(movie.movieLength)}{" "}
            </li>
            <li className={classes.infoListItem}>
              <span className={classes.cardSpan}>Рейтинг IMDB:</span> {movie.rating.imdb}{" "}
            </li>
            <li className={classes.infoListItem}>
              <span className={classes.cardSpan}>Рейтинг Кинопоиска:</span> {movie.rating.kp}{" "}
            </li>
          </ul>
          <Button size="large" className={classes.shareButton} style={{width: "max-content"}} onClick={onShare} icon={<ShareAltOutlined />}>Поделиться</Button>
        </div>
      </div>
    </div>
  );
};

export default FilmCardExtended;
