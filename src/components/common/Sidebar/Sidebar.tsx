import React, { type PropsWithChildren, type FC } from 'react';
import * as classes from "./sideBar.module.scss";

const Sidebar: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className={classes.sidebar}>
      {children}
    </div>
  );
};

export default Sidebar;
