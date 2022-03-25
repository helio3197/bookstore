import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => (
  <>
    <Header />
    <div className="content-container">
      <Outlet />
    </div>
  </>
);

export default App;
