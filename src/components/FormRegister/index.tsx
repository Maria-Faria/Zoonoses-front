import React from "react";
import "./style.css";
import Header from "../../components/Header/index";

import { useNavigate } from "react-router-dom";

import Input from "../Input-DEPRECIATED/index";
import Button from "../../components/Button/index";
import ErrorMessage from "../../components/ErrorMessage/index";
import SuccessMessage from "../../components/SuccessMessage/index";
import { inputInterface } from "../Input-DEPRECIATED/index";
import PageTitle from "../PageTitle/index";

interface FormRegisterInterface {
  onSubmit: (event: React.FormEvent) => void;
  titleForm: string;
  dataInput: inputInterface[];
  loading: boolean;
  error: string;
  success: string;
}

function FormRegister({onSubmit, titleForm, dataInput, loading, error, success}: FormRegisterInterface) {
  const navigate = useNavigate();

  return (
    <div className="register">
      <Header name={localStorage.getItem('name') as string} />
      <PageTitle title={titleForm}/>

      <form method="post" onSubmit={onSubmit} className="form-register">
        {dataInput.map((item, index) => (
          <Input 
            label={item.label}
            step={item.step}
            type={item.type}
            placeholder={item.placeholder}
            name={item.name}
            value={item.value}
            onChange={item.onChange}
          />
        ))}

        {loading && <img src="./loading.gif" alt="loading" width={50}/>}
        {error && <ErrorMessage messageError={error} />}

        {success && 
          <div style={{display: 'flex', justifyContent: 'center', width: '80%'}}>
            <SuccessMessage messageSuccess={success} />
          </div>
        }

        <Button text="Cadastrar" type="submit"/>
      </form>
      
    </div>
  )
}

export default FormRegister;