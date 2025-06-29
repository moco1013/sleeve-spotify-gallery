import React from 'react';
import styled from 'styled-components';
import { SpotifyAlbum } from '../types';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(30px);

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 40px rgba(29, 185, 84, 0.2);
    border-color: rgba(29, 185, 84, 0.3);
  }

  &:hover .play-indicator {
    opacity: 1;
  }

  &:hover .album-artwork {
    transform: scale(1.05);
  }
`;

const AlbumArtwork = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  transition: transform 0.4s ease;
  background: linear-gradient(135deg, #2D2D2D 0%, #1a1a1a 100%);
  border-radius: 16px;
`;

const PlayIndicator = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  background: rgba(29, 185, 84, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const PlayIcon = styled.div`
  width: 0;
  height: 0;
  border-left: 8px solid white;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  margin-left: 2px;
`;

const AlbumInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 20px 16px 16px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const AlbumTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ArtistName = styled.p`
  font-size: 0.85rem;
  color: #b3b3b3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface AlbumCardProps {
  album: SpotifyAlbum;
  onClick: (album: SpotifyAlbum) => void;
  delay?: number;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onClick, delay = 0 }) => {
  const imageUrl = album.images && album.images.length > 0 ? album.images[0].url : '';
  const artistNames = album.artists.map(artist => artist.name).join(', ');

  return (
    <Card 
      onClick={() => onClick(album)}
      style={{ animationDelay: `${delay}s` }}
    >
      <PlayIndicator className="play-indicator">
        <PlayIcon />
      </PlayIndicator>
      <AlbumArtwork 
        className="album-artwork"
        src={imageUrl} 
        alt={album.name}
        loading="lazy"
      />
      <AlbumInfo>
        <AlbumTitle>{album.name}</AlbumTitle>
        <ArtistName>{artistNames}</ArtistName>
      </AlbumInfo>
    </Card>
  );
};

export default AlbumCard;