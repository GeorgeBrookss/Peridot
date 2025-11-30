import * as Styled from './Post-Details-Styled'
import Logo from '../../images/Peridot-logo.png'
import ProfilePlaceholder from '../../images/Peridot-Logo-fundo.jpeg'
import LikeOn from '../../images/LikeOn.png'
import CommentButton from '../../images/CommentButton.png'
import React, { useState, useEffect, CSSProperties } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const PostDetails = () => {
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
    image: string | null
  }

  interface Comment {
    id: number
    author: User
    content: string
    created_at: string
  }

  interface SearchResults {
    users: User[]
    posts: Post[]
  }

  const { postId } = useParams<{ postId: string }>()
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editingCommentContent, setEditingCommentContent] = useState<string>('')
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newCommentContent, setNewCommentContent] = useState<string>('')
  const [userData, setUserData] = useState<User | null>(null)
  const [suggestedPosts, setSuggestedPosts] = useState<Post[]>([])
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [showOverlay, setShowOverlay] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResults>({
    users: [],
    posts: []
  })
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const navigate = useNavigate()
  const authToken = localStorage.getItem('authToken')
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }

  const HandleComments = (postId: number) => {
    navigate(`/posts/${postId}/comments`)
  }

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

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    top: 110,
    right: 0,
    width: '25vw',
    height: '50vh',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    color: '#fff',
    borderRadius: '20px',
    border: '1px solid #fff6f6c0',
    overflowY: 'auto',
    padding: '40px'
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
            headers: {
              Authorization: `Bearer ${authToken}`
            },
            params: {
              query: searchQuery
            }
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

  const fetchPostAndComments = async () => {
    if (!postId || !authToken) {
      if (!authToken) navigate('/login')
      return
    }

    try {
      const postResponse = await axios.get(
        `https://georgebks.pythonanywhere.com/api/posts/${postId}/`,
        config
      )
      setPost(postResponse.data)

      if (postResponse.data.comments) {
        setComments(postResponse.data.comments)
      } else {
        setComments([])
      }

      const suggestedResponse = await axios.get(
        'https://georgebks.pythonanywhere.com/api/posts/',
        config
      )
      setSuggestedPosts(
        suggestedResponse.data.results || suggestedResponse.data
      )
    } catch (err) {
      console.error('Erro ao buscar post e comentários:', err)
      setError(
        'Não foi possível carregar os detalhes do post. Tente novamente.'
      )
    }
  }

  const HandleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCommentContent.trim()) return

    try {
      const response = await axios.post<Comment>(
        `https://georgebks.pythonanywhere.com/api/posts/${postId}/comments/`,
        { content: newCommentContent },
        config
      )

      setComments((prevComments) => [response.data, ...prevComments])
      setNewCommentContent('')

      if (post) {
        setPost((prevPost) =>
          prevPost
            ? { ...prevPost, comments_count: prevPost.comments_count + 1 }
            : null
        )
      }
    } catch (err) {
      console.error('Erro ao enviar comentário:', err)
      setError('Não foi possível enviar o comentário.')
    }
  }

  const handleLikeToggle = async (postId: number, isLiked: boolean) => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      alert('Você precisa estar logado para interagir!')
      navigate('/login')
      return
    }

    const url = `https://georgebks.pythonanywhere.com/api/posts/${postId}/like/`

    try {
      await axios.post(url, {}, config)

      setPost((prevPost) => {
        if (!prevPost) return null
        return {
          ...prevPost,
          is_liked: !isLiked,
          likes_count: isLiked
            ? prevPost.likes_count - 1
            : prevPost.likes_count + 1
        }
      })
    } catch (err) {
      console.error('Erro ao alternar Like/Dislike:', err)
      setError('Erro ao processar o Like/Dislike. Tente novamente.')
    }
  }

  const HandleDeleteComment = async (commentId: number) => {
    if (!window.confirm('Tem certeza que deseja EXCLUIR este comentário?'))
      return

    try {
      await axios.delete(
        `https://georgebks.pythonanywhere.com/api/posts/${postId}/comments/${commentId}/`,
        config
      )

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      )

      setPost((prevPost) =>
        prevPost
          ? { ...prevPost, comments_count: prevPost.comments_count - 1 }
          : null
      )

      alert('Comentário excluído com sucesso!')
    } catch (err) {
      console.error('Erro ao excluir comentário:', err)
      setError(
        'Não foi possível excluir o comentário. (Verifique a permissão no Backend)'
      )
    }
  }

  const HandleUpdateComment = async (commentId: number) => {
    if (!editingCommentContent.trim()) return

    try {
      const response = await axios.put<Comment>(
        `https://georgebks.pythonanywhere.com/api/posts/${postId}/comments/${commentId}/`,
        { content: editingCommentContent },
        config
      )

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? response.data : comment
        )
      )
      setEditingCommentId(null)
      setEditingCommentContent('')
      alert('Comentário editado com sucesso!')
    } catch (err) {
      console.error('Erro ao atualizar comentário:', err)
      setError(
        'Não foi possível editar o comentário. (Verifique a permissão no Backend)'
      )
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (!authToken) return

      try {
        const userResponse = await axios.get(
          'https://georgebks.pythonanywhere.com/api/users/me/',
          config
        )
        setUserData(userResponse.data)
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          navigate('/login')
        }
      }
    }
    fetchUser()
    fetchPostAndComments()
  }, [navigate, postId])

  if (error) return <p style={{ color: 'red', margin: '20px' }}>{error}</p>

  if (!post)
    return (
      <p style={{ margin: '20px', color: '#48ff3b' }}>
        Carregando post e comentários...
      </p>
    )

  return (
    <Styled.Background>
      <Styled.BackgroundFeed>
        <Styled.MenuArea>
          <h1 onClick={() => navigate('/feed')} style={{ cursor: 'pointer' }}>
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
          <Styled.FeedCamp>
            <h1
              className="LogoMobile"
              onClick={() => navigate('/feed')}
              style={{ cursor: 'pointer' }}
            >
              <img src={Logo} alt="LogoMobile" /> Peridot .
            </h1>
            <button
              onClick={() => navigate('/feed')}
              type="button"
              style={{
                color: '#ffffff',
                marginRight: '10px',
                marginBottom: '20px',
                background: 'linear-gradient(#0a4500, #77ff7aa5)',
                borderRadius: '20px',
                padding: '5px',
                border: '1px solid #0000',
                cursor: 'pointer'
              }}
            >
              Voltar
            </button>
            <div
              key={post.id}
              style={{
                border: '1px solid #bdffbb7f',
                borderRadius: '20px',
                padding: '12px',
                marginBottom: '20px',
                background: 'linear-gradient(#b7ff7c67, #b7ff7c21)'
              }}
            >
              <div
                className="postAuthorProfile"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/users/${post.author.id}`)}
              >
                <img
                  src={post.author.profile_picture || ProfilePlaceholder}
                  alt={`Foto de ${post.author.username}`}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px'
                  }}
                />
                <div
                  style={{
                    display: 'block',
                    cursor: 'pointer',
                    maxWidth: '100%'
                  }}
                >
                  <h4
                    style={{
                      fontSize: '23px',
                      wordBreak: 'break-word',
                      overflowWrap: 'anywhere'
                    }}
                  >
                    {post.author.display_name}
                  </h4>
                  <h4
                    style={{
                      fontSize: '23px',
                      color: '#c3ff00',
                      wordBreak: 'break-all',
                      overflowWrap: 'anywhere'
                    }}
                  >
                    @{post.author.username}
                  </h4>
                </div>
              </div>

              <div>
                <small>{new Date(post.created_at).toLocaleDateString()}</small>
                {post.image && (
                  <div
                    style={{
                      marginTop: '15px',
                      marginBottom: '15px',
                      textAlign: 'center'
                    }}
                  >
                    <img
                      src={post.image}
                      alt={`Imagem da postagem de ${post.author.username}`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '400px',
                        borderRadius: '10px',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                )}
              </div>

              <Styled.PostContent>{post.content}</Styled.PostContent>

              <div className="containerPostButtons">
                <button
                  onClick={() => handleLikeToggle(post.id, post.is_liked)}
                  style={{
                    backgroundColor: 'transparent',
                    padding: '0',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    margin: '0 auto'
                  }}
                >
                  <p style={{ color: '#48ff3b', marginRight: '10px' }}>
                    {post.likes_count}
                  </p>
                  <img
                    src={LikeOn}
                    alt="Like button"
                    style={
                      post.is_liked
                        ? { width: '30px', filter: 'brightness(2)' }
                        : { width: '30px', filter: 'grayscale(60%)' }
                    }
                  />
                </button>

                <div
                  style={{
                    display: 'flex',
                    margin: '0 auto',
                    alignItems: 'center'
                  }}
                >
                  <p style={{ color: '#48ff3b', marginRight: '10px' }}>
                    {post.comments_count}
                  </p>
                  <img
                    src={CommentButton}
                    alt="Comment Button"
                    style={{ width: '30px', filter: 'brightness(1)' }}
                  />
                </div>
              </div>
            </div>
          </Styled.FeedCamp>

          <Styled.PostArea>
            <form onSubmit={HandleSubmitComment}>
              <div className="postarea">
                <textarea
                  placeholder="Comente!"
                  name="comment"
                  value={newCommentContent}
                  onChange={(e) => setNewCommentContent(e.target.value)}
                ></textarea>
                <Styled.CommentButton
                  type="submit"
                  onClick={HandleSubmitComment}
                  style={{ border: 'none' }}
                >
                  Comentar
                </Styled.CommentButton>
              </div>
            </form>
          </Styled.PostArea>

          <Styled.FeedCamp style={{ marginTop: '30px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
              {post.comments_count} Comentários Recentes
            </h3>

            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    border: '1px solid #c9c9c9',
                    borderRadius: '15px',
                    padding: '10px',
                    marginBottom: '20px',
                    background: '#bdffbb33'
                  }}
                >
                  <div
                    onClick={() => navigate(`/users/${comment.author.id}`)}
                    className="commentAuthorProfile"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '5px',
                      cursor: 'pointer',
                      width: 'fit-content'
                    }}
                  >
                    <img
                      onClick={() => navigate(`/users/${comment.author.id}`)}
                      src={comment.author.profile_picture || ProfilePlaceholder}
                      alt={`Foto de ${comment.author.username}`}
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        marginRight: '10px'
                      }}
                    />
                    <div style={{ display: 'block' }}>
                      <h4 style={{ margin: 0, fontSize: '18px' }}>
                        {comment.author.display_name}
                      </h4>
                      <h4 style={{ fontSize: '18px', color: '#c3ff00' }}>
                        @{comment.author.username}
                      </h4>
                    </div>
                  </div>
                  {userData?.id === comment.author.id && (
                    <div
                      style={{
                        marginLeft: '20%',
                        marginRight: '30%',
                        display: 'flex',
                        gap: '20px'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setEditingCommentId(comment.id)
                          setEditingCommentContent(comment.content)
                        }}
                        style={{
                          all: 'unset',
                          cursor: 'pointer',
                          marginLeft: '80%',
                          color: '#00cc00',
                          zIndex: '999999'
                        }}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => HandleDeleteComment(comment.id)}
                        style={{
                          all: 'unset',
                          cursor: 'pointer',
                          color: 'red'
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  )}

                  {editingCommentId === comment.id ? (
                    <div style={{ paddingLeft: '40px' }}>
                      <textarea
                        value={editingCommentContent}
                        onChange={(e) =>
                          setEditingCommentContent(e.target.value)
                        }
                        style={{
                          width: '100%',
                          minHeight: '50px',
                          resize: 'none'
                        }}
                      />
                      <button
                        onClick={() => HandleUpdateComment(comment.id)}
                        style={{
                          marginTop: '12px',
                          background:
                            'linear-gradient(#11ff00ce, #005c00, #0e471e57)',
                          color: '#ffffff',
                          padding: '5px',
                          fontWeight: '600',
                          border: '1px solid #ffffff20',
                          borderRadius: '20px',
                          marginBottom: '20px',
                          cursor: 'pointer'
                        }}
                      >
                        Salvar
                      </button>
                      <button
                        onClick={() => setEditingCommentId(null)}
                        style={{
                          marginLeft: '20px',
                          background:
                            'linear-gradient(#ff0000ce, #5c0000, #470e0e56)',
                          color: '#ffffff',
                          padding: '5px',
                          fontWeight: '600',
                          border: '1px solid #ffffff20',
                          borderRadius: '20px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <p
                      style={{
                        margin: '16px 0 16px 22px',
                        paddingLeft: '40px',
                        wordBreak: 'break-word',
                        overflowWrap: 'anywhere',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {comment.content}
                    </p>
                  )}

                  <small
                    style={{
                      display: 'block',
                      paddingLeft: '40px',
                      color: '#999'
                    }}
                  >
                    {new Date(comment.created_at).toLocaleString()}
                  </small>
                </div>
              ))
            ) : (
              <p>Nenhum comentário ainda. Seja o primeiro!</p>
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
            <div className="searchResults" style={overlayStyle}>
              {isSearching && <p>Buscando...</p>}

              {searchResults.users.length > 0 && (
                <>
                  <h4 style={{ marginBottom: '10px' }}>Usuários</h4>
                  <ul style={{ listStyle: 'none' }}>
                    {searchResults.users.map((user) => (
                      <Styled.SuggestCamp key={user.id}>
                        <li
                          onMouseDown={() => navigate(`/users/${user.id}`)}
                          style={{
                            cursor: 'pointer',
                            paddingBottom: '20px'
                          }}
                        >
                          <img
                            style={{
                              maxWidth: '200px',
                              maxHeight: '200px',
                              cursor: 'pointer',
                              borderRadius: '20px',
                              marginBottom: '10px',
                              marginLeft: '20%',
                              marginTop: '20px'
                            }}
                            src={user.profile_picture || ProfilePlaceholder}
                            alt={user.username}
                          />
                          <div style={{ marginLeft: '20px' }}>
                            <strong style={{ display: 'block' }}>
                              {user.display_name}
                            </strong>
                            <small style={{ display: 'block' }}>
                              @{user.username}
                            </small>
                          </div>
                        </li>
                      </Styled.SuggestCamp>
                    ))}
                  </ul>
                </>
              )}

              {searchResults.posts.length > 0 && (
                <>
                  <h4 style={{ marginBottom: '10px' }}>Postagens</h4>
                  <ul style={{ listStyle: 'none' }}>
                    {searchResults.posts.map((post) => (
                      <Styled.SuggestCamp key={post.id}>
                        <li
                          onMouseDown={() => HandleComments(post.id)}
                          style={{
                            cursor: 'pointer',
                            paddingBottom: '20px'
                          }}
                        >
                          <img
                            src={
                              post.author.profile_picture || ProfilePlaceholder
                            }
                            alt={post.author.username}
                            style={{
                              maxWidth: '100px',
                              maxHeight: '100px',
                              cursor: 'pointer',
                              borderRadius: '20px',
                              marginBottom: '10px'
                            }}
                          />
                          <div>
                            <strong
                              style={{ display: 'block', marginLeft: '10px' }}
                            >
                              @{post.author.username}
                            </strong>
                            <p
                              style={{
                                display: 'block',
                                marginLeft: '40px',
                                marginTop: '30px',
                                fontSize: '24px'
                              }}
                            >
                              {post.content.substring(0, 40)}...
                            </p>
                          </div>
                        </li>
                      </Styled.SuggestCamp>
                    ))}
                  </ul>
                </>
              )}

              {!isSearching &&
                searchQuery.trim().length >= 2 &&
                searchResults.users.length === 0 &&
                searchResults.posts.length === 0 && (
                  <p>Nenhum resultado encontrado para {searchQuery}</p>
                )}
            </div>
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
                            <img
                              src={post.author.profile_picture}
                              alt={`Foto de perfil de ${post.author.username}`}
                              style={{ width: '24px', height: '24px' }}
                            />
                          ) : (
                            <img src={ProfilePlaceholder} alt="Placeholder" />
                          )}
                          <h4>{post.author.username}:</h4>
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

export default PostDetails
