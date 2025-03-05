import React from "react";
import "./style.css";

import FormRegister from "../../components/FormRegister/index";
import { inputInterface } from "../../components/Input-DEPRECIATED/index";

import { useState } from "react";

function RegisterHospital() {
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const [ name, setName ] = useState('');
  const [ phone, setPhone ] = useState('');

  const [ number, setNumber ] = useState('');
  const [ cep, setCep ] = useState('');

  const dataInput: inputInterface[] = [
    {
      label: "Digite o nome da clínica:",
      type: "text",
      placeholder: "Ex: Inoue",
      name: "name",
      value: name,
      onChange: (event) => setName(event.target.value)
    },
    
    {
      label: "Digite o telefone da clínica:",
      type: "text",
      placeholder: "Ex: (12) 0000-00000",
      name: "phone",
      value: phone,
      onChange: (event) => handlePhoneChange(event.target.value)
    },

    {
      label: "Digite o CEP da clínica:",
      type: "text",
      placeholder: "Ex: 11111-111",
      name: "cep",
      value: cep,
      onChange: (event) => handleCepChange(event.target.value)
    },

    {
      label: "Digite o número (endereço) da clínica:",
      type: "text",
      placeholder: "Ex: 59",
      name: "numero",
      value: number,
      onChange: (event) => setNumber(event.target.value)
    }
  ];

  const handleCepChange = (event: string) => {
    let value = event.replace(/\D/g, "");

    if(value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    setCep(value);
  }

  const handlePhoneChange = (event: string) => {
    let value = event.replace(/\D/g, "");

    if(value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/, "($1) $2");
    }

    if(value.length > 4) {
      value = value.replace(/^\((\d{2})\) (\d{4})(\d)/, "($1) $2-$3");
    }

    setPhone(value);
  }

  const handleCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const responseData = await response.json();

      return responseData;

    }catch(error) {
      setError("Ocorreu um erro ao buscar o CEP!");
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const address = await handleCep();

      const response = await fetch('https://zoonoses.onrender.com/hospital/new-hospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, phone, cep, state: address.uf, city: address.localidade, neighborhood: address.bairro, road: address.logradouro, number})
      });
      
      const responseData = await response.json();

      if(responseData.error) {
        setLoading(false);
        setError(responseData.error);
      
      }else {
        setLoading(false);
        setSuccess(responseData.message);
      }

    } catch (error) {
      setError("Ocorreu um erro ao cadastrar a clínica!");
    }
  }
  return (
    <FormRegister 
      onSubmit={handleSubmit}
      titleForm="Cadastrar Nova Clínica"
      dataInput={dataInput}
      loading={loading}
      error={error}
      success={success}
    />
  )
}

export default RegisterHospital;