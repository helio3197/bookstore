const CHECKED_STATUS = 'bookstore/categories/CHECKED_STATUS';

const reducer = (state = [], action) => {
  switch (action.type) {
    case CHECKED_STATUS:
      return 'Under construction';
    default:
      return state;
  }
};

export const checkStatus = () => (
  { type: CHECKED_STATUS }
);

export default reducer;
