import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addNewBook } from '../redux/books/books';

const AddBook = () => {
  const { status, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({ category: '' });
  const [localState, setLocalState] = useState(status);
  let titleInput = useRef(null);
  let categoryInput = useRef(null);
  let authorInput = useRef(null);

  useEffect(() => {
    setLocalState(status);
  }, [status]);

  const submitHandler = (e) => {
    e.preventDefault();

    const { title, author, category } = inputValues;

    dispatch(addNewBook({
      title,
      author,
      category: (category !== '') ? category : 'uncategorized',
      item_id: uuidv4(),
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

  const checkStatus = (status) => {
    switch (status) {
      case 'ADD_NEW_BOOK_BEGAN':
        return (
          <small>
            Uploading book ...
          </small>
        );
      case 'ADD_NEW_BOOK_FAILED':
        return (
          <small>
            {`An error has occurred: ${error}`}
          </small>
        );
      case 'ADD_NEW_BOOK_SUCCEEDED':
        setTimeout(() => {
          setLocalState('INITIAL_STATE');
        }, 3000);
        return (
          <small>
            Book added successfully.
          </small>
        );
      default:
        return '';
    }
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
            <option>
              Economy
            </option>
            <option>
              Science Fiction
            </option>
            <option>
              Drama
            </option>
          </datalist>
        </label>
        <input
          type="submit"
          value="ADD BOOK"
        />
        {checkStatus(localState)}
      </form>
    </section>
  );
};

export default AddBook;
