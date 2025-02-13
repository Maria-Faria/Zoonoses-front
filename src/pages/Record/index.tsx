import React from "react";
import "./style.css";

import { useState } from "react";
import Header from "../../components/Header/index.tsx";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/index.tsx";
import Button from "../../components/Button/index.tsx";

function Record() {
  const navigate = useNavigate();
  const [ screen, setScreen ] = useState<'tutor' | 'pet' | 'servico'>('tutor');

  const [ tutorName, setTutorName ] = useState('');
  const [ cpf, setCpf ] = useState('');
  const [ cep, setCep ] = useState('');
  const [ number, setNumber ] = useState('');
  const [ phone, setPhone ] = useState('');

  const cpfCheck = async () => {
    try {
      const response = await fetch('http://localhost:4000/tutor/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({cpf})
      });

      console.log(response);
      
    } catch (error) {
      return error;
    }
  }

  const handleCpfChange = (event: string) => {
    let value = event.replace(/\D/g, "");

    if(value.length > 3) {
      value = value.replace(/^(\d{3})(\d)/, "$1.$2");
    }

    if(value.length > 6) {
      value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    }

    if(value.length > 9) {
      value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
    }

    // if(value.length === 11) {
    //   cpfCheck();
    // }

    setCpf(value);
  }

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

  return (
    <div className="record">
      <Header name={localStorage.getItem('name') as string}/>
      <div className="register-header">
        <div className="register-title">        
          <div className="back" onClick={() => navigate('/')}>
            <img 
              src="./arrow-back.svg"
              alt="arrow back"
              width={30}
              height={30}
            />

            <p>Voltar</p>

          </div>

          <h1>Cadastrar Nova Ficha</h1>

        </div>
      </div>

      {screen === 'tutor' && (
        <form className="form-record" onSubmit={() => setScreen('pet')}>

          <div className="record-header">
            <p>Tutor</p>
          </div>

          <Input 
            label="Digite o CPF do tutor:"
            type="text"
            placeholder="Ex: 000.000.000-00"
            name="cpf"
            value={cpf}
            onChange={(event) => handleCpfChange(event.target.value)}
            maxLength={14}
          />

          <Input 
            label="Digite o nome do tutor:"
            type="text"
            placeholder="Ex: João da Silva"
            name="name"
            value={tutorName}
            onChange={(event) => setTutorName(event.target.value)}
          />

          <Input 
            label="Digite o CEP do endereço do tutor:"
            type="text"
            placeholder="Ex: 11674-710"
            name="cep"
            value={cep}
            onChange={(event) => handleCepChange(event.target.value)}
            maxLength={9}
          />

          <Input 
            label="Digite o número do endereço do tutor:"
            type="text"
            placeholder="Ex: 123"
            name="number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />

          <Input 
            label="Digite o telefone do tutor:"
            type="text"
            placeholder="Ex: (00) 0000-00000"
            name="phone"
            value={phone}
            onChange={(event) => handlePhoneChange(event.target.value)}
            maxLength={15}
          />

          <Button text="Próximo" />
        </form>
      )}
    </div>
  )
}

export default Record;