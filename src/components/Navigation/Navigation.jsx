import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAboutActive = location.pathname === "/" && location.hash === "#about";

  function handleMenuToggle() {
    setIsMenuOpen((isOpen) => !isOpen);
  }

  function handleLinkClick() {
    setIsMenuOpen(false);
  }

  function handleHomeClick() {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getHomeLinkClassName({ isActive }) {
    return `navigation__link${
      isActive && !isAboutActive ? " navigation__link_active" : ""
    }`;
  }

  return (
    <nav className="navigation" aria-label="Navegação principal">
      <button
        className={`navigation__toggle${
          isMenuOpen ? " navigation__toggle_open" : ""
        }`}
        type="button"
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isMenuOpen}
        onClick={handleMenuToggle}
      />
      <ul
        className={`navigation__list${
          isMenuOpen ? " navigation__list_open" : ""
        }`}
      >
        <li className="navigation__item">
          <NavLink
            className={getHomeLinkClassName}
            to="/"
            end
            onClick={handleHomeClick}
          >
            Início
          </NavLink>
        </li>
        <li className="navigation__item">
          <Link
            className={`navigation__link${
              isAboutActive ? " navigation__link_active" : ""
            }`}
            to="/#about"
            onClick={handleLinkClick}
          >
            Sobre o autor
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
