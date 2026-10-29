import nothingFoundIcon from "../../images/search-empty.svg";
import "./NothingFound.css";

function NothingFound() {
  return (
    <section className="nothing-found" aria-live="polite">
      <img
        className="nothing-found__icon"
        src={nothingFoundIcon}
        alt=""
        width="96"
        height="96"
      />
      <h2 className="nothing-found__title">Nada encontrado</h2>
      <p className="nothing-found__text">
        Infelizmente, nenhuma receita corresponde a esta busca. Tente outro
        nome de prato, em inglês: por exemplo, chicken, pasta ou cake.
      </p>
    </section>
  );
}

export default NothingFound;
