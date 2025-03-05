import React from "react";
import "./style.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormReset from "../../components/FormReset/index";

function ResetSenha() {
  const [ code, setCode ] = useState('');
  const [ error, setError ] = useState('');
  const [ next, setNext ] = useState(false);
  const [ user_code, setUserCode ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const navigate = useNavigate();

  const handleSubmitUserCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://zoonoses.onrender.com/user/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_code})
      });

      const responseData = await response.json();

      if(responseData.error) {
        setLoading(false);
        setError(responseData.error);
      
      }else {
        setNext(true);
      }

      setLoading(false);

    }catch (error) {
      setLoading(false);
      setError('Ocorreu um erro ao enviar o código');
    }
  }

  const handleSubmitCode = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://zoonoses.onrender.com/user/validate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_code, code})
      });
      
      const responseData = await response.json();

      if(responseData.error) {
        setLoading(false);
        setError(responseData.error);
      
      }else {
        setLoading(false);
        localStorage.setItem('user_code', user_code);
        navigate('/new-password');
      }
      
    } catch (error) {
      setLoading(false);
      setError('Ocorreu um erro ao validar o código');
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

      {!next ? 

        <FormReset 
          onSubmit={handleSubmitUserCode}
          placeholder="Matrícula"
          name="matricula"
          value={user_code}
          onChange={event => setUserCode(event.target.value)}
          titleForm="Informe sua matrícula"
          textForm="Por favor, digite sua matrícula no campo abaixo:"
          loading={loading}
          error={error}
        />

      : 

        <FormReset 
          onSubmit={handleSubmitCode}
          placeholder="Código"
          name="codigo"
          value={code}
          onChange={event => setCode(event.target.value)}
          titleForm="Insira o código"
          textForm="Um código para redefinição da senha foi enviado para seu email institucional. Por favor, insira este código no campo abaixo:"
          loading={loading}
          error={error}
        />
      }
      
    </div>
  )
}

export default ResetSenha;