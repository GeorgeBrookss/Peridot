import * as Styled from './Register-Styles'
import PeridotLog from '../../images/Peridot-logo.png'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

type ErrorState = string | null

const RegisterPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    display_name: '',
    email: '',
    password: '',
    password2: ''
  })

  const [error, setError] = useState<ErrorState>(null)
  const [loading, setLoading] = useState(false)

  const HandleEnterClick = () => {
    navigate('/login')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    if (formData.password !== formData.password2) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)

    const registrationData = {
      username: formData.username,
      display_name: formData.display_name,
      email: formData.email,
      password: formData.password,
      password2: formData.password2
    }

    try {
      const response = await fetch(
        'https://georgebks.pythonanywhere.com/api/register/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(registrationData)
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert('Usuário cadastrado com sucesso!')
        navigate('/login')
      } else {
        let errorMessage = 'Falha ao cadastrar. Verifique os dados.'

        if (data && typeof data === 'object') {
          const firstKey = Object.keys(data)[0]
          if (firstKey && Array.isArray(data[firstKey])) {
            errorMessage = `${firstKey}: ${data[firstKey][0]}`
          } else if (data.detail) {
            errorMessage = data.detail
          }
        }
        setError(errorMessage)
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente mais tarde.')
      console.error('Erro de requisição:', err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Styled.BackgroundRegisterStyled>
        <div>
          <Styled.RegisterPageSection>
            <img src={PeridotLog} alt="Logo Peridot" />
            <div>
              <h1>Peridot .</h1>
              <h3>Crie e Curta pensamentos diários</h3>
            </div>
            <Styled.FormRegisterStyled>
              <form onSubmit={handleSubmit}>
                <label>
                  <p>Digite um nome de usuário</p>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <p>Digite um nome de exibição</p>
                  <input
                    type="text"
                    name="display_name"
                    value={formData.display_name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <p>Digite um email</p>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <p>Digite uma senha</p>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <p>Confirme a senha</p>
                  <input
                    type="password"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                  />
                </label>
                {error && (
                  <p style={{ color: 'red', margin: '10px 0' }}>{error}</p>
                )}
                <Styled.FormRegisterButtonStyled>
                  <input
                    type="submit"
                    value={loading ? 'Cadastrando...' : 'Confirmar Cadastro'}
                    disabled={loading}
                  />
                  <input
                    type="button"
                    value="Já possuo conta"
                    onClick={HandleEnterClick}
                    disabled={loading}
                  />
                </Styled.FormRegisterButtonStyled>
              </form>
            </Styled.FormRegisterStyled>
          </Styled.RegisterPageSection>
        </div>
      </Styled.BackgroundRegisterStyled>
    </>
  )
}

export default RegisterPage
