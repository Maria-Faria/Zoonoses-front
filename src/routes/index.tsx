import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Login from '../pages/Login/index';
import Dashboard from '../pages/Dashboard/index';
import ResetSenha from '../pages/Reset-senha/index';
import NewPass from '../pages/Reset-senha/newPass';

import PrivateRouteDashboard  from './privateRouteDashboard';
import PrivateRouteNewPassword from './privateRouteNewPassword';
import RegisterUser from '../pages/RegisterUser/index';
import PrivateRouteAdmin from './privateRouteAdmin';
import RegisterService from '../pages/RegisterService/index';
import RegisterHospital from '../pages/RegisterHospital/index';
import Record from '../pages/Record/index';
import RecordView from '../pages/RecordView/index';
import SearchRecord from '../pages/SearchRecord/index';
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