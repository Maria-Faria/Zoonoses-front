import React from "react";
import './style.css';

export interface inputInterface {
  label?: string;
  type: string;
  placeholder: string;
  name: string;
  value: string;
  step?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void | null;
}

function Input({type, placeholder, name, value, onChange, label, step}: inputInterface) {
  return (
    <div className="input-content">
      {label && <label>{label}</label>}
      <input type={type} placeholder={placeholder} name={name} value={value} step={step || "1"} required onChange={onChange}>
      </input>
    </div>
  )
}

export default Input;