import React from "react";
import './style.css';

interface inputInterface {
  label?: string;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void | null;
}

function Input({type, placeholder, name, value, onChange, label}: inputInterface) {
  return (
    <div className="input-content">
      {label && <label>{label}</label>}
      <input type={type} placeholder={placeholder} name={name} value={value} required onChange={onChange}>
      </input>
    </div>
  )
}

export default Input;