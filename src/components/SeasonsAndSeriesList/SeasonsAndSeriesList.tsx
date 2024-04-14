import { GetSeasonsByIdResponse, IEpisode } from "@/api/specs/films";
import { Pagination, Select } from "antd";
import React, { useEffect, useRef, useState, type FC } from "react";
import { useInView } from "react-intersection-observer";
import * as classes from "./seasonsAndSeriesList.module.scss";
import SeasonsAndSeriesListItem from "../SeasonsAndSeriesListItem/SeasonsAndSeriesListItem";

interface SeasonsListProps {
  seasonsInfo: Array<{
    number: number;
    episodesCount: number;
  }>;
  fetchSeasons?: (currentSeason: number) => Promise<GetSeasonsByIdResponse>;
  episodes?: IEpisode[];
}

const SeasonsAndSeriesList: FC<SeasonsListProps> = ({
  fetchSeasons,
  seasonsInfo,
}) => {
  const [currentSeason, setCurrentSeason] = useState(1);
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [visibleEpisodes, setVisibleEpisodes] = useState([]);
  const [episodesPage, setEpisodesPage] = useState(1);
  const paginationKey = useRef(1);

  const trimVisibleEpisodes= () => {
    const limit = 10;
    const offset = (episodesPage - 1) * limit;
    const episodesVisible = episodes.slice(offset, offset + limit);
    console.log(episodesVisible);
    setVisibleEpisodes(episodesVisible);
  }

  const handleSeasonChange = async (value: number) => {
    try {
      setEpisodesPage(1);
      paginationKey.current = paginationKey.current + 1;
      const res = await fetchSeasons(value);
      setCurrentSeason(value);
      setEpisodes(res.docs[0].episodes);
    } catch(e) {
      console.log(e);
    }
  }

  const handleSeasonPageChange = (value: number) => {
    setEpisodesPage(value);
  }

  const { ref } = useInView({
    triggerOnce: true,

    onChange: async (inView) => {
      if (inView) {
        const res = await fetchSeasons(currentSeason);
        setEpisodes(res.docs[0].episodes); // беру только по 1му сезону из селекта
      }
    },
  });

  useEffect(() => {
    const seasons = 
      seasonsInfo.map((item) => ({
        label: `Сезон ${item.number}`,
        value: item.number,
      }))
    setSeasons(seasons);
  }, []);

  useEffect(() => {
    trimVisibleEpisodes();
  }, [episodesPage, episodes])

  return (
    <div ref={ref}>
      <Select options={seasons} value={currentSeason} size="large" onChange={handleSeasonChange}/>
      <div className={classes.episodesList}>
        {visibleEpisodes.map(item => {
          return (
            <SeasonsAndSeriesListItem episode={item}/>
          )
        })}
      </div>
      <Pagination
        key={paginationKey.current}
        defaultCurrent={episodesPage}
        total={episodes.length}
        showSizeChanger={false}
        style={{ marginTop: 12 }}
        onChange={handleSeasonPageChange}/>
    </div>
  );
};

export default SeasonsAndSeriesList;
