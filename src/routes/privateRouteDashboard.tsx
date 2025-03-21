import React, { JSX, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import { useState } from "react";

function PrivateRouteDashboard({children}: {children: React.ReactNode}): JSX.Element | null  {
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);  
  const [tokenIsValid, setTokenIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const generateNewToken = async() => {
    try {
      const response = await fetch('https://zoonoses.onrender.com/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({refreshToken: cookies.refreshToken})
      });

      const responseData = await response.json();

      if(responseData.error) {
        setTokenIsValid(false);
        return;
      
      }else {
        setTokenIsValid(true);
        setCookie('accessToken', responseData.accessToken);
        return;
      }

    }catch (error) {
      setTokenIsValid(false);
      return error;
    
    }finally{
      setLoading(false);
    }
  }

  const validateToken = async() => {
    if(!cookies.accessToken) {
      setTokenIsValid(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://zoonoses.onrender.com/auth/validate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({accessToken: cookies.accessToken})
      });
    
      const responseData = await response.json();

      if(responseData.error) {
        await generateNewToken();
        return;
      
      }else {
        setTokenIsValid(true);
        return;
      }

    }catch (error) {
      setTokenIsValid(false);
      return;
    
    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    validateToken();

  }, [cookies.accessToken]);

  if(loading) {
    return null;
  }

  return tokenIsValid ?(
    <div style={{height: '100vh'}}>{children}</div>
  ): (<Navigate to={'/login'} />)
}

export default PrivateRouteDashboard;