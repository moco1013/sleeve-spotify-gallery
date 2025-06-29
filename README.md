# SLEEVE - Spotify Album Art Gallery

SLEEVEは、Spotifyのアルバムアートワークを美しいギャラリー形式で表示し、新しい音楽との出会いを提供するWebサービスです。

## 🎵 機能

- **Spotify OAuth認証**: 安全なSpotifyアカウント連携
- **アルバムアートワークギャラリー**: 美しいグリッド表示
- **検索機能**: アーティスト名やアルバム名での検索
- **新着アルバム**: Spotifyの新着アルバムを自動取得
- **モーダル表示**: 詳細情報の表示とSpotifyへの直接リンク
- **レスポンシブデザイン**: モバイルフレンドリー

## 🏗️ 技術スタック

### Backend
- **Node.js** + **TypeScript**
- **Express.js** - RESTful API
- **Spotify Web API** - 音楽データ取得
- **express-session** - セッション管理

### Frontend
- **React** + **TypeScript**
- **Styled Components** - CSS-in-JS
- **React Router** - ルーティング
- **Axios** - API通信

### Deployment
- **Docker** + **Docker Compose**
- **Nginx** - リバースプロキシ

## 🚀 セットアップ

### 1. Spotify API設定

1. [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)にアクセス
2. アプリケーションを作成
3. Client IDとClient Secretを取得
4. Redirect URIを設定: `http://localhost:3001/auth/callback`

### 2. 環境変数設定

```bash
# ルートディレクトリに.envファイルを作成
cp .env.example .env

# 必要な値を設定
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3001/auth/callback
SESSION_SECRET=your_random_session_secret
FRONTEND_URL=http://localhost:3000
REACT_APP_API_URL=http://localhost:3001
```

### 3. 開発環境での起動

#### バックエンド
```bash
cd sleeve-backend
npm install
npm run dev
```

#### フロントエンド
```bash
cd sleeve-frontend
npm install
npm start
```

### 4. Docker Compose での起動

```bash
# 全体をDockerで起動
docker-compose up -d

# ログを確認
docker-compose logs -f
```

## 📁 プロジェクト構造

```
sleeve/
├── sleeve-backend/          # バックエンドサーバー
│   ├── src/
│   │   ├── routes/         # APIルート
│   │   ├── services/       # Spotifyサービス
│   │   ├── middleware/     # 認証ミドルウェア
│   │   └── types/         # TypeScript型定義
│   ├── package.json
│   └── Dockerfile
├── sleeve-frontend/        # フロントエンドアプリ
│   ├── src/
│   │   ├── components/    # Reactコンポーネント
│   │   ├── pages/         # ページコンポーネント
│   │   ├── services/      # API通信
│   │   ├── context/       # React Context
│   │   └── types/         # TypeScript型定義
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml      # Docker構成
└── README.md
```

## 🔧 API エンドポイント

### 認証
- `GET /auth/login` - Spotify認証開始
- `GET /auth/callback` - OAuth コールバック
- `POST /auth/logout` - ログアウト
- `GET /auth/me` - ユーザー情報取得

### アルバム
- `GET /api/albums/search?q={query}` - アルバム検索
- `GET /api/albums/new-releases` - 新着アルバム
- `GET /api/albums/{id}` - アルバム詳細

## 🌐 デプロイ

### 本番環境での環境変数設定

```bash
# 本番用のドメインに変更
FRONTEND_URL=https://your-domain.com
REACT_APP_API_URL=https://your-domain.com
SPOTIFY_REDIRECT_URI=https://your-domain.com/auth/callback
```

### Docker Composeでデプロイ

```bash
# 本番環境用でビルド
docker-compose -f docker-compose.yml up -d --build

# SSL証明書の設定（Let's Encryptなど）
# nginx設定の更新が必要
```

## 📝 開発者向け情報

### 主要な実装ポイント

1. **OAuth認証フロー**: Spotify認証とセッション管理
2. **エラーハンドリング**: APIエラーとネットワークエラーの適切な処理
3. **レスポンシブデザイン**: モバイルファーストなUIデザイン
4. **無限スクロール**: 大量のデータの効率的な表示
5. **型安全性**: TypeScriptによる型チェック

### 今後の拡張可能性

- プレイリスト機能
- お気に入り機能
- ソーシャル機能（シェア、レビュー）
- 音楽再生機能（Spotify SDK）
- アーティスト情報表示
- 楽曲レコメンデーション

## 📄 ライセンス

MIT License

## 🎧 Contact

Spotify APIの利用規約に従い、教育目的での使用を推奨します。