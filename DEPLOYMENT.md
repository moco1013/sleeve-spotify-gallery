# SLEEVE デプロイガイド

## 🚀 本番デプロイ手順

### オプション1: Vercel + Railway (推奨)

#### 事前準備
1. GitHubリポジトリを作成してコードをプッシュ
2. Spotifyアプリの本番用リダイレクトURIを追加

#### バックエンド (Railway)

1. **Railway アカウント作成**
   - https://railway.app/ でアカウント作成
   - GitHubアカウントでログイン

2. **プロジェクト作成**
   - 「New Project」→「Deploy from GitHub repo」
   - `sleeve-backend` フォルダを選択

3. **環境変数設定**
   ```
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   SPOTIFY_REDIRECT_URI=https://your-backend-url.railway.app/auth/callback
   SESSION_SECRET=random_secret_string
   NODE_ENV=production
   PORT=8080
   ```

4. **ドメイン設定**
   - Railwayが自動でドメインを生成
   - カスタムドメインも設定可能

#### フロントエンド (Vercel)

1. **Vercel アカウント作成**
   - https://vercel.com/ でアカウント作成
   - GitHubアカウントでログイン

2. **プロジェクト作成**
   - 「New Project」→GitHubリポジトリを選択
   - Root Directory: `sleeve-frontend`

3. **環境変数設定**
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```

4. **デプロイ**
   - 自動でビルド・デプロイが開始
   - Vercelが自動でドメインを生成

#### Spotify設定更新

1. **Spotify Developer Dashboard**
   - https://developer.spotify.com/dashboard/
   - アプリの設定を開く

2. **Redirect URIs追加**
   ```
   https://your-backend-url.railway.app/auth/callback
   ```

### オプション2: Heroku

#### バックエンド

1. **Heroku CLI インストール**
   ```bash
   # macOS
   brew install heroku/brew/heroku
   
   # Windows
   # https://devcenter.heroku.com/articles/heroku-cli からインストーラーダウンロード
   ```

2. **Heroku アプリ作成**
   ```bash
   cd sleeve-backend
   heroku create sleeve-backend-app
   ```

3. **環境変数設定**
   ```bash
   heroku config:set SPOTIFY_CLIENT_ID=your_client_id
   heroku config:set SPOTIFY_CLIENT_SECRET=your_client_secret
   heroku config:set SPOTIFY_REDIRECT_URI=https://sleeve-backend-app.herokuapp.com/auth/callback
   heroku config:set SESSION_SECRET=random_secret_string
   heroku config:set NODE_ENV=production
   ```

4. **デプロイ**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

#### フロントエンド

1. **Netlify使用**
   - https://netlify.com/ でアカウント作成
   - `sleeve-frontend/build` フォルダをドラッグ&ドロップ
   - 環境変数: `REACT_APP_API_URL=https://sleeve-backend-app.herokuapp.com`

### オプション3: Docker + VPS

#### Docker Compose本番用

```bash
# 本番環境で実行
docker-compose -f docker-compose.prod.yml up -d
```

#### 必要な設定
- SSL証明書 (Let's Encrypt)
- ドメイン設定
- ファイアウォール設定

## 🔧 本番環境の設定

### 必須環境変数

**バックエンド:**
```env
SPOTIFY_CLIENT_ID=your_actual_client_id
SPOTIFY_CLIENT_SECRET=your_actual_client_secret
SPOTIFY_REDIRECT_URI=https://your-domain.com/auth/callback
SESSION_SECRET=secure_random_string_min_32_chars
NODE_ENV=production
PORT=8080
FRONTEND_URL=https://your-frontend-domain.com
```

**フロントエンド:**
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

### セキュリティ設定

1. **セッションシークレット**
   ```bash
   # 安全なランダム文字列を生成
   openssl rand -base64 32
   ```

2. **HTTPS必須**
   - 本番環境では必ずHTTPSを使用
   - Spotifyは本番でHTTPSを要求

3. **CORS設定**
   - 本番ドメインのみ許可
   - ワイルドカード(\*)は使用禁止

## 📋 デプロイチェックリスト

### デプロイ前
- [ ] Spotifyアプリの本番用リダイレクトURI設定
- [ ] 環境変数ファイル準備
- [ ] GitHubリポジトリ作成・プッシュ
- [ ] ドメイン名決定

### デプロイ後
- [ ] バックエンドAPIの動作確認
- [ ] フロントエンドの表示確認
- [ ] Spotify認証フローのテスト
- [ ] エラーログの確認
- [ ] パフォーマンステスト

## 🎯 推奨デプロイ先

### 無料プラン
1. **Vercel** (フロントエンド) - 無料枠充実
2. **Railway** (バックエンド) - 月500時間無料
3. **Render** (フルスタック) - 750時間無料

### 有料プラン
1. **Vercel Pro** - $20/月
2. **Railway Pro** - $5/月〜
3. **Heroku** - $7/月〜

## 🔍 トラブルシューティング

### よくある問題

1. **CORS エラー**
   - フロントエンドドメインがCORS設定に含まれているか確認

2. **Spotify認証エラー**
   - リダイレクトURIが正確に設定されているか確認
   - HTTPSを使用しているか確認

3. **環境変数エラー**
   - 本番環境で環境変数が正しく設定されているか確認

4. **ビルドエラー**
   - Node.jsバージョンの確認
   - 依存関係の確認

### ログ確認方法

**Railway:**
```bash
# Railway CLI使用
railway logs
```

**Heroku:**
```bash
# Heroku CLI使用
heroku logs --tail
```

**Vercel:**
- Vercel ダッシュボードのFunctionsタブでログ確認

## 🌟 最終チェック

デプロイ完了後、以下をテストしてください：

1. **基本機能**
   - サイトにアクセス可能
   - 新着アルバム表示
   - テーマ切り替え
   - 検索機能

2. **Spotify連携**
   - OAuth認証フロー（現在は使用していませんが、将来的に）
   - アルバム詳細表示
   - Spotifyリンク動作

3. **レスポンシブ**
   - スマートフォン表示
   - タブレット表示
   - デスクトップ表示

4. **パフォーマンス**
   - 初回ロード時間
   - 画像読み込み
   - API応答時間

## 💡 運用のコツ

1. **監視設定**
   - Uptimeロボットでサイト監視
   - エラーログの定期確認

2. **バックアップ**
   - Gitリポジトリの定期更新
   - 環境変数の安全な保管

3. **スケーリング**
   - アクセス数に応じたプラン変更
   - CDN設定の検討

本番デプロイが完了したら、URLを共有して多くの人に音楽を楽しんでもらいましょう！🎵