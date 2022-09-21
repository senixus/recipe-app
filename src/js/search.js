import { paginateResults } from './pagination';
import { API_URL, API_KEY } from './constant';
import { getRecipesFromLocalStorage } from './recipe';
import { paginate, paginateButtons } from './pagination';

let searchText = '';
let results;

const search = async query => {
  try {
    const recipes = getRecipesFromLocalStorage();
    const response = await fetch(`${API_URL}?search=${query}&key=${API_KEY}`);
    const data = await response.json();

    if (data.data.recipes.length > 0) {
      const resultDatas = data.data.recipes?.map(item => {
        return {
          ...item,
          isBookmarked: false
        };
      });
      results = [...recipes, ...resultDatas];

      paginateResults(results);
      if (data.data.recipes.length > 10) {
        paginate();

        paginateButtons();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const searchEvent = () => {
  const searchInput = document.querySelector('.search__field');

  searchInput.addEventListener('change', e => {
    searchText = e.target.value;
  });
};

const submitSearch = () => {
  const form = document.querySelector('.search');
  form.addEventListener('submit', e => {
    e.preventDefault();

    search(searchText);
  });
};

export { searchEvent, submitSearch, results };
