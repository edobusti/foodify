import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  meal: {},
  search: {
    results: [],
    page: 1,
    resultsPerPage: 5,
  },
  bookmarks: [],
};

export const loadMeal = async function (id) {
  try {
    const data = await getJSON(`${API_URL}lookup.php?i=${id}`);

    let meal = data.meals[0];
    let ingredients = [];

    for (let i = 1; i < 20; i++) {
      let ingredient = meal[`strIngredient${i}`];

      if (ingredient === false || ingredient === "" || ingredient === null)
        break;

      ingredients.push(ingredient);
    }

    state.meal = {
      id: meal.idMeal,
      title: meal.strMeal,
      image: meal.strMealThumb,
      ingredients: ingredients,
      instructions: meal.strInstructions,
      tutorial: meal.strYoutube,
    };

    state.bookmarks.some((bookmark) => bookmark.id === id)
      ? (state.meal.bookmarked = true)
      : (state.meal.bookmarked = false);
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    let searchFilter;

    query.length > 1 ? (searchFilter = "s") : (searchFilter = "f");

    const data = await getJSON(`${API_URL}search.php?${searchFilter}=${query}`);

    state.search.results = data.meals.map((meal) => {
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

const retainBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (meal) {
  state.bookmarks.push(meal);
  if (meal.id === state.meal.id) state.meal.bookmarked = true;
  retainBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex((el) => el.id === id);

  state.bookmarks.splice(index, 1);
  if (id === state.meal.id) state.meal.bookmarked = false;
  retainBookmarks();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
