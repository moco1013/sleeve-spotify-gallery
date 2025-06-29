import axios from 'axios';
import { SpotifyAlbum, SpotifySearchResponse } from '../types';

export class SpotifyPublicService {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID!;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
    
    if (!this.clientId || !this.clientSecret) {
      console.error('Missing Spotify credentials');
      console.error('CLIENT_ID:', this.clientId ? 'SET' : 'MISSING');
      console.error('CLIENT_SECRET:', this.clientSecret ? 'SET' : 'MISSING');
    }
  }

  private async getAccessToken(): Promise<string> {
    const now = Date.now();
    
    // トークンが有効な場合は再利用
    if (this.accessToken && now < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      console.log('Attempting Spotify authentication...');
      console.log('Client ID:', this.clientId.substring(0, 8) + '...');
      
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
        }),
        {
          headers: {
            'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      
      console.log('Spotify authentication successful');

      this.accessToken = response.data.access_token;
      this.tokenExpiry = now + (response.data.expires_in * 1000) - 60000; // 1分の余裕を持たせる

      return this.accessToken!;
    } catch (error) {
      console.error('Failed to get access token:', error);
      throw new Error('Spotify authentication failed');
    }
  }

  async searchAlbums(query: string, limit = 20, offset = 0): Promise<SpotifySearchResponse> {
    const token = await this.getAccessToken();
    
    const fetchLimit = Math.min(limit * 2, 50);
    
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        q: query,
        type: 'album',
        limit: fetchLimit,
        offset,
        market: 'JP', // 日本のマーケットに限定（オプション）
      },
    });

    // アーティストの詳細情報を取得してpopularityでフィルター
    const albums = response.data.albums.items;
    const enhancedAlbums = await Promise.all(
      albums.map(async (album: any) => {
        try {
          const artistDetails = await Promise.all(
            album.artists.map(async (artist: any) => {
              const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              return { ...artist, popularity: artistResponse.data.popularity };
            })
          );
          return { ...album, artists: artistDetails };
        } catch (error) {
          return album;
        }
      })
    );

    const filteredAlbums = this.filterByPopularity(enhancedAlbums, 30);
    
    return {
      ...response.data,
      albums: {
        ...response.data.albums,
        items: filteredAlbums.slice(0, limit)
      }
    };
  }

  async getAlbum(albumId: string): Promise<SpotifyAlbum> {
    const token = await this.getAccessToken();
    
    const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        market: 'JP',
      },
    });

    return response.data;
  }

  // アーティストのpopularityでフィルターする関数
  private filterByPopularity(albums: any[], minPopularity = 30): any[] {
    return albums.filter(album => {
      // アルバムのアーティストのpopularityをチェック
      if (album.artists && album.artists.length > 0) {
        // 少なくとも1人のアーティストがminPopularity以上なら含める
        return album.artists.some((artist: any) => {
          return artist.popularity >= minPopularity;
        });
      }
      return true; // popularityデータがない場合は含める
    });
  }

  async getNewReleases(limit = 20, offset = 0): Promise<SpotifySearchResponse> {
    const token = await this.getAccessToken();
    
    // より多くのアルバムを取得してフィルター後に十分な数を確保
    const fetchLimit = Math.min(limit * 2, 50);
    
    const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        limit: fetchLimit,
        offset,
        country: 'JP', // 日本の新着アルバム
      },
    });

    // アーティストのpopularityデータを取得するため、各アルバムのアーティスト情報を詳細取得
    const albums = response.data.albums.items;
    const enhancedAlbums = await Promise.all(
      albums.map(async (album: any) => {
        try {
          // アーティストの詳細情報を取得
          const artistDetails = await Promise.all(
            album.artists.map(async (artist: any) => {
              const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              return { ...artist, popularity: artistResponse.data.popularity };
            })
          );
          return { ...album, artists: artistDetails };
        } catch (error) {
          // エラーの場合は元のアルバムデータを返す
          return album;
        }
      })
    );

    // popularityでフィルター
    const filteredAlbums = this.filterByPopularity(enhancedAlbums, 30);
    
    // 元のレスポンス構造を維持
    return {
      ...response.data,
      albums: {
        ...response.data.albums,
        items: filteredAlbums.slice(0, limit)
      }
    };
  }

  async getFeaturedPlaylists(limit = 20, offset = 0): Promise<any> {
    const token = await this.getAccessToken();
    
    const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        limit,
        offset,
        country: 'JP',
      },
    });

    return response.data;
  }

  async getAlbumsByGenre(genre: string, limit = 20, offset = 0): Promise<SpotifySearchResponse> {
    const token = await this.getAccessToken();
    
    const fetchLimit = Math.min(limit * 2, 50);
    
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        q: `genre:${genre}`,
        type: 'album',
        limit: fetchLimit,
        offset,
        market: 'JP',
      },
    });

    // アーティストの詳細情報を取得してpopularityでフィルター
    const albums = response.data.albums.items;
    const enhancedAlbums = await Promise.all(
      albums.map(async (album: any) => {
        try {
          const artistDetails = await Promise.all(
            album.artists.map(async (artist: any) => {
              const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              return { ...artist, popularity: artistResponse.data.popularity };
            })
          );
          return { ...album, artists: artistDetails };
        } catch (error) {
          return album;
        }
      })
    );

    const filteredAlbums = this.filterByPopularity(enhancedAlbums, 30);
    
    return {
      ...response.data,
      albums: {
        ...response.data.albums,
        items: filteredAlbums.slice(0, limit)
      }
    };
  }

  async getPopularAlbums(limit = 20, offset = 0): Promise<SpotifySearchResponse> {
    const token = await this.getAccessToken();
    
    const fetchLimit = Math.min(limit * 2, 50);
    
    // 人気のアーティストのアルバムを取得
    const popularQueries = ['year:2024', 'year:2023', 'pop', 'rock', 'hip-hop'];
    const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
    
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        q: randomQuery,
        type: 'album',
        limit: fetchLimit,
        offset,
        market: 'JP',
      },
    });

    // アーティストの詳細情報を取得してpopularityでフィルター
    const albums = response.data.albums.items;
    const enhancedAlbums = await Promise.all(
      albums.map(async (album: any) => {
        try {
          const artistDetails = await Promise.all(
            album.artists.map(async (artist: any) => {
              const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              return { ...artist, popularity: artistResponse.data.popularity };
            })
          );
          return { ...album, artists: artistDetails };
        } catch (error) {
          return album;
        }
      })
    );

    const filteredAlbums = this.filterByPopularity(enhancedAlbums, 30);
    
    return {
      ...response.data,
      albums: {
        ...response.data.albums,
        items: filteredAlbums.slice(0, limit)
      }
    };
  }

  async getAlbumsByMood(mood: string, limit = 20, offset = 0): Promise<SpotifySearchResponse> {
    const token = await this.getAccessToken();
    
    const fetchLimit = Math.min(limit * 2, 50);
    
    const moodQueries: { [key: string]: string } = {
      'chill': 'genre:ambient OR genre:lo-fi OR genre:chillout',
      'party': 'genre:dance OR genre:electronic OR genre:party',
      'workout': 'genre:electronic OR genre:rock OR genre:hip-hop',
      'focus': 'genre:classical OR genre:ambient OR genre:instrumental',
      'sleep': 'genre:ambient OR genre:new-age OR genre:classical',
      'happy': 'genre:pop OR genre:indie-pop OR genre:dance',
      'sad': 'genre:indie OR genre:alternative OR genre:folk'
    };
    
    const query = moodQueries[mood] || 'genre:pop';
    
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        q: query,
        type: 'album',
        limit: fetchLimit,
        offset,
        market: 'JP',
      },
    });

    // アーティストの詳細情報を取得してpopularityでフィルター
    const albums = response.data.albums.items;
    const enhancedAlbums = await Promise.all(
      albums.map(async (album: any) => {
        try {
          const artistDetails = await Promise.all(
            album.artists.map(async (artist: any) => {
              const artistResponse = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              return { ...artist, popularity: artistResponse.data.popularity };
            })
          );
          return { ...album, artists: artistDetails };
        } catch (error) {
          return album;
        }
      })
    );

    const filteredAlbums = this.filterByPopularity(enhancedAlbums, 30);
    
    return {
      ...response.data,
      albums: {
        ...response.data.albums,
        items: filteredAlbums.slice(0, limit)
      }
    };
  }

  async getGenreSeeds(): Promise<string[]> {
    const token = await this.getAccessToken();
    
    const response = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    return response.data.genres;
  }
}