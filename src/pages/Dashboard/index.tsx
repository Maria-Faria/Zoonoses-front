import React, { useState } from "react";

import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/index.tsx";
import "./style.css";
import MenuButton from "../../components/MenuButton/index.tsx";

interface UserInfoInterface {
  public_id: string,
  name: string,
  admin: boolean
}

function Dashboard() {
  const [ userInfo, setUserInfo ] = useState<UserInfoInterface>({} as UserInfoInterface);
  const [ cookies, setCookies ] = useCookies(['accessToken', 'refreshToken']);

  const navigate = useNavigate();

  const logout = async() => {
    try {
      await fetch('http://localhost:4000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({refreshToken: cookies.refreshToken})
      });

      setCookies('accessToken', '');
      setCookies('refreshToken', '');
      navigate('/login');
    }catch (error) {
      return error;
    }
  }

  useEffect(() => {
    const getUserInfo = async() => {
      try {
        const response = await fetch('http://localhost:4000/user/dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${cookies.accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        const responseData = await response.json();

        if(responseData.error) {
          return;

        }else {
          setUserInfo(responseData);
          localStorage.setItem('admin', userInfo.admin.toString());
          localStorage.setItem('name', userInfo.name);
        }
      } catch (error) {
        return;
      }
    }

    getUserInfo();
  }, [userInfo]);
  
  return(
    <div className="dashboard">
      <Header name={userInfo.name}/>

      <h1>Bem vindo(a)!</h1>
      <div className="menu">
        <h1>O que você deseja fazer?</h1>

        <div className="menu-options">

          {userInfo.admin && 
            <MenuButton 
              img="./user-menu.svg"
              text="Cadastrar novo Usuário"
              onClick={() => navigate('/cadastrar-usuario')}
            />
          }

          <MenuButton 
            img="./service-icon.svg"
            text="Cadastrar novo serviço"
            onClick={() => navigate('/cadastrar-servico')}
          />
          
          <MenuButton 
            img="./hospital-icon.svg"
            text="Cadastrar nova clínica"
            onClick={() => navigate('/cadastrar-servico')}
          />

          <MenuButton 
            img="./paper-icon.svg"
            text="Cadastrar ficha"
            onClick={() => navigate('/cadastrar-servico')}
          />
          
          <MenuButton 
            img="./search-menu.svg"
            text="Consultar fichas"
            onClick={() => navigate('/cadastrar-servico')}
          />
          
          <MenuButton 
            img="./logout-icon.svg"
            text="Sair"
            onClick={logout}
          />
        </div>

      </div>
    </div>
  )
}

export default Dashboard;