import React from 'react';
import Book from './Book';
import AddBook from './AddBook';

const Books = () => {
  const bookList = [
    {
      category: 'action',
      title: 'The Hunger Games',
      author: 'Suzane Collins',
      progress: '64',
      currentChapter: '17',
      id: '1',
    },
  ];
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
