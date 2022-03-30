import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/books/books';

let id = 0;
const AddBook = () => {
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({});
  let titleInput = useRef(null);
  let categoryInput = useRef(null);
  let authorInput = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

    const { title, author, category } = inputValues;

    dispatch(addBook({
      title,
      author,
      category: (category !== '') ? category : 'category-not-provided',
      id: id += 1,
    }));
    titleInput.value = '';
    categoryInput.value = '';
    authorInput.value = '';
    setInputValues({ category: '' });
  };

  const titleHandler = (e) => {
    setInputValues((state) => ({
      ...state,
      title: e.target.value,
    }));
  };

  const authorHandler = (e) => {
    setInputValues((state) => ({
      ...state,
      author: e.target.value,
    }));
  };

  const categoryHandler = (e) => {
    setInputValues((state) => ({
      ...state,
      category: e.target.value,
    }));
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
            onChange={titleHandler}
          />
        </label>
        <label htmlFor="author">
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author"
            required
            ref={(node) => { authorInput = node; }}
            onChange={authorHandler}
          />
        </label>
        <label htmlFor="category">
          <input
            list="category"
            placeholder="Category"
            name="category"
            ref={(node) => { categoryInput = node; }}
            onChange={categoryHandler}
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
