import React, { HTMLAttributes } from "react";
import './style.css';

interface buttonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void
  color?: string
  type?: "button" | "submit" | "reset"
}

function Button({text, onClick, color, type}: buttonProps) {
  return (
    <button type={type || 'button'} onClick={onClick} style={{background: color}} >
      {text}
    </button>
  )
}

export default Button;