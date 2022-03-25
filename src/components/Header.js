import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => (
  <div>
    <header>
      <nav>
        <Link
          to="/"
        >
          Bookstore CMS
        </Link>
        <ul>
          <li>
            <NavLink
              to="/books"
            >
              BOOKS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
            >
              CATEGORIES
            </NavLink>
          </li>
        </ul>
      </nav>
      <button type="button">
        account
      </button>
    </header>
  </div>
);

export default Header;
