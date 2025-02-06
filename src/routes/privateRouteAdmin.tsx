import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

function PrivateRouteAdmin({children}: {children: React.ReactNode}) {
  const userAdmin = localStorage.getItem('admin');

  return userAdmin === 'true' ? children : <Navigate to="/" />;
}

export default PrivateRouteAdmin;