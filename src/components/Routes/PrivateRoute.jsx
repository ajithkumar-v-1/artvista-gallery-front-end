import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ roleRequired }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // Check if the user is authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check if the user has the required role to access the route
  if (roleRequired && userRole !== roleRequired) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
