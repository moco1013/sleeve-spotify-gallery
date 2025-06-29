import { Router, Request, Response } from 'express';
import { SpotifyPublicService } from '../services/spotifyPublic';

const router = Router();
let spotifyService: SpotifyPublicService;

// 認証不要のエンドポイント

router.get('/search', async (req: Request, res: Response) => {
  try {
    if (!spotifyService) {
      spotifyService = new SpotifyPublicService();
    }
    
    const { q, limit = 20, offset = 0 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const results = await spotifyService.searchAlbums(
      q as string,
      Number(limit),
      Number(offset)
    );

    res.json(results);
  } catch (error: any) {
    console.error('Public search error:', error);
    console.error('Error details:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to search albums',
      details: error.response?.data || error.message 
    });
  }
});

router.get('/new-releases', async (req: Request, res: Response) => {
  try {
    if (!spotifyService) {
      spotifyService = new SpotifyPublicService();
    }
    
    const { limit = 20, offset = 0 } = req.query;

    const results = await spotifyService.getNewReleases(
      Number(limit),
      Number(offset)
    );

    res.json(results);
  } catch (error: any) {
    console.error('Public new releases error:', error);
    console.error('Error details:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to get new releases',
      details: error.response?.data || error.message 
    });
  }
});

router.get('/featured', async (req: Request, res: Response) => {
  try {
    if (!spotifyService) {
      spotifyService = new SpotifyPublicService();
    }
    
    const { limit = 20, offset = 0 } = req.query;

    const results = await spotifyService.getFeaturedPlaylists(
      Number(limit),
      Number(offset)
    );

    res.json(results);
  } catch (error) {
    console.error('Public featured error:', error);
    res.status(500).json({ error: 'Failed to get featured content' });
  }
});

router.get('/popular', async (req: Request, res: Response) => {
  try {
    if (!spotifyService) {
      spotifyService = new SpotifyPublicService();
    }
    
    const { limit = 20, offset = 0 } = req.query;

    const results = await spotifyService.getPopularAlbums(
      Number(limit),
      Number(offset)
    );

    res.json(results);
  } catch (error: any) {
    console.error('Public popular error:', error);
    res.status(500).json({ 
      error: 'Failed to get popular albums',
      details: error.response?.data || error.message 
    });
  }
});

router.get('/genre/:genre', async (req: Request, res: Response) => {
  try {
    if (!spotifyService) {
      spotifyService = new SpotifyPublicService();
    }
    
    const { genre } = req.params;
    const { limit = 20, offset = 0 } = req.query;

    const results = await spotifyService.getAlbumsByGenre(
      genre,
      Number(limit),
      Number(offset)
    );

    res.json(results);
  } catch (error: any) {
    console.error('Public genre error:', error);
    res.status(500).json({ 
      error: 'Failed to get albums by genre',
      details: error.response?.data || error.message 
    });
  }
});

router.get('/mood/:mood', async (req: Request, res: Response) => {
  try {
    if (!spotifyService) {
      spotifyService = new SpotifyPublicService();
    }
    
    const { mood } = req.params;
    const { limit = 20, offset = 0 } = req.query;

    const results = await spotifyService.getAlbumsByMood(
      mood,
      Number(limit),
      Number(offset)
    );

    res.json(results);
  } catch (error: any) {
    console.error('Public mood error:', error);
    res.status(500).json({ 
      error: 'Failed to get albums by mood',
      details: error.response?.data || error.message 
    });
  }
});

router.get('/genres', async (req: Request, res: Response) => {
  try {
    if (!spotifyService) {
      spotifyService = new SpotifyPublicService();
    }
    
    const genres = await spotifyService.getGenreSeeds();
    res.json({ genres });
  } catch (error) {
    console.error('Public genres error:', error);
    res.status(500).json({ error: 'Failed to get genres' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    if (!spotifyService) {
      spotifyService = new SpotifyPublicService();
    }
    
    const { id } = req.params;
    
    const album = await spotifyService.getAlbum(id);
    res.json(album);
  } catch (error) {
    console.error('Public get album error:', error);
    res.status(500).json({ error: 'Failed to get album' });
  }
});

export default router;