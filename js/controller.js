import * as model from "./model.js";
import mealView from "./views/mealView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

const controlMeal = async function () {
  let id = window.location.hash.slice(1);

  try {
    if (!id) {
      mealView.renderMessage();
      await model.loadSearchResults("C");
      resultsView.render(model.getSearchResultPage());
      paginationView.render(model.state.search);
      return;
    }

    mealView.renderSpinner();
    await model.loadMeal(id);
    mealView.render(model.state.meal);
  } catch (err) {
    mealView.renderError(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) throw new Error();

    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultPage());
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddBookmark = function () {
  !model.state.meal.bookmarked
    ? model.addBookmark(model.state.meal)
    : model.deleteBookmark(model.state.meal.id);

  mealView.render(model.state.meal);
  bookmarksView.render(model.state.bookmarks);
};

const controlShowBookmarks = function (container) {
  if (container.innerHTML === "") {
    bookmarksView.renderMessage();
  }
};

const init = function () {
  mealView.addHandlerRender(controlMeal);
  mealView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerLoad(controlBookmarks);
  bookmarksView.addHandlerHover(controlShowBookmarks);
};

init();
