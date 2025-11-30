import React from 'react'
import * as Styled from './Feed-Styled'
import { useNavigate } from 'react-router-dom'
import { Post } from './types'

import ProfilePlaceholder from '../../images/Peridot-Logo-fundo.jpeg'
import LikeOn from '../../images/LikeOn.png'
import CommentButton from '../../images/CommentButton.png'

interface FeedPostProps {
  post: Post
  currentUserId?: number
  isEditing: boolean
  editingContent: string
  setEditingContent: (val: string) => void
  onEditStart: () => void
  onSaveEdit: (id: number) => void
  onCancelEdit: () => void
  onDelete: (id: number) => void
  onLike: (id: number) => void
  onComment: (id: number) => void
}

const FeedPost: React.FC<FeedPostProps> = ({
  post,
  currentUserId,
  isEditing,
  editingContent,
  setEditingContent,
  onEditStart,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  onLike,
  onComment
}) => {
  const navigate = useNavigate()

  return (
    <Styled.PostContainer>
      {currentUserId === post.author.id && (
        <Styled.PostActions>
          <Styled.EditPostButton onClick={onEditStart}>
            Editar
          </Styled.EditPostButton>

          <Styled.DeletePostButton onClick={() => onDelete(post.id)}>
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
          <Styled.ProfilePicture src={ProfilePlaceholder} alt="Placeholder" />
        )}

        <Styled.AuthorUsername>
          {post.author.display_name}
          <h5
            style={{ color: '#c3ff00' }}
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/users/${post.author.id}`)
            }}
            className="DisplayName"
          >
            @{post.author.username || 'Carregando...'}
          </h5>
        </Styled.AuthorUsername>
      </Styled.PostAuthorProfile>

      <div>
        <small>{new Date(post.created_at).toLocaleDateString()}</small>
      </div>

      {isEditing ? (
        <div>
          <Styled.EditingPostTextarea
            value={editingContent}
            onChange={(e) => setEditingContent(e.target.value)}
          />

          <Styled.SaveEditButton onClick={() => onSaveEdit(post.id)}>
            Salvar Edição
          </Styled.SaveEditButton>

          <Styled.CancelEditButton onClick={onCancelEdit}>
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
              : `https://georgebks.pythonanywhere.com${post.image}`
          }
          alt="Imagem da postagem"
        />
      )}

      <Styled.PostButtonsContainer>
        <Styled.InteractionButton onClick={() => onLike(post.id)}>
          <Styled.LikeCount>{post.likes_count}</Styled.LikeCount>
          <Styled.LikeIcon
            $isLiked={post.is_liked}
            src={LikeOn}
            alt="Like button"
          />
        </Styled.InteractionButton>

        <Styled.InteractionButton onClick={() => onComment(post.id)}>
          <Styled.CommentCount>{post.comments_count}</Styled.CommentCount>
          <Styled.CommentIcon src={CommentButton} alt="Comment Button" />
        </Styled.InteractionButton>
      </Styled.PostButtonsContainer>
    </Styled.PostContainer>
  )
}

export default FeedPost
