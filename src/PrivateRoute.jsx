import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
