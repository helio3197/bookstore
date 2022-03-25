import React from 'react';

const AddBook = () => (
  <section>
    <h2>
      ADD NEW BOOK
    </h2>
    <form>
      <label htmlFor="title">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Book title"
        />
      </label>
      <label htmlFor="category">
        <input
          list="category"
          placeholder="Category"
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
        </datalist>
      </label>
      <input
        type="submit"
        value="ADD BOOK"
      />
    </form>
  </section>
);

export default AddBook;
