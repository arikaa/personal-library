
// manages the books
import { booksConstants } from '../actions/books.actions';

//const loadedBooks = JSON.parse(localStorage.getItem('books.loadedBooks'));

const initialState = {
  searching: false,
  items: [],
  loadedBooks: [],
};

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case booksConstants.SEARCH_REQUEST:
      return Object.assign({}, state, {
        searching: true,
      });
    case booksConstants.SEARCH_SUCCESS:
      return Object.assign({}, state, {
        items: action.booksResults,
      });
    case booksConstants.SEARCH_FAILURE:
      return {};
    case booksConstants.GET_BOOK_REQUEST:
      return {};
    case booksConstants.GET_BOOK_SUCCESS:
      return Object.assign({}, state, {
        loadedBooks: action.bookResult,
      });
    case booksConstants.GET_BOOK_FAILURE:
      return {};
    default:
      return state;
  }
}
