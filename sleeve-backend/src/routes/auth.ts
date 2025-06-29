import { Router, Request, Response } from 'express';
import { SpotifyService } from '../services/spotify';

const router = Router();
const spotifyService = new SpotifyService();

router.get('/login', (req: Request, res: Response) => {
  const authUrl = spotifyService.getAuthUrl();
  res.redirect(authUrl);
});

router.get('/callback', async (req: Request, res: Response) => {
  const { code, error } = req.query;

  if (error) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=access_denied`);
  }

  if (!code) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=missing_code`);
  }

  try {
    const tokens = await spotifyService.getAccessToken(code as string);
    const user = await spotifyService.getUserProfile(tokens.access_token);

    req.session.user = user;
    req.session.tokens = tokens;

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  } catch (error) {
    console.error('Authentication error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
  }
});

router.post('/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

router.get('/me', (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  res.json(req.session.user);
});

export default router;