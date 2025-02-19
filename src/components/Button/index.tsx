import React from "react";
import './style.css';

interface buttonInterface {
  text: string;
  onClick?: () => void
}

function Button({text, onClick}: buttonInterface) {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

export default Button;