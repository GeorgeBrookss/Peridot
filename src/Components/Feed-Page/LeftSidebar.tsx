import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Styled from './Feed-Styled'
import { User } from './types'
import Logo from '../../images/Peridot-logo.png'
import ProfilePlaceholder from '../../images/Peridot-Logo-fundo.jpeg'

interface LeftSidebarProps {
  userData: User | null
  onLogout: (e: any) => void
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ userData, onLogout }) => {
  const navigate = useNavigate()

  return (
    <Styled.MenuArea>
      <h1 onClick={() => navigate('/feed')}>
        <img src={Logo} alt="Logo" /> Peridot .
      </h1>

      <Styled.MenuOptions>
        <Styled.MenuProfile>
          <li>
            <a href="#">
              <img
                onClick={() => navigate('/users/me')}
                src={userData?.profile_picture || ProfilePlaceholder}
                alt="Foto de perfil"
              />
            </a>
          </li>

          <div>
            <li>
              <a
                onClick={() => navigate('/users/me')}
                className="DisplayName"
                href="#"
              >
                {userData?.display_name || 'Carregando...'}
              </a>
            </li>

            <li>
              <a
                style={{ color: '#c3ff00' }}
                onClick={() => navigate('/users/me')}
                className="DisplayName"
                href="#"
              >
                @{userData?.username || 'Carregando...'}
              </a>
            </li>
          </div>
        </Styled.MenuProfile>

        <li>
          <a onClick={() => navigate('/feed')} href="#">
            Inicio
          </a>
        </li>
        <li>
          <a onClick={() => navigate('/users/me')} href="#">
            Perfil
          </a>
        </li>
        <li>
          <a onClick={onLogout} href="#">
            Sair
          </a>
        </li>
      </Styled.MenuOptions>
    </Styled.MenuArea>
  )
}

export default LeftSidebar
