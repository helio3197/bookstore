import React from 'react';
import PropTypes from 'prop-types';

const Book = (props) => {
  const {
    category, title, author, progress, currentChap,
  } = props;
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
            <button type="button">
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
          Progress
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
  progress: PropTypes.string.isRequired,
  currentChap: PropTypes.string.isRequired,
};

export default Book;
