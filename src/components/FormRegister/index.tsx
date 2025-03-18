import React from "react";
import "./style.css";
import Header from "../../components/Header/index";

import { useNavigate } from "react-router-dom";

import Input from "../../components/Input/index";
import Button from "../../components/Button/index";
import ErrorMessage from "../../components/ErrorMessage/index";
import SuccessMessage from "../../components/SuccessMessage/index";
import { inputInterface } from "../../components/Input/index";

interface FormRegisterInterface {
  onSubmit: (event: React.FormEvent) => void;
  titleForm?: string;
  dataInput: inputInterface[];
  loading: boolean;
  error: string;
  success: string;
  buttonText?: string;
  deleteButton?: boolean;
}

function FormRegister({onSubmit, titleForm, dataInput, loading, error, success, buttonText, deleteButton}: FormRegisterInterface) {
  return (
    <div className="register">

      <form method="post" onSubmit={onSubmit} className="register-form">
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
          <SuccessMessage messageSuccess={success} />
        }

        <div className="form-register-buttons">
          <Button text={buttonText || "Cadastrar"} type="submit"/>

          {deleteButton && <Button text="Deletar" type="submit" color="red"/>}
        </div>
      </form>
      
    </div>
  )
}

export default FormRegister;