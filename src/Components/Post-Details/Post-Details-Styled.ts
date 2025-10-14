import styled from 'styled-components'
import backgroundFeed from '../../images/FeedBackgrond.jpg'

export const Background = styled.div`
  background-color: #000;
  background-image: url('${backgroundFeed}');
`

export const BackgroundFeed = styled.div`
  color: #ffffffff;
  display: flex;
  min-height: 100vh;
  background-image: url('${backgroundFeed}');
  background-size: cover;
  padding-top: 20px;
  h1 {
    margin-left: 5vh;
    img {
      max-width: 50px;
      max-height: 30px;
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
`
export const MenuArea = styled.div`
  display: block;
  margin-right: 20vh;
  margin-left: 20vh;
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
`

export const SearchCamp = styled.div`
  margin-left: 20vh;
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
export const PostContent = styled.div`
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
