import React, { type PropsWithChildren, type FC } from "react";
import Header from "../components/common/Header/Header";

const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="default-layout">
      <Header />
      <main className="main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
};

export default DefaultLayout;
