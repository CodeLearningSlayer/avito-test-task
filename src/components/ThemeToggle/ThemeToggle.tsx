import React from "react";
import "./ThemeToggle.scss";

const ThemeToggle = () => {
  return (
    <div className="theme-switch">
      <input type="checkbox" id="switch" />
      <label htmlFor="switch">Toggle</label>
    </div>
  );
};

export default ThemeToggle;
