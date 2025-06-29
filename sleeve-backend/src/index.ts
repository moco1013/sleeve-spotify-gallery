import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth';
import albumRoutes from './routes/albums';
import publicAlbumRoutes from './routes/publicAlbums';

dotenv.config();

// 環境変数の確認
console.log('Environment variables check:');
console.log('SPOTIFY_CLIENT_ID:', process.env.SPOTIFY_CLIENT_ID ? 'SET' : 'MISSING');
console.log('SPOTIFY_CLIENT_SECRET:', process.env.SPOTIFY_CLIENT_SECRET ? 'SET' : 'MISSING');

const app = express();
const PORT = process.env.PORT || 8080;

const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? ['https://sleeve-frontend.vercel.app']
  : ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:8080'];

// フロントエンドURLが設定されている場合は追加
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'sleeve-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));

// 認証不要のパブリックAPI
app.use('/api/public/albums', publicAlbumRoutes);

// 認証が必要なAPI（将来的に使用）
app.use('/auth', authRoutes);
app.use('/api/albums', albumRoutes);

// 静的ファイルの配信
app.use(express.static('../sleeve-frontend/build'));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// React アプリのフォールバック
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../sleeve-frontend/build/index.html'));
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🎵 SLEEVE Backend running on port ${PORT}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
  console.log(`🎧 Spotify OAuth redirect: ${process.env.SPOTIFY_REDIRECT_URI}`);
});