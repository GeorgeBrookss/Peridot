import styled from 'styled-components'
import Background from '../../images/Background.jpg'

export const BackgroundStyled = styled.div`
  background-image: url(${Background});
  background-size: cover;
  min-height: 100vh;
  justify-content: center;
  justify-items: center;
  color: #fbebf5ff;
  padding-top: 20vh;

  p {
    color: 'red';
    text-align: 'center';
  }
`

export const LoginPageSection = styled.div`
  border: 1px solid #ffffff75;
  background: linear-gradient(#5ce65cc5, #5ce65c74);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  width: 600px;
  h1 {
    margin-top: 6vh;
  }
  img {
    width: 200px;
    max-height: 200px;
  }

  @media (min-width: 320px) and (max-width: 720px) {
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
export const FormStyled = styled.div`
  margin-top: 20px;
  display: block;
  width: 100px;
  color: #2f2f2fff;
  font-size: 20px;
  font-weight: bold;
  width: 200px;
  justify-content: center;

  input {
    margin-bottom: 15px;
    border: 1px solid #000;
    border-radius: 20px;
    height: 25px;
    padding: 12px;
    font-size: 12px;
    background: linear-gradient(#ffffff5d, #ffffffff, #ffffffde);
  }
  @media (min-width: 320px) and (max-width: 720px) {
    margin: 20px auto;
  }
`
export const FormButtonStyled = styled.div`
  margin-top: 20px;
  display: flex;
  padding-right: 40px;
  gap: 20px;

  input {
    border: 1px solid #000;
    border-radius: 20px;
    padding: 0 22px;
    font-size: 12px;
    font-weight: 500;
    background: linear-gradient(#ffffffff, #ffffff5d);
    &:hover {
      cursor: pointer;
      color: #5ce65cf6;
      background-color: #000;
    }
  }
`
