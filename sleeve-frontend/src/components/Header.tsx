import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(29, 185, 84, 0.2);
  padding: 20px 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoSection = styled.div`
  text-align: center;
  flex-grow: 1;
`;

const Logo = styled.h1`
  font-size: 2.8rem;
  font-weight: 300;
  background: linear-gradient(45deg, #1DB954, #1ed760, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;

const Tagline = styled.p`
  font-size: 1rem;
  color: #b3b3b3;
  font-weight: 300;
  letter-spacing: 0.5px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid rgba(29, 185, 84, 0.3);
`;

const UserName = styled.span`
  font-size: 0.9rem;
  color: #b3b3b3;
`;

const LogoutButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
`;

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <HeaderContainer>
      <HeaderContent>
        <div style={{ width: '120px' }} />
        <LogoSection>
          <Logo>SLEEVE</Logo>
          <Tagline>アートワークで音楽と出会おう</Tagline>
        </LogoSection>
        <UserSection>
          {user && (
            <>
              <UserInfo>
                {user.images && user.images.length > 0 && (
                  <UserAvatar src={user.images[0].url} alt={user.display_name} />
                )}
                <UserName>{user.display_name}</UserName>
              </UserInfo>
              <LogoutButton onClick={logout}>ログアウト</LogoutButton>
            </>
          )}
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;