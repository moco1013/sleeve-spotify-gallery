import { Router, Request, Response } from 'express';
import { SpotifyService } from '../services/spotify';
import { requireAuth, refreshTokenIfNeeded } from '../middleware/auth';

const router = Router();
const spotifyService = new SpotifyService();

router.use(requireAuth);
router.use(refreshTokenIfNeeded);

router.get('/search', async (req: Request, res: Response) => {
  try {
    const { q, limit = 20, offset = 0 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const results = await spotifyService.searchAlbums(
      q as string,
      req.session.tokens!.access_token,
      Number(limit),
      Number(offset)
    );

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search albums' });
  }
});

router.get('/new-releases', async (req: Request, res: Response) => {
  try {
    const { limit = 20, offset = 0 } = req.query;

    const results = await spotifyService.getNewReleases(
      req.session.tokens!.access_token,
      Number(limit),
      Number(offset)
    );

    res.json(results);
  } catch (error) {
    console.error('New releases error:', error);
    res.status(500).json({ error: 'Failed to get new releases' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const album = await spotifyService.getAlbum(
      id,
      req.session.tokens!.access_token
    );

    res.json(album);
  } catch (error) {
    console.error('Get album error:', error);
    res.status(500).json({ error: 'Failed to get album' });
  }
});

export default router;