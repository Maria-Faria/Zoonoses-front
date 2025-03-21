import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { inputInterface } from "../../components/Input/index";
import SearchBar from "../../components/SearchBar/index";
import ErrorMessage from "../../components/ErrorMessage/index";
import FormRegister from "../../components/FormRegister/index";

function EditUser() {
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ loadingForm, setLoadingForm ] = useState(false);
  const [ errorForm, setErrorForm ] = useState('');

  const [ cookies, setCookies ] = useCookies(['accessToken', 'refreshToken']);
  
  const [ name, setName ] = useState('');
  const [ code, setCode ] = useState('');
  const [ email, setEmail ] = useState('');

  const [ userCodeSearch, setUserCodeSearch ] = useState('');
  const [ found, setFound ] = useState(false);
  
  const dataInput: inputInterface[] = [
    {
      label: "Nome completo do usuário",
      type: "text",
      name: "name",
      value: name,
      onChange: (event) => setName(event.target.value)
    },
    
    {
      label: "Matrícula do usuário:",
      type: "number",
      name: "matricula",
      value: code,
      onChange: (event) => setCode(event.target.value)
    },
  
    {
      label: "E-mail institucional do usuário:",
      type: "email",
      name: "email",
      value: email,
      onChange: (event) => setEmail(event.target.value)
    }      
  ];

  const searchUser = async (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    event.preventDefault();
    setSuccess('');
    setError('');

    if(("key" in event && event.key === 'Enter') || (event.type === 'click')) {
      setError('');
      setFound(false);
      setLoading(true);

      try {
        const response = await fetch(`https://zoonoses.onrender.com/user/search-user?usuario=${userCodeSearch}`, {
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
          setCode(responseData.user_code);
          setEmail(responseData.email);
          setLoading(false);
          setFound(true);
        }

      } catch {
        setError('Ocorreu um erro ao buscar o usuário');
      }   
    }

  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoadingForm(true);

    try {
      const response = await fetch('https://zoonoses.onrender.com/user/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.accessToken}`
        },
        body: JSON.stringify({user_code: userCodeSearch,name, code, email})
      });

      const responseData = await response.json();

      if(responseData.error) {
        setLoadingForm(false);
        setErrorForm(responseData.error);

      }else {
        setLoadingForm(false);
        setSuccess('Informações do usuário editadas com sucesso!');
      }

    } catch (error) {
      setError('Ocorreu um erro ao editar as informações do usuário');
    }
  }

  const deleteUser = async () => {
    setError('');
    setSuccess('');
    setLoadingForm(true);

    try {
      const response = await fetch(`https://zoonoses.onrender.com/user/delete-user?usuario=${dataInput[1].value}`, {
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
        setSuccess('Usuário deletado com sucesso!');

        setTimeout(() => {
          setFound(false);
        }, 2000);
      }

    } catch (error) {
      
    }
  }
  return (
    <div className="edit-hospital">
      <h1 style={{alignSelf: 'start'}}>Editar informações de um usuário</h1>

      <SearchBar 
        placeholder="Digite a matrícula do usuário aqui..."
        onKeyUp={searchUser}
        onChange={(event) => setUserCodeSearch(event.target.value)}
        onClick={searchUser}
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
          onClick={deleteUser}
        />
      }
    </div>
  )
}

export default EditUser;