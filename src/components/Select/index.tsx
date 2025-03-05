import React from "react";

import "./style.css";

export interface OptionInterface {
  value: string;
  text: string;
}

interface SelectInterface {
  label: string;
  name: string;
  options: OptionInterface[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void | null;
  value: string
  width?: string
}

function Select({label, name, options, onChange, value, width}: SelectInterface) {
  return (
    <label className="select-label">
      {label}
      <select name={name} value={value} onChange={onChange} style={{width: width}}>
        {options.map(option => (
          <option value={option.value}>{option.text}</option>
        ))}             
      </select>
    </label>
  )
}

export default Select;