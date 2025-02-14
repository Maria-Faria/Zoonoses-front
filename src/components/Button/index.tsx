import React, { HTMLAttributes } from "react";
import './style.css';

interface buttonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
}

function Button({ text }: buttonProps) {
  return (
    <button disabled={true}>
      {text}
    </button>
  )
}

export default Button;