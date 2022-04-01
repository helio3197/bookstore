import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => (
  <>
    <Header />
    <div
      style={{
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Outlet />
    </div>
  </>
);

export default App;
