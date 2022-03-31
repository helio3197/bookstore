const REMOVED_BOOK = 'bookstore/books/REMOVED_BOOK';
const FETCH_BOOKS_BEGAN = 'bookstore/books/FETCH_BOOKS_BEGAN';
const FETCH_BOOKS_FAILED = 'bookstore/books/FETCH_BOOKS_FAILED';
const FETCH_BOOKS_WORKED = 'bookstore/books/FETCH_BOOKS_WORKED';
const ADD_NEW_BOOK_BEGAN = 'bookstore/books/ADD_NEW_BOOK_BEGAN';
const ADD_NEW_BOOK_SUCCEEDED = 'bookstore/books/ADD_NEW_BOOK_SUCCEEDED';
const ADD_NEW_BOOK_FAILED = 'bookstore/books/ADD_NEW_BOOK_FAILED';
const API_URL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/l2jyXNEHML0zwudM1nso/books';

const reducer = (state = { status: '', booksList: {} }, action) => {
  switch (action.type) {
    case ADD_NEW_BOOK_BEGAN:
      return {
        status: 'ADD_NEW_BOOK_BEGAN',
        booksList: state.booksList,
      };
    case ADD_NEW_BOOK_FAILED:
      return {
        status: 'ADD_NEW_BOOK_FAILED',
        booksList: state.booksList,
        error: action.error,
      };
    case ADD_NEW_BOOK_SUCCEEDED:
      return {
        status: 'ADD_NEW_BOOK_SUCCEEDED',
        booksList: {
          ...state.booksList,
          [action.data.item_id]: [
            {
              ...action.data,
            },
          ],
        },
      };
    case REMOVED_BOOK:
      return state.filter(({ id }) => id !== action.id);
    case FETCH_BOOKS_BEGAN:
      return {
        status: 'FETCHING_BOOKS',
      };
    case FETCH_BOOKS_FAILED:
      return {
        status: 'FETCHING_FAILED',
        error: action.error,
      };
    case FETCH_BOOKS_WORKED:
      return {
        status: 'FETCHING_SUCCEEDED',
        booksList: action.data,
      };
    default:
      return state;
  }
};

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

const addNewBookBegin = () => (
  {
    type: ADD_NEW_BOOK_BEGAN,
  }
);
const addNewBookFailure = (error) => (
  {
    type: ADD_NEW_BOOK_FAILED,
    error,
  }
);
const addNewBookSuccess = (book) => (
  {
    type: ADD_NEW_BOOK_SUCCEEDED,
    data: book,
  }
);

export const addNewBook = (book) => async (dispatch) => {
  dispatch(addNewBookBegin());
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(book),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const result = await response.text();
    if (!response.ok) {
      throw Error(result);
    }
    return dispatch(addNewBookSuccess(book));
  } catch (error) {
    return dispatch(addNewBookFailure(error));
  }
};

export default reducer;
