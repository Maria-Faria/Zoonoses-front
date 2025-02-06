import React from "react";
import "./style.css";

interface HeaderInterface {
  name: string
}

function Header({name}: HeaderInterface) {
  return (
    <header>
      <img 
        src="./logo-header.svg"
        alt='logo'
        width={200}
        height={100}
      />

      <div className="user-info">
        <p>{name}</p>

        <img 
          src="./user-icon.svg"
          alt='user'
          width={45}
          height={40}
          className="user-icon"
        />
      </div>

     
    </header>
  )
}

export default Header;
