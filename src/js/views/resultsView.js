const results = document.querySelector('.results');

const setResult = data => {
  let htmlData = data.map(item => {
    return `<li class="preview">
        <a class="preview__link preview__link--active" href="#${item.id}">
          <figure class="preview__fig">
            <img src=${item.image_url} alt=${item.title} />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${item.title}</h4>
            <p class="preview__publisher">${item.publisher}</p>

          </div>
        </a>
      </li>`;
  });

  htmlData = htmlData.join('');
  results.innerHTML = htmlData;
};

const showSpinner = () => {
  results.innerHTML = `<div class="spinner">
    <svg>
      <use href="src/img/icons.svg#icon-loader"></use>
    </svg>
  </div>`;
};

export { showSpinner, setResult };
