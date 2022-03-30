import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../redux/books/books';
import Book from './Book';
import AddBook from './AddBook';

const Books = () => {
  const bookList = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  const renderState = () => {
    if (bookList.status === 'FETCHING_BOOKS') {
      return (
        <h1>LOADING ...</h1>
      );
    }
    if (bookList.status === 'FETCHING_FAILED') {
      return (
        <h1>
          {`SOMETHING WENT WRONG: ${bookList.error}`}
        </h1>
      );
    }
    if (!Object.keys(bookList).length) {
      return (
        <h1>There are no books yet.</h1>
      );
    }
    return (
      <ul>
        {Object.keys(bookList).map((bookId) => {
          const book = bookList[bookId][0];
          return (
            <li key={bookId}>
              <Book
                category={book.category}
                title={book.title}
                author={book.author}
                progress={book.progress}
                currentChap={book.currentChap}
                id={bookId}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="inner">
      <section className="book-list">
        {renderState()}
      </section>
      <AddBook />
    </div>
  );
};

export default Books;
