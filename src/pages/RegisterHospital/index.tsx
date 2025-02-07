import React from "react";
import "./style.css";

import FormRegister from "../../components/FormRegister/index.tsx";
import { inputInterface } from "../../components/Input/index.tsx";

import { useState } from "react";

function RegisterHospital() {
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const [ name, setName ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ email, setEmail ] = useState('');

  const [ state, setState ] = useState('');
  const [ city, setCity ] = useState('');
  const [ neighborhood, setNeighborhood ] = useState('');
  const [ road, setRoad ] = useState('');
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
      placeholder: "Ex: (12) 0000-0000)",
      name: "phone",
      value: phone,
      onChange: (event) => setPhone(event.target.value)
    },

    {
      label: "Digite o CEP da clínica:",
      type: "text",
      placeholder: "Ex: 11111-111",
      name: "cep",
      value: cep,
      onChange: (event) => setCep(event.target.value)
    },

    {
      label: "Digite o estado onde a clínica se localiza:",
      type: "text",
      placeholder: "Ex: SP",
      name: "estado",
      value: state,
      onChange: (event) => setState(event.target.value)
    },

    {
      label: "Digite a cidade onde a clínica se localiza:",
      type: "text",
      placeholder: "Ex: Caraguatatuba",
      name: "cidade",
      value: city,
      onChange: (event) => setCity(event.target.value)
    },

    {
      label: "Digite o bairro onde a clínica se localiza:",
      type: "text",
      placeholder: "Ex: Poiares",
      name: "bairro",
      value: neighborhood,
      onChange: (event) => setNeighborhood(event.target.value)
    },

    {
      label: "Digite a rua onde a clínica se localiza:",
      type: "text",
      placeholder: "Ex: Rua 54",
      name: "rua",
      value: road,
      onChange: (event) => setRoad(event.target.value)
    },

    {
      label: "Digite o número (endereço) da clínica:",
      type: "text",
      placeholder: "Ex: 59",
      name: "numero",
      value: number,
      onChange: (event) => setNumber(event.target.value)
    }
  ]
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/hospital/new-hospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, phone, email, state, city, neighborhood, road, number})
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