import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RiAccountCircleFill } from 'react-icons/ri';
import './Header.css';

const Header = () => (
  <div className="header-container">
    <header className="header-inner">
      <nav>
        <Link
          to="/"
          className="logo"
        >
          Bookstore CMS
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/books"
              style={({ isActive }) => ((isActive) ? { color: 'black' } : {})}
            >
              BOOKS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              style={({ isActive }) => ((isActive) ? { color: 'black' } : {})}
            >
              CATEGORIES
            </NavLink>
          </li>
        </ul>
      </nav>
      <button type="button" className="account-btn">
        <RiAccountCircleFill />
      </button>
    </header>
  </div>
);

export default Header;
