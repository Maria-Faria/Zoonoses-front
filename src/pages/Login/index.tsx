import React from "react";

import Button from "../../components/Button/index.tsx";
import Footer from '../../components/Footer/index.tsx';

import './style.css';

export default function Login() {
	return (
		<div className="container">
			<img
				src='./logo.svg'
				alt='Logo Centro de Controle de Zoonoses'
				width={368}
				height={180}
			/>

			<div className="form">

				<h1>Login</h1>

				<input type="text" placeholder="Digite a sua matrícula"/>

				<Button text="Entrar"/>
			</div>

			<Footer />
		</div>
	)
} 