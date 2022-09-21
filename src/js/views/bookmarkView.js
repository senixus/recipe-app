import { getBookmarksFromLocalStorage } from '../bookmark';
import icons from 'url:../../img/icons.svg';

const bookmark = document.querySelector('.bookmarks__list');

const setBookmarks = () => {
  const bookmarks = getBookmarksFromLocalStorage();

  let bookmarkHTML;

  if (bookmarks.length > 0) {
    bookmark.innerHTML = '';
    bookmarkHTML = bookmarks
      ?.map(bookmarkItem => {
        return `<li class="preview">
        <a class="preview__link preview__link--active" href="#${bookmarkItem.id}">
          <figure class="preview__fig">
            <img src=${bookmarkItem.image_url} alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${bookmarkItem.title}</h4>
            <p class="preview__publisher">${bookmarkItem.publisher}</p>

          </div>
        </a>
      </li>`;
      })
      .join('');
    bookmark.insertAdjacentHTML('afterbegin', bookmarkHTML);
  } else {
    bookmark.innerHTML = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
      No bookmarks yet. Find a nice recipe and bookmark it :)
    </p>
  </div>
`;
  }
};

export { setBookmarks };
