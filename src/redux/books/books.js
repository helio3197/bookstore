const ADDED_BOOK = 'bookstore/books/ADDED_BOOK';
const REMOVED_BOOK = 'bookstore/books/REMOVED_BOOK';
const FETCH_BOOKS_BEGAN = 'bookstore/books/FETCH_BOOKS_BEGAN';
const FETCH_BOOKS_FAILED = 'bookstore/books/FETCH_BOOKS_FAILED';
const FETCH_BOOKS_WORKED = 'bookstore/books/FETCH_BOOKS_WORKED';
const API_URL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/l2jyXNEHML0zwudM1nso/books';

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADDED_BOOK:
      return [
        ...state,
        action.data,
      ];
    case REMOVED_BOOK:
      return state.filter(({ id }) => id !== action.id);
    case FETCH_BOOKS_BEGAN:
      return { status: 'FETCHING_BOOKS' };
    case FETCH_BOOKS_FAILED:
      return { status: 'FETCHING_FAILED', error: action.error };
    case FETCH_BOOKS_WORKED:
      return action.data;
    default:
      return state;
  }
};

export const addBook = (book) => (
  {
    type: ADDED_BOOK,
    data: book,
  }
);

export const removeBook = (id) => (
  {
    type: REMOVED_BOOK,
    id,
  }
);

const fetchBooksBegin = () => (
  {
    type: FETCH_BOOKS_BEGAN,
  }
);
const fetchBooksFailure = (error) => (
  {
    type: FETCH_BOOKS_FAILED,
    error,
  }
);
const fetchBooksSucess = (books) => (
  {
    type: FETCH_BOOKS_WORKED,
    data: books,
  }
);

export const fetchBooks = () => async (dispatch) => {
  dispatch(fetchBooksBegin());
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const data = await response.json();
    return dispatch(fetchBooksSucess(data));
  } catch (error) {
    return dispatch(fetchBooksFailure(error));
  }
};

export default reducer;
