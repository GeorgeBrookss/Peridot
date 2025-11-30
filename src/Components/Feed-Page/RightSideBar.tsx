import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Styled from './Feed-Styled'
import { SearchResults, Post } from './types'
import ProfilePlaceholder from '../../images/Peridot-Logo-fundo.jpeg'

interface RightSideBarProps {
  searchQuery: string
  setSearchQuery: (val: string) => void
  showOverlay: boolean
  isSearching: boolean
  searchResults: SearchResults
  suggestedPosts: Post[]
  onSearchFocus: () => void
  onSearchBlur: () => void
  onComment: (id: number) => void
}

const RightSideBar: React.FC<RightSideBarProps> = ({
  searchQuery,
  setSearchQuery,
  showOverlay,
  isSearching,
  searchResults,
  suggestedPosts,
  onSearchFocus,
  onSearchBlur,
  onComment
}) => {
  const navigate = useNavigate()

  return (
    <Styled.SearchCamp>
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
        <Styled.SearchResultsOverlay>
          {isSearching && <p>Buscando...</p>}

          {/* Resultados de Usuários */}
          {searchResults.users.length > 0 && (
            <>
              <Styled.SearchSectionTitle>Usuários</Styled.SearchSectionTitle>
              <Styled.SearchList>
                {searchResults.users.map((user) => (
                  <Styled.SuggestCamp key={user.id}>
                    <Styled.SearchListItem
                      onMouseDown={() => navigate(`/users/${user.id}`)}
                    >
                      <Styled.SearchResultImage
                        src={user.profile_picture || ProfilePlaceholder}
                        alt={user.username}
                      />
                      <Styled.UserInfo>
                        <Styled.UserDisplayName>
                          {user.display_name}
                        </Styled.UserDisplayName>
                        <Styled.UserNameSearch>
                          @{user.username}
                        </Styled.UserNameSearch>
                      </Styled.UserInfo>
                    </Styled.SearchListItem>
                  </Styled.SuggestCamp>
                ))}
              </Styled.SearchList>
            </>
          )}

          {/* Resultados de Posts */}
          {searchResults.posts.length > 0 && (
            <>
              <Styled.SearchSectionTitle>Postagens</Styled.SearchSectionTitle>
              <Styled.SearchList>
                {searchResults.posts.map((post) => (
                  <Styled.SuggestCamp key={post.id}>
                    <Styled.SearchListItem
                      onMouseDown={() => onComment(post.id)}
                    >
                      <Styled.PostAuthorImage
                        src={post.author.profile_picture || ProfilePlaceholder}
                        alt={post.author.username}
                      />
                      <Styled.PostInfo>
                        <Styled.PostAuthorUsername>
                          @{post.author.username}
                        </Styled.PostAuthorUsername>
                        <Styled.PostSnippet>
                          {post.content.substring(0, 40)}...
                        </Styled.PostSnippet>
                      </Styled.PostInfo>
                    </Styled.SearchListItem>
                  </Styled.SuggestCamp>
                ))}
              </Styled.SearchList>
            </>
          )}

          {!isSearching &&
            searchQuery.trim().length >= 2 &&
            searchResults.users.length === 0 &&
            searchResults.posts.length === 0 && (
              <p>Nenhum resultado encontrado para {searchQuery}</p>
            )}
        </Styled.SearchResultsOverlay>
      )}

      {/* Área de Sugestões / Novidades */}
      <div className="mbLike">
        <h3>Novidades</h3>
        <ul>
          <Styled.SuggestCamp>
            {Array.isArray(suggestedPosts) && suggestedPosts.length > 0 ? (
              suggestedPosts.slice(0, 4).map((post) => (
                <li key={post.id}>
                  <a onClick={() => onComment(post.id)} href="#">
                    <strong>
                      {post.author.profile_picture ? (
                        <Styled.SuggestedPostProfilePicture
                          src={post.author.profile_picture}
                          alt={`Foto de perfil de ${post.author.username}`}
                        />
                      ) : (
                        <img src={ProfilePlaceholder} alt="Placeholder" />
                      )}
                      <h4>{post.author.display_name.substring(0, 10)}...</h4>
                      <h4>@{post.author.username.substring(0, 10)}...:</h4>
                    </strong>
                    <br />
                    <h5>{post.content.substring(0, 30)}...</h5>
                  </a>
                </li>
              ))
            ) : (
              <li>Nenhuma sugestão encontrada.</li>
            )}
          </Styled.SuggestCamp>
        </ul>
      </div>
    </Styled.SearchCamp>
  )
}

export default RightSideBar
