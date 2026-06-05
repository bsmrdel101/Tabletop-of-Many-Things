import { useState } from "react";
import Button from "../library/Button";
import Link from "../library/Link";
import UserBox from "../UserBox";

export default function MainNavbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const url = location.pathname;


  return (
    <nav className={`navbar ${mobileNavOpen ? "navbar--open" : ""}`}>
      <Button
        variants={["empty"]}
        className="navbar__hamburger-btn"
        onClick={() => setMobileNavOpen((v) => !v)}
      >
        <img alt="" src="/images/icons/bars.svg" />
      </Button>

      <Link to="/" className="navbar__link">
        <img className="navbar__logo" alt="Logo" src="/images/logo.svg" />
      </Link>

      <Link to="/play" className={`navbar__link${url === '/play' ? ' navbar__link--active' : ''}`}>
        Play
      </Link>
      <Link to="/characters" className={`navbar__link${url === '/characters' ? ' navbar__link--active' : ''}`}>
        Characters
      </Link>
      <Link to="/worlds" className={`navbar__link${url === '/worlds' ? ' navbar__link--active' : ''}`}>
        Worlds
      </Link>
      <Link to="/homebrew" className={`navbar__link${url === '/homebrew' ? ' navbar__link--active' : ''}`}>
        Homebrew
      </Link>
      {/* <Link to="/plugins" className={`navbar__link${url === '/plugins' ? ' navbar__link--active' : ''}`}>
        Plugins
      </Link> */}
      <Link to="/dice" className={`navbar__link${url === '/dice' ? ' navbar__link--active' : ''}`}>
        Dice
      </Link>

      <UserBox />
    </nav>
  );
}
