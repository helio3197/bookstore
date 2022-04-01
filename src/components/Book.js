import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeBook } from '../redux/books/books';
import CircularProgress from './CircularProgress';
import styles from './Book.module.css';

const Book = (props) => {
  const { status, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const {
    category, title, author, progress, currentChap, id,
  } = props;

  const removeHandler = () => {
    dispatch(removeBook(id));
  };

  return (
    <div className={styles.bookItemContainer}>
      <div className={styles.bookItemAbout}>
        <small className={styles.bookItemCategory}>
          {category}
        </small>
        <h2 className={styles.bookItemTitle}>
          {title}
        </h2>
        <p className={styles.bookItemAuthor}>
          {author}
        </p>
        <ul className={styles.bookItemActionBtns}>
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
            {(status === 'REMOVE_BOOK_FAILED')
              ? (<small>{`An error has occurred: ${error}`}</small>)
              : ''}
          </li>
          <li>
            <button type="button">
              Edit
            </button>
          </li>
        </ul>
      </div>
      <div className={styles.bookItemRightHandContainer}>
        <div className={styles.bookItemProgressWrap}>
          <div>
            <CircularProgress
              diameter="70"
              progress={progress}
            />
          </div>
          <div className={styles.bookItemProgress}>
            <p>
              {`${progress}%`}
            </p>
            <small>Completed</small>
          </div>
        </div>
        <div className={styles.bookItemChapterInfo}>
          <small>CURRENT CHAPTER</small>
          <p>
            {`Chapter ${currentChap}`}
          </p>
          <button
            className="button"
            type="button"
          >
            UPDATE PROGRESS
          </button>
        </div>
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
