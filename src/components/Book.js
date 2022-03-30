import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeBook } from '../redux/books/books';
import CircularProgress from './CircularProgress';

const Book = (props) => {
  const dispatch = useDispatch();

  const {
    category, title, author, progress, currentChap, id,
  } = props;

  const removeHandler = () => {
    dispatch(removeBook(id));
  };

  return (
    <div>
      <div>
        <small>
          {category}
        </small>
        <h2>
          {title}
        </h2>
        <p>
          {author}
        </p>
        <ul>
          <li>
            <button type="button">
              Comments
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={removeHandler}
            >
              Remove
            </button>
          </li>
          <li>
            <button type="button">
              Edit
            </button>
          </li>
        </ul>
      </div>
      <div>
        <div>
          <CircularProgress
            diameter="80"
            progress={progress}
          />
        </div>
        <div>
          <p>
            {`${progress}%`}
          </p>
          <small>Completed</small>
        </div>
      </div>
      <div>
        <small>CURRENT CHAPTER</small>
        <p>
          {`Chapter ${currentChap}`}
        </p>
        <button
          type="button"
        >
          UPDATE PROGRESS
        </button>
      </div>
    </div>
  );
};

Book.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  progress: PropTypes.string,
  currentChap: PropTypes.string,
  id: PropTypes.string.isRequired,
};

Book.defaultProps = {
  progress: '1',
  currentChap: '1',
};

export default Book;
