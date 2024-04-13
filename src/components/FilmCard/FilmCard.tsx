import React, { FC } from "react";
import type { IMovie } from "@/api/specs/films";
import * as classes from "./filmCard.module.scss";
import { Popover, Typography, Space, Divider } from "antd";
import {StarFilled} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

interface CardProps {
  card: IMovie;
  open?: boolean;
}

const renderPopoverContent = (card: IMovie) => {
  return (
    <div className={classes.popover}>
      <div>
        <Link to={`/movies/${card.id}`}>
          <Title style={{ margin: 0, color: "#06c" }} level={3}>
            {card.name}
          </Title>
        </Link>
        <Text style={{ color: "#999" }}>{card.alternativeName}</Text>
      </div>
      <Divider className={classes.divider} />
      <Space direction="vertical" style={{ display: "flex", gap: 8 }}>
        <Text>
          {" "}
          <span className={classes.span}> Длительность фильма:</span>{" "}
          {card.movieLength} мин.
        </Text>
        <Text>
          {" "}
          <span className={classes.span}> Жанры:</span>{" "}
          {card.genres.map((item) => item.name).join(", ")}
        </Text>
        <Text>
          {" "}
          <span className={classes.span}> Рейтинг IMDB:</span>{" "}
          {card.rating.imdb.toFixed(2)}
        </Text>
        <Text>
          {" "}
          <span className={classes.span}> Рейтинг Кинопоиска: </span>{" "}
          {card.rating.kp.toFixed(2)}
        </Text>
      </Space>
    </div>
  );
};

const FilmCard: FC<CardProps> = ({ card }) => {
  return (
    <Popover
      align={{ offset: ["50%"] }}
      style={{ top: "50%" }}
      content={renderPopoverContent(card)}
      placement={"left"}
    >
      <Link to={`/movies/${card.id}`}>
        <div className={classes.card}>
          <img
            className={classes.poster}
            src={card.poster.previewUrl}
            alt={card.name}
          />
          <div className={classes.rating}> <StarFilled/> {card.rating.imdb}</div>
        </div>
      </Link>
    </Popover>
  );
};

export default FilmCard;
