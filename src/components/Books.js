import React from 'react';
import { useSelector } from 'react-redux';
import Book from './Book';
import AddBook from './AddBook';

const Books = () => {
  const bookList = useSelector((state) => state.books);

  return (
    <div className="inner">
      <section className="book-list">
        <ul>
          {bookList.map((item) => (
            <li key={item.id}>
              <Book
                category={item.category}
                title={item.title}
                author={item.author}
                progress={item.progress}
                currentChap={item.currentChap}
                id={item.id}
              />
            </li>
          ))}
        </ul>
      </section>
      <AddBook />
    </div>
  );
};

export default Books;
