import { API_BASE_URL } from "./constants.js";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(new Error(`Erro: ${res.status}`));
}

export function searchRecipes(query) {
  return fetch(
    `${API_BASE_URL}/search.php?s=${encodeURIComponent(query)}`
  ).then(checkResponse);
}

export function getRecipeById(id) {
  return fetch(
    `${API_BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`
  ).then(checkResponse);
}
