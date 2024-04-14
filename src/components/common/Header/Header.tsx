import * as classes from "./header.module.scss";
import { NavLink } from "react-router-dom";

console.log(classes);
const Header = () => {
  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.header__inner}>
          <div className={classes.header__logo}></div>
          <nav className={classes.nav}>
            <ul className={classes.navList}>
              <li className={classes.navItem}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${classes.navLink_active} ${classes.navLink}` : classes.navLink
                  }
                  to="/"
                >
                  Главная
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
