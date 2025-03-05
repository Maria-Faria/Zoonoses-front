import React from "react";
import "./style.css";

import { useNavigate } from "react-router-dom";

interface PageTitleInterface {
  title: string;
  widthTitle?: string
}

function PageTitle({title, widthTitle}: PageTitleInterface) {
  const navigate = useNavigate();

  return (
    <div className="page-header">
        <div className="page-title" style={{width: widthTitle}}>        
          <div className="back" onClick={() => navigate('/')}>
            <img 
              src="/arrow-back.svg"
              alt="arrow back"
              width={30}
              height={30}
            />

            <p>Voltar</p>

          </div>

          <h1>{title}</h1>

        </div>
      </div>
  )
}

export default PageTitle;