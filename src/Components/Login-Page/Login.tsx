import React, { useState, FormEvent } from 'react'
import api from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import {
  LoginPageSection,
  BackgroundStyled,
  FormStyled,
  FormButtonStyled
} from './Login-Styles'
import PeridotLog from '../../images/Peridot-logo.png'

const API_URL = 'http://127.0.0.1:8000/api/auth/jwt/create/'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post(API_URL, {
        username: username,
        password: password
      })

      const { access } = response.data

      if (access) {
        localStorage.setItem('authToken', access)
      }

      navigate('/feed')

      console.log('Login bem-sucedido!', response.data)
    } catch (err) {
      console.error('Erro no login', err)

      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError

        if (
          axiosError.response &&
          axiosError.response.data &&
          (axiosError.response.data as any).detail
        ) {
          setError((axiosError.response.data as any).detail)
        } else if (axiosError.request) {
          setError('Erro de Login! verifique seus dados e tente novamente!')
        } else {
          setError('Ocorreu um erro inesperado na requisição.')
        }
      } else {
        setError(
          'Ocorreu um erro desconhecido. Verifique o console para mais detalhes.'
        )
      }
    }
  }
  const handleRegisterClick = () => {
    navigate('/register')
  }

  return (
    <>
      <BackgroundStyled>
        {error && <p>{error}</p>}
        <div>
          <LoginPageSection>
            <img src={PeridotLog} alt="Logo Peridot" />
            <div>
              <h1>Peridot .</h1>
              <h3>Crie e Curta pensamentos diários</h3>
            </div>
            <FormStyled>
              <form onSubmit={handleSubmit}>
                <label>
                  Usuário
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Senha
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <FormButtonStyled>
                  <input type="submit" value="Entrar" />
                  <input
                    type="button"
                    value="Cadastrar"
                    onClick={handleRegisterClick}
                  />
                </FormButtonStyled>
              </form>
            </FormStyled>
          </LoginPageSection>
        </div>
      </BackgroundStyled>
    </>
  )
}

export default LoginPage
