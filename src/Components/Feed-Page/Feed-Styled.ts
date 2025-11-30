import styled from 'styled-components'
import backgroundFeed from '../../images/FeedBackgrond.jpg'

export const Background = styled.div`
  background-image: url('${backgroundFeed}');
  background-color: #000;
  background: radial-gradient(circle at 50% 30%, #0a3a0a 0%, #000000 70%);
  min-height: 100vh;
  background-attachment: fixed;
`
export const SearchCampMobile = styled.div`
  display: none;
  @media (min-width: 320px) and (max-width: 1610px) {
    display: block;
    height: 250px;
    margin-bottom: 20px;
    h3 {
      text-align: center;
      margin-bottom: 12px;
    }
    ul {
      display: flex;
    }

    input {
      display: block;
      margin: 0 auto;
      height: 2vh;
      padding: 12px;
      border-radius: 10px;
      border: 1px solid #ffeeee11;
      background-color: #f3fdedff;
    }
    .mbLike {
      margin-top: 40px;
      margin-bottom: 200px;
      max-height: 200px;

      img {
        max-width: 30px;
        max-height: 30px;
        margin-left: 12px;
        border-radius: 12px;
        margin-top: 12px;
      }

      h5 {
        margin-bottom: 20px;
        padding-bottom: 12px;
        text-align: center;
      }

      h4 {
        margin-left: 12px;
        width: 10px;
      }

      ul {
        list-style: none;
        margin-top: 10px;
      }
    }
  }
`

export const BackgroundFeed = styled.div`
  color: #ffffffff;
  position: relative;
  justify-self: center;
  display: flex;
  min-height: 100vh;
  height: auto;
  background-size: cover;
  background-repeat: repeat-y;
  padding-top: 20px;
  h1 {
    margin-left: 5vh;
    img {
      max-width: 50px;
      max-height: 30px;
    }
  }
  @media (min-width: 320px) and (max-width: 767px) {
    max-width: 300px;
    margin: 0 auto;
  }
`
export const ImageUpload = styled.button`
  bottom: 10px;
  left: 10px;
  background: linear-gradient(#5e2afcc2, #c2cbff4d);
  border-radius: 10px;
  padding: 6px 8px;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
  border: none;
  font-size: 18px;
  margin-bottom: 18px;
`
export const PostArea = styled.div`
  margin: 0 auto;
  justify-items: center;
  .logoMobile {
    display: none;
  }
  h3 {
    text-align: center;
  }

  .postarea {
    display: inline-flex;
    align-items: center;
    gap: 12px;

    .blocl {
      display: block;
      max-width: 20px;
    }
  }

  textarea {
    resize: none;
    width: 70vh;
    margin-top: 10px;
    height: 10vh;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #b1ffb12d;
    background: linear-gradient(#f3fdedff, #f3fdeda7);
  }
  @media (min-width: 320px) and (max-width: 1023px) {
    .postarea {
      .blocl {
        display: flex;
        max-width: 300px;

        button {
          margin: 0 auto;
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1384px) {
    max-width: 400px;
    .postarea {
      display: block;

      button {
        display: flex;
        margin: 0 auto;
        justify-self: center;
      }
    }
    textarea {
      width: 300px;
    }
  }
  @media (min-width: 320px) and (max-width: 1023px) {
    max-width: 300px;
    margin: 0 auto;
    .logoMobile {
      display: block;
      margin: 0 auto;
      margin-bottom: 40px;
    }
    .mtopMobile {
      h3 {
      }
    }
    .postarea {
      display: block;
      button {
        display: flex;
        margin: 0 auto;
        justify-self: center;
      }
    }
    textarea {
      width: 300px;
    }
  }
`
export const MenuArea = styled.div`
  display: block;
  position: fixed;
  margin-right: 20vh;
  height: 100vh;
  left: 0;
  margin-left: 20vh;

  h1 {
    cursor: 'pointer';
  }
  @media (min-width: 1240px) and (max-width: 1480px) {
    margin-left: 2vh;
  }
  @media (min-width: 1024px) and (max-width: 1384px) {
    margin-left: 0;
    margin-right: 1vh;
  }
  @media (min-width: 320px) and (max-width: 1023px) {
    display: none;
  }
`
export const MenuOptions = styled.ul`
  margin-left: 5vh;
  margin-top: 30px;
  list-style: none;
  background: linear-gradient(
    rgba(166, 255, 122, 0.49),
    rgba(86, 255, 1, 0.51)
  );
  border-radius: 20px;
  border: 1px solid #d0ffcbae;
  padding: 20px;
  li {
    text-decoration: none;
    margin-bottom: 15px;

    a {
      text-decoration: none;
      color: #f4ffe9ff;
    }
  }
`
export const MenuProfile = styled.div`
  display: flex;
  gap: 12px;

  img {
    max-width: 50px;
    border-radius: 100%;
    max-height: 50px;
  }
  @media (min-width: 768px) and (max-width: 1384px) {
    gap: 2;
    display: block;
  }
`
export const UserName = styled.a`
  color: #c3ff00;
`

export const SearchCamp = styled.div`
  margin-left: 20vh;
  margin-right: 20vh;
  margin-top: 20px;
  display: block;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  h3 {
    text-align: center;
    margin-bottom: 12px;
  }

  input {
    height: 2vh;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #ffeeee11;
    background-color: #f3fdedff;
  }
  .mbLike {
    margin-top: 40px;

    img {
      max-width: 30px;
      max-height: 30px;
      margin-left: 12px;
      border-radius: 12px;
      margin-top: 12px;
    }

    h5 {
      margin-bottom: 20px;
      padding-bottom: 12px;
      text-align: center;
    }

    h4 {
      margin-left: 12px;
      width: 10px;
    }

    ul {
      list-style: none;
      margin-top: 10px;
    }
  }

  @media (min-width: 320px) and (max-width: 1610px) {
    display: none;
  }
`
export const SuggestCamp = styled.div`
  padding: 2px;
  a {
    text-decoration: none;
    color: aliceblue;
  }
  li {
    margin-bottom: 20px;
    background: linear-gradient(#b7ff7c21, #71f50554);
    border-radius: 20px;
    border: 1px solid #bdffbb7f;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    display: none;
  }
`
export const PostContainer = styled.div`
  border: 1px solid #bdffbb7f;
  border-radius: 20px;
  padding: 12px;
  margin-bottom: 20px;
  background: linear-gradient(#b7ff7c67, #b7ff7c21);
`
export const ProfilePicture = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 10px;
`

export const FeedCamp = styled.div`
  width: 700px;
  margin: 20px auto;
  .feedPosts {
    margin-bottom: 220px;
  }
  .postAuthorProfile {
    display: inline-flex;
    gap: 12px;
    margin-bottom: 20px;
    align-items: center;
  }
  .likeContainer {
    align-items: center;
  }
  .containerPostButtons {
    margin-top: 20px;
    display: flex;
    text-align: center;
    max-height: fit-content;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    width: 300px;
  }
  @media (min-width: 935px) and (max-width: 1024px) {
    width: 500px;
  }
  @media (min-width: 1024px) and (max-width: 1140px) {
    width: 590px;
  }
  @media (min-width: 1140px) and (max-width: 1425px) {
    width: 600px;
  }
`
export const PostButton = styled.button`
  background-color: transparent;
  width: fit-content;
  bottom: 10px;
  left: 10px;
  background: linear-gradient(#2eff2ed4, #0960092b);
  border-radius: 10px;
  padding: 6px 8px;
  cursor: pointer;
  font-weight: 600;
  color: #fff;
  border: 1px solid #333;
  font-size: 18px;
  img {
    max-width: 40px;
  }
  &:hover {
    filter: brightness(2);
    cursor: pointer;
  }
`
export const PostContent = styled.p`
  word-wrap: break-word;
  font-size: 20px;
  width: 600px;
  border-radius: 20px;
  font-weight: 500;
  padding: 40px;
  color: #000;
  border: 2px solid #777777ff;
  background: linear-gradient(#f0ffe1d0, #f0ffe197);
  margin: 20px;
  font-family: Arial, Helvetica, sans-serif;

  a {
    color: #007bff;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: #0056b3;
    }
  }
  @media (min-width: 320px) and (max-width: 1424px) {
    width: 90%;
  }
`
export const SelectedImagePreviewContainer = styled.div`
  margin-top: 10px;
`

export const SelectedImagePreview = styled.img`
  width: 100px;
  border-radius: 10px;
`

export const PostActions = styled.div`
  margin-bottom: 20px;
`

const BaseButton = styled.button`
  color: #ffffff;
  padding: 5px;
  font-weight: 600;
  border: 1px solid #ffffff20;
  border-radius: 20px;
  cursor: pointer;
`

export const EditPostButton = styled(BaseButton)`
  background: linear-gradient(#11ff00ce, #005c00, #0e471e57);
  margin-right: 12px;
`

export const DeletePostButton = styled(BaseButton)`
  background: linear-gradient(#ff0000ce, #5c0000, #470e0e56);
`

export const PostAuthorProfile = styled.div.attrs({
  className: 'postAuthorProfile'
})`
  cursor: pointer;
`

export const AuthorUsername = styled.h4`
  font-size: 23px;
  cursor: pointer;
`

export const EditingPostTextarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  resize: none;
`

export const SaveEditButton = styled(BaseButton)`
  margin-right: 10px;
  background: linear-gradient(#11ff00ce, #005c00, #0e471e57);
  margin-bottom: 20px;
`

export const CancelEditButton = styled(BaseButton)`
  background: linear-gradient(#ff0000ce, #5c0000, #470e0e56);
`

export const PostImage = styled.img`
  display: flex;
  width: fit-content;
  max-width: 600px;
  border-radius: 10px;
  margin-top: 10px;
  margin: 0 auto;
  @media (min-width: 320px) and (max-width: 767px) {
    width: 250px;
  }
`

export const PostButtonsContainer = styled.div.attrs({
  className: 'containerPostButtons'
})`
  margin-top: 20px;
  display: flex;
  text-align: center;
  max-height: fit-content;
`

export const InteractionButton = styled.button`
  background-color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  display: flex;
  margin: 0 auto;
  align-items: center;
`

export const LikeCount = styled.p`
  color: #48ff3b;
  margin-right: 10px;
`

export const CommentCount = styled.p`
  color: #48ff3b;
  margin-right: 10px;
`

export const LikeIcon = styled.img<{ $isLiked: boolean }>`
  width: 30px;
  filter: ${({ $isLiked }) => ($isLiked ? 'brightness(2)' : 'grayscale(60%)')};
`

export const CommentIcon = styled.img`
  width: 30px;
  filter: brightness(1);
`

export const SearchResultsOverlay = styled.div`
  position: fixed;
  top: 110px;
  right: 0;
  width: 25vw;
  height: 50vh;
  background-color: rgba(0, 0, 0, 0.95);
  color: #fff;
  border-radius: 20px;
  border: 1px solid #fff6f6c0;
  overflow-y: auto;
  padding: 40px;
  z-index: 100;
`

export const SearchSectionTitle = styled.h4`
  margin-bottom: 10px;
`

export const SearchList = styled.ul`
  list-style: none;
`

export const SearchListItem = styled.li`
  cursor: pointer;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  @media (min-width: 320px) and (max-width: 1023px) {
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }
`

export const SearchResultImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  cursor: pointer;
  border-radius: 20px;
  margin-bottom: 10px;
  margin-left: 20%;
  margin-top: 20px;
  @media (min-width: 320px) and (max-width: 1023px) {
    display: block;
    margin: 0 auto;
    max-width: 200px;
    max-height: 200px;
  }
`

export const UserInfo = styled.div`
  margin-left: 0;
  padding-right: 30px;
`

export const UserDisplayName = styled.strong`
  display: block;
  width: fit-content;
`

export const UserNameSearch = styled.small`
  display: block;
`

export const PostAuthorImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  cursor: pointer;
  border-radius: 20px;
  margin-bottom: 10px;
`

export const PostInfo = styled.div``

export const PostAuthorUsername = styled.strong`
  display: block;
  margin-left: 10px;
`

export const PostSnippet = styled.p`
  display: block;
  margin-left: 40px;
  margin-top: 30px;
  font-size: 24px;
`

export const SuggestedPostProfilePicture = styled.img`
  width: 24px;
  height: 24px;
`
export const MenuProfileMobile = styled.div`
  @media (min-width: 320px) and (max-width: 1023px) {
    position: fixed;
    top: 0;
    right: 0;
    display: block;
    font-weight: 700;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      rgba(87, 194, 34, 0.9),
      rgba(32, 122, 11, 0.61)
    );
    gap: 12px;
    padding: 10px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    img {
      max-width: 50px;
      max-height: 50px;
      border-radius: 100%;
    }
    ul,
    li {
      list-style: none;
      a {
        color: #ffffffff;
        text-decoration: none;
      }
    }
  }
`

export const MenuOptionsMobile = styled.div`
  display: none;
  @media (min-width: 320px) and (max-width: 1023px) {
    z-index: 999;
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(rgba(87, 194, 34, 0.9), rgba(0, 0, 0, 0.61));
    gap: 12px;
    padding: 10px;
    width: 100%;
    border-top-left-radius: 15px;
    font-weight: 700;

    img {
      max-width: 50px;
      max-height: 50px;
      border-radius: 20px;
    }

    ul,
    li {
      list-style: none;
      a {
        color: #fcfcfcff;
        margin-right: 20px;
        text-decoration: none;
      }
    }
  }
`
export const SearchResultsOverlayMobile = styled.div`
  display: none;

  @media (min-width: 320px) and (max-width: 1610px) {
    display: block;
    position: fixed;
    top: 160px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: auto;
    max-height: 60vh;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.95);
    color: #fff;
    padding: 16px;
    border-radius: 10px;
    border: 1px solid #fff6f6c0;
  }
`

export const SearchSectionTitleMobile = styled.h4`
  margin-bottom: 10px;
`

export const SearchListMobile = styled.ul`
  list-style: none;
`
export const SuggestCampMobile = styled.div`
  display: none;
  @media (min-width: 320px) and (max-width: 1610px) {
    height: fit-content;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 12px;
    margin: 0 auto;
    .postSugestContainer {
      display: flex;
      list-style: none;
      height: fit-content;
    }
    a {
      text-decoration: none;
      color: aliceblue;
    }
    li {
      text-align: center;
      margin-right: 1px;
      margin-bottom: 20px;
      background: linear-gradient(#b7ff7c21, #71f50554);
      border-radius: 20px;
      border: 1px solid #bdffbb7f;
    }
  }
`
export const SearchListItemMobile = styled.li`
  cursor: pointer;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  @media (min-width: 320px) and (max-width: 1023px) {
    flex-direction: column;
    text-align: center;
    justify-content: center;
  }
`
export const SearchResultImageMobile = styled.img`
  max-width: 200px;
  max-height: 200px;
  cursor: pointer;
  border-radius: 20px;
  margin-bottom: 10px;
  margin-left: 20%;
  margin-top: 20px;
  @media (min-width: 320px) and (max-width: 1023px) {
    display: block;
    margin: 0 auto;
    max-width: 200px;
    max-height: 200px;
  }
`
export const UserInfoMobile = styled.div`
  margin-left: 0;
  padding-right: 30px;
`
export const UserDisplayNameMobile = styled.strong`
  display: block;
  background-color: red;
`

export const UserNameSearchMobile = styled.small`
  display: block;
`
export const PostAuthorImageMobile = styled.img`
  max-width: 100px;
  max-height: 100px;
  cursor: pointer;
  border-radius: 20px;
  margin-bottom: 10px;
`
export const PostInfoMobile = styled.div``

export const PostAuthorUsernameMobile = styled.strong`
  display: block;
  margin-left: 10px;
`

export const PostSnippetMobile = styled.p`
  display: block;
  margin-left: 40px;
  margin-top: 30px;
  font-size: 24px;
`

export const SuggestedPostProfilePictureMobile = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 20px;
  margin-top: 20px;
`
