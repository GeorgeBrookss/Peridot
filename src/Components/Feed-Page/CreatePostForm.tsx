import React, { useRef } from 'react'
import * as Styled from './Feed-Styled'

interface CreatePostFormProps {
  content: string
  setContent: (value: string) => void
  selectedImage: File | null
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  content,
  setContent,
  selectedImage,
  onImageChange,
  onSubmit
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <form onSubmit={onSubmit}>
      <div className="postarea">
        <textarea
          placeholder="Digite seu mais novo pensamento!"
          name="Post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="blocl">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={onImageChange}
          />

          <Styled.ImageUpload
            type="button"
            onClick={() => fileInputRef.current?.click()}
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
  )
}

export default CreatePostForm
