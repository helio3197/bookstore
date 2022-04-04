import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../redux/books/books';
import './Books.css';
import Book from './Book';
import AddBook from './AddBook';

const Books = () => {
  const { booksList, status, error } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  const renderState = () => {
    if (status === 'FETCHING_BOOKS') {
      return (
        <h1>LOADING ...</h1>
      );
    }
    if (status === 'FETCHING_FAILED') {
      return (
        <h1>
          {`SOMETHING WENT WRONG: ${error}`}
        </h1>
      );
    }
    const booksIdArr = Object.keys(booksList);
    if (!booksIdArr.length) {
      return (
        <h1>There are no books yet.</h1>
      );
    }

    return (
      <ul className="book-list">
        {booksIdArr.map((bookId) => {
          const book = booksList[bookId][0];
          return (
            <li key={bookId}>
              <Book
                category={book.category}
                title={book.title}
                author={book.author}
                progress={(book.chaptersTotal === 'unset') ? '1' : Math.floor((book.progress * 100) / book.chaptersTotal).toString()}
                currentChap={book.progress.toString()}
                chaptersTotal={(book.chaptersTotal === 'unset') ? '' : book.chaptersTotal.toString()}
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
      <section style={{
        marginBottom: '48px',
      }}
      >
        {renderState()}
      </section>
      <AddBook />
    </div>
  );
};

export default Books;
