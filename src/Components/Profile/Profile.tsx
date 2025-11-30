import * as Styled from './Profile-Styled'
import ProfilePlaceholder from '../../images/Peridot-Logo-fundo.jpeg'
import LikeOn from '../../images/LikeOn.png'
import Logo from '../../images/Peridot-logo.png'
import CommentButton from '../../images/CommentButton.png'

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const BASE_URL = 'https://georgebks.pythonanywhere.com'

const Profile = () => {
  interface User {
    id: number
    username: string
    display_name: string
    profile_picture: string | null
    followers_count: number
    following_count: number
    is_following: boolean
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

  interface FollowUser {
    id: number
    username: string
    display_name: string
    profile_picture: string | null
    is_following: boolean
  }

  const [userData, setUserData] = useState<User | null>(null)
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const [error, setError] = useState('')
  const [editingPostId, setEditingPostId] = useState<number | null>(null)
  const [editingPostContent, setEditingPostContent] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [showListModal, setShowListModal] = useState(false)
  const [listType, setListType] = useState<'followers' | 'following' | null>(
    null
  )
  const [listUsers, setListUsers] = useState<FollowUser[]>([])
  const [listLoading, setListLoading] = useState(false)
  const [profileFormData, setProfileFormData] = useState({
    display_name: '',
    old_password: '',
    new_password: '',
    new_password2: ''
  })
  const [loading, setLoading] = useState(true)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [currentUserId, setCurrentUserId] = useState<number | null>(null)
  const navigate = useNavigate()
  const { id: urlUserId } = useParams<{ id: string }>()
  const profileId = urlUserId ? parseInt(urlUserId) : null
  const isMyProfile = userData?.id === currentUserId

  const getAuth = () => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate('/login')
      return null
    }
    return {
      authToken,
      config: { headers: { Authorization: `Bearer ${authToken}` } }
    }
  }

  const handleLikeToggle = async (postId: number, isLiked: boolean) => {
    const auth = getAuth()
    if (!auth) return

    const url = `https://georgebks.pythonanywhere.com/api/posts/${postId}/like/`

    try {
      await axios.post(url, {}, auth.config)

      setUserPosts((prevPosts) =>
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

    const auth = getAuth()
    if (!auth) return

    try {
      await axios.delete(
        `https://georgebks.pythonanywhere.com/api/posts/${postId}/`,
        auth.config
      )
      setUserPosts((prevPosts) =>
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

    const auth = getAuth()
    if (!auth) return

    try {
      const response = await axios.put<Post>(
        `https://georgebks.pythonanywhere.com/api/posts/${postId}/`,
        { content: editingPostContent },
        auth.config
      )

      setUserPosts((prevPosts) =>
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

  const HandleComments = (postId: number) => {
    navigate(`/posts/${postId}/comments`)
  }

  const handlePictureClick = () => {
    if (isMyProfile) {
      fileInputRef.current?.click()
    }
  }

  const HandleProfilePictureUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const auth = getAuth()
    if (!auth) return

    const formData = new FormData()
    formData.append('profile_picture', file)

    const config = {
      headers: {
        Authorization: `Bearer ${auth.authToken}`,
        'Content-Type': 'multipart/form-data'
      }
    }

    try {
      const response = await axios.put<User>(
        'https://georgebks.pythonanywhere.com/api/users/me/',
        formData,
        config
      )

      setUserData(response.data)
      alert('Foto de perfil atualizada com sucesso!')
    } catch (err) {
      console.error('Erro ao atualizar foto de perfil:', err)
      setError(
        'Não foi possível atualizar a foto. Verifique o tamanho/formato do arquivo.'
      )
    }
  }

  const handleProfileFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const HandleEditProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const auth = getAuth()
    if (!auth) return

    const { display_name, old_password, new_password, new_password2 } =
      profileFormData
    if (!isMyProfile) {
      setError('Você só pode editar seu próprio perfil.')
      setIsEditingProfile(false)
      return
    }

    const displayUpdateData: { display_name?: string } = {}
    let passwordChangeData: { [key: string]: string } = {}
    let isPasswordChangeAttempted = false
    let changesMade = false

    if (old_password || new_password || new_password2) {
      isPasswordChangeAttempted = true
      if (!old_password || !new_password || !new_password2) {
        setError(
          'Para alterar a senha, você deve preencher: Senha Antiga, Nova Senha e Confirmação.'
        )
        return
      }
      if (new_password !== new_password2) {
        setError('A Nova Senha e a Confirmação devem ser iguais.')
        return
      }

      passwordChangeData = {
        old_password: old_password,
        new_password: new_password,
        new_password2: new_password2
      }
      changesMade = true
    }

    if (display_name.trim() && display_name.trim() !== userData?.display_name) {
      displayUpdateData.display_name = display_name.trim()
      changesMade = true
    }

    if (!changesMade) {
      alert('Nenhuma alteração foi feita.')
      setIsEditingProfile(false)
      return
    }

    try {
      if (displayUpdateData.display_name) {
        const displayResponse = await axios.put<User>(
          'https://georgebks.pythonanywhere.com/api/users/me/',
          displayUpdateData,
          auth.config
        )
        setUserData(displayResponse.data)
      }

      if (isPasswordChangeAttempted) {
        await axios.post(
          'https://georgebks.pythonanywhere.com/api/users/change-password/',
          passwordChangeData,
          auth.config
        )
      }

      setIsEditingProfile(false)
      setProfileFormData((prev) => ({
        ...prev,
        old_password: '',
        new_password: '',
        new_password2: ''
      }))
      alert('Perfil atualizado com sucesso!')
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err)
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        if (err.response.data.old_password) {
          setError('Senha antiga incorreta. Por favor, verifique.')
          return
        }
        const backendError =
          err.response.data.detail ||
          err.response.data.non_field_errors ||
          JSON.stringify(err.response.data)
        setError(`Erro de validação: ${backendError}`)
      } else {
        setError(
          'Erro ao atualizar perfil. Verifique seus dados ou tente mais tarde.'
        )
      }
    }
  }

  const handleFollowToggle = async () => {
    const auth = getAuth()
    if (!auth || !userData || !profileId) return

    if (isMyProfile) {
      setError('Você não pode seguir seu próprio perfil.')
      return
    }

    const url = `https://georgebks.pythonanywhere.com/api/users/${profileId}/follow/`

    try {
      const response = await axios.post<{
        status: 'followed' | 'unfollowed'
        profile_data: User
      }>(url, {}, auth.config)

      setRefreshTrigger((prev) => prev + 1)
      const message =
        response.data.status === 'followed'
          ? `Você começou a seguir ${userData.display_name}.`
          : `Você deixou de seguir ${userData.display_name}.`

      alert(message)
    } catch (err) {
      console.error('Erro ao alternar Seguir/Deixar de Seguir:', err)
      setError('Erro ao processar a ação. Tente novamente.')
    }
  }
  const fetchFollowList = async (
    type: 'followers' | 'following',
    userId: number
  ) => {
    setListLoading(true)
    setListUsers([])
    setError('')

    const auth = getAuth()
    if (!auth) {
      setListLoading(false)
      return
    }

    const url = `https://georgebks.pythonanywhere.com/api/users/${userId}/${type}/`

    try {
      const response = await axios.get<FollowUser[]>(url, auth.config)
      setListUsers(response.data)
      setListType(type)
      setShowListModal(true)
    } catch (err) {
      console.error(`Erro ao buscar ${type}:`, err)
      setError(`Erro ao carregar lista de ${type}.`)
    } finally {
      setListLoading(false)
    }
  }

  useEffect(() => {
    if (userData) {
      setProfileFormData((prev) => ({
        ...prev,
        display_name: userData.display_name
      }))
    }
  }, [userData])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        navigate('/login')
        return
      }

      const config = {
        headers: { Authorization: `Bearer ${authToken}` }
      }

      let profileToFetchId: number | null = profileId
      let loggedUserId: number | null = null

      try {
        const meResponse = await axios.get<User>(
          'https://georgebks.pythonanywhere.com/api/users/me/',
          config
        )
        loggedUserId = meResponse.data.id
        setCurrentUserId(loggedUserId)

        if (!profileId) {
          profileToFetchId = loggedUserId
        }

        if (profileToFetchId) {
          const profileUrl = `https://georgebks.pythonanywhere.com/api/users/${profileToFetchId}/`
          const profileResponse = await axios.get<User>(profileUrl, config)
          setUserData(profileResponse.data)

          setLoading(false)

          try {
            const allPostsResponse = await axios.get(
              'https://georgebks.pythonanywhere.com/api/posts/',
              config
            )
            const postsToFilter =
              allPostsResponse.data.results || allPostsResponse.data
            const userSpecificPosts = postsToFilter.filter(
              (post: Post) => post.author.id === profileToFetchId
            )

            userSpecificPosts.sort(
              (a: Post, b: Post) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )

            setUserPosts(userSpecificPosts)
          } catch (postErr) {
            console.error('Erro ao buscar posts (background):', postErr)
          }
        } else {
          setError('Nenhum perfil especificado.')
          setLoading(false)
        }
      } catch (err) {
        console.error('Erro ao carregar perfil:', err)
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          navigate('/login')
        } else {
          setError('Perfil não encontrado ou erro de conexão.')
        }
        setLoading(false)
      }
    }
    fetchData()
  }, [navigate, profileId, refreshTrigger])

  return (
    <Styled.Background>
      {isEditingProfile && isMyProfile && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <form
            onSubmit={HandleEditProfile}
            style={{
              background: '#1c1c1c',
              padding: '30px',
              borderRadius: '15px',
              width: '400px',
              boxShadow: '0 0 20px #48ff3b',
              color: 'white'
            }}
          >
            <h3 style={{ marginBottom: '20px', color: '#48ff3b' }}>
              Editar Perfil
            </h3>

            {error && (
              <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>
            )}

            <div style={{ marginBottom: '15px' }}>
              <label>Nome de Exibição:</label>
              <input
                type="text"
                name="display_name"
                value={profileFormData.display_name}
                onChange={handleProfileFormChange}
                placeholder="Novo Nome de Exibição"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px',
                  border: 'none',
                  marginTop: '5px',
                  background: '#333',
                  color: 'white'
                }}
              />
            </div>

            <h4
              style={{
                margin: '20px 0 10px',
                borderTop: '1px solid #48ff3b33',
                paddingTop: '10px'
              }}
            >
              Mudar Senha (opcional)
            </h4>

            <div style={{ marginBottom: '15px' }}>
              <label>Senha Antiga:</label>
              <input
                type="password"
                name="old_password"
                value={profileFormData.old_password}
                onChange={handleProfileFormChange}
                placeholder="Sua senha atual"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px',
                  border: 'none',
                  marginTop: '5px',
                  background: '#333',
                  color: 'white'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label>Nova Senha:</label>
              <input
                type="password"
                name="new_password"
                value={profileFormData.new_password}
                onChange={handleProfileFormChange}
                placeholder="Nova senha"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px',
                  border: 'none',
                  marginTop: '5px',
                  background: '#333',
                  color: 'white'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>Confirmação da Nova Senha:</label>

              <input
                type="password"
                name="new_password2"
                value={profileFormData.new_password2}
                onChange={handleProfileFormChange}
                placeholder="Confirme a nova senha"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px',
                  border: 'none',
                  marginTop: '5px',
                  background: '#333',
                  color: 'white'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: '10px 20px',
                background: '#48ff3b',
                color: '#1c1c1c',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginRight: '15px'
              }}
            >
              Salvar
            </button>

            <button
              type="button"
              onClick={() => {
                setIsEditingProfile(false)
                setError('')
                setProfileFormData((prev) => ({
                  ...prev,
                  old_password: '',
                  new_password: '',
                  new_password2: ''
                }))
              }}
              style={{
                padding: '10px 20px',
                background: '#555',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      <Styled.BackgroundFeed
        style={{
          justifyContent: 'center',
          height: 'auto',
          minHeight: '100vh',
          overflowY: 'auto',
          display: 'block'
        }}
      >
        <h1
          onClick={() => navigate('/feed')}
          style={{ cursor: 'pointer', marginBottom: '40px' }}
        >
          <img src={Logo} alt="Logo" style={{ maxWidth: '20px' }} />
          Peridot .
        </h1>
        <button
          onClick={() => navigate('/feed')}
          type="button"
          style={{
            color: '#ffffff',
            marginBottom: '20px',
            marginLeft: '30px',
            background: 'linear-gradient(#0a4500, #77ff7aa5)',
            borderRadius: '20px',
            padding: '5px',
            border: '1px solid #0000',
            cursor: 'pointer'
          }}
        >
          Voltar
        </button>
        <Styled.FeedCamp style={{ maxWidth: '800px', margin: '0 20px' }}>
          <div
            style={{
              padding: '30px',
              height: '300px',
              marginBottom: '30px',
              borderRadius: '20px',
              background: 'linear-gradient(#b7ff7c67, #b7ff7c21)',
              border: '1px solid #bdffbb7f'
            }}
          >
            {loading ? (
              <p style={{ textAlign: 'center' }}>Carregando perfil...</p>
            ) : (
              <>
                <div
                  className="profileCamp"
                  style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
                >
                  {isMyProfile && (
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={HandleProfilePictureUpload}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />
                  )}

                  <img
                    className="ProfilePic"
                    src={userData?.profile_picture || ProfilePlaceholder}
                    alt="Foto de perfil"
                    onClick={handlePictureClick}
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '50%',
                      border: '3px solid #48ff3b',
                      cursor: isMyProfile ? 'pointer' : 'default',
                      objectFit: 'cover'
                    }}
                  />

                  <div>
                    <h2 className="profileName">
                      {userData?.display_name || 'Usuário'}
                    </h2>

                    <h3 style={{ opacity: 0.7 }}>
                      @{userData?.username || 'Carregando...'}
                    </h3>
                  </div>
                </div>

                <div
                  className="profileButtons"
                  style={{
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '30px',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                >
                  <p
                    onClick={() =>
                      userData && fetchFollowList('followers', userData.id)
                    }
                    style={{ cursor: userData ? 'pointer' : 'default' }}
                  >
                    Seguidores:
                    <strong>{userData?.followers_count ?? 0}</strong>
                  </p>

                  <p
                    onClick={() =>
                      userData && fetchFollowList('following', userData.id)
                    }
                    style={{ cursor: userData ? 'pointer' : 'default' }}
                  >
                    Seguindo: <strong>{userData?.following_count ?? 0}</strong>
                  </p>

                  {userData && (
                    <button
                      onClick={
                        isMyProfile
                          ? () => setIsEditingProfile(true)
                          : handleFollowToggle
                      }
                      disabled={loading}
                      style={{
                        all: 'unset',
                        cursor: 'pointer',
                        color: '#ffffff',
                        border: '1px solid #222',
                        padding: '12px 20px',
                        background: isMyProfile
                          ? 'linear-gradient(#b7e4b75a,#43ef0435)'
                          : userData.is_following
                          ? 'linear-gradient(#ff5e5e5a,#f0000035)'
                          : 'linear-gradient(#b7e4b75a,#43ef0435)',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        transition: 'background 0.3s'
                      }}
                    >
                      {isMyProfile
                        ? 'Editar Perfil'
                        : userData.is_following
                        ? 'Deixar de Seguir'
                        : 'Seguir'}
                    </button>
                  )}
                  {showListModal && (
                    <div
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                      }}
                    >
                      <div
                        style={{
                          background: '#1c1c1c',
                          padding: '20px',
                          borderRadius: '15px',
                          width: '400px',
                          maxHeight: '80vh',
                          overflowY: 'auto',
                          boxShadow: '0 0 20px #48ff3b',
                          color: 'white'
                        }}
                      >
                        <h3 style={{ marginBottom: '20px', color: '#48ff3b' }}>
                          {listType === 'followers' ? 'Seguidores' : 'Seguindo'}{' '}
                          de {userData?.display_name || 'Usuário'}
                        </h3>

                        {listLoading ? (
                          <p style={{ textAlign: 'center' }}>
                            Carregando lista...
                          </p>
                        ) : listUsers.length > 0 ? (
                          listUsers.map((user) => (
                            <div
                              key={user.id}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: '10px',
                                padding: '10px',
                                borderBottom: '1px solid #333',
                                cursor: 'pointer'
                              }}
                              onClick={() => {
                                setShowListModal(false)
                                navigate(`/users/${user.id}`)
                              }}
                            >
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px'
                                }}
                              >
                                <img
                                  src={
                                    user.profile_picture
                                      ? BASE_URL + user.profile_picture
                                      : ProfilePlaceholder
                                  }
                                  alt={`Foto de ${user.username}`}
                                  style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                  }}
                                />
                                <div>
                                  <p style={{ fontWeight: 'bold' }}>
                                    {user.display_name}
                                  </p>
                                  <small style={{ opacity: 0.7 }}>
                                    @{user.username}
                                  </small>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p style={{ textAlign: 'center' }}>
                            {listType === 'followers'
                              ? 'Ninguém segue este usuário.'
                              : 'Este usuário não segue ninguém.'}
                          </p>
                        )}

                        <button
                          onClick={() => setShowListModal(false)}
                          style={{
                            padding: '10px 20px',
                            background: '#555',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            marginTop: '20px',
                            display: 'block',
                            width: '100%'
                          }}
                        >
                          Fechar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <h2
            style={{
              marginBottom: '20px',
              textAlign: 'center',
              color: '#f4ffe9ff'
            }}
          >
            Postagens de {userData?.display_name || 'Usuário'}
          </h2>

          {error && (
            <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
          )}

          {userPosts.length > 0 ? (
            userPosts.map((post) => (
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
                {isMyProfile && (
                  <div style={{ marginBottom: '5px', textAlign: 'right' }}>
                    <button
                      onClick={() => {
                        setEditingPostId(post.id)
                        setEditingPostContent(post.content)
                      }}
                      style={{
                        all: 'unset',
                        cursor: 'pointer',
                        marginRight: '20px',
                        color: '#00cc00'
                      }}
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => HandleDeletePost(post.id)}
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

                <div className="postAuthorProfile">
                  <img
                    src={post.author.profile_picture || ProfilePlaceholder}
                    alt={`Foto de ${post.author.username}`}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      objectFit: 'cover'
                    }}
                  />

                  <h4 style={{ fontSize: '23px' }}>{post.author.username}</h4>
                </div>

                <div>
                  <small>
                    {new Date(post.created_at).toLocaleDateString('pt-BR')}
                  </small>
                </div>

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

                {editingPostId === post.id && isMyProfile ? (
                  <div>
                    <textarea
                      value={editingPostContent}
                      onChange={(e) => setEditingPostContent(e.target.value)}
                      style={{
                        width: '100%',
                        minHeight: '100px',
                        marginBottom: '10px',
                        padding: '10px',
                        borderRadius: '5px',
                        resize: 'none',
                        color: 'black',
                        backgroundColor: '#e0ffe0'
                      }}
                    />

                    <button
                      onClick={() => HandleUpdatePost(post.id)}
                      style={{
                        marginTop: '12px',
                        background:
                          'linear-gradient(#11ff00ce, #005c00, #0e471e57)',
                        color: '#ffffff',
                        padding: '5px 10px',
                        fontWeight: '600',
                        border: '1px solid #ffffff20',
                        borderRadius: '20px',
                        marginRight: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      Salvar Edição
                    </button>

                    <button
                      onClick={() => setEditingPostId(null)}
                      style={{
                        background:
                          'linear-gradient(#ff0000ce, #5c0000, #470e0e56)',
                        color: '#ffffff',
                        padding: '5px 10px',
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
                  <Styled.PostContent>{post.content}</Styled.PostContent>
                )}

                <div
                  className="containerPostButtons"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '15px'
                  }}
                >
                  <button
                    onClick={() => handleLikeToggle(post.id, post.is_liked)}
                    style={{
                      backgroundColor: 'transparent',
                      padding: '0',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <p style={{ color: '#48ff3b', marginRight: '5px' }}>
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

                  <button
                    onClick={() => HandleComments(post.id)}
                    style={{
                      backgroundColor: 'transparent',
                      padding: '0',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <p style={{ color: '#48ff3b', marginRight: '5px' }}>
                      {post.comments_count}
                    </p>

                    <img
                      src={CommentButton}
                      alt="Comment Button"
                      style={{ width: '30px', filter: 'brightness(1)' }}
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#f4ffe9ff' }}>
              {isMyProfile
                ? 'Você ainda não fez nenhuma postagem.'
                : `${
                    userData?.display_name || 'Este usuário'
                  } ainda não fez nenhuma postagem.`}
            </p>
          )}
        </Styled.FeedCamp>
      </Styled.BackgroundFeed>
    </Styled.Background>
  )
}

export default Profile
