import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import RecipePage from "../RecipePage/RecipePage.jsx";
import Footer from "../Footer/Footer.jsx";
import { searchRecipes } from "../../utils/api.js";
import {
  RECIPES_PER_PAGE,
  SEARCH_ERROR_MESSAGE,
} from "../../utils/constants.js";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [visibleCount, setVisibleCount] = useState(RECIPES_PER_PAGE);

  function handleSearch(query) {
    setIsLoading(true);
    setHasSearched(true);
    setSearchError("");
    setVisibleCount(RECIPES_PER_PAGE);

    searchRecipes(query)
      .then((data) => {
        // a TheMealDB devolve { meals: null } quando não encontra nada
        setRecipes(data.meals || []);
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
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
