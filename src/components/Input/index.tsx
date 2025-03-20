import React from "react";
import './style.css';

export interface inputInterface {
  label?: string;
  type: string;
  placeholder?: string;
  name: string;
  value: string;
  step?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void | null;
  required?: boolean
  pattern?: string
  maxLength?: number
  width?: string
  gap?: string
  justifyContent?: string
  readonly?: boolean
  height?: string
}

function Input({type, placeholder, name, value, onChange, label, step, required, pattern, maxLength, width, gap, justifyContent, readonly, height}: inputInterface) {
  return (
    <div className="input-content" style={{gap: gap, justifyContent: justifyContent, height: height}}>
      {label && <label>{label}</label>}
      <input type={type} placeholder={placeholder} name={name} value={value} step={step || "1"} required={required || true} onChange={onChange} pattern={pattern} maxLength={maxLength} style={{width: width}} readOnly={readonly || false}>
      </input>
    </div>
  )
}

export default Input;