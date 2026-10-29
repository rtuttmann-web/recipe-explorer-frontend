import { Link } from "react-router-dom";
import "./RecipeCard.css";

function RecipeCard({ recipe }) {
  const { idMeal, strMeal, strMealThumb, strCategory, strArea, strInstructions } =
    recipe;

  return (
    <article className="recipe-card">
      <Link className="recipe-card__link" to={`/recipe/${idMeal}`}>
        <img
          className="recipe-card__image"
          src={strMealThumb}
          alt={strMeal}
          loading="lazy"
        />
        <div className="recipe-card__content" lang="en">
          <p className="recipe-card__category">{strCategory}</p>
          <h3 className="recipe-card__title">{strMeal}</h3>
          <p className="recipe-card__text">{strInstructions}</p>
          <p className="recipe-card__area">{strArea}</p>
        </div>
      </Link>
    </article>
  );
}

export default RecipeCard;
