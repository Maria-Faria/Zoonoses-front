import React, { ButtonHTMLAttributes } from "react";
import './style.css';

interface buttonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  color?: string
  isLoading?: boolean
}

export default function Button({ text, color, isLoading, ...props }: buttonProps) {
  return (
    <button type="button" style={{ background: color }} disabled={isLoading} {...props} >
      {
        isLoading ? (
          <div className="spinner"/>
        ) : (
          <p>{text}</p>
        )
      }
    </button>
  )
}