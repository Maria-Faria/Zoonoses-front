import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Login from '../pages/Login/index.tsx';
import Dashboard from '../pages/Dashboard/index.tsx';
import ResetSenha from '../pages/Reset-senha/index.tsx';
import NewPass from '../pages/Reset-senha/newPass.tsx';

import PrivateRouteDashboard  from './privateRouteDashboard.tsx';
import PrivateRouteNewPassword from './privateRouteNewPassword.tsx';
import RegisterUser from '../pages/RegisterUser/index.tsx';
import PrivateRouteAdmin from './privateRouteAdmin.tsx';
import RegisterService from '../pages/RegisterService/index.tsx';
import RegisterHospital from '../pages/RegisterHospital/index.tsx';
import Record from '../pages/Record/index.tsx';
import RecordView from '../pages/RecordView/index.tsx';
import SearchRecord from '../pages/SearchRecord/index.tsx';
function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path='/' element={
          <PrivateRouteDashboard>
            <Dashboard />
          </PrivateRouteDashboard>
        } />

        <Route path='/reset-senha' element={<ResetSenha />} />

        <Route path='/new-password' element={
          <PrivateRouteNewPassword>
            <NewPass />
          </PrivateRouteNewPassword>
        } />

        <Route path='/cadastrar-usuario' element={
          <PrivateRouteAdmin>
            <PrivateRouteDashboard>
              <RegisterUser />
            </PrivateRouteDashboard>
          </PrivateRouteAdmin>
        } />

        <Route path='/cadastrar-servico' element={
          <PrivateRouteDashboard>
            <RegisterService />
          </PrivateRouteDashboard>
        } />

        <Route path='/cadastrar-clinica' element={
          <PrivateRouteDashboard>
            <RegisterHospital />
          </PrivateRouteDashboard>
        } />

        <Route path='/cadastrar-ficha' element={
          <PrivateRouteDashboard>
            <Record />
          </PrivateRouteDashboard>
        } />

        <Route path='/ficha/:id' element={
          <PrivateRouteDashboard>
            <RecordView />
          </PrivateRouteDashboard>
        } />

        <Route path='/buscar-ficha' element={
          <PrivateRouteDashboard>
            <SearchRecord />
          </PrivateRouteDashboard>
        } />

      </Routes>

    </BrowserRouter>
  )
}

export default RoutesApp;