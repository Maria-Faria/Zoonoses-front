import React from "react";
import Form from "../../components/FormLogin/index.tsx";
import Footer from '../../components/Footer/index.tsx';
import './style.css';

function Login() {
  return(
    <div className="login">
      <div className="login-form">
        <img 
          src='./logo.svg' 
          alt='logo'
          width={275}
          height={175}
        />

        <Form />
      </div>

      <Footer />

    </div>
  )
}

export default Login;