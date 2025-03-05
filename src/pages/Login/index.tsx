import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorMessage from "../../components/ErrorMessage";
import Footer from '../../components/Footer';

import './style.css';

interface loginData {
	userCode: string
	password: string
}

export default function Login() {
	const [userDataToLogin, setUserDataToLogin] = useState<loginData>({
		userCode: "",
		password: ""
	})
	const [errorMessage, setErrorMessage] = useState<string | null>()
	const [loading, setLoading] = useState<boolean>(false)
	const [cookies, setCookies] = useCookies(['accessToken', 'refreshToken'])

	const navigate = useNavigate()

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)

		try {
			if (userDataToLogin?.userCode.trim() && userDataToLogin.password.trim()) {
				const response = await fetch('https://zoonoses.onrender.com/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						userDataToLogin
					})
				})

				const responseData = await response.json();

				if (responseData.message === "Primeiro login") {
					localStorage.setItem('user_code', userDataToLogin.userCode);
					navigate('/new-password');

				} else {
					setCookies('accessToken', responseData.accessToken);
					setCookies('refreshToken', responseData.refreshToken);
					navigate('/');
				}
			} else {
				setErrorMessage("Preencha todos os campos!")
			}
		} catch (error) {
			setErrorMessage("ERROR")
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

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

				<Input
					type="number"
					name="matricula"
					placeholder="Digite a sua matrícula"
					value={userDataToLogin?.userCode}
					onChange={event => setUserDataToLogin(prevState => ({
						...prevState,
						userCode: event.target.value
					}))}
				/>

				<Input
					type="password"
					name="password"
					placeholder="Digite a sua senha"
					value={userDataToLogin?.password}
					onChange={event => setUserDataToLogin(prevState => ({
						...prevState,
						password: event.target.value
					}))}
				/>

				<p onClick={() => navigate('/reset-senha')} className="forgot-password">Esqueci minha senha</p>

				{ errorMessage && <ErrorMessage messageError={errorMessage} /> }

				<Button text="Entrar" isLoading={loading} onClick={handleSubmit}/>
			</div>

			<Footer />
		</div>
	)
} 