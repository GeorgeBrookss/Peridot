import * as Styled from './Feed-Styled'
import Logo from '../../images/Peridot-logo.png'
import ProfilePlaceholder from '../../images/Peridot-Logo-fundo.jpeg'
import LikeOn from '../../images/LikeOn.png'
import CommentButton from '../../images/CommentButton.png'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
  interface User {
    id: number
    username: string
    display_name: string
    profile_picture: string | null
    followers_count: number
    following_count: number
  }

  interface Post {
    id: number
    author: User
    content: string
    created_at: string
    is_liked: boolean
    likes_count: number
    comments_count: number
    image?: string | null
  }

  interface SearchResults {
    users: User[]
    posts: Post[]
  }

  const [newPostContent, setNewPostContent] = useState<string>('')
  const [userData, setUserData] = useState<User | null>(null)
  const [feedPosts, setFeedPosts] = useState<Post[]>([])
  const [suggestedPosts, setSuggestedPosts] = useState<Post[]>([])
  const [error, setError] = useState('')
  const [editingPostId, setEditingPostId] = useState<number | null>(null)
  const [editingPostContent, setEditingPostContent] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showOverlay, setShowOverlay] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResults>({
    users: [],
    posts: []
  })
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const navigate = useNavigate()

  const HandleExit = (e: any) => {
    e.preventDefault()
    navigate('/login')
  }
  const handleSearchClick = () => {
    setShowOverlay(true)
  }
  const handleBlur = () => {
    setShowOverlay(false)
  }

  const HandleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPostContent.trim()) {
      alert('A postagem não pode estar vazia!')
      return
    }

    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      alert('Você precisa estar logado para postar!')
      navigate('/login')
      return
    }

    try {
      const formData = new FormData()
      formData.append('content', newPostContent)
      if (selectedImage) {
        formData.append('image', selectedImage)
      }

      const response = await axios.post<Post>(
        'https://georgebks.pythonanywhere.com/api/posts/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      setFeedPosts((prevPosts) => [response.data, ...prevPosts])
      setNewPostContent('')
      setSelectedImage(null)
    } catch (err) {
      console.error('Erro ao criar postagem:', err)
      setError(
        'Não foi possível criar a postagem. Verifique sua conexão ou tente novamente.'
      )
    }
  }

  const HandleComments = (postId: number) => {
    navigate(`/posts/${postId}/comments`)
  }

  const handleLikeToggle = async (postId: number) => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      alert('Você precisa estar logado para interagir!')
      navigate('/login')
      return
    }

    const url = `https://georgebks.pythonanywhere.com/api/posts/${postId}/like/`
    const config = { headers: { Authorization: `Bearer ${authToken}` } }

    try {
      await axios.post(url, {}, config)
      setFeedPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                is_liked: !post.is_liked,
                likes_count: post.is_liked
                  ? post.likes_count - 1
                  : post.likes_count + 1
              }
            : post
        )
      )
      setSuggestedPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                is_liked: !post.is_liked,
                likes_count: post.is_liked
                  ? post.likes_count - 1
                  : post.likes_count + 1
              }
            : post
        )
      )
    } catch (err) {
      console.error('Erro ao alternar Like/Dislike:', err)
      setError('Erro ao processar o Like/Dislike. Tente novamente.')
    }
  }

  const HandleDeletePost = async (postId: number) => {
    if (!window.confirm('Tem certeza que deseja EXCLUIR esta postagem?')) return

    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/login')
      return
    }

    const config = { headers: { Authorization: `Bearer ${authToken}` } }

    try {
      await axios.delete(
        `https://georgebks.pythonanywhere.com/api/posts/${postId}/`,
        config
      )
      setFeedPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      )
      alert('Postagem excluída com sucesso!')
    } catch (err) {
      console.error('Erro ao excluir postagem:', err)
      setError(
        'Não foi possível excluir a postagem. (Verifique a permissão no Backend)'
      )
    }
  }

  const HandleUpdatePost = async (postId: number) => {
    if (!editingPostContent.trim()) {
      alert('O conteúdo da postagem não pode estar vazio.')
      return
    }

    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/login')
      return
    }

    const config = { headers: { Authorization: `Bearer ${authToken}` } }

    try {
      const response = await axios.put<Post>(
        `https://georgebks.pythonanywhere.com/api/posts/${postId}/`,
        { content: editingPostContent },
        config
      )
      setFeedPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? response.data : post))
      )
      setEditingPostId(null)
      setEditingPostContent('')
      alert('Postagem editada com sucesso!')
    } catch (err) {
      console.error('Erro ao atualizar postagem:', err)
      setError(
        'Não foi possível editar a postagem. (Verifique a permissão no Backend)'
      )
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0])
    }
  }

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults({ users: [], posts: [] })
      return
    }
    const delayDebounceFn = setTimeout(async () => {
      const authToken = localStorage.getItem('authToken')
      if (!authToken) return

      setIsSearching(true)
      try {
        const response = await axios.get(
          'https://georgebks.pythonanywhere.com/api/search/',
          {
            headers: { Authorization: `Bearer ${authToken}` },
            params: { query: searchQuery }
          }
        )
        setSearchResults(response.data)
      } catch (err) {
        console.error('Erro ao buscar:', err)
        setSearchResults({ users: [], posts: [] })
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        navigate('/login')
        return
      }
      const config = { headers: { Authorization: `Bearer ${authToken}` } }
      let currentUserData: User | null = null

      try {
        const userResponse = await axios.get<User>(
          'https://georgebks.pythonanywhere.com/api/users/me/',
          config
        )
        setUserData(userResponse.data)
        currentUserData = userResponse.data
      } catch (err) {
        console.error('Erro ao buscar dados do Usuário:', err)
        if (
          axios.isAxiosError(err) &&
          err.response &&
          err.response.status === 401
        ) {
          navigate('/login')
          return
        }
      }

      if (currentUserData) {
        try {
          const [feedResponse, allPostsResponse] = await Promise.all([
            axios.get(
              'https://georgebks.pythonanywhere.com/api/posts/feed/',
              config
            ),
            axios.get('https://georgebks.pythonanywhere.com/api/posts/', config)
          ])

          const feedPostsFromAPI: Post[] =
            feedResponse.data.results || feedResponse.data
          const allPostsFromAPI: Post[] =
            allPostsResponse.data.results || allPostsResponse.data
          const userOwnPosts = allPostsFromAPI.filter(
            (post) => post.author.id === currentUserData!.id
          )
          const feedPostIds = new Set(feedPostsFromAPI.map((p) => p.id))
          const uniqueUserOwnPosts = userOwnPosts.filter(
            (p) => !feedPostIds.has(p.id)
          )
          const combinedFeed = [...feedPostsFromAPI, ...uniqueUserOwnPosts]

          combinedFeed.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )

          setFeedPosts(combinedFeed)
          setSuggestedPosts(allPostsFromAPI)
        } catch (err) {
          console.error('Erro ao buscar dados do Feed:', err)
          setError(
            'Não foi possivel carregar o feed. Tente novamente mais tarde.'
          )
        }
      }
    }
    fetchData()
  }, [navigate])

  return (
    <Styled.Background>
      <Styled.BackgroundFeed>
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
              <a onClick={HandleExit} href="#">
                Sair
              </a>
            </li>
          </Styled.MenuOptions>
        </Styled.MenuArea>
        <div>
          <Styled.PostArea>
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
                  <a onClick={HandleExit} href="#">
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
                  onFocus={handleSearchClick}
                  onBlur={handleBlur}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {showOverlay && (
                  <Styled.SearchResultsOverlay>
                    {isSearching && <p>Buscando...</p>}
                    {searchResults.users.length > 0 && (
                      <>
                        <Styled.SearchSectionTitle>
                          Usuários
                        </Styled.SearchSectionTitle>
                        <Styled.SearchList>
                          {searchResults.users.map((user) => (
                            <Styled.SuggestCamp key={user.id}>
                              <Styled.SearchListItem
                                onMouseDown={() =>
                                  navigate(`/users/${user.id}`)
                                }
                              >
                                <Styled.SearchResultImage
                                  src={
                                    user.profile_picture || ProfilePlaceholder
                                  }
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
                    {searchResults.posts.length > 0 && (
                      <>
                        <Styled.SearchSectionTitle>
                          Postagens
                        </Styled.SearchSectionTitle>
                        <Styled.SearchList>
                          {searchResults.posts.map((post) => (
                            <Styled.SuggestCamp key={post.id}>
                              <Styled.SearchListItem
                                onMouseDown={() => HandleComments(post.id)}
                              >
                                <Styled.PostAuthorImage
                                  src={
                                    post.author.profile_picture ||
                                    ProfilePlaceholder
                                  }
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

                <div className="mbLike">
                  <h3>Novidades</h3>
                  <ul>
                    <Styled.SuggestCampMobile>
                      {Array.isArray(suggestedPosts) &&
                      suggestedPosts.length > 0 ? (
                        suggestedPosts.slice(0, 2).map((post) => (
                          <li style={{ width: '150px' }} key={post.id}>
                            <a onClick={() => HandleComments(post.id)} href="#">
                              <strong>
                                {post.author.profile_picture ? (
                                  <Styled.SuggestedPostProfilePicture
                                    src={post.author.profile_picture}
                                    alt={`Foto de perfil de ${post.author.username}`}
                                  />
                                ) : (
                                  <img
                                    src={ProfilePlaceholder}
                                    alt="Placeholder"
                                  />
                                )}
                                <h4>{post.author.display_name}</h4>
                                <h4>@{post.author.username}:</h4>
                              </strong>
                              <br />
                              <h5>{post.content.substring(0, 30)}...</h5>
                            </a>
                          </li>
                        ))
                      ) : (
                        <li>Nenhuma sugestão encontrada.</li>
                      )}
                    </Styled.SuggestCampMobile>
                  </ul>
                </div>
              </Styled.SearchCampMobile>
            </div>
            <h3>Novidades para você!</h3>
            <form onSubmit={HandleSubmitPost}>
              <div className="postarea">
                <textarea
                  placeholder="Digite seu mais novo pensamento!"
                  name="Post"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                ></textarea>

                <div className="blocl">
                  <input
                    type="file"
                    id="imageUpload"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  <Styled.ImageUpload
                    type="button"
                    onClick={() =>
                      document.getElementById('imageUpload')?.click()
                    }
                  >
                    Imagem
                  </Styled.ImageUpload>

                  {selectedImage && (
                    <Styled.SelectedImagePreviewContainer>
                      <Styled.SelectedImagePreview
                        src={URL.createObjectURL(selectedImage)}
                        alt="Pré-visualização"
                      />
                    </Styled.SelectedImagePreviewContainer>
                  )}

                  <Styled.PostButton type="submit">Publicar</Styled.PostButton>
                </div>
              </div>
            </form>
          </Styled.PostArea>

          <Styled.FeedCamp>
            {Array.isArray(feedPosts) && feedPosts.length > 0 ? (
              feedPosts.slice(0, 30).map((post) => (
                <Styled.PostContainer key={post.id}>
                  {userData?.id === post.author.id && (
                    <Styled.PostActions>
                      <Styled.EditPostButton
                        onClick={() => {
                          setEditingPostId(post.id)
                          setEditingPostContent(post.content)
                        }}
                      >
                        Editar
                      </Styled.EditPostButton>

                      <Styled.DeletePostButton
                        onClick={() => HandleDeletePost(post.id)}
                      >
                        Excluir
                      </Styled.DeletePostButton>
                    </Styled.PostActions>
                  )}

                  <Styled.PostAuthorProfile
                    onClick={() => navigate(`/users/${post.author.id}`)}
                  >
                    {post.author.profile_picture ? (
                      <Styled.ProfilePicture
                        src={post.author.profile_picture}
                        alt={`Foto de ${post.author.username}`}
                      />
                    ) : (
                      <Styled.ProfilePicture
                        src={ProfilePlaceholder}
                        alt="Placeholder"
                      />
                    )}

                    <Styled.AuthorUsername>
                      {post.author.display_name}
                      <h5
                        style={{ color: '#c3ff00' }}
                        onClick={() => navigate('/users/me')}
                        className="DisplayName"
                      >
                        @{post.author.username || 'Carregando...'}
                      </h5>
                    </Styled.AuthorUsername>
                  </Styled.PostAuthorProfile>

                  <div>
                    <small>
                      {new Date(post.created_at).toLocaleDateString()}
                    </small>
                  </div>

                  {editingPostId === post.id ? (
                    <div>
                      <Styled.EditingPostTextarea
                        value={editingPostContent}
                        onChange={(e) => setEditingPostContent(e.target.value)}
                      />

                      <Styled.SaveEditButton
                        onClick={() => HandleUpdatePost(post.id)}
                      >
                        Salvar Edição
                      </Styled.SaveEditButton>

                      <Styled.CancelEditButton
                        onClick={() => setEditingPostId(null)}
                      >
                        Cancelar
                      </Styled.CancelEditButton>
                    </div>
                  ) : (
                    <Styled.PostContent>{post.content}</Styled.PostContent>
                  )}

                  {post.image && (
                    <Styled.PostImage
                      src={
                        post.image.startsWith('http')
                          ? post.image
                          : `http://127.0.0.1:8000${post.image}`
                      }
                      alt="Imagem da postagem"
                    />
                  )}

                  <Styled.PostButtonsContainer>
                    <Styled.InteractionButton
                      onClick={() => handleLikeToggle(post.id)}
                    >
                      <Styled.LikeCount>{post.likes_count}</Styled.LikeCount>
                      <Styled.LikeIcon
                        $isLiked={post.is_liked}
                        src={LikeOn}
                        alt="Like button"
                      />
                    </Styled.InteractionButton>

                    <Styled.InteractionButton
                      onClick={() => HandleComments(post.id)}
                    >
                      <Styled.CommentCount>
                        {post.comments_count}
                      </Styled.CommentCount>
                      <Styled.CommentIcon
                        src={CommentButton}
                        alt="Comment Button"
                      />
                    </Styled.InteractionButton>
                  </Styled.PostButtonsContainer>
                </Styled.PostContainer>
              ))
            ) : (
              <p>Nenhuma postagem encontrada.</p>
            )}
          </Styled.FeedCamp>
        </div>
        <Styled.SearchCamp>
          <h3>Pesquisar Usuários</h3>

          <input
            type="search"
            name="search"
            placeholder="Buscar perfis e posts..."
            value={searchQuery}
            onFocus={handleSearchClick}
            onBlur={handleBlur}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {showOverlay && (
            <Styled.SearchResultsOverlay>
              {isSearching && <p>Buscando...</p>}
              {searchResults.users.length > 0 && (
                <>
                  <Styled.SearchSectionTitle>
                    Usuários
                  </Styled.SearchSectionTitle>
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
              {searchResults.posts.length > 0 && (
                <>
                  <Styled.SearchSectionTitle>
                    Postagens
                  </Styled.SearchSectionTitle>
                  <Styled.SearchList>
                    {searchResults.posts.map((post) => (
                      <Styled.SuggestCamp key={post.id}>
                        <Styled.SearchListItem
                          onMouseDown={() => HandleComments(post.id)}
                        >
                          <Styled.PostAuthorImage
                            src={
                              post.author.profile_picture || ProfilePlaceholder
                            }
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

          <div className="mbLike">
            <h3>Novidades</h3>
            <ul>
              <Styled.SuggestCamp>
                {Array.isArray(suggestedPosts) && suggestedPosts.length > 0 ? (
                  suggestedPosts.slice(0, 4).map((post) => (
                    <li key={post.id}>
                      <a onClick={() => HandleComments(post.id)} href="#">
                        <strong>
                          {post.author.profile_picture ? (
                            <Styled.SuggestedPostProfilePicture
                              src={post.author.profile_picture}
                              alt={`Foto de perfil de ${post.author.username}`}
                            />
                          ) : (
                            <img src={ProfilePlaceholder} alt="Placeholder" />
                          )}
                          <h4>{post.author.display_name}</h4>
                          <h4>@{post.author.username}:</h4>
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
      </Styled.BackgroundFeed>
    </Styled.Background>
  )
}

export default Feed
