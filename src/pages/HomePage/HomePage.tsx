import { useAPI } from "@/hooks/useAPI";
import { Typography, Segmented, Flex, Pagination, Button, message } from "antd";
import React, { type FC, useState, useRef, useEffect } from "react";
import FilmGrid from "@/components/FilmGrid/FilmGrid";
import FilmCard from "@/components/FilmCard/FilmCard";
import { IMovie } from "@/api/specs/films";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DebounceSelect } from "@/components/SearchField/SelectField";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import * as classes from "./homePage.module.scss";
import FilterSideBar from "@/components/FilterSideBar/FilterSideBar";
import { useFilter } from "@/hooks/useFilter";
import Icon from "@ant-design/icons/lib/components/Icon";

const { Title } = Typography;

// const mockCards = {
//   docs: [
//     {
//       rating: {
//         kp: 8.823,
//         imdb: 8.5,
//         filmCritics: 6.8,
//         russianFilmCritics: 100,
//       },
//       votes: {
//         kp: 2006683,
//         imdb: 923505,
//         filmCritics: 129,
//         russianFilmCritics: 12,
//         await: 15,
//       },
//       backdrop: {
//         url: "https://image.openmoviedb.com/tmdb-images/original/bGksau9GGu0uJ8DJQ8DYc9JW5LM.jpg",
//         previewUrl:
//           "https://image.openmoviedb.com/tmdb-images/w500/bGksau9GGu0uJ8DJQ8DYc9JW5LM.jpg",
//       },
//       movieLength: 112,
//       id: 535341,
//       type: "movie",
//       name: "1+1",
//       description:
//         "Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из тюрьмы. Несмотря на то, что Филипп прикован к инвалидному креслу, Дриссу удается привнести в размеренную жизнь аристократа дух приключений.",
//       year: 2011,
//       poster: {
//         url: "https://image.openmoviedb.com/kinopoisk-images/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/orig",
//         previewUrl:
//           "https://image.openmoviedb.com/kinopoisk-images/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/x1000",
//       },
//       genres: [
//         {
//           name: "драма",
//         },
//         {
//           name: "комедия",
//         },
//         {
//           name: "биография",
//         },
//       ],
//       countries: [
//         {
//           name: "Франция",
//         },
//       ],
//       typeNumber: 1,
//       alternativeName: "Intouchables",
//       names: [
//         {
//           name: "1+1",
//         },
//         {
//           name: "Intouchables",
//         },
//         {
//           name: "不可触碰",
//           language: "CN",
//           type: null,
//         },
//         {
//           name: "最佳拍档",
//           language: "CN",
//           type: null,
//         },
//         {
//           name: "无法触碰",
//           language: "CN",
//           type: null,
//         },
//         {
//           name: "Untouchable",
//           language: "GB",
//           type: null,
//         },
//         {
//           name: "不可触摸",
//           language: "CN",
//           type: null,
//         },
//         {
//           name: "Неприкасаемые",
//           language: "RU",
//           type: "Literal",
//         },
//         {
//           name: "1+1 [Intouchables]",
//           language: "RU",
//           type: null,
//         },
//         {
//           name: "Saikyô no futari",
//           language: "JP",
//           type: null,
//         },
//         {
//           name: "Amigos",
//           language: "CL",
//           type: null,
//         },
//         {
//           name: "Mehubarim la'hayim",
//           language: "IL",
//           type: "Hebrew title",
//         },
//         {
//           name: "Amigos para siempre",
//           language: "VE",
//           type: null,
//         },
//         {
//           name: "Prijatelja",
//           language: "SI",
//           type: null,
//         },
//         {
//           name: "En oväntad vänskap",
//           language: "SE",
//           type: null,
//         },
//         {
//           name: "Intocáveis",
//           language: "BR",
//           type: null,
//         },
//         {
//           name: "Intouchables – Ziemlich beste Freunde",
//           language: "DE",
//           type: null,
//         },
//         {
//           name: "언터처블 1%의 우정",
//           language: "KR",
//           type: null,
//         },
//         {
//           name: "De Uroerlige",
//           language: "DK",
//           type: null,
//         },
//         {
//           name: "Intocable",
//           language: "ES",
//           type: null,
//         },
//         {
//           name: "Недоторканні",
//           language: "UA",
//           type: "Unofficial Title",
//         },
//       ],
//       ratingMpaa: "r",
//       shortDescription:
//         "Аристократ на коляске нанимает в сиделки бывшего заключенного. Искрометная французская комедия с Омаром Си",
//       ticketsOnSale: false,
//       ageRating: 18,
//       logo: {
//         url: "https://avatars.mds.yandex.net/get-ott/1531675/2a0000017f0262661cde61dc260cb86f7830/orig",
//       },
//       top250: 2,
//       isSeries: false,
//     },
//     {
//       rating: {
//         kp: 8.567,
//         imdb: 7.8,
//         filmCritics: 6.5,
//         russianFilmCritics: 85.7143,
//       },
//       votes: {
//         kp: 1687894,
//         imdb: 386610,
//         filmCritics: 278,
//         russianFilmCritics: 21,
//         await: 13639,
//       },
//       backdrop: {
//         url: "https://image.openmoviedb.com/tmdb-images/original/tintsaQ0WLzZsTMkTiqtMB3rfc8.jpg",
//         previewUrl:
//           "https://image.openmoviedb.com/tmdb-images/w500/tintsaQ0WLzZsTMkTiqtMB3rfc8.jpg",
//       },
//       movieLength: 113,
//       id: 1143242,
//       type: "movie",
//       name: "Джентльмены",
//       description:
//         "Один ушлый американец ещё со студенческих лет приторговывал наркотиками, а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской аристократии и очень неплохо на этом разбогател. Другой пронырливый журналист приходит к Рэю, правой руке американца, и предлагает тому купить киносценарий, в котором подробно описаны преступления его босса при участии других представителей лондонского криминального мира — партнёра-еврея, китайской диаспоры, чернокожих спортсменов и даже русского олигарха.",
//       year: 2019,
//       poster: {
//         url: "https://image.openmoviedb.com/kinopoisk-images/1599028/637271d5-61b4-4e46-ac83-6d07494c7645/orig",
//         previewUrl:
//           "https://image.openmoviedb.com/kinopoisk-images/1599028/637271d5-61b4-4e46-ac83-6d07494c7645/x1000",
//       },
//       genres: [
//         {
//           name: "криминал",
//         },
//         {
//           name: "комедия",
//         },
//         {
//           name: "боевик",
//         },
//       ],
//       countries: [
//         {
//           name: "США",
//         },
//         {
//           name: "Великобритания",
//         },
//       ],
//       typeNumber: 1,
//       alternativeName: "The Gentlemen",
//       names: [
//         {
//           name: "Джентльмены",
//         },
//         {
//           name: "The Gentlemen",
//         },
//         {
//           name: "Toff Guys",
//           language: "GB",
//           type: "working title",
//         },
//         {
//           name: "Los Caballeros de la mafia",
//           language: "ES",
//           type: null,
//         },
//         {
//           name: "Busha",
//           language: "GB",
//           type: "working title",
//         },
//         {
//           name: "Los caballeros: criminales con clase",
//           language: "AR",
//           type: null,
//         },
//         {
//           name: "紳士追殺令",
//           language: "TW",
//           type: null,
//         },
//         {
//           name: "Джентльмени",
//           language: "UA",
//           type: null,
//         },
//         {
//           name: "Εγκληματίες πρώτης τάξεως",
//           language: "GR",
//           type: null,
//         },
//         {
//           name: "ジェントルメン：2020",
//           language: "JP",
//           type: null,
//         },
//       ],
//       shortDescription:
//         "Наркобарон хочет уйти на покой, но криминальный мир не отпускает. Успешное возвращение Гая Ричи к корням",
//       ratingMpaa: "r",
//       ticketsOnSale: false,
//       ageRating: 18,
//       logo: {
//         url: "https://avatars.mds.yandex.net/get-ott/1534341/2a00000176f18064fd95abb74cbcc02873b8/orig",
//       },
//       top250: 26,
//       isSeries: false,
//     },
//     {
//       rating: {
//         kp: 8.011,
//         imdb: 8.2,
//         filmCritics: 7.8,
//         russianFilmCritics: 77.4194,
//       },
//       votes: {
//         kp: 1299832,
//         imdb: 1566857,
//         filmCritics: 289,
//         russianFilmCritics: 31,
//         await: 43021,
//       },
//       backdrop: {
//         url: "https://image.openmoviedb.com/tmdb-images/original/2P0toWq3feNvFAzf28j7vNc1IuZ.jpg",
//         previewUrl:
//           "https://image.openmoviedb.com/tmdb-images/w500/2P0toWq3feNvFAzf28j7vNc1IuZ.jpg",
//       },
//       movieLength: 180,
//       id: 462682,
//       type: "movie",
//       name: "Волк с Уолл-стрит",
//       description:
//         "1987 год. Джордан Белфорт становится брокером в успешном инвестиционном банке. Вскоре банк закрывается после внезапного обвала индекса Доу-Джонса. По совету жены Терезы Джордан устраивается в небольшое заведение, занимающееся мелкими акциями. Его настойчивый стиль общения с клиентами и врождённая харизма быстро даёт свои плоды. Он знакомится с соседом по дому Донни, торговцем, который сразу находит общий язык с Джорданом и решает открыть с ним собственную фирму. В качестве сотрудников они нанимают нескольких друзей Белфорта, его отца Макса и называют компанию «Стрэттон Оукмонт». В свободное от работы время Джордан прожигает жизнь: лавирует от одной вечеринки к другой, вступает в сексуальные отношения с проститутками, употребляет множество наркотических препаратов, в том числе кокаин и кваалюд. Однажды наступает момент, когда быстрым обогащением Белфорта начинает интересоваться агент ФБР...",
//       year: 2013,
//       poster: {
//         url: "https://image.openmoviedb.com/kinopoisk-images/1946459/5c758ac0-7a5c-4f00-a94f-1be680a312fb/orig",
//         previewUrl:
//           "https://image.openmoviedb.com/kinopoisk-images/1946459/5c758ac0-7a5c-4f00-a94f-1be680a312fb/x1000",
//       },
//       genres: [
//         {
//           name: "драма",
//         },
//         {
//           name: "криминал",
//         },
//         {
//           name: "биография",
//         },
//         {
//           name: "комедия",
//         },
//       ],
//       countries: [
//         {
//           name: "США",
//         },
//       ],
//       typeNumber: 1,
//       alternativeName: "The Wolf of Wall Street",
//       names: [
//         {
//           name: "Волк с Уолл-стрит",
//         },
//         {
//           name: "The Wolf of Wall Street",
//         },
//         {
//           name: "Para Avcisi",
//           language: "TR",
//         },
//         {
//           name: "华尔街狼人",
//           language: "HK",
//         },
//         {
//           name: "华尔街之狼",
//           language: "CN",
//         },
//         {
//           name: "Wilk z Wall Street",
//           language: "PL",
//         },
//         {
//           name: "더 울프 오브 월 스트리트",
//           language: "KR",
//         },
//         {
//           name: "คนจะรวย ช่วยไม่ได้",
//           language: "TH",
//         },
//         {
//           name: "El lobo de Wall Street",
//           language: "ES",
//         },
//         {
//           name: "Wall Streeti hunt",
//           language: "EE",
//         },
//       ],
//       shortDescription:
//         "Восхождение циника-гедониста на бизнес-олимп 1980-х. Блистательный тандем Леонардо ДиКаприо и Мартина Скорсезе",
//       ageRating: 18,
//       ratingMpaa: "r",
//       ticketsOnSale: false,
//       logo: {
//         url: "https://avatars.mds.yandex.net/get-ott/1534341/2a00000178c64fe43f3b567acaaa73e861f0/orig",
//       },
//       top250: 54,
//       isSeries: false,
//     },
//   ],
//   total: 1055703,
//   limit: 3,
//   page: 1,
//   pages: 351901,
// } as unknown as {docs: IMovie[]};

interface UserValue {
  label: string;
  value: string;
}

const HomePage: FC = () => {
  const { filmService } = useAPI();
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [value, setValue] = useState<UserValue>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarActive, setSidebarActive] = useState(false);
  const isEmptyParams = useRef(true);
  const [messageApi, contextHolder] = message.useMessage();



  const error = (messageStr: string) => {
    message.open({
      type: "error",
      content: messageStr,
    });
  };

  const { getParamsObj } = useFilter(JSON.stringify([page, limit]), () => ({
    page,
    limit,
  }));

  useEffect(() => {
    if (searchParams.size === 0) return; 
    setIsLoading(true);
    filmService
      .GetMovies({ limit, page, ...getParamsObj() })
      .then((res) => {
        setMovies(res.docs);
        setTotalItems(res.total);
        setPage(res.page);
        setLimit(res.limit);
      })
      .catch((e) => {
        console.log("error ocurred", e);
        error("Произошла ошибка, перезагрузите страницу");
      } )
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  const handleLimitChange = async (newLimit: number) => {
    setLimit(newLimit);
  };

  const handlePageChange = async (newPage: number) => {
    setPage(newPage);
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = async (name: string): Promise<UserValue[]> => {
    try {
      const res = await filmService.SearchMovieByName({ query: name });
      return res.docs.map((item) => {
        return {
          label: item.name ?? item.alternativeName,
          value: item.id.toString(),
        };
      });
    } catch (e) {
      console.log("error occured", e);
    }
  };

  const handleFilterClick = () => {
    setSidebarActive(active => !active);
  }

  return (
    <>
      <div className={classes.homePage}>
        <div className={classes.homePageInner}>
          <Title level={2} style={{ margin: 0 }}>
            Каталог фильмов и сериалов
          </Title>
          <DebounceSelect
            showSearch
            value={value}
            placeholder="Введите название фильма"
            fetchOptions={handleSearch}
            suffixIcon={<SearchOutlined />}
            onChange={(newValue: UserValue) => {
              setValue(newValue);
              navigate(`/movie/${newValue.value}`);
            }}
            style={{ width: "100%", height: 45 }}
          />
          <Flex align="center" gap={12}>
            <div>Фильмов, отображаемых на странице: </div>
            <Segmented
              options={["10", "30", "50"]}
              value={limit.toString()}
              onChange={(value) => handleLimitChange(+value)}
              block
            />
            <Button className={classes.filterButton} icon={<FilterOutlined/>} onClick={handleFilterClick}/>
          </Flex>
          <FilmGrid>
            {!!isLoading && <div className={classes.loadingOverlay}></div>}
            {/* Вынести в отдельную функцию */}
            {movies.map((item, index) => {
              return (
                <React.Fragment key={item.id}>
                  <FilmCard card={item} />
                </React.Fragment>
              );
            })}
          </FilmGrid>
          <Pagination
            defaultCurrent={page}
            total={totalItems}
            showSizeChanger={false}
            style={{ margin: "0 auto" }}
            onChange={handlePageChange}
          />
        </div>
        <FilterSideBar active={sidebarActive}/>
      </div>
    </>
  );
};

export default HomePage;
