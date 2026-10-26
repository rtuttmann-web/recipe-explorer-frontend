import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation.jsx";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <Link className="header__logo" to="/">
        Recipe Explorer
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
