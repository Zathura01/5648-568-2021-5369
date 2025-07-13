import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();
  if (!user || !user.token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;