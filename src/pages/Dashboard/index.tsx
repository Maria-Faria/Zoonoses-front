import React, { useState } from "react";

import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";

import "./style.css";
import SideBar from "../../components/SideBar/index";
import RegisterHospital from "../RegisterHospital/index";
import EditHospital from "../EditHospital/index";
import Record from "../Record/index";

interface UserInfoInterface {
  public_id: string,
  name: string,
  admin: boolean
}

function Dashboard() {
  const [ userInfo, setUserInfo ] = useState<UserInfoInterface>({} as UserInfoInterface);
  const [ cookies, setCookies ] = useCookies(['accessToken', 'refreshToken']);

  const [ optionClicked, setOptionClicked ] = useState('');

  const navigate = useNavigate();

  const logout = async() => {
    try {
      await fetch('https://zoonoses.onrender.com/auth/logout', {
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
        const response = await fetch('https://zoonoses.onrender.com/user/dashboard', {
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
      <SideBar 
        isAdmin={userInfo.admin}
        addHospitalRoute="/cadastrar-clinica"
        editHospitalRoute="/editar-clinica"
        addRecordRoute="/cadastrar-ficha"
        searchRecordRoute="/buscar-ficha"
        logout={logout}
      />

      <div className="dashboard-content">
        <h1 className="dashboard-header">Seja bem vindo(a), {userInfo.name}</h1>

        <div style={{width: '100%', alignSelf: 'center'}}>
          <Outlet />
        </div>
      </div>

      {/* 
      <div className="menu">
        <div className="menu-options">

          <MenuButton 
            img="./service-icon.svg"
            text="Cadastrar novo serviço"
            onClick={() => navigate('/cadastrar-servico')}
          />

          <MenuButton 
            img="./paper-icon.svg"
            text="Cadastrar ficha"
            onClick={() => navigate('/cadastrar-ficha')}
          />
          
          <MenuButton 
            img="./search-menu.svg"
            text="Consultar fichas"
            onClick={() => navigate('/buscar-ficha')}
          />
          
          <MenuButton 
            img="./logout-icon.svg"
            text="Sair"
            onClick={logout}
          />
        </div>

      </div> */}
    </div>
  )
}

export default Dashboard;