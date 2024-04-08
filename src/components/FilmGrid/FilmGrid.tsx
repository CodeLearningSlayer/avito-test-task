import React, { PropsWithChildren, type FC } from 'react';
import * as classes from "./filmGrid.module.scss";

const FilmGrid: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={classes.grid}>
      {children}
    </div>
  );
};

export default FilmGrid;
