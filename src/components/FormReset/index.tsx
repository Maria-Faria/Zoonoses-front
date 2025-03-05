import React from "react";
import './style.css';

import Button from "../Button/index";
import Input from "../Input-DEPRECIATED/index";
import ErrorMessage from "../ErrorMessage/index";

interface FormResetInterface {
  onSubmit: (event: React.FormEvent) => void
  placeholder: string
  name: string
  value: string 
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  titleForm: string
  textForm: string
  loading: boolean
  error: string
}

function FormReset({onSubmit, placeholder, onChange, textForm, titleForm, name, value, loading, error}: FormResetInterface) {
  return (
    <form className="reset-form" method="post" onSubmit={onSubmit}>
      <div>
        <h1>{titleForm}</h1>

        <p>{textForm}</p>

        <div className="input-button">
          <Input 
            type="text"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
          />

          {loading && <img src="./loading.gif" alt="loading" width={50}/>}
          {error && <ErrorMessage messageError={error} />}

          <Button text="Enviar" type="submit"/>

        </div>
          
      </div>

    </form>
  )
}

export default FormReset;