import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Preloader from "../Preloader/Preloader.jsx";
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx";
import {
  MAX_INGREDIENTS,
  RECIPE_ERROR_MESSAGE,
} from "../../utils/constants.js";
import "./RecipePage.css";

// junta strIngredient1..20 com strMeasure1..20, ignorando os vazios
function getIngredients(recipe) {
  const ingredients = [];

  for (let i = 1; i <= MAX_INGREDIENTS; i += 1) {
    const name = recipe[`strIngredient${i}`]?.trim();
    const measure = recipe[`strMeasure${i}`]?.trim();

    if (name) {
      ingredients.push({ id: `${i}-${name}`, name, measure });
    }
  }

  return ingredients;
}

// divide o modo de preparo em parágrafos
function getSteps(instructions = "") {
  return instructions
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter(Boolean);
}

function RecipePage({ onLoadRecipe }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isActive = true;

    onLoadRecipe(id)
      .then((data) => {
        if (!isActive) return;
        setRecipe(data);
        setStatus(data ? "success" : "not-found");
      })
      .catch((error) => {
        console.error(error);
        if (isActive) setStatus("error");
      });

    return () => {
      isActive = false;
    };
  }, [id, onLoadRecipe]);

  const backLink = (
    <Link className="recipe-page__back" to="/">
      ← Voltar para a busca
    </Link>
  );

  if (status === "loading") {
    return (
      <main className="recipe-page">
        {backLink}
        <Preloader text="Carregando a receita..." />
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="recipe-page">
        {backLink}
        <ErrorAlert message={RECIPE_ERROR_MESSAGE} />
      </main>
    );
  }

  if (status === "not-found") {
    return (
      <main className="recipe-page">
        {backLink}
        <h1 className="recipe-page__title">Receita não encontrada</h1>
        <p className="recipe-page__text">
          Não existe nenhuma receita com este endereço. Volte à busca e
          escolha outra.
        </p>
      </main>
    );
  }

  const ingredients = getIngredients(recipe);
  const steps = getSteps(recipe.strInstructions);

  return (
    <main className="recipe-page">
      {backLink}
      <article className="recipe">
        <div className="recipe__intro">
          <img
            className="recipe__image"
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
          />
          <div className="recipe__summary">
            <p className="recipe__tags">
              {[recipe.strCategory, recipe.strArea]
                .filter(Boolean)
                .join(" · ")}
            </p>
            <h1 className="recipe__title">{recipe.strMeal}</h1>

            <section className="recipe__ingredients">
              <h2 className="recipe__subtitle">
                Ingredientes ({ingredients.length})
              </h2>
              <ul className="recipe__ingredient-list">
                {ingredients.map((ingredient) => (
                  <li className="recipe__ingredient" key={ingredient.id}>
                    <span className="recipe__ingredient-name">
                      {ingredient.name}
                    </span>
                    {ingredient.measure && (
                      <span className="recipe__ingredient-measure">
                        {ingredient.measure}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {recipe.strYoutube && (
              <a
                className="recipe__video-link"
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
              >
                Assistir ao vídeo
              </a>
            )}
          </div>
        </div>

        <section className="recipe__instructions">
          <h2 className="recipe__subtitle">Modo de preparo</h2>
          {steps.map((step) => (
            <p className="recipe__step" key={step}>
              {step}
            </p>
          ))}
        </section>
      </article>
    </main>
  );
}

export default RecipePage;
