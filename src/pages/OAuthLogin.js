import React from 'react';
import { useMagicContext } from '../context/magic_context'; 
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/user_context';

import fruitBasketImg from '../assets/basket.jpg';
import googleLogo from '../assets/google.png';
import appleLogo from '../assets/apple.png';
import facebookLogo from '../assets/facebook.png';

const OAuthLogin = () => {
  const { login } = useMagicContext();
  const { myUser } = useUserContext();

  const handleLogin = async (provider) => {
    console.log(`Login button clicked for provider: ${provider}`); 
    try {
      await login(provider);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  if (myUser) {
    return <Navigate to="/" />;
  }

  return (
    <MainWrapper>
      <GrayBackground />
      <ContentBox>
        <ContentWrapper>
          <ButtonWrapper>
            <h3>
              Iniciar Sesión
            </h3>
            <ButtonGoogle onClick={() => handleLogin('google')}>
              <ButtonImage src={googleLogo} alt="Google Logo" />
              Continuar con Google
            </ButtonGoogle>
            <ButtonApple onClick={() => handleLogin('apple')}>
              <ButtonImage src={appleLogo} alt="Apple Logo" />
              Continuar con Apple
            </ButtonApple>
            <ButtonFacebook onClick={() => handleLogin('facebook')}>
              <ButtonImage src={facebookLogo} alt="Facebook Logo" />
              Continuar con Facebook
            </ButtonFacebook>
          </ButtonWrapper>
          <ImageWrapper>
            <FruitBasketImage src={fruitBasketImg} alt="Canasta de frutas" />
          </ImageWrapper>
        </ContentWrapper>
      </ContentBox>
    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const GrayBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: hsl(111, 47%, 79%); /* Gris claro */
  z-index: -1;
`;

const ContentBox = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  max-width: 800px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Button = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 15px 30px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
`;

const ButtonImage = styled.img`
  width: 30px;
  height: auto;
  margin-right: 10px;
`;

const ButtonGoogle = styled(Button)`
  background-color: #db4437;
  color: #fff;

  &:hover {
    background-color: #c1351b;
  }
`;

const ButtonApple = styled(Button)`
  background-color: #000;
  color: #fff;

  &:hover {
    background-color: #333;
  }
`;

const ButtonFacebook = styled(Button)`
  background-color: #4267B2;
  color: #fff;

  &:hover {
    background-color: #365899;
  }
`;

const ImageWrapper = styled.div`
  flex: 1.5;
  display: flex;
  justify-content: center;
`;

const FruitBasketImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export default OAuthLogin;
