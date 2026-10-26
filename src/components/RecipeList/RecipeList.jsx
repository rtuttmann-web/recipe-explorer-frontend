import RecipeCard from "../RecipeCard/RecipeCard.jsx";
import "./RecipeList.css";

function RecipeList({ recipes, visibleCount, onShowMore }) {
  const visibleRecipes = recipes.slice(0, visibleCount);
  const hasMore = visibleCount < recipes.length;

  return (
    <section className="recipe-list" aria-live="polite">
      <h2 className="recipe-list__title">Resultados da busca</h2>
      <p className="recipe-list__count">
        {recipes.length === 1
          ? "1 receita encontrada"
          : `${recipes.length} receitas encontradas`}
      </p>
      <ul className="recipe-list__items">
        {visibleRecipes.map((recipe) => (
          <li className="recipe-list__item" key={recipe.idMeal}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          className="recipe-list__more-button"
          type="button"
          onClick={onShowMore}
        >
          Mostrar mais
        </button>
      )}
    </section>
  );
}

export default RecipeList;
