import React from "react";
import './style.css';

interface buttonInterface {
  text: string;
  onClick?: () => void
  color?: string
}

function Button({text, onClick, color}: buttonInterface) {
  return (
    <button onClick={onClick} style={{background: color}}>
      {text}
    </button>
  )
}

export default Button;