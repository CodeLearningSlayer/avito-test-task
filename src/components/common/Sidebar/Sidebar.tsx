import React, { type PropsWithChildren, type FC } from "react";
import * as classes from "./sideBar.module.scss";

const Sidebar: FC<PropsWithChildren & { active: boolean }> = ({
  children,
  active,
}) => {
  return (
    <div
      className={`${classes.sidebar} ${active ? classes.sidebarActive : ""}`}
    >
      {children}
    </div>
  );
};

export default Sidebar;
