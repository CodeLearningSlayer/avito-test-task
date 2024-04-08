import { useAPI } from "@/hooks/useAPI";
import { Typography } from "antd";
import { type FC, useState, useEffect } from "react";
import FilmGrid from "@/components/FilmGrid/FilmGrid";
import FilmCard from "@/components/FilmCard/FilmCard";
import { IMovie } from "@/api/specs/films";
import React from "react";

const { Title } = Typography;

const HomePage: FC = () => {
  const { filmService } = useAPI();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const movies = filmService
      .GetMovies({ limit, page })
      .then((res) => setMovies(res.docs));
  }, []);

  return (
    <div className="home-page">
      <Title>Каталог фильмов</Title>
      <FilmGrid>
        {/* Вынести в отдельную функцию */}
        { movies.map((item) => {
          return (
            <React.Fragment key={item.id}>
              <FilmCard card={item}/>
            </React.Fragment>
          );
        })}
      </FilmGrid>
    </div>
  );
};

export default HomePage;
