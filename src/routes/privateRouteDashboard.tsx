import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useCookies } from "react-cookie";
import { useState } from "react";

function PrivateRouteDashboard({children}: {children: React.ReactNode}) {
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);  
  const [tokenIsValid, setTokenIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const generateNewToken = async() => {
    try {
      const response = await fetch('http://localhost:4000/auth/refresh', {
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
      const response = await fetch('http://localhost:4000/auth/validate-token', {
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
    return '';
  }

  return tokenIsValid ? children : <Navigate to={'/login'} />
}

export default PrivateRouteDashboard;