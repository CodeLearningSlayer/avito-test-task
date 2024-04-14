import { IEpisode } from '@/api/specs/films';
import React, {type FC} from 'react';
import * as classes from "./seasonsAndSeriesListItem.module.scss";
import { convertDate } from '@/helpers/convertDate';

interface ListItemProps {
  episode: IEpisode
}

const SeasonsAndSeriesListItem: FC<ListItemProps> = ({episode}) => {
  return (
    <div className={classes.singleItem}>
      <div className={classes.episodeNum}>{episode.number}</div>
      <div className={classes.episodeName}>{episode.name}</div>
      <div className={classes.episodeDate}>{episode.airDate ? convertDate(episode.airDate) : "не указано"}</div>
    </div>
  );
};

export default SeasonsAndSeriesListItem;
