import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, isLoading, initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState("");

  function handleChange(evt) {
    setQuery(evt.target.value);
    setError("");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError("Por favor, digite o nome de um prato");
      return;
    }

    onSearch(trimmedQuery);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <label className="search-form__label" htmlFor="search-query">
        Nome do prato
      </label>
      <div className="search-form__row">
        <input
          className={`search-form__input${
            error ? " search-form__input_type_error" : ""
          }${query ? " search-form__input_filled" : ""}`}
          id="search-query"
          name="query"
          type="search"
          placeholder="Ex.: chicken, beef, pasta, cake"
          value={query}
          onChange={handleChange}
          required
          minLength="1"
          maxLength="60"
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby="search-query-error"
        />
        <button
          className="search-form__button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Procurando..." : "Procurar"}
        </button>
      </div>
      <span className="search-form__error" id="search-query-error">
        {error}
      </span>
    </form>
  );
}

export default SearchForm;
