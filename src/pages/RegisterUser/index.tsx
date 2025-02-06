import React from "react";
import "./style.css";

import { useState } from "react";
import { useCookies } from "react-cookie";

import { inputInterface } from "../../components/Input/index.tsx";
import FormRegister from "../../components/FormRegister/index.tsx";

function RegisterUser() {
  const [ name, setName] = useState("");
  const [ user_code, setUser_code ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState("");
  const [ success, setSuccess ] = useState("");

  const [cookies] = useCookies(['accessToken', 'refreshToken']);

  const dataInput: inputInterface[] = [
      {
        label: "Digite o nome completo do usuário",
        type: "text",
        placeholder: "Ex: José da Silva",
        name: "name",
        value: name,
        onChange: (event) => setName(event.target.value)
      },
  
      {
        label: "Digite a matrícula do usuário:",
        type: "number",
        placeholder: "26157",
        name: "matricula",
        value: user_code,
        onChange: (event) => setUser_code(event.target.value)
      },

      {
        label: "Digite o e-mail institucional do usuário:",
        type: "email",
        placeholder: "Ex: jose@caraguatatuba.sp.gov.br",
        name: "email",
        value: email,
        onChange: (event) => setEmail(event.target.value)
      }      
    ]

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
    <FormRegister 
      onSubmit={handleSubmit}
      titleForm="Cadastrar Novo Usuário"
      dataInput={dataInput}
      loading={loading}
      error={error}
      success={success}
    />

  )
}

export default RegisterUser;