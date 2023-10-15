import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props  }) => {
  function isLoggedIn() {
    return localStorage.getItem("jwt")
  }

  return (
    isLoggedIn() ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
)}

export default ProtectedRoute;