import styled from 'styled-components'
import Background from '../../images/Background.jpg'

export const BackgroundStyled = styled.div`
  background-image: url(${Background});
  background-size: cover;
  min-height: 100vh;
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
  width: 70vw;
  h1 {
    margin-top: 6vh;
  }
  img {
    width: 200px;
    max-height: 200px;
  }
`
export const FormStyled = styled.div`
  margin-left: 150px;
  margin-top: 20px;
  display: block;
  width: 40px;
  color: #2f2f2fff;
  font-size: 20px;
  font-weight: bold;
  input {
    margin-bottom: 15px;
    border: 1px solid #000;
    border-radius: 20px;
    height: 25px;
    padding: 12px;
    font-size: 12px;
    background: linear-gradient(#ffffff5d, #ffffffff, #ffffffde);
  }
`
export const FormButtonStyled = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 12px;

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
