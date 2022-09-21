import { results } from './search';
import { setResult } from './views/resultsView';
import icons from 'url:../img/icons.svg';

const pagination = document.querySelector('.pagination');

let currentPage = 1;
let dataPerPage = 10;

let hasData = false;

const paginateResults = data => {
  let indexOfLastData = currentPage * dataPerPage;
  let indexOfFirstData = indexOfLastData - dataPerPage;
  let currentData = data.slice(indexOfFirstData, indexOfLastData);
  setResult(currentData);

  hasData = getDataLength(currentData);
};

const setPrev = () => {
  pagination.innerHTML = '';

  if (currentPage > 1) {
    let html = `<button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
    <span>Page ${currentPage - 1}</span>
    </button>`;

    pagination.innerHTML += html;
  }
};

const paginateButtons = () => {
  pagination.innerHTML = '';

  let html;

  html = `${
    currentPage > 1
      ? `<button class="btn--inline pagination__btn--prev">
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
  </svg>
<span>Page ${currentPage - 1}</span>
</button>`
      : ''
  }
    ${
      hasData
        ? `<button class="btn--inline pagination__btn--next">
    <span>Page ${currentPage + 1}</span>
    <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
  </svg>
  </button>`
        : ''
    }

  `;
  pagination.insertAdjacentHTML('beforeend', html);
};

const paginate = () => {
  pagination.addEventListener('click', e => {
    if (
      e.target.parentElement.classList.contains('pagination__btn--prev') ||
      e.target.classList.contains('pagination__btn--prev')
    ) {
      if (currentPage === 1) return;
      currentPage--;
    }
    if (
      e.target.parentElement.classList.contains('pagination__btn--next') ||
      e.target.classList.contains('pagination__btn--next')
    ) {
      currentPage++;
    }
    paginateResults(results);
    paginateButtons();
  });
};

const getDataLength = data => (data.length < 10 ? false : true);

export { paginateResults, paginate, setPrev, paginateButtons };
