import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import RecipeList from "../RecipeList/RecipeList.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";
import ErrorAlert from "../ErrorAlert/ErrorAlert.jsx";
import About from "../About/About.jsx";
import "./Main.css";

function Main({
  recipes,
  visibleCount,
  isLoading,
  hasSearched,
  searchError,
  onSearch,
  onShowMore,
  onErrorClose,
}) {
  const location = useLocation();
  const resultsRef = useRef(null);
  const hasResults = recipes.length > 0;
  const isNothingFound =
    hasSearched && !isLoading && !searchError && !hasResults;

  // rola até a seção indicada no endereço (ex.: /#about)
  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  // ao começar uma busca, rola a página até a área dos resultados
  useEffect(() => {
    if (isLoading) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isLoading]);

  return (
    <main className="main">
      <section className="hero">
        <h1 className="hero__title">Receitas do mundo inteiro</h1>
        <p className="hero__subtitle">
          Digite o nome de um prato em inglês, como chicken curry ou chocolate
          cake, e descubra receitas de vários países, com ingredientes, modo de
          preparo e vídeo.
        </p>
        <SearchForm onSearch={onSearch} isLoading={isLoading} />
      </section>

      <div className="main__results" ref={resultsRef}>
        {searchError && (
          <ErrorAlert message={searchError} onClose={onErrorClose} />
        )}
        {isLoading && <Preloader />}
        {isNothingFound && <NothingFound />}
        {!isLoading && hasResults && (
          <RecipeList
            recipes={recipes}
            visibleCount={visibleCount}
            onShowMore={onShowMore}
          />
        )}
      </div>

      <About />
    </main>
  );
}

export default Main;
