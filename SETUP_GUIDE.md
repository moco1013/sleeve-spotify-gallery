# SLEEVE アプリケーション セットアップ・確認ガイド

## 1. Spotify API設定

### Spotify Developer Dashboardでの設定
1. https://developer.spotify.com/dashboard/ にアクセス
2. 「Create App」をクリック
3. アプリ情報を入力:
   - App name: `SLEEVE`
   - App description: `Album Art Gallery`
   - Redirect URI: `http://localhost:3001/auth/callback`
   - API: `Web API`にチェック
4. 作成後、Client IDとClient Secretをメモ

## 2. 環境変数設定

```bash
# ルートディレクトリに移動
cd /Users/tomoko.tsuzuku/TestDev/claude

# 環境変数ファイルを作成
cp .env.example .env

# .envファイルを編集して以下を設定:
SPOTIFY_CLIENT_ID=your_actual_client_id_here
SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
SPOTIFY_REDIRECT_URI=http://localhost:3001/auth/callback
SESSION_SECRET=some_random_secret_string
FRONTEND_URL=http://localhost:3000
REACT_APP_API_URL=http://localhost:3001
```

## 3. 開発環境での起動

### バックエンド起動
```bash
cd sleeve-backend
npm install
npm run dev
```
✅ `🎵 SLEEVE Backend running on port 3001` が表示されればOK

### フロントエンド起動（新しいターミナル）
```bash
cd sleeve-frontend
npm install
npm start
```
✅ ブラウザが自動で http://localhost:3000 に開けばOK

## 4. 動作確認手順

### 4.1 基本動作確認
1. **ログインページ**: http://localhost:3000 にアクセス
   - 「Spotifyでログイン」ボタンが表示される
   
2. **認証フロー**: ログインボタンをクリック
   - Spotifyの認証ページにリダイレクト
   - Spotifyアカウントでログイン
   - アプリの権限を許可
   - ダッシュボードにリダイレクト

3. **ダッシュボード**: 認証成功後
   - ヘッダーにユーザー名とアバターが表示
   - 新着アルバムのグリッドが表示
   - 各アルバムにホバーで再生ボタンが表示

### 4.2 機能確認
1. **検索機能**:
   - 検索バーに「Beatles」や「Taylor Swift」を入力
   - 検索結果のアルバムが表示される

2. **アルバム詳細**:
   - アルバムカードをクリック
   - モーダルでアルバム詳細が表示
   - 「Spotifyで開く」ボタンでSpotifyアプリに移動

3. **無限スクロール**:
   - ページを下にスクロール
   - 「もっと見る」ボタンで追加のアルバムが読み込まれる

4. **ログアウト**:
   - ヘッダーの「ログアウト」ボタンをクリック
   - ログインページにリダイレクト

## 5. Docker環境での確認

```bash
# ルートディレクトリで実行
docker-compose up -d

# ログ確認
docker-compose logs -f

# ブラウザで確認
# http://localhost:3000 (フロントエンド)
# http://localhost:3001/health (バックエンドヘルスチェック)
```

## 6. トラブルシューティング

### よくあるエラーと解決方法

#### 1. 「Authentication required」エラー
- Spotify Client IDとSecretが正しく設定されているか確認
- Redirect URIがSpotify Dashboardと一致しているか確認

#### 2. CORSエラー
- バックエンドとフロントエンドが正しいポートで起動しているか確認
- 環境変数のURLが正しく設定されているか確認

#### 3. 「Failed to search albums」エラー
- Spotifyの認証が正しく完了しているか確認
- ネットワーク接続を確認

#### 4. ページが表示されない
- Node.jsのバージョンが18以上か確認
- `npm install`が正常に完了しているか確認

## 7. 確認用のテストURL

### API動作確認
```bash
# ヘルスチェック
curl http://localhost:3001/health

# 認証確認（ブラウザのセッションが必要）
curl -b cookies.txt http://localhost:3001/auth/me
```

### フロントエンド確認
- http://localhost:3000 - メインアプリ
- http://localhost:3000/login - ログインページ
- http://localhost:3000/dashboard - ダッシュボード（要認証）

## 8. 成功時の表示例

### ログイン前
- シンプルなログインページ
- 「SLEEVE」ロゴ
- 「Spotifyでログイン」ボタン

### ログイン後
- ユーザー情報付きヘッダー
- 検索バー
- アルバムカードのグリッド表示
- スムーズなホバーアニメーション

すべて正常に動作すれば、元のHTMLファイルの機能をSpotify APIを使って完全に再現したWebサービスが完成です！