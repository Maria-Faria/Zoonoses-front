import React, { useState } from "react";

import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";

import "./style.css";
import SideBar from "../../components/SideBar/index";

interface UserInfoInterface {
  public_id: string,
  name: string,
  admin: boolean,
  email: string
}

function Dashboard() {
  const [ userInfo, setUserInfo ] = useState<UserInfoInterface>({} as UserInfoInterface);
  const [ cookies, setCookies ] = useCookies(['accessToken', 'refreshToken']);

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
          localStorage.setItem('email', userInfo.email);
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
        addServiceRoute="/cadastrar-servico"
        editServiceRoute="/editar-servico"
        myProfile="/meu-perfil"
        addUserRoute="/cadastrar-usuario"
        editUserRoute="editar-usuario"
        logout={logout}
      />

      <div className="dashboard-content">
        <h1 className="dashboard-header">Seja bem vindo(a), {userInfo.name}</h1>

        <div style={{width: '100%', alignSelf: 'center'}}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;