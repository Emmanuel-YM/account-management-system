import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const isAuthenticated = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  if (!token) {
    return false;
  }
  try {
    let beginningOfTime = new Date(jwt_decode(token).exp * 1000);
    const remainingHours = new Date(beginningOfTime - new Date()).getHours();
    const remainingMinutes = new Date(
      beginningOfTime - new Date()
    ).getMinutes();

    //return false if the token is expired
    if (!(remainingHours || remainingMinutes) > 0) {
      return false;
    } else return true;
  } catch (err) {
    console.log(err, "Error Occured");
  }
};

const ProtectedRoute = ({ path, element }) => {
  if (!isAuthenticated()) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path={path} element={element} />
    </Routes>
  );
};
export default ProtectedRoute;
