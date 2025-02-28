import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

function PrivateRouteNewPassword({children}: {children: React.ReactNode}): JSX.Element | null {
  const user_code = localStorage.getItem('user_code');


  return user_code ? (
    <>{children}</>
  ) : (<Navigate to="/reset-senha" />);
}

export default PrivateRouteNewPassword;