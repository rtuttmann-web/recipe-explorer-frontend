import { CURRENT_YEAR } from "../../utils/constants.js";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {CURRENT_YEAR} Ricardo Tuttmann. Dados de receitas: TheMealDB.
      </p>
      <ul className="footer__links">
        <li>
          <a
            className="footer__link"
            href="https://github.com/rtuttmann-web"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            className="footer__link"
            href="https://tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
        </li>
        <li>
          <a
            className="footer__link"
            href="https://www.themealdb.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            TheMealDB
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
