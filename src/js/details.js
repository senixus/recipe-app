import { getBookmarksFromLocalStorage } from './bookmark';
import { API_URL, API_KEY } from './constant';
import { getRecipesFromLocalStorage } from './recipe';
import { setRecipeDetails } from './views/detailsView';

let recipeDetails;

const getRecipeDetails = async () => {
  try {
    const bookmarks = getBookmarksFromLocalStorage();
    const id = window.location.hash.slice(1);

    if (!id) return;

    const recipes = getRecipesFromLocalStorage();

    let recipe = recipes.find(item => item.id == id);

    let hasRecipeBookmark = bookmarks.find(item => item.id == recipe.id);

    if (recipe) {
      recipeDetails = {
        ...recipe,
        isBookmarked: hasRecipeBookmark ? true : false
      };
      setRecipeDetails(recipeDetails);
      return;
    }

    const response = await fetch(`${API_URL}/${id}?key=${API_KEY}`);
    const data = await response.json();

    if (data.data.recipe) {
      const hasBookmark = bookmarks.find(
        item => item.id == data.data.recipe.id
      );

      if (hasBookmark) {
        recipeDetails = {
          ...data.data.recipe,
          isBookmarked: true
        };
      } else {
        recipeDetails = {
          ...data.data.recipe,
          isBookmarked: false
        };
      }

      setRecipeDetails(recipeDetails);
    }
  } catch (error) {
    console.log(error);
  }
};

const onRecipe = () => {
  window.addEventListener('hashchange', () => {
    getRecipeDetails();
  });
};

const onClickBookmark = () => {
  const bookmarks = document.querySelector('.bookmarks');
  bookmarks.addEventListener('click', e => {
    getRecipeDetails();
  });
};

export { getRecipeDetails, onRecipe, onClickBookmark, recipeDetails };
