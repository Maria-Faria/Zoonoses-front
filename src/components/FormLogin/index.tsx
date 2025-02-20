import React from "react";
import Button from "../Button/index.tsx";
import './style.css'

import { useState } from "react";
import Input from "../Input/index.tsx";
import ErrorMessage from "../ErrorMessage/index.tsx";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Form() {
  const [user_code, setUserCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);

  const navigate = useNavigate();

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();

    setError('');
    setLoading(true);
    const response = await fetch('http://localhost:4000/auth/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_code, password})
    });

    const responseData = await response.json();

    setLoading(false);

    if(responseData.error) {
      setError(responseData.error);
    
    }else {
      if(responseData.message === "Primeiro login") {
        localStorage.setItem('user_code', user_code);
        navigate('/new-password');
      
      }else {
        setCookie('accessToken', responseData.accessToken);
        setCookie('refreshToken', responseData.refreshToken);
        navigate('/');
      }
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit} className="form-login">
      <h1>Login</h1>

      <div className="form-data">
        <Input 
          type="number"
          placeholder="Matrícula"
          name="matricula"
          value={user_code}
          onChange={event => setUserCode(event.target.value)}
        />

        <Input 
          type="password"
          placeholder="Senha"
          name="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />

        <p onClick={() => navigate('/reset-senha')} className="forgot-password">Esqueci minha senha</p>

        {loading && <img src="./loading.gif" alt="loading" width={50}/>}
        {error && <ErrorMessage messageError={error} />}

        <Button text="Entrar" type="submit"/>
      </div>
    </form>
  )
}

export default Form;