import React from "react";
import "./style.css";

function Footer() {
  return (
    <footer>
      <div className="info">
        <div className="address">       
          <img 
            src="./location-icon.svg" 
            alt="location" 
            width={30}
          />

          <p>Rua Ministro Dilson Funaro, 115 – Jardim Britânia</p>
        </div>

        <div className="phone">
          <img 
            src="./phone-icon.svg" 
            alt="phone" 
            width={24}
          />

          <p>(12) 3887-6888</p>
        </div>

        <div className="email">
          <img 
            src="./email-icon.svg" 
            alt="email" 
            width={24}
          />

          <p>zoonoses.saude@caraguatatuba.sp.gov.br</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer;