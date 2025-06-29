import axios from 'axios';
import { SpotifySearchResponse, SpotifyAlbum } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8080';
console.log('API_BASE_URL:', API_BASE_URL);
console.log('Environment variables:', process.env);

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