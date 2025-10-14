import styled from 'styled-components'
import backgroundFeed from '../../images/FeedBackgrond.jpg'

export const Background = styled.div`
  background-color: #000;
  background-image: url('${backgroundFeed}');
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
`

export const PostContent = styled.div`
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
`
