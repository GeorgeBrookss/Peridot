import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Styled from './Feed-Styled'
import { User, SearchResults, Post } from './types'

import Logo from '../../images/Peridot-logo.png'
import ProfilePlaceholder from '../../images/Peridot-Logo-fundo.jpeg'

interface MobileFeedHeaderProps {
  userData: User | null
  searchQuery: string
  setSearchQuery: (val: string) => void
  showOverlay: boolean
  isSearching: boolean
  searchResults: SearchResults
  suggestedPosts: Post[]
  onSearchFocus: () => void
  onSearchBlur: () => void
  onLogout: (e: any) => void
  onComment: (postId: number) => void
}

const MobileFeedHeader: React.FC<MobileFeedHeaderProps> = ({
  userData,
  searchQuery,
  setSearchQuery,
  showOverlay,
  isSearching,
  searchResults,
  suggestedPosts,
  onSearchFocus,
  onSearchBlur,
  onLogout,
  onComment
}) => {
  const navigate = useNavigate()

  return (
    <div className="RenderMobile">
      <h1 className="logoMobile" onClick={() => navigate('/feed')}>
        <img src={Logo} alt="Logo" /> Peridot .
      </h1>

      <Styled.MenuOptionsMobile>
        <Styled.MenuProfileMobile>
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
        </Styled.MenuProfileMobile>

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
      </Styled.MenuOptionsMobile>

      <Styled.SearchCampMobile>
        <h3>Pesquisar Usuários</h3>
        <input
          type="search"
          name="search"
          placeholder="Buscar perfis e posts..."
          value={searchQuery}
          onFocus={onSearchFocus}
          onBlur={onSearchBlur}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {showOverlay && (
          <Styled.SearchResultsOverlayMobile>
            {isSearching && <p>Buscando...</p>}

            {/* Resultados de Usuários */}
            {searchResults.users.length > 0 && (
              <>
                <Styled.SearchSectionTitleMobile>
                  Usuários
                </Styled.SearchSectionTitleMobile>
                <Styled.SearchListMobile>
                  {searchResults.users.map((user) => (
                    <Styled.SuggestCampMobile key={user.id}>
                      <Styled.SearchListItemMobile
                        onMouseDown={() => navigate(`/users/${user.id}`)}
                      >
                        <Styled.SearchResultImageMobile
                          src={user.profile_picture || ProfilePlaceholder}
                          alt={user.username}
                        />
                        <Styled.UserInfoMobile>
                          <Styled.UserDisplayNameMobile>
                            {user.display_name}
                          </Styled.UserDisplayNameMobile>
                          <Styled.UserNameSearchMobile>
                            @{user.username}
                          </Styled.UserNameSearchMobile>
                        </Styled.UserInfoMobile>
                      </Styled.SearchListItemMobile>
                    </Styled.SuggestCampMobile>
                  ))}
                </Styled.SearchListMobile>
              </>
            )}

            {/* Resultados de Posts */}
            {searchResults.posts.length > 0 && (
              <>
                <Styled.SearchSectionTitleMobile>
                  Postagens
                </Styled.SearchSectionTitleMobile>
                <Styled.SearchListMobile>
                  {searchResults.posts.map((post) => (
                    <Styled.SuggestCampMobile key={post.id}>
                      <Styled.SearchListItemMobile
                        onMouseDown={() => onComment(post.id)}
                      >
                        <Styled.PostAuthorImageMobile
                          src={
                            post.author.profile_picture || ProfilePlaceholder
                          }
                          alt={post.author.username}
                        />
                        <Styled.PostInfoMobile>
                          <Styled.PostAuthorUsernameMobile>
                            @{post.author.username.substring(0, 5)}...
                          </Styled.PostAuthorUsernameMobile>
                          <Styled.PostSnippetMobile>
                            {post.content.substring(0, 40)}...
                          </Styled.PostSnippetMobile>
                        </Styled.PostInfoMobile>
                      </Styled.SearchListItemMobile>
                    </Styled.SuggestCampMobile>
                  ))}
                </Styled.SearchListMobile>
              </>
            )}

            {!isSearching &&
              searchQuery.trim().length >= 2 &&
              searchResults.users.length === 0 &&
              searchResults.posts.length === 0 && (
                <p>Nenhum resultado encontrado para {searchQuery}</p>
              )}
          </Styled.SearchResultsOverlayMobile>
        )}

        {/* Sugestões (Novidades) */}
        <div className="mbLikeMobile">
          <h3>Novidades</h3>
          <ul>
            <Styled.SuggestCampMobile>
              <div className="postSugestContainer">
                {Array.isArray(suggestedPosts) && suggestedPosts.length > 0 ? (
                  suggestedPosts.slice(0, 2).map((post) => (
                    <li style={{ width: '150px' }} key={post.id}>
                      <a onClick={() => onComment(post.id)} href="#">
                        <strong>
                          {post.author.profile_picture ? (
                            <Styled.SuggestedPostProfilePictureMobile
                              src={post.author.profile_picture}
                              alt={`Foto de perfil de ${post.author.username}`}
                            />
                          ) : (
                            <img src={ProfilePlaceholder} alt="Placeholder" />
                          )}
                          <h4>
                            {post.author.display_name.substring(0, 10)}...
                          </h4>
                          <h6>@{post.author.username.substring(0, 10)}:</h6>
                        </strong>
                        <br />
                        <p style={{ maxWidth: 'fit-content', margin: '10px' }}>
                          {post.content.substring(0, 15)}...
                        </p>
                      </a>
                    </li>
                  ))
                ) : (
                  <li>Nenhuma sugestão encontrada.</li>
                )}
              </div>
            </Styled.SuggestCampMobile>
          </ul>
        </div>
      </Styled.SearchCampMobile>
    </div>
  )
}

export default MobileFeedHeader
