import * as Styled from './Feed-Styled'
import Logo from '../../images/Peridot-logo.png'
import ProfilePlaceholder from '../../images/Peridot-Logo-fundo.jpeg'
import LikeOn from '../../images/LikeOn.png'
import CommentButton from '../../images/CommentButton.png'
import CreatePostForm from './CreatePostForm'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { User, Post, SearchResults } from './types'
import FeedPost from './FeedPost'
import MobileFeedHeader from './MobileFeedHeader'
import RightSideBar from './RightSideBar'
import LeftSidebar from './LeftSidebar'

const Feed = () => {
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
          const feedResponse = await axios.get(
            'https://georgebks.pythonanywhere.com/api/posts/feed/',
            config
          )

          const feedPostsFromAPI: Post[] =
            feedResponse.data.results || feedResponse.data

          setFeedPosts(feedPostsFromAPI)

          axios
            .get('https://georgebks.pythonanywhere.com/api/posts/', config)
            .then((allPostsResponse) => {
              const allPostsFromAPI: Post[] =
                allPostsResponse.data.results || allPostsResponse.data

              setSuggestedPosts(allPostsFromAPI)

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
            })
            .catch((err) =>
              console.error('Erro ao carregar posts secundários:', err)
            )
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
        <LeftSidebar userData={userData} onLogout={HandleExit} />
        <div>
          <Styled.PostArea>
            <MobileFeedHeader
              userData={userData}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              showOverlay={showOverlay}
              isSearching={isSearching}
              searchResults={searchResults}
              suggestedPosts={suggestedPosts}
              onSearchFocus={handleSearchClick}
              onSearchBlur={handleBlur}
              onLogout={HandleExit}
              onComment={HandleComments}
            />
            <div className="mtopMobile">
              <h3>Novidades para você!</h3>
            </div>
            <CreatePostForm
              content={newPostContent}
              setContent={setNewPostContent}
              selectedImage={selectedImage}
              onImageChange={handleImageChange}
              onSubmit={HandleSubmitPost}
            />
          </Styled.PostArea>
          <Styled.FeedCamp>
            {Array.isArray(feedPosts) && feedPosts.length > 0 ? (
              feedPosts.slice(0, 30).map((post) => (
                <FeedPost
                  key={post.id}
                  post={post}
                  currentUserId={userData?.id}
                  isEditing={editingPostId === post.id}
                  editingContent={editingPostContent}
                  setEditingContent={setEditingPostContent}
                  onEditStart={() => {
                    setEditingPostId(post.id)
                    setEditingPostContent(post.content)
                  }}
                  onSaveEdit={HandleUpdatePost}
                  onCancelEdit={() => setEditingPostId(null)}
                  onDelete={HandleDeletePost}
                  onLike={handleLikeToggle}
                  onComment={HandleComments}
                />
              ))
            ) : (
              <p>
                Nenhuma postagem encontrada.
                <br />
                <br />
                Cheque a aba de novidades!
              </p>
            )}
          </Styled.FeedCamp>
        </div>
        <RightSideBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          showOverlay={showOverlay}
          isSearching={isSearching}
          searchResults={searchResults}
          suggestedPosts={suggestedPosts}
          onSearchFocus={handleSearchClick}
          onSearchBlur={handleBlur}
          onComment={HandleComments}
        />
      </Styled.BackgroundFeed>
    </Styled.Background>
  )
}

export default Feed
