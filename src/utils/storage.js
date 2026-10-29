import { SEARCH_STORAGE_KEY } from "./constants.js";

// lê a última busca salva; devolve null se não houver ou se der erro
export function loadLastSearch() {
  try {
    const savedSearch = JSON.parse(localStorage.getItem(SEARCH_STORAGE_KEY));
    return savedSearch && Array.isArray(savedSearch.recipes)
      ? savedSearch
      : null;
  } catch {
    return null;
  }
}

export function saveLastSearch(query, recipes) {
  try {
    localStorage.setItem(
      SEARCH_STORAGE_KEY,
      JSON.stringify({ query, recipes })
    );
  } catch {
    // armazenamento cheio ou bloqueado: a busca continua funcionando sem salvar
  }
}
