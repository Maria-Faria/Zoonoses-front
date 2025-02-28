import React, { useEffect, useState } from "react";
import "./style.css";

import ErrorMessage from "../../components/ErrorMessage/index.tsx";
import Header from "../../components/Header/index.tsx";
import PageTitle from "../../components/PageTitle/index.tsx";
import CheckBox from "../../components/CheckBox/index.tsx";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface RecordInterface {
  id: number,
  cpf: string,
  name_tutor: string,
  microchip: string,
  protocolo: number,
  date: string,
}

function SearchRecord() {
  const [ filter, setFilter ] = useState({
    cpf: false,
    ficha: false,
    protocolo: false,
    microchip: false,
    nome_tutor: false,
    all: false
  });

  const [ filterSelected, setFilterSelected ] = useState('');
  const [ messageError, setMessageError ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const [ cookies, setCookies ] = useCookies(['accessToken', 'refreshToken']);

  const navigate = useNavigate();

  const [ allRecords, setAllRecords ] = useState<RecordInterface[]>([]);
  const [ searchRecords, setSearchRecords ] = useState<RecordInterface[]>([]);
  const [ filterValue, setFilterValue ] = useState('');

  const getRecords = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://zoonoses.onrender.com/record', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.accessToken}`
        }
      });
      
      const responseData = await response.json();

      if(responseData.error) {
        setLoading(false);
        setMessageError(responseData.error);
      } else {
        setLoading(false);
        setAllRecords(responseData);
      }

    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    getRecords();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    checked ? setFilterSelected(name) : setFilterSelected('');

    setFilter({
      cpf: name === 'cpf' ? checked : false,
      ficha: name === 'ficha' ? checked : false,
      protocolo: name === 'protocolo' ? checked : false,
      microchip: name === 'microchip' ? checked : false,
      nome_tutor: name === 'name' ? checked : false,
      all: name === 'all' ? checked : false
    })
  }

  const handleSubmit = async (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    event.preventDefault();

    if(("key" in event && event.key === 'Enter') || (event.type === 'click')) {
      setMessageError('');
      setLoading(true);

      if(filterSelected === '') {
        setLoading(false);
        setMessageError('Selecione um filtro');
      
      }else {
        setAllRecords([]);

        try {
          if(filterSelected === 'all') {
            await getRecords();
          
          } else {
            const response = await fetch(`https://zoonoses.onrender.com/record/search?${filterSelected}=${filterValue}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.accessToken}`
              }
            });
  
            const responseData = await response.json();
  
            if(responseData.error) {
              setLoading(false);
              setMessageError(responseData.error);
            
            }else {
              setLoading(false);
              setAllRecords(responseData);
            }
          }
  
        } catch (error) {
          setMessageError("Erro ao buscar a ficha");
        }
      }

    }
  } 

  return (
    <div className="search">
      <Header name={localStorage.getItem('name') as string} />
      <PageTitle title="Buscar ficha" />

      <div className="searchbar">
        <input placeholder="Digite a informação aqui..." onKeyUp={handleSubmit} onChange={(event) => setFilterValue(event.target.value)}></input>
        <img src="/search.svg" alt="search" width={30} height={30} style={{cursor: 'pointer'}} onClick={handleSubmit}/>
      </div>

      <div className="filter-options">
        <CheckBox 
          label="Todas as fichas"
          name="all"
          checked={filter.all}
          onChange={handleFilterChange}
        />

        <CheckBox 
          label="Número da ficha"
          name="ficha"
          checked={filter.ficha}
          onChange={handleFilterChange}
        />

        <CheckBox 
          label="CPF do tutor"
          name="cpf"
          checked={filter.cpf}
          onChange={handleFilterChange}
        />

        <CheckBox 
          label="Protocolo do animal"
          name="protocolo"
          checked={filter.protocolo}
          onChange={handleFilterChange}
        />

        <CheckBox 
          label="Microchip do animal"
          name="microchip"
          checked={filter.microchip}
          onChange={handleFilterChange}
        />

        <CheckBox 
          label="Nome do tutor"
          name="name"
          checked={filter.nome_tutor}
          onChange={handleFilterChange}
        />
      </div>

      {loading && <img src="/loading.gif" alt="loading" width={50} style={{alignSelf: 'center', marginTop: '20px'}}/>}
      {messageError && <ErrorMessage messageError={messageError} />}

      {allRecords.length > 0 && (
        <table style={{alignSelf: 'center', marginTop: '80px', width: '70%'}}>
          <thead style={{color: '#007BBB'}}>
            <tr>
              <th></th>
              <th>CPF do tutor</th>
              <th>Nome do tutor</th>
              <th>Microchip do animal</th>
              <th>Protocolo do animal</th>
              <th>Data da ficha</th>
            </tr>
          </thead>

          <tbody>
            {allRecords.map((record, index) => (
              <tr key={index}>
                <td style={{display: 'flex', gap: '10px', alignItems: 'center', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => navigate(`/ficha/${record.id}`)}>
                  {`Ficha ${record.id}`}
                  <img src="/eye.svg" alt="eye" width={20} style={{cursor: 'pointer'}} onClick={() => navigate(`/ficha/${record.id}`)} />
                </td>
                <td>{record.cpf}</td>
                <td>{record.name_tutor}</td>
                <td>{record.microchip}</td>
                <td>{`000${record.protocolo}`}</td>
                <td>{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  )
}

export default SearchRecord;