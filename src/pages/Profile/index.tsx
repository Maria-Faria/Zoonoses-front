import React, { useState } from "react";
import "./style.css";
import { useCookies } from "react-cookie";
import { inputInterface } from "../../components/Input/index";
import FormRegister from "../../components/FormRegister/index";

function Profile() {
  const [ name, setName] = useState(localStorage.getItem('name') || '');
  const user_code = localStorage.getItem('user_code') || '';
  const email = localStorage.getItem('email') || '';
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState("");
  const [ success, setSuccess ] = useState("");
  
  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  
  const dataInput: inputInterface[] = [
    {
      label: "Nome completo:",
      type: "text",
      name: "name",
      value: name,
      onChange: (event) => setName(event.target.value)
    },
    
    {
      label: "Matrícula:",
      type: "number",
      name: "matricula",
      value: user_code,
      readonly: true
    },
  
    {
      label: "E-mail institucional:",
      type: "email",
      name: "email",
      value: email,
      readonly: true
    }      
  ]

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
  
    try {
  
      const response = await fetch('https://zoonoses.onrender.com/user/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.accessToken}`
        },
        body: JSON.stringify({name})
      });
  
      const responseData = await response.json();
  
      if(responseData.error) {
        setLoading(false);
        setError(responseData.error);

      }else {
        setLoading(false);
        localStorage.setItem('name', responseData.name);

        setSuccess('Informações editadas com sucesso!');
      }
  
      } catch (error) {
        setError('Ocorreu um erro ao editar seu perfil!');
      }
    }
  

  return (
    <>
      <h1 style={{alignSelf: 'start'}}>Meu perfil</h1>

      <FormRegister 
        onSubmit={handleSubmit}
        dataInput={dataInput}
        loading={loading}
        error={error}
        success={success}
        width="70%"
        buttonText="Salvar"
      />
    </>
  )
}

export default Profile;