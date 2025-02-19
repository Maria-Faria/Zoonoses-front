import React from "react";

import "./style.css";

interface OptionInterface {
  value: string;
  text: string;
}

interface SelectInterface {
  label: string;
  name: string;
  options: OptionInterface[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void | null;
  value: string
}

function Select({label, name, options, onChange, value}: SelectInterface) {
  return (
    <label className="select-label">
      {label}
      <select name={name} value={value} onChange={onChange}>
        {options.map(option => (
          <option value={option.value}>{option.text}</option>
        ))}             
      </select>
    </label>
  )
}

export default Select;