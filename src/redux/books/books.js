const FETCH_BOOKS_BEGAN = 'bookstore/books/FETCH_BOOKS_BEGAN';
const FETCH_BOOKS_FAILED = 'bookstore/books/FETCH_BOOKS_FAILED';
const FETCH_BOOKS_WORKED = 'bookstore/books/FETCH_BOOKS_WORKED';
const ADD_NEW_BOOK_BEGAN = 'bookstore/books/ADD_NEW_BOOK_BEGAN';
const ADD_NEW_BOOK_SUCCEEDED = 'bookstore/books/ADD_NEW_BOOK_SUCCEEDED';
const ADD_NEW_BOOK_FAILED = 'bookstore/books/ADD_NEW_BOOK_FAILED';
const REMOVE_BOOK_SUCCEEDED = 'bookstore/books/REMOVE_BOOK_SUCCEEDED';
const REMOVE_BOOK_FAILED = 'bookstore/books/REMOVE_BOOK_FAILED';
const UPDATE_PROGRESS_BEGAN = 'bookstore/books/UPDATE_PROGRESS_BEGAN';
const UPDATE_PROGRESS_FAILED = 'bookstore/books/UPDATE_PROGRESS_FAILED';
const UPDATE_PROGRESS_SUCCEEDED = 'bookstore/books/UPDATE_PROGRESS_SUCCEEDED';
const API_URL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/l2jyXNEHML0zwudM1nso/books';
const API_URL_PROGRESS = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/VA1RR7sLhUiIYKj1tQfH/books';

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
    case REMOVE_BOOK_SUCCEEDED: {
      const updatedBooklist = { ...state.booksList };
      delete updatedBooklist[action.id];
      return {
        status: 'REMOVE_BOOK_SUCCEEDED',
        booksList: updatedBooklist,
      };
    }
    case REMOVE_BOOK_FAILED:
      return {
        status: 'REMOVE_BOOK_FAILED',
        booksList: state.booksList,
        error: action.error,
      };
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
    case UPDATE_PROGRESS_BEGAN:
      return {
        booksList: state.booksList,
        status: 'UPDATE_BEGAN',
      };
    case UPDATE_PROGRESS_FAILED:
      return {
        booksList: state.booksList,
        status: 'UPDATE_FAILED',
        error: action.error,
      };
    case UPDATE_PROGRESS_SUCCEEDED: {
      const booksList = { ...state.booksList };
      const { id, progress, chaptersTotal } = action.update;
      booksList[id][0].progress = progress;
      booksList[id][0].chaptersTotal = chaptersTotal;
      return {
        booksList,
        status: 'UPDATE_SUCCEEDED',
      };
    }
    default:
      return state;
  }
};

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
    const booksData = await response.json();

    const responseProgress = await fetch(API_URL_PROGRESS);
    if (!responseProgress.ok) {
      throw Error(responseProgress.statusText);
    }
    const progressData = await responseProgress.json();

    Object.keys(booksData).forEach((id) => {
      booksData[id][0].progress = progressData[id][0].category.progress;
      booksData[id][0].chaptersTotal = progressData[id][0].category.chaptersTotal;
    });

    return dispatch(fetchBooksSucess(booksData));
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
    data: { ...book, progress: '1', chaptersTotal: 'unset' },
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

    const responseUpdateProgress = await fetch(API_URL_PROGRESS, {
      method: 'POST',
      body: JSON.stringify({
        item_id: book.item_id,
        title: 'This object is used to store the progress',
        author: 'Kenny',
        category: { progress: '1', chaptersTotal: 'unset' },
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const resultUpdateProgress = await responseUpdateProgress.text();
    if (!responseUpdateProgress.ok) {
      throw Error(resultUpdateProgress);
    }

    return dispatch(addNewBookSuccess(book));
  } catch (error) {
    return dispatch(addNewBookFailure(error));
  }
};

const removeBookSucess = (id) => (
  {
    type: REMOVE_BOOK_SUCCEEDED,
    id,
  }
);

const removeBookFailure = (error) => (
  {
    type: REMOVE_BOOK_FAILED,
    error,
  }
);

export const removeBook = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        item_id: id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const result = await response.text();
    if (!response.ok) {
      throw Error(result);
    }

    const responseRemoveProgress = await fetch(`${API_URL_PROGRESS}/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        item_id: id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const resultRemoveProgress = await responseRemoveProgress.text();
    if (!responseRemoveProgress.ok) {
      throw Error(resultRemoveProgress);
    }

    return dispatch(removeBookSucess(id));
  } catch (error) {
    return dispatch(removeBookFailure(error));
  }
};

const updateProgressBegin = () => (
  {
    type: UPDATE_PROGRESS_BEGAN,
  }
);

const updateProgressFailure = (error) => (
  {
    type: UPDATE_PROGRESS_FAILED,
    error,
  }
);

const updateProgressSucess = (updatedProgress) => (
  {
    type: UPDATE_PROGRESS_SUCCEEDED,
    update: updatedProgress,
  }
);

export const updateProgress = (id, progress, chaptersTotal) => async (dispatch) => {
  try {
    dispatch(updateProgressBegin());
    const responseRemove = await fetch(`${API_URL_PROGRESS}/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        item_id: id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const resultRemove = await responseRemove.text();
    if (!responseRemove.ok) {
      throw Error(resultRemove);
    }

    const responseUpdate = await fetch(API_URL_PROGRESS, {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        title: 'This object is used to store the progress',
        author: 'Kenny',
        category: { progress, chaptersTotal },
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const resultUpdate = await responseUpdate.text();
    if (!responseUpdate.ok) {
      throw Error(resultUpdate);
    }

    dispatch(updateProgressSucess({ id, progress, chaptersTotal }));
  } catch (error) {
    dispatch(updateProgressFailure(error));
  }
};

export default reducer;
