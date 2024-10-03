// src/components/ArtistRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ArtistRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  return user?.role === 'artist' ? children : <Navigate to="/" />;
};

export default ArtistRoute;