import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/books/books';

let id = 0;
const AddBook = () => {
  const dispatch = useDispatch();
  let titleInput = useRef(null);
  let categoryInput = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addBook({
      title: titleInput.value,
      category: (categoryInput.value !== '') ? categoryInput.value : 'category-not-provided',
      id: id += 1,
    }));
    titleInput.value = '';
    categoryInput.value = '';
  };

  return (
    <section>
      <h2>
        ADD NEW BOOK
      </h2>
      <form
        onSubmit={submitHandler}
      >
        <label htmlFor="title">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Book title"
            required
            ref={(node) => { titleInput = node; }}
          />
        </label>
        <label htmlFor="category">
          <input
            list="category"
            placeholder="Category"
            name="category"
            ref={(node) => { categoryInput = node; }}
          />
          <datalist
            id="category"
          >
            <option>
              Action
            </option>
            <option>
              Fantasy
            </option>
          </datalist>
        </label>
        <input
          type="submit"
          value="ADD BOOK"
        />
      </form>
    </section>
  );
};

export default AddBook;
