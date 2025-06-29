import { Request, Response, NextFunction } from 'express';
import { SpotifyService } from '../services/spotify';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.user || !req.session.tokens) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  next();
};

export const refreshTokenIfNeeded = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.tokens) {
    return next();
  }

  const now = Date.now();
  const tokenExpiry = req.session.tokens.expires_in * 1000;
  
  if (now >= tokenExpiry) {
    try {
      const spotifyService = new SpotifyService();
      const newTokens = await spotifyService.refreshAccessToken(req.session.tokens.refresh_token);
      
      req.session.tokens = {
        ...newTokens,
        refresh_token: req.session.tokens.refresh_token,
      };
    } catch (error) {
      console.error('Failed to refresh token:', error);
      req.session.destroy(() => {
        res.status(401).json({ error: 'Token refresh failed' });
      });
      return;
    }
  }

  next();
};