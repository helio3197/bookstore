import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeBook, updateProgress } from '../redux/books/books';
import CircularProgress from './CircularProgress';
import styles from './Book.module.css';

const Book = (props) => {
  const {
    category, title, author, progress, currentChap, chaptersTotal, id,
  } = props;
  const { status, error } = useSelector((state) => state.books);
  const [triggerUpdateProgress, setTriggerUpdateProgress] = useState(false);
  const [triggerActionStatus, setTriggerActionStatus] = useState(false);
  const [updateProgressInputs, setUpdateProgressInputs] = useState({ currentChap, chaptersTotal });
  const [raisedError, setRaisedError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'UPDATE_SUCCEEDED' && triggerActionStatus) {
      setTriggerUpdateProgress(false);
      setTriggerActionStatus(false);
      if (raisedError) setRaisedError('');
    }
    if (status === 'UPDATE_FAILED' && triggerActionStatus) {
      setRaisedError(`Something went wrong: ${error}`);
      setTriggerActionStatus(false);
    }
  }, [status]);

  const removeHandler = () => {
    dispatch(removeBook(id));
    setTriggerActionStatus(true);
  };

  const submitUpdate = () => {
    const { currentChap, chaptersTotal } = updateProgressInputs;
    if (+currentChap < 1) return setRaisedError('Current chapter can\'t be less than 1');
    if (+currentChap > 999) return setRaisedError('Current chapter can\'t be greater than 999');
    if (+chaptersTotal < 1) return setRaisedError('Total chapters can\'t be less than 1');
    if (+chaptersTotal > 999) return setRaisedError('Total chapters can\'t be greater than 999');
    setTriggerActionStatus(true);
    return dispatch(updateProgress(id, currentChap, chaptersTotal));
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
              disabled={status === 'REMOVE_BOOK_BEGAN' && triggerActionStatus}
              onClick={removeHandler}
            >
              {(status === 'REMOVE_BOOK_BEGAN' && triggerActionStatus) ? 'Removing...' : 'Remove'}
            </button>
            {(status === 'REMOVE_BOOK_FAILED' && triggerActionStatus)
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
        {(triggerUpdateProgress)
          ? (
            <div className={styles.bookItemChapterInfo}>
              <small>UPDATE PROGRESS</small>
              <div className={styles.updateProgressInputs}>
                <div>
                  <button
                    type="button"
                    disabled={(+updateProgressInputs.currentChap <= 1)}
                    onClick={() => setUpdateProgressInputs((state) => ({
                      ...state,
                      currentChap: state.currentChap - 1,
                    }))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={updateProgressInputs.currentChap}
                    title="Current chapter"
                    onChange={(e) => setUpdateProgressInputs((state) => (
                      { ...state, currentChap: e.target.value }
                    ))}
                  />
                  <button
                    type="button"
                    disabled={(+updateProgressInputs.currentChap >= 999)}
                    onClick={() => setUpdateProgressInputs((state) => ({
                      ...state,
                      currentChap: +state.currentChap + 1,
                    }))}
                  >
                    +
                  </button>
                </div>
                of
                <div>
                  <button
                    type="button"
                    disabled={(+updateProgressInputs.chaptersTotal <= 1)}
                    onClick={() => setUpdateProgressInputs((state) => ({
                      ...state,
                      chaptersTotal: state.chaptersTotal - 1,
                    }))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    value={updateProgressInputs.chaptersTotal}
                    title="Total chapters"
                    onChange={(e) => setUpdateProgressInputs((state) => (
                      { ...state, chaptersTotal: e.target.value }
                    ))}
                  />
                  <button
                    type="button"
                    disabled={(+updateProgressInputs.chaptersTotal >= 999)}
                    onClick={() => setUpdateProgressInputs((state) => ({
                      ...state,
                      chaptersTotal: +state.chaptersTotal + 1,
                    }))}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className={styles.updateProgressBtns}>
                <button
                  className="button"
                  type="button"
                  disabled={status === 'UPDATE_BEGAN' && triggerActionStatus}
                  onClick={submitUpdate}
                >
                  {(status === 'UPDATE_BEGAN' && triggerActionStatus) ? 'SAVING...' : 'SAVE'}
                </button>
                <button
                  className="button cancel-btn"
                  type="button"
                  onClick={() => {
                    setTriggerUpdateProgress(false);
                    setUpdateProgressInputs({ currentChap, chaptersTotal });
                    setRaisedError('');
                  }}
                >
                  CANCEL
                </button>
              </div>
              <small>
                {raisedError}
              </small>
            </div>
          )
          : (
            <div className={styles.bookItemChapterInfo}>
              <small>CURRENT CHAPTER</small>
              <p>
                {`Chapter ${currentChap}`}
              </p>
              <button
                className="button"
                type="button"
                onClick={() => setTriggerUpdateProgress(true)}
              >
                UPDATE PROGRESS
              </button>
            </div>
          )}
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
  chaptersTotal: PropTypes.string,
  id: PropTypes.string.isRequired,
};

Book.defaultProps = {
  progress: '1',
  currentChap: '1',
  chaptersTotal: '',
};

export default Book;
