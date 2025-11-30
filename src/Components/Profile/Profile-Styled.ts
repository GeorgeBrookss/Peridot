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
  position: relative;
  justify-self: center;
  display: flex;
  min-height: 100vh;
  height: auto;
  background-size: cover;
  background-repeat: repeat-y;
  padding-top: 20px;

  @media (min-width: 320px) and (max-width: 767px) {
    h1 {
      margin-left: 2vh;
    }
  }
`

export const FeedCamp = styled.div`
  width: 700px;
  margin: 20px auto;
  .postAuthorProfile {
    display: inline-flex;
    gap: 12px;
    margin-bottom: 20px;
    align-items: center;
  }
  .containerPostButtons {
    margin-top: 20px;
    display: flex;
    text-align: center;
    max-height: fit-content;
  }

  @media (min-width: 320px) and (max-width: 767px) {
    max-width: 500px;
    width: 300px;

    .profileCamp {
      .profileName {
        font-size: 20px;
        max-width: 250px;
      }
      h3 {
        color: #8dff02ee;
        max-width: 250px;
        font-size: 15px;
      }
    }
    .ProfilePic {
      max-width: 100px;
      max-height: 100px;
    }
    .profileButtons {
      flex-direction: column;
    }
    .postAuthorProfile {
      display: inline-flex;
      gap: 12px;
      margin-bottom: 20px;
      align-items: center;
      max-width: 300px;
    }
  }
`

export const PostContent = styled.div`
  font-size: 20px;
  width: 100%;
  max-width: 600px;
  border-radius: 20px;
  font-weight: 500;
  padding: 40px;
  color: #000;
  border: 2px solid #777777ff;
  background: linear-gradient(#f0ffe1d0, #f0ffe197);
  margin: 20px auto;
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;

  word-break: break-word;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
  hyphens: auto;

  @media (min-width: 320px) and (max-width: 767px) {
    max-width: 100%;
    width: auto;
    padding: 20px;
    font-size: 16px;
  }
`
