import React, { Suspense, useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { AppRouter } from "../config/router";
import "./styles/index.scss";
import DefaultLayout from "./layouts/default";

const App = () => {
  return (
    <div className="app">
      <Suspense>
        <DefaultLayout>
          <Routes>
            {Object.values(AppRouter).map(({ element, path }) => (
              <Route element={element} path={path} />
            ))}
          </Routes>
        </DefaultLayout>
      </Suspense>
    </div>
  );
};

export default App;
