import React from "react";
import './style.css';

interface buttonInterface {
  text: string;
  onClick?: () => void
  color?: string
  type?: "button" | "submit" | "reset"
}

function Button({text, onClick, color, type}: buttonInterface) {
  return (
    <button type={type || 'button'} onClick={onClick} style={{background: color}} >
      {text}
    </button>
  )
}

export default Button;