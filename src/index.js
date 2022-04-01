import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import store from './redux/configureStore';
import App from './App';
import Books from './components/Books';
import Categories from './components/Categories';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={store}
    >
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Books />} />
            <Route path="books" element={<Books />} />
            <Route path="categories" element={<Categories />} />
          </Route>
          <Route
            path="*"
            element={
              <h1>Nothing here!</h1>
            }
          />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
