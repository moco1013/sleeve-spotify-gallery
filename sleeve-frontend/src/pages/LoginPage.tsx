import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginCard = styled.div`
  background: rgba(26, 26, 26, 0.95);
  border-radius: 24px;
  padding: 60px 40px;
  text-align: center;
  border: 1px solid rgba(29, 185, 84, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 100%;
  animation: modalSlideUp 0.6s ease;
`;

const Logo = styled.h1`
  font-size: 3.5rem;
  font-weight: 300;
  background: linear-gradient(45deg, #1DB954, #1ed760, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;

const Tagline = styled.p`
  font-size: 1.1rem;
  color: #b3b3b3;
  font-weight: 300;
  letter-spacing: 0.5px;
  margin-bottom: 40px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 40px;
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(29, 185, 84, 0.3);
  }
`;

const SpotifyIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: currentColor;
`;

const Features = styled.div`
  margin-top: 40px;
  text-align: left;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  color: #b3b3b3;
  font-size: 0.9rem;
`;

const FeatureIcon = styled.div`
  width: 8px;
  height: 8px;
  background: #1DB954;
  border-radius: 50%;
  flex-shrink: 0;
`;

const LoginPage: React.FC = () => {
  const { login } = useAuth();

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>SLEEVE</Logo>
        <Tagline>アートワークで音楽と出会おう</Tagline>
        <Description>
          Spotifyのアルバムアートワークを美しいギャラリー形式で表示し、
          新しい音楽との出会いを提供します。
        </Description>
        <LoginButton onClick={login}>
          <SpotifyIcon viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.959-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.361 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
          </SpotifyIcon>
          Spotifyでログイン
        </LoginButton>
        <Features>
          <FeatureItem>
            <FeatureIcon />
            <span>Spotify APIを使用したリアルタイムデータ</span>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon />
            <span>美しいアルバムアートワークギャラリー</span>
          </FeatureItem>
          <FeatureItem>
            <FeatureIcon />
            <span>新しい音楽との出会い</span>
          </FeatureItem>
        </Features>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;