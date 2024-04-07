import { Link } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import * as classes from "./header.module.scss";

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
                <Link className={classes.navLink} to="/">Главная</Link>
              </li>
              <li className={classes.navItem}>
                <Link className={classes.navLink} to="random">Случайный фильм</Link>
              </li>
            </ul>
          </nav>
        <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
