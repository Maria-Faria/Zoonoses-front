import React from "react";
import './style.css';

interface buttonInterface {
  text: string;
}

function Button({text}: buttonInterface) {
  return (
    <button>
      {text}
    </button>
  )
}

export default Button;