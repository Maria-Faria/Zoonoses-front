import React, { useState } from "react";
import "./style.css";
import FormRegister from "../../components/FormRegister/index";

import { inputInterface } from "../../components/Input/index";
import { set } from "react-datepicker/dist/date_utils";

function RegisterService() {
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess ] = useState('');

  const [ serviceType, setServiceType ] = useState('');
  const [ serviceValue, setServiceValue ] = useState('');

  const dataInput: inputInterface[] = [
    {
      label: "Digite o tipo do serviço:",
      type: "text",
      placeholder: "Ex: Recebimento de Carcaça (para cada kg)",
      name: "tipo",
      value: serviceType,
      onChange: (event) => setServiceType(event.target.value)
    },

    {
      label: "Digite o valor do serviço:",
      step: "0.01",
      type: "number",
      placeholder: "Ex: 4.90",
      name: "valor",
      value: serviceValue,
      onChange: (event) => setServiceValue(event.target.value)
    }
  ]

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('https://zoonoses.onrender.com/service/new-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          serviceType,
          serviceValue
        })
      });

      const responseData = await response.json();

      if(responseData.error) {
        setLoading(false);
        setError(responseData.error);
      
      }else {
        setLoading(false);
        setSuccess(responseData.message);

        setTimeout(() => {
          setSuccess('');
          setServiceType('');
          setServiceValue('');
        }, 2000);
      }
      
    } catch (error) {
      setError('Ocorreu um erro ao cadastrar o serviço');
    }
  }

  return (
    <>
      <h1 style={{alignSelf: 'start'}}>Cadastrar novo serviço</h1>
      <FormRegister 
        onSubmit={handleSubmit}
        titleForm="Cadastrar Novo Serviço"
        dataInput={dataInput}
        loading={loading}
        error={error}
        success={success}
        width="80%"
      />
    </>

  )
}

export default RegisterService;