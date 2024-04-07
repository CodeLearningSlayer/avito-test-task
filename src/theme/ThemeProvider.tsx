import React, { type FC, useMemo, useState, type PropsWithChildren } from "react";
import { LOCAL_STORAGE_THEME_KEY, ThemeContext, Theme } from "./ThemeContext";

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

const ThemeProvider: FC<PropsWithChildren> = ({children}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const defaultProps = useMemo(
    () => ({
      theme: theme,
      setTheme: setTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={defaultProps}>
    {children}
  </ThemeContext.Provider>;
};

export default ThemeProvider;
