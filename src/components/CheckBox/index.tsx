import React from "react";
import "./style.css";

interface CheckBoxInterface {
  label: string;
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void | null
}

function CheckBox({label, name, checked, onChange}: CheckBoxInterface) {
  return (
    <div className="check-option">
        <label>{label}</label>
        <input 
          type="checkbox" 
          name={name}
          checked={checked}
          onChange={onChange}
        />
      </div>
  )
}

export default CheckBox;