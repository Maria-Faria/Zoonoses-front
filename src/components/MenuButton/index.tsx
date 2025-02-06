import React from "react";
import "./style.css";

interface MenuButtonInterface {
  img: string
  text: string
  onClick: () => void
}

function MenuButton({img, text, onClick}: MenuButtonInterface) {
  return (
    <div className="menu-button">
      <img 
        src={img}
        alt={text}
        width={30}
        height={30}
        onClick={onClick}
      />

      <p onClick={onClick}>{text}</p>
    </div>
  )
}

export default MenuButton;