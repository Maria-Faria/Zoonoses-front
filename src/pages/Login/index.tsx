import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorMessage from "../../components/ErrorMessage";
import Footer from '../../components/Footer';

import './style.modules.css';

interface loginData {
	userCode: string
	password: string
}

export default function Login() {
	const userCodeRef = useRef<HTMLInputElement>(null)

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
				const response = await fetch('http://localhost:4000/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						user_code: userDataToLogin.userCode,
						password: userDataToLogin.password
					})
				})

				const responseData = await response.json();

				console.log(responseData)
				// if (responseData.message === "Primeiro login") {
				// 	localStorage.setItem('user_code', userDataToLogin.userCode);
				// 	navigate('/new-password');

				// } else {
				// 	setCookies('accessToken', responseData.accessToken);
				// 	setCookies('refreshToken', responseData.refreshToken);
				// 	navigate('/');
				// }
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

	useEffect(() => {
		userCodeRef.current?.focus()
	}, [])

	useEffect(() => {
		setErrorMessage("")
	}, [userDataToLogin.userCode, userDataToLogin.password])

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

				<div className="input-and-button-reset-password">
					<Input
						type="number"
						label="Matrícula"
						reference={userCodeRef}
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
						label="Senha"
						name="password"
						placeholder="Digite a sua senha"
						value={userDataToLogin?.password}
						onChange={event => setUserDataToLogin(prevState => ({
							...prevState,
							password: event.target.value
						}))}
					/>

					<p onClick={() => navigate('/reset-password')} className="forgot-password">Esqueci minha senha</p>
				</div>

				{errorMessage && <ErrorMessage messageError={errorMessage} />}

				<Button text="Entrar" isLoading={loading} onClick={handleSubmit} />
			</div>

			<Footer />
		</div>
	)
} 