import React, { useState } from "react";
import "./style.css";
import FormRegister from "../../components/FormRegister";
import SearchBar from "../../components/SearchBar";
import { useCookies } from "react-cookie";
import { inputInterface } from "../../components/Input/index";
import ErrorMessage from "../../components/ErrorMessage/index";


function EditHospital() {
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ loadingForm, setLoadingForm ] = useState(false);
  const [ errorForm, setErrorForm ] = useState('');

  const [ cookies, setCookies ] = useCookies(['accessToken', 'refreshToken']);
  
  const [ name, setName ] = useState('');
  const [ phone, setPhone ] = useState('');

  const [ number, setNumber ] = useState('');
  const [ cep, setCep ] = useState('');

  const [ hospital, setHospital ] = useState('');
  const [ found, setFound ] = useState(false);
  
  const dataInput: inputInterface[] = [
    {
      label: "Nome da clínica:",
      type: "text",
      name: "name",
      value: name,
      onChange: (event) => setName(event.target.value),
      readonly: true
    },
    
    {
      label: "Telefone da clínica:",
      type: "text",
      name: "phone",
      value: phone,
      onChange: (event) => handlePhoneChange(event.target.value)
    },

    {
      label: "CEP da clínica:",
      type: "text",
      name: "cep",
      value: cep,
      onChange: (event) => handleCepChange(event.target.value)
    },

    {
      label: "Número (endereço) da clínica:",
      type: "text",
      name: "numero",
      value: number,
      onChange: (event) => setNumber(event.target.value)
    }
  ];

  const handleCep = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const responseData = await response.json();

      return responseData;

    }catch(error) {
      setError("Ocorreu um erro ao buscar o CEP!");
    }
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
  const searchHospital = async (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    event.preventDefault();
    setSuccess('');
    setError('');

    if(("key" in event && event.key === 'Enter') || (event.type === 'click')) {
      setError('');
      setFound(false);
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:4000/hospital/search-hospital?clinica=${hospital}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.accessToken}`
          }
        });

        const responseData = await response.json();

        if(responseData.error) {
          setLoading(false);
          setError(responseData.error);
        
        }else {
          setName(responseData.name);
          setPhone(responseData.phone);
          setCep(responseData.cep);
          setNumber(responseData.number);
          setLoading(false);
          setFound(true);
        }

      } catch {
        setError('Ocorreu um erro ao buscar a clínica');
      }   
    }

  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoadingForm(true);

    try {
      const address = await handleCep();

      const response = await fetch('http://localhost:4000/hospital/update-hospital', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.accessToken}`
        },
        body: JSON.stringify({name, phone, cep, state: address.uf, city: address.localidade, neighborhood: address.bairro, road: address.logradouro, number})
      });

      const responseData = await response.json();

      if(responseData.error) {
        setLoadingForm(false);
        setErrorForm(responseData.error);

      }else {
        setLoadingForm(false);
        setSuccess('Informações da clínica editadas com sucesso!');
      }

    } catch (error) {
      setError('Ocorreu um erro ao editar as informações da clínica');
    }
  }

  const deleteHospital = async () => {
    setError('');
    setSuccess('');
    setLoadingForm(true);

    try {
      const response = await fetch(`http://localhost:4000/hospital/delete-hospital?clinica=${dataInput[0].value}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.accessToken}`
        }
      });

      const responseData = await response.json();

      if(responseData.error) {
        setLoadingForm(false);
        setErrorForm(responseData.error);
      
      }else {
        setLoadingForm(false);
        setSuccess('Clínica deletada com sucesso!');

        setTimeout(() => {
          setFound(false);
        }, 2000);
      }

    } catch (error) {
      
    }
  }
  return (
    <div className="edit-hospital">
      <h1 style={{alignSelf: 'start'}}>Editar informações de uma clínica</h1>

      <SearchBar 
        placeholder="Digite o nome da clínica aqui..."
        onKeyUp={searchHospital}
        onChange={(event) => setHospital(event.target.value)}
        onClick={searchHospital}
      />

      {loading && <img src="/loading.gif" alt="loading" width={50} style={{alignSelf: 'center', marginTop: '20px'}}/>}
      {error && <ErrorMessage messageError={error} />}

      { found && 
        <FormRegister 
          onSubmit={handleSubmit}
          dataInput={dataInput}
          loading={loadingForm}
          error={errorForm}
          success={success}
          buttonText="Salvar"
          deleteButton={true}
          onClick={deleteHospital}
        />
      }
    </div>
  )
}

export default EditHospital;