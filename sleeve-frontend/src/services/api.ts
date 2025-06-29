import axios from 'axios';
import { SpotifyUser, SpotifySearchResponse, SpotifyAlbum } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const authService = {
  login: () => {
    window.location.href = `${API_BASE_URL}/auth/login`;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  getUser: async (): Promise<SpotifyUser> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const albumService = {
  search: async (query: string, limit = 20, offset = 0): Promise<SpotifySearchResponse> => {
    const response = await api.get('/api/albums/search', {
      params: { q: query, limit, offset },
    });
    return response.data;
  },

  getNewReleases: async (limit = 20, offset = 0): Promise<SpotifySearchResponse> => {
    const response = await api.get('/api/albums/new-releases', {
      params: { limit, offset },
    });
    return response.data;
  },

  getAlbum: async (id: string): Promise<SpotifyAlbum> => {
    const response = await api.get(`/api/albums/${id}`);
    return response.data;
  },
};