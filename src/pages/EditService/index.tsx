import React, { useState } from "react";
import "./style.css";
import SearchBar from "../../components/SearchBar/index";
import { useCookies } from "react-cookie";
import { inputInterface } from "../../components/Input";

function EditService() {
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ loadingForm, setLoadingForm ] = useState(false);
  const [ errorForm, setErrorForm ] = useState('');

  const [ cookies, setCookies ] = useCookies(['accessToken', 'refreshToken']);

  const [ serviceType, setServiceType ] = useState('');
  const [ serviceValue, setServiceValue ] = useState('');
  
  const dataInput: inputInterface[] = [
    {
      label: "Tipo do serviço:",
      type: "text",
      name: "tipo",
      value: serviceType,
      onChange: (event) => setServiceType(event.target.value)
    },
  
    {
      label: "Valor do serviço:",
      step: "0.01",
      type: "number",
      name: "valor",
      value: serviceValue,
      onChange: (event) => setServiceValue(event.target.value)
    }
  ]

  const [ service, setService ] = useState('');
  const [ found, setFound ] = useState(false);

  const searchService = async (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
      event.preventDefault();
      setSuccess('');
      setError('');
  
      if(("key" in event && event.key === 'Enter') || (event.type === 'click')) {
        setError('');
        setFound(false);
        setLoading(true);
  
        try {
          const response = await fetch(`http://localhost:4000/service/search-service?servico=${service}`, {
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
            setServiceType(responseData.type);
            setServiceValue(responseData.value);
            setLoading(false);
            setFound(true);
          }
  
        } catch {
          setError('Ocorreu um erro ao buscar a clínica');
        }   
      }
  
    }
  
  return (
    <div className="edit-service">
      <h1 style={{alignSelf: 'start'}}>Editar informações de um serviço</h1>

      <SearchBar 
        placeholder="Digite o tipo do serviço aqui..."
        onKeyUp={searchService}
        onChange={(event) => setService(event.target.value)}
        onClick={searchService}
      />

    </div>
  )
}

export default EditService;