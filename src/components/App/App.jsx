import { useCallback, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import RecipePage from "../RecipePage/RecipePage.jsx";
import Footer from "../Footer/Footer.jsx";
import { getRecipeById, searchRecipes } from "../../utils/TheMealDbApi.js";
import { loadLastSearch, saveLastSearch } from "../../utils/storage.js";
import {
  RECIPES_PER_PAGE,
  SEARCH_ERROR_MESSAGE,
} from "../../utils/constants.js";
import "./App.css";

// a última busca é lida do armazenamento local uma vez, ao carregar o app
const lastSearch = loadLastSearch();

function App() {
  const [recipes, setRecipes] = useState(lastSearch?.recipes ?? []);
  const [lastQuery, setLastQuery] = useState(lastSearch?.query ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(Boolean(lastSearch));
  const [searchError, setSearchError] = useState("");
  const [visibleCount, setVisibleCount] = useState(RECIPES_PER_PAGE);

  function handleSearch(query) {
    setLastQuery(query);
    setIsLoading(true);
    setHasSearched(true);
    setSearchError("");
    setVisibleCount(RECIPES_PER_PAGE);

    searchRecipes(query)
      .then((data) => {
        // a TheMealDB devolve { meals: null } quando não encontra nada
        const foundRecipes = data.meals || [];
        setRecipes(foundRecipes);
        saveLastSearch(query, foundRecipes);
      })
      .catch((error) => {
        console.error(error);
        setRecipes([]);
        setSearchError(SEARCH_ERROR_MESSAGE);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleShowMore() {
    setVisibleCount((count) => count + RECIPES_PER_PAGE);
  }

  // busca uma receita pelo número; devolve null se ela não existir
  const loadRecipe = useCallback(
    (id) => getRecipeById(id).then((data) => (data.meals ? data.meals[0] : null)),
    []
  );

  function handleErrorClose() {
    setSearchError("");
  }

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              recipes={recipes}
              lastQuery={lastQuery}
              visibleCount={visibleCount}
              isLoading={isLoading}
              hasSearched={hasSearched}
              searchError={searchError}
              onSearch={handleSearch}
              onShowMore={handleShowMore}
              onErrorClose={handleErrorClose}
            />
          }
        />
        <Route
          path="/recipe/:id"
          element={<RecipePage onLoadRecipe={loadRecipe} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
