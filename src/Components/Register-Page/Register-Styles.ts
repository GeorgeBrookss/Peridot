import styled from 'styled-components'
import Background from '../../images/Background.jpg'

export const BackgroundRegisterStyled = styled.div`
  background-image: url(${Background});
  background-size: cover;
  min-height: 100vh;
  justify-items: center;
  color: #fbebf5ff;
  padding-top: 20vh;
`

export const RegisterPageSection = styled.div`
  border: 1px solid #d6ffc3ff;
  background-color: #5ce65cc5;
  border-radius: 40px;
  display: flex;
  width: 70vw;
  h1 {
    margin-top: 6vh;
  }
  img {
    width: 200px;
    max-height: 200px;
  }

  @media (min-width: 320px) and (max-width: 1313px) {
    max-width: 300px;
    display: block;

    img {
      width: 100px;
      max-height: 100px;
      display: block;
      margin: 0 auto;
    }

    h1 {
      margin-top: 1px;
      text-align: center;
    }

    h3 {
      text-align: center;
    }
  }
`
export const FormRegisterStyled = styled.div`
  margin-left: 150px;
  margin-top: 20px;
  display: block;
  width: 40px;
  color: #2f2f2fff;
  font-size: 20px;
  font-weight: bold;

  p {
    width: 400px;
    margin-bottom: 12px;
  }
  input {
    margin-bottom: 15px;
    border: 1px solid #000;
    border-radius: 20px;
    height: 25px;
    padding: 12px;
    font-size: 12px;
  }

  @media (min-width: 320px) and (max-width: 1313px) {
    margin-left: auto;
    margin-right: auto;
    margin: 0 auto;
    width: 90%;
    max-width: 250px;
    p {
      width: 100%;
      text-align: center;
      margin-top: 20px;
      font-size: 15px;
      margin-bottom: 12px;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      display: block;
      margin: 0 auto 15px auto;

      border: 1px solid #000;
      border-radius: 20px;
      height: 25px;
      padding: 12px;
      font-size: 12px;
    }
  }
`
export const FormRegisterButtonStyled = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 12px;

  input {
    border: 1px solid #000;
    border-radius: 20px;
    padding: 0 22px;
    font-size: 12px;
    font-weight: 500;
    &:hover {
      cursor: pointer;
      color: #5ce65cf6;
      background-color: #000;
    }
  }
  @media (min-width: 320px) and (max-width: 1313px) {
    display: block;
    margin: 0 auto;
    text-align: center;
  }
`
