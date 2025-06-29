import React from 'react';
import styled from 'styled-components';
import { SpotifyAlbum } from '../types';

const ModalOverlay = styled.div<{ show: boolean }>`
  display: ${props => props.show ? 'flex' : 'none'};
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  animation: fadeIn 0.3s ease;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: rgba(26, 26, 26, 0.95);
  border-radius: 24px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid rgba(29, 185, 84, 0.2);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: modalSlideUp 0.3s ease;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const ModalArtwork = styled.img`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 16px;
  margin-bottom: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
  line-height: 1.3;
`;

const ModalArtist = styled.p`
  font-size: 1.1rem;
  color: #b3b3b3;
  margin-bottom: 12px;
`;

const ModalCategories = styled.div`
  margin-bottom: 16px;
`;

const ModalCategory = styled.span`
  display: inline-block;
  background: rgba(29, 185, 84, 0.2);
  color: #1DB954;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-right: 8px;
  margin-bottom: 8px;
`;

const ModalYear = styled.p`
  font-size: 1rem;
  color: #888;
  margin-bottom: 24px;
  font-weight: 400;
`;

const SpotifyButton = styled.button`
  background: linear-gradient(135deg, #1DB954 0%, #1ed760 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(29, 185, 84, 0.3);
  }
`;

const SpotifyIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;

interface AlbumModalProps {
  album: SpotifyAlbum | null;
  isOpen: boolean;
  onClose: () => void;
}

const AlbumModal: React.FC<AlbumModalProps> = ({ album, isOpen, onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openSpotify = () => {
    if (album) {
      window.open(album.external_urls.spotify, '_blank');
    }
  };

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!album) return null;

  const imageUrl = album.images && album.images.length > 0 ? album.images[0].url : '';
  const artistNames = album.artists.map(artist => artist.name).join(', ');
  const releaseYear = new Date(album.release_date).getFullYear();

  return (
    <ModalOverlay show={isOpen} onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalArtwork src={imageUrl} alt={album.name} />
        <ModalTitle>{album.name}</ModalTitle>
        <ModalArtist>{artistNames}</ModalArtist>
        {album.genres && album.genres.length > 0 && (
          <ModalCategories>
            {album.genres.map((genre, index) => (
              <ModalCategory key={index}>{genre}</ModalCategory>
            ))}
          </ModalCategories>
        )}
        <ModalYear>{releaseYear}</ModalYear>
        <SpotifyButton onClick={openSpotify}>
          <SpotifyIcon viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.959-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.361 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
          </SpotifyIcon>
          Spotifyで開く
        </SpotifyButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AlbumModal;