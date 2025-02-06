import React from "react";
import "./style.css";
import Header from "../../components/Header/index.tsx";

import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input/index.tsx";
import Button from "../../components/Button/index.tsx";
import ErrorMessage from "../../components/ErrorMessage/index.tsx";
import SuccessMessage from "../../components/SuccessMessage/index.tsx";

function RegisterUser() {
  const [ name, setName] = useState("");
  const [ user_code, setUser_code ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState("");
  const [ success, setSuccess ] = useState("");

  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  const navigate = useNavigate();

  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/user/new-user/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cookies.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, user_code, email})
      });

      const responseData = await response.json();

      if(responseData.error) {
        setLoading(false);
        setError(responseData.error);
      }

      setLoading(false);
      setEmail('');
      setName('');
      setUser_code('');
      setSuccess(responseData.message);
      
    } catch (error) {
      console.log(error)
      setLoading(false);
      setError('Ocorreu um erro ao enviar o formulário');
    }
  }

  return (
    <div className="register-user">
      <Header name={localStorage.getItem('name') as string} />

      <div className="register-user-header">
        <div className="register-user-title">        
          <div className="back" onClick={() => navigate('/')}>
            <img 
              src="./arrow-back.svg"
              alt="arrow back"
              width={30}
              height={30}
            />

            <p>Voltar</p>

          </div>

          <h1>Cadastrar novo usuário</h1>

        </div>
      </div>


      <form method="post" onSubmit={handleSubmit} className="form-register">
        <Input 
          label="Digite o nome completo do usuário:"
          type="text"
          placeholder="Ex: José da Silva"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <Input 
          label="Digite a matrícula do usuário:"
          type="number"
          placeholder="Ex: 26157"
          name="matricula"
          value={user_code}
          onChange={(event) => setUser_code(event.target.value)}
        />

        <Input 
          type="email" 
          label="Digite o e-mail institucional do usuário:"
          placeholder="Ex: jose@caraguatatuba.sp.gov.br"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        {loading && <img src="./loading.gif" alt="loading" width={50}/>}
        {error && <ErrorMessage messageError={error} />}
        {success && 
          <div style={{display: 'flex', justifyContent: 'center', width: '80%'}}>
            <SuccessMessage messageSuccess={success} />
          </div>
        }

        <Button text="Cadastrar" />
      </form>
      
    </div>
  )
}

export default RegisterUser;