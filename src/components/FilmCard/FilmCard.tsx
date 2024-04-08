import React, { FC } from "react";
import type { IMovie } from "@/api/specs/films";
import * as classes from "./filmCard.module.scss";
import { Popover } from 'antd';

interface CardProps {
  card: IMovie;
}

const popoverContent = (
  <div>
    hi
  </div>
)

const FilmCard: FC<CardProps> = ({ card }) => {
  return (
    <Popover style={{top: "50%"}} content={popoverContent}>
      <div className={classes.card}>
        <img className={classes.poster} src={card.poster.previewUrl} alt={card.name} />
      </div>
    </Popover>
  );
};

export default FilmCard;
