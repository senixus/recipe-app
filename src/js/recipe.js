import { recipeDetails } from './details';
import { setRecipeDetails } from './views/detailsView';

const addRecipeBtn = document.querySelector('.nav__btn--add-recipe');
const overlay = document.querySelector('.overlay');
const addRecipeForm = document.querySelector('.add-recipe-window');
const btnCloseModal = document.querySelector('.btn--close-modal');

let currentRecipe = [];

const addRecipe = async recipe => {
  window.history.pushState(null, '', `#${recipe.id}`);
  setRecipeDetails(recipe);

  const recipeData = localStorage.getItem('recipes');
  if (recipeData === null) {
    currentRecipe.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(currentRecipe));
  } else {
    let data = JSON.parse(localStorage.getItem('recipes'));
    data.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(data));
  }
};

const getRecipesFromLocalStorage = () => {
  const recipes = localStorage.getItem('recipes');

  if (recipes === null) {
    return currentRecipe;
  } else {
    return JSON.parse(localStorage.getItem('recipes'));
  }
};

const onModal = () => {
  addRecipeBtn.addEventListener('click', e => {
    overlay.classList.remove('hidden');
    addRecipeForm.classList.remove('hidden');
  });
};

const onClose = () => {
  btnCloseModal.addEventListener('click', e => {
    overlay.classList.add('hidden');
    addRecipeForm.classList.add('hidden');
  });
};

const onSubmit = () => {
  const form = document.querySelector('.upload');

  let recipe = {};
  let ingredients = [];

  document.querySelectorAll('input').forEach(e => {
    e.addEventListener('change', event => {
      if (!e.classList.contains('search__field')) {
        const { name, value } = event.target;

        if (
          name === 'ingredient-1' ||
          name === 'ingredient-2' ||
          name === 'ingredient-3' ||
          name === 'ingredient-4' ||
          name === 'ingredient-5' ||
          name === 'ingredient-6'
        ) {
          if (value.includes(',')) {
            const splittedValue = value.split(',');
            let ingredient = {
              quantity: splittedValue[0],
              unit: splittedValue[1],
              description: splittedValue[2]
            };
            ingredients.push(ingredient);
          }
        }
        if (!name.startsWith('ingredient')) {
          recipe = {
            ...recipe,
            [name]: value,
            ingredients,
            id: (Math.random() + 1).toString(36).slice(2),
            isBookmarked: false
          };
        }
      }
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    addRecipe(recipe);
    overlay.classList.add('hidden');
    addRecipeForm.classList.add('hidden');
  });
};

const updateServings = () => {
  const recipeEl = document.querySelector('.recipe');

  recipeEl.addEventListener('click', e => {
    if (
      e.target.classList.contains('decrease') ||
      e.target.parentElement.classList.contains('decrease') ||
      e.target.parentElement.parentElement.classList.contains('decrease')
    ) {
      if (recipeDetails.servings !== 1) {
        recipeDetails.ingredients.forEach(ing => {
          ing.quantity =
            (ing.quantity * recipeDetails.servings - 1) /
            recipeDetails.servings;
        });
        recipeDetails.servings = recipeDetails.servings - 1;
        setRecipeDetails(recipeDetails);
      }
    }

    if (
      e.target.classList.contains('increase') ||
      e.target.parentElement.classList.contains('increase') ||
      e.target.parentElement.parentElement.classList.contains('increase')
    ) {
      recipeDetails.ingredients.forEach(ing => {
        ing.quantity =
          (ing.quantity * Number(recipeDetails.servings) + 1) /
          Number(recipeDetails.servings);
      });
      recipeDetails.servings = Number(recipeDetails.servings) + 1;
      setRecipeDetails(recipeDetails);
    }
  });
};

export {
  onModal,
  onClose,
  onSubmit,
  getRecipesFromLocalStorage,
  updateServings
};
