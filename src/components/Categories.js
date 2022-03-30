import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkStatus } from '../redux/categories/categories';

const Categories = () => {
  const status = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const buttonHandler = () => {
    dispatch(checkStatus());
  };

  return (
    <div>
      <button
        type="button"
        onClick={buttonHandler}
      >
        Check Status
      </button>
      <h1>
        {status}
      </h1>
    </div>
  );
};

export default Categories;
