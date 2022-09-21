import icons from 'url:../../img/icons.svg';

const recipeDetails = document.querySelector('.recipe');

const setRecipeDetails = data => {
  recipeDetails.innerHTML = '';

  let recipe = `<figure class="recipe__fig" >
    <img src=${data?.image_url} alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        data.cooking_time
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings decrease">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings increase">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round" data-id=${data.id}>
      <svg class="">
        <use href="${icons}#${
    data.isBookmarked ? 'icon-bookmark-fill' : 'icon-bookmark'
  }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${data.ingredients
      ?.map(
        item => ` <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      item.quantity && item.quantity?.toString()?.includes('.')
        ? Number(item.quantity).toFixed(1)
        : item.quantity
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${item.unit && item.unit}</span>
      ${item.description}
    </div>
  </li>`
      )
      .join('')}


    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${data.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href=${data.source_url}
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;

  recipeDetails.insertAdjacentHTML('afterbegin', recipe);
};

export { setRecipeDetails };
