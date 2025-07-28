import axios from 'axios';
import { SpotifySearchResponse, SpotifyAlbum } from '../types';
import { getSafeEnvVar } from '../utils/securityConfig';

const API_BASE_URL = getSafeEnvVar('REACT_APP_API_BASE_URL') || 'https://sleeve-spotify-gallery-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const publicAlbumService = {
  search: async (query: string, limit = 20, offset = 0): Promise<SpotifySearchResponse> => {
    const response = await api.get('/api/public/albums/search', {
      params: { q: query, limit, offset },
    });
    return response.data;
  },

  getNewReleases: async (limit = 20, offset = 0): Promise<SpotifySearchResponse> => {
    const response = await api.get('/api/public/albums/new-releases', {
      params: { limit, offset },
    });
    return response.data;
  },

  getFeatured: async (limit = 20, offset = 0): Promise<any> => {
    const response = await api.get('/api/public/albums/featured', {
      params: { limit, offset },
    });
    return response.data;
  },

  getAlbum: async (id: string): Promise<SpotifyAlbum> => {
    const response = await api.get(`/api/public/albums/${id}`);
    return response.data;
  },

  getPopular: async (limit = 20, offset = 0): Promise<SpotifySearchResponse> => {
    const response = await api.get('/api/public/albums/popular', {
      params: { limit, offset },
    });
    return response.data;
  },

  getByGenre: async (genre: string, limit = 20, offset = 0): Promise<SpotifySearchResponse> => {
    const response = await api.get(`/api/public/albums/genre/${genre}`, {
      params: { limit, offset },
    });
    return response.data;
  },

  getByMood: async (mood: string, limit = 20, offset = 0): Promise<SpotifySearchResponse> => {
    const response = await api.get(`/api/public/albums/mood/${mood}`, {
      params: { limit, offset },
    });
    return response.data;
  },

  getGenres: async (): Promise<string[]> => {
    const response = await api.get('/api/public/albums/genres');
    return response.data.genres;
  },
};