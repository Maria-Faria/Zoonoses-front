import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

function PrivateRouteAdmin({children}: {children: React.ReactNode}): JSX.Element | null {
  const userAdmin = localStorage.getItem('admin');

  return userAdmin === 'true' ? (
    <>{children}</>
  ) : (<Navigate to="/" />);
}

export default PrivateRouteAdmin;