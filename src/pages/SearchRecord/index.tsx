import React, { useEffect, useState } from "react";
import "./style.css";

import ErrorMessage from "../../components/ErrorMessage/index";
import CheckBox from "../../components/CheckBox/index";

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";

interface RecordInterface {
  id: number,
  cpf: string,
  name_tutor: string,
  microchip: string,
  protocolo: number,
  date: Date,
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
  const [ filterValue, setFilterValue ] = useState('');

  const [ page, setPage ] = useState(1);
  const [ pageSearch, setPageSearch ] = useState(1);
  const [ totalPage, setTotalPage ] = useState(1);
  const [ totalSearchPage, setTotalSearchPage ] = useState(1);

  const [ search, setSearch ] = useState(false);

  const getRecords = async () => {
    setLoading(true);
    setAllRecords([]);
    try {
      const response = await fetch(`https://zoonoses.onrender.com/record?page=${page}`, {
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
        setAllRecords(responseData.recordList);
        setTotalPage(responseData.totalPage);
      }

    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    getRecords();
  }, [page]);

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
        setSearch(false);
        setLoading(false);
        setMessageError('Selecione um filtro');
      
      }else {
        setAllRecords([]);

        try {
          if(filterSelected === 'all') {
            setSearch(false);
            await getRecords();
          
          } else {
            setPageSearch(1);
            setSearch(true);
            await getSearchRecords();
          }
  
        } catch (error) {
          setMessageError("Erro ao buscar a ficha");
        }
      }

    }
  } 

  const getSearchRecords = async () => {
    setLoading(true);
    const response = await fetch(`https://zoonoses.onrender.com/record/search?${filterSelected}=${filterValue}&&page=${pageSearch}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.accessToken}`
      }
    });

    const responseData = await response.json();

    setTotalSearchPage(responseData.total);

    if(responseData.error) {
      setLoading(false);
      setMessageError(responseData.error);
    
    }else {
      setLoading(false);
      setAllRecords(responseData.recordList);
      setTotalPage(responseData.total);
    }
  }

  useEffect(() => {
    console.log(pageSearch)
    if(filterSelected !== '' && filterSelected !== 'all') {
      getSearchRecords();
    }
  }, [pageSearch]);

  return (
    <div className="search">

      <h1 style={{alignSelf: 'start'}}>Fichas</h1>

      <SearchBar 
        onKeyUp={handleSubmit}
        placeholder="Digite a informação aqui..."
        onChange={(event) => setFilterValue(event.target.value)}
        onClick={handleSubmit}
      />

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
        <>
          <table style={{marginTop: '20px', width: '100%'}}>
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
                  <td>{new Date(record.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{alignSelf: 'end', display: 'flex', alignItems: 'center'}}>
            {search && (pageSearch > 1) &&
              <img 
                src="/arrow-back.svg"
                alt="arrow"
                width={25}
                style={{cursor: 'pointer'}}
                onClick={() => setPageSearch(pageSearch - 1 < 1 ? 1 : pageSearch - 1)}
              />
            }

            {!search &&(page > 1) &&
              <img 
                src="/arrow-back.svg"
                alt="arrow"
                width={25}
                style={{cursor: 'pointer'}}
                onClick={() => setPage(page - 1 < 1 ? 1 : page - 1)}
              />
            }

            {search && 
              <>
                {pageSearch} de {totalSearchPage}
              </>
            } 

            {!search &&
              <>
                {page} de {totalPage}
              </>
            }

            {search && (pageSearch < totalSearchPage) &&
              <img 
                src="/next.svg"
                alt="arrow"
                width={25}
                style={{cursor: 'pointer'}}
                onClick={() => setPageSearch(pageSearch + 1 > totalSearchPage ? totalSearchPage : pageSearch + 1)}
              />
            }

            {!search && (page < totalPage) &&
              <img 
                src="/next.svg"
                alt="arrow"
                width={25}
                style={{cursor: 'pointer'}}
                onClick={() => setPage(page + 1 > totalPage ? totalPage : page + 1)}
              />
            }

          </div>
        </>
      )}

    </div>
  )
}

export default SearchRecord;