import React from 'react';
import PropTypes from 'prop-types';

const Book = (props) => {
  const { category, title, author } = props;
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
      </div>
    </div>
  );
};

Book.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Book;
