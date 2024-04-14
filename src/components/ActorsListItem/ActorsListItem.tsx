import React, { FC, useEffect } from 'react';
import { Card } from 'antd';
import { IPerson } from '@/api/specs/films';
// import * as classes from "./actorsListItem.module.scss";
import "./actorsListItem.scss";

const {Meta} = Card;

interface ActorsListItemProps {
  actor: IPerson
}

const ActorsListItem: FC<ActorsListItemProps> = ({actor}) => {

  return (
    <Card className="" hoverable cover={<img className="img" src={actor.photo} alt={actor.name} />}>
      <Meta title={actor.name} description={actor.description}/>
    </Card>
  );
};

export default ActorsListItem;
