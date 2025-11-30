import styled from 'styled-components'
import backgroundFeed from '../../images/FeedBackgrond.jpg'

export const Background = styled.div`
  background-image: url('${backgroundFeed}');
  background-color: #000;
  background: radial-gradient(circle at 50% 30%, #0a3a0a 0%, #000000 70%);
  min-height: 100vh;
  background-attachment: fixed;
`

export const BackgroundFeed = styled.div`
  color: #ffffffff;
  display: flex;
  min-height: 100vh;
  background-size: cover;
  padding-top: 20px;
  overflow-x: hidden;

  .LogoMobile {
    display: none;
  }
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

    .LogoMobile {
      margin: 0;
      text-align: center;
      display: block;
      margin-bottom: 20px;
      img {
        max-width: 50px;
        max-height: 30px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1384px) {
    .LogoMobile {
      display: none;
    }
  }
`

export const PostArea = styled.form`
  justify-content: center;
  justify-self: center;
  margin: 0 auto;
  justify-items: center;
  h3 {
    text-align: center;
  }

  .postarea {
    display: inline-flex;
    align-items: center;
    gap: 12px;
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
  @media (min-width: 320px) and (max-width: 767px) {
    max-width: 300px;
    margin: 0 auto;
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
  margin-right: 5vh;
  margin-left: 30vh;

  @media (min-width: 1240px) and (max-width: 1480px) {
    margin-left: 2vh;
  }
  @media (min-width: 1024px) and (max-width: 1384px) {
    margin-left: 0;
    margin-right: 1vh;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    margin-left: 0;
    margin-right: 8vh;
  }
  @media (min-width: 320px) and (max-width: 767px) {
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
    border-radius: 10px;
    max-height: 50px;
  }
  @media (min-width: 768px) and (max-width: 1384px) {
    gap: 2;
    display: block;
  }
`

export const SearchCamp = styled.div`
  margin-right: 25vh;
  margin-left: 1vh;
  display: block;
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
  @media (min-width: 1140px) and (max-width: 1425px) {
    margin-left: 0;
    width: 150px;

    input {
      width: 150px;
    }
  }
  @media (min-width: 768px) and (max-width: 1384px) {
    margin-left: 2vh;
    margin-right: 1px;
    width: 100px;

    input {
      padding: 12px;
      border-radius: 10px;
      border: 1px solid #ffeeee11;
      background-color: #f3fdedff;
      width: 150px;
    }

    .mbLike {
      li {
        max-height: fit-content;
        font-size: 10px;
        padding: 2px;
        width: 150px;
      }

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
  @media (min-width: 320px) and (max-width: 767px) {
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
export const FeedCamp = styled.div`
  max-width: 700px;
  margin-top: 20px;
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

  h4 {
  }

  @media (min-width: 768px) and (max-width: 934px) {
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
  img {
    max-width: 40px;
  }
  &:hover {
    filter: brightness(2);
    cursor: pointer;
  }
`
export const PostContent = styled.p`
  font-size: 20px;
  border-radius: 20px;
  font-weight: 500;
  padding: 40px;
  color: #000;
  border: 2px solid #777777ff;
  background: linear-gradient(#f0ffe1d0, #f0ffe197);
  margin: 20px;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 12px;
  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  hyphens: auto;

  p {
    margin-bottom: 10px;
  }
`
export const CommentButton = styled.button`
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
