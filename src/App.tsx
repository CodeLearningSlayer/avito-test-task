import React, { Suspense, useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Counter from "./components/Counter";
import { MoviePageAsync } from "./pages/MoviePage/MoviePage.async";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import "./index.scss";

const App = () => {


  return (
    <div className="app">
      <Link to={"/"}> Main </Link>
      <Link to={"/movies"}> Movie </Link>
      <Suspense>
        <Routes>
          <Route path={"/movies"} element={<MoviePageAsync />} />
          <Route path={"/"} element={<MainPageAsync />} />
        </Routes>
      </Suspense>
      <Counter />
      fuck you
    </div>
  );
};

export default App;
