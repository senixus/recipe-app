import { getRecipeDetails, recipeDetails } from './details';

import { setBookmarks } from './views/bookmarkView';
import { setRecipeDetails } from './views/detailsView';

let currentBookmarks = [];

const getBookmarksFromLocalStorage = () => {
  let bookmarks;
  if (localStorage.getItem('bookmarks') === null) {
    bookmarks = [];
  } else {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  }

  if (bookmarks) {
    return bookmarks;
  } else {
    return currentBookmarks;
  }
};

const saveBookmark = async bookmark => {
  let bookmarksItem = [];

  const bookmarks = getBookmarksFromLocalStorage();
  if (bookmarks) {
    const hasBookmark =
      bookmarks.filter(item => item.id === bookmark.id).length > 0;

    if (hasBookmark) return;

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    bookmarksItem.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksItem));
  }
  setBookmarks();
};

const removeBookmark = bookmark => {
  const bookmarks = getBookmarksFromLocalStorage();

  const filterBookmarks = bookmarks.filter(item => item.id !== bookmark.id);

  localStorage.setItem('bookmarks', JSON.stringify(filterBookmarks));
  setBookmarks();
};

const toggleBookmark = () => {
  const bookmarkBtn = document.querySelector('.recipe');

  bookmarkBtn.addEventListener('click', async e => {
    if (
      e.target.classList.contains('btn--round') ||
      e.target.parentElement.classList.contains('btn--round') ||
      e.target.parentElement.parentElement.classList.contains('btn--round')
    ) {
      const id = window.location.hash.slice(1);
      const bookmarks = getBookmarksFromLocalStorage();

      const hasBookmark = bookmarks.find(item => item.id == id);

      if (hasBookmark) {
        removeBookmark(hasBookmark);
        await getRecipeDetails();
        return;
      }

      if (!recipeDetails.id) return;

      recipeDetails.isBookmarked = true;

      currentBookmarks.push(recipeDetails);
      setRecipeDetails(recipeDetails);
      saveBookmark(recipeDetails);
    }
  });
};

export {
  getBookmarksFromLocalStorage,
  saveBookmark,
  removeBookmark,
  toggleBookmark
};
