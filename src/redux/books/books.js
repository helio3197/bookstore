const ADDED_BOOK = 'bookstore/books/ADDED_BOOK';
const REMOVED_BOOK = 'bookstore/books/REMOVED_BOOK';

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADDED_BOOK: {
      const {
        category, title, author, progress, currentChap, id,
      } = action;
      return [
        ...state,
        {
          category,
          title,
          author,
          progress,
          currentChap,
          id,
        },
      ];
    }
    case REMOVED_BOOK:
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

export const addBook = (category, title, author, progress, currentChap, id) => (
  {
    type: ADDED_BOOK,
    category,
    title,
    author,
    progress,
    currentChap,
    id,
  }
);

export const removeBook = (id) => (
  {
    type: REMOVED_BOOK,
    id,
  }
);

export default reducer;
