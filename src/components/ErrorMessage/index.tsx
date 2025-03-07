import React from "react";
import './style.css';

interface errorInterface {
  messageError: string
}

function ErrorMessage({messageError}: errorInterface) {
  return (
    <p className="error-message">
      {messageError}
    </p>
  )
}

export default ErrorMessage;