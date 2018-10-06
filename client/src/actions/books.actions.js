import { booksService } from '../services/books.service';

// Book action types
export const booksConstants = {
  SEARCH_REQUEST: 'BOOKS_SEARCH_REQUEST',
  SEARCH_SUCCESS: 'BOOKS_SEARCH_SUCCESS',
  SEARCH_FAILURE: 'BOOKS_SEARCH_FAILURE',

  GET_BOOK_REQUEST: 'BOOKS_GET_BOOK_REQUEST',
  GET_BOOK_SUCCESS: 'BOOKS_GET_BOOK_SUCCESS',
  GET_BOOK_FAILURE: 'BOOKS_GET_BOOK_FAILURE',
};

// Based on a search term, send a request to the Google Books api
// to get the books based on that term.
// If the search is successful, return the books, otherwise return an error
function searchGoogleBooks(searchTerm) {
  function request(searchTerm) { return { type: booksConstants.SEARCH_REQUEST, searchTerm }; }
  function success(booksResults) { return { type: booksConstants.SEARCH_SUCCESS, booksResults }; }
  function failure(error) { return { type: booksConstants.SEARCH_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request({ searchTerm }));
    booksService.search(searchTerm)
      .then(
        (books) => {
          dispatch(success(books));
        },
        (error) => {
          dispatch(failure(error.toString()));
        },
      );
  };
}

// Based on a book, send a request to the Google Books api for that book.
// If the retrieval is successful, return the book, otherwise return an error.
function getGoogleBook(book) {
  function request(book) { return { type: booksConstants.GET_BOOK_REQUEST, book }; }
  function success(bookResult) { return { type: booksConstants.GET_BOOK_SUCCESS, bookResult }; }
  function failure(error) { return { type: booksConstants.GET_BOOK_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request({ book }));
    booksService.getBook(book)
      .then(
        (book) => {
          dispatch(success(book));
        },
        (error) => {
          dispatch(failure(error.toString()));
        },
      );
  };
}


export const bookActions = {
  searchGoogleBooks,
  getGoogleBook,
};
