import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
const recipeContainer = document.querySelector('.recipe');
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    resultView.update(model.getSearchResultPage());
    //1 loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //2 rendering recipe
    recipeView.render(recipe);
    //3 update bookmarks view
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
    console.log(err);
  }
};
const controlSearchResults = async function () {
  try {
    //resultView.renderSpinner();
    //get search query
    const query = searchView.getQuery();
    if (!query) return;
    //load SearchQuery
    await model.loadSearchResult(query);
    //render query
    resultView.render(model.getSearchResultPage());
    //render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (page) {
  resultView.render(model.getSearchResultPage(page));
  paginationView.render(model.state.search);
};
///////////////////////////////////////
const init = function () {
  bookmarksView.addHandlerRender(controlBookMarks);
  recipeView.addHanderRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookMark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
const controlBookMarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlServings = function (nums) {
  model.updateServings(nums);
  const { recipe } = model.state;
  recipeView.update(recipe);
};
const controlAddBookMark = function () {
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    //Rerender bookmark
    bookmarksView.render(model.state.bookmarks);
    //change URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form window
    setTimeout(function () {
      addRecipeView._toggleWindow();
    }, 3000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};
init();
