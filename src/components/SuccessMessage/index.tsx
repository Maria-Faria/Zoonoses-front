import React from "react";
import './style.css';

interface successInterface {
  messageSuccess: string
}

function SuccessMessage({messageSuccess}: successInterface) {
  return (
    <p className="success-message">
      {messageSuccess}
    </p>
  )
}

export default SuccessMessage;