import { Link, useParams } from "react-router-dom";
import "./RecipePage.css";

function RecipePage() {
  const { id } = useParams();

  return (
    <main className="recipe-page">
      <Link className="recipe-page__back" to="/">
        ← Voltar para a busca
      </Link>
      <h1 className="recipe-page__title">Receita nº {id}</h1>
      <p className="recipe-page__text">
        Os detalhes da receita vão aparecer aqui.
      </p>
    </main>
  );
}

export default RecipePage;
