const ADDED_BOOK = 'bookstore/books/ADDED_BOOK';
const REMOVED_BOOK = 'bookstore/books/REMOVED_BOOK';

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADDED_BOOK:
      return [
        ...state,
        action.data,
      ];
    case REMOVED_BOOK:
      return state.filter(({ id }) => id !== action.id);
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

export default reducer;
