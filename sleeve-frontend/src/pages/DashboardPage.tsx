import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { SpotifyAlbum } from '../types';
import { albumService } from '../services/api';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import AlbumCard from '../components/AlbumCard';
import AlbumModal from '../components/AlbumModal';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardContainer = styled.div`
  min-height: 100vh;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 24px;
  text-align: center;
`;

const AlbumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const LoadMoreButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 14px 28px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 40px auto;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #ff6b6b;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #b3b3b3;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
`;

const EmptyStateDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 0.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: 60px;

  a {
    color: #1DB954;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #1ed760;
    }
  }
`;

const DashboardPage: React.FC = () => {
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<SpotifyAlbum | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const loadNewReleases = useCallback(async (reset = false) => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const currentOffset = reset ? 0 : offset;
      const response = await albumService.getNewReleases(20, currentOffset);
      
      if (reset) {
        setAlbums(response.albums.items);
        setOffset(20);
      } else {
        setAlbums(prev => [...prev, ...response.albums.items]);
        setOffset(prev => prev + 20);
      }
      
      setHasMore(response.albums.items.length === 20);
    } catch (err) {
      setError('新着アルバムの読み込みに失敗しました');
      console.error('Error loading new releases:', err);
    } finally {
      setLoading(false);
    }
  }, [loading, offset]);

  const handleSearch = async (query: string) => {
    setSearchLoading(true);
    setError(null);
    setSearchQuery(query);

    try {
      const response = await albumService.search(query, 20, 0);
      setAlbums(response.albums.items);
      setOffset(20);
      setHasMore(response.albums.items.length === 20);
    } catch (err) {
      setError('検索に失敗しました');
      console.error('Search error:', err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setOffset(0);
    loadNewReleases(true);
  };

  const handleAlbumClick = (album: SpotifyAlbum) => {
    setSelectedAlbum(album);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAlbum(null);
  };

  const handleLoadMore = () => {
    if (searchQuery) {
      handleSearchMore();
    } else {
      loadNewReleases();
    }
  };

  const handleSearchMore = async () => {
    if (loading || !searchQuery) return;

    setLoading(true);
    setError(null);

    try {
      const response = await albumService.search(searchQuery, 20, offset);
      setAlbums(prev => [...prev, ...response.albums.items]);
      setOffset(prev => prev + 20);
      setHasMore(response.albums.items.length === 20);
    } catch (err) {
      setError('検索結果の読み込みに失敗しました');
      console.error('Search more error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNewReleases(true);
  }, []);

  return (
    <DashboardContainer>
      <Header />
      <MainContent>
        <SearchBar 
          onSearch={handleSearch}
          onClear={handleClear}
          loading={searchLoading}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <SectionTitle>
          {searchQuery ? `"${searchQuery}" の検索結果` : '新着アルバム'}
        </SectionTitle>

        {albums.length === 0 && !loading && !searchLoading ? (
          <EmptyState>
            <EmptyStateTitle>
              {searchQuery ? '検索結果が見つかりませんでした' : 'アルバムが見つかりません'}
            </EmptyStateTitle>
            <EmptyStateDescription>
              {searchQuery 
                ? '別のキーワードで検索してみてください' 
                : '新着アルバムの読み込みに失敗しました'
              }
            </EmptyStateDescription>
          </EmptyState>
        ) : (
          <AlbumGrid>
            {albums.map((album, index) => (
              <AlbumCard
                key={`${album.id}-${index}`}
                album={album}
                onClick={handleAlbumClick}
                delay={index * 0.1}
              />
            ))}
          </AlbumGrid>
        )}

        {(loading || searchLoading) && <LoadingSpinner />}

        {hasMore && albums.length > 0 && !loading && !searchLoading && (
          <LoadMoreButton onClick={handleLoadMore}>
            もっと見る
          </LoadMoreButton>
        )}
      </MainContent>

      <AlbumModal
        album={selectedAlbum}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <Footer>
        <p>
          Powered by <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">Spotify API</a> | 
          Made with ❤️ for music lovers
        </p>
      </Footer>
    </DashboardContainer>
  );
};

export default DashboardPage;