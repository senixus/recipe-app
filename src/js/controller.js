import { searchEvent, submitSearch } from './search';
import { getRecipeDetails, onClickBookmark, onRecipe } from './details';
import { setBookmarks } from './views/bookmarkView';
import { toggleBookmark } from './bookmark';
import { onClose, onModal, onSubmit, updateServings } from './recipe';

const recipeContainer = document.querySelector('.recipe');

const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

function init() {
  searchEvent();
  submitSearch();
  onRecipe();
  toggleBookmark();
  onClickBookmark();
  onModal();
  onClose();
  onSubmit();
  updateServings();
}

init();

document.addEventListener('DOMContentLoaded', () => {
  setBookmarks();
});

window.addEventListener('load', () => {
  getRecipeDetails();
});
