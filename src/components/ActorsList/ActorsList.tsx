import React, { useEffect, useState, type FC } from "react";
import ActorsListItem from "@/components/ActorsListItem/ActorsListItem";
import * as classes from "./actorsList.module.scss";
import { IPerson } from "@/api/specs/films";

interface ActorsListProps {
  actorsList: IPerson[];
  page: number;
  limit: number;
}

const ActorsList: FC<ActorsListProps> = ({ actorsList, page, limit }) => {
  
  const [visibleActors, setVisibleActors] = useState([]);

  const trimVisibleActors = () => {
    const offset = (page - 1) * limit;
    const actors = actorsList.slice(offset, offset + limit);
    setVisibleActors(actors);
  }

  useEffect(() => {
    trimVisibleActors();
  }, [page]);

  return (
    <div id="actors-list" className={classes.actorsList}>
      {visibleActors &&
        visibleActors.map((actor) => {
          return <ActorsListItem actor={actor} key={actor.id} />;
        })}
    </div>
  );
};

export default ActorsList;
