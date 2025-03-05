import React from "react";
import Input from "../../components/Input/index";
import Button from "../../components/Button/index";

import './style.css';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/index";

function NewPass() {
  const [ newPassword, setNewPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const navigate = useNavigate();

  const user_code = localStorage.getItem('user_code');

  const regex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*?[0-9])(?=.*[!@#$%&.]).{10,}$");

  const handleSubmitNewPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if(!regex.test(newPassword)) {
      setLoading(false);
      setError('A senha não cumpre os requisitos estabelecidos');
    
    }else if(newPassword !== confirmPassword) {
      setLoading(false);
      setError('As senhas não conferem');

    }else {
      try {
        const response = await fetch('https://zoonoses.onrender.com/user/new-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user_code, newPassword})
        });
        
        const responseData = await response.json();

        if(responseData.error) {
          setLoading(false);
          setError(responseData.error);
        
        }else {
          setLoading(false);
          navigate('/login');
        }
        
      } catch (error) {
        setLoading(false);
        setError('Ocorreu um erro ao enviar a nova senha');
      }
    }
  }

  return (
    <div className="reset-senha">
      <img 
        src='./logo.svg' 
        alt='logo'
        width={275}
        height={175}
      />

      <form method="post" className="reset-form" onSubmit={handleSubmitNewPassword}>
        <h1>Insira sua nova senha</h1>

        <p>A nova senha deve conter no mínimo 10 dígitos, com letra maiúscula e minúscula, pelo menos um número e um caractere especial. Por favor, insira a nova senha abaixo:</p>
 
        <div className="input-button">

          <Input 
            type="password"
            placeholder="Nova senha"
            name="password"
            value={newPassword}
            onChange={event => setNewPassword(event.target.value)}
          />

          <Input 
            type="password"
            placeholder="Confirme sua nova senha"
            name="password"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
          />

          {loading && <img src="./loading.gif" alt="loading" width={50}/>}
          {error && <ErrorMessage messageError={error} />}
          
          <Button text="Enviar" type="submit"/>

        </div>

      </form>

    </div>
  )
}

export default NewPass;