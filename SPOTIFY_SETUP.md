# Spotify API設定手順

## 1. Spotify Developer Dashboardにアクセス

1. https://developer.spotify.com/dashboard/ をブラウザで開く
2. Spotifyアカウントでログイン（持っていない場合は作成）

## 2. アプリケーションを作成

1. 「Create App」ボタンをクリック
2. 以下の情報を入力：
   - **App name**: `SLEEVE`
   - **App description**: `Album Art Gallery Application`
   - **Website**: `http://localhost:3000`
   - **Redirect URI**: `http://localhost:3001/auth/callback`
   - **Which API/SDKs are you planning to use?**: 
     - ✅ Web API にチェック

3. 「Save」をクリック

## 3. Client IDとSecretを取得

1. 作成されたアプリをクリック
2. 「Settings」をクリック
3. 以下をコピー：
   - **Client ID**: `12345abcde...` のような文字列
   - **Client secret**: 「View client secret」をクリックして表示される文字列

## 4. 環境変数ファイルを更新

取得した値を使って `.env` ファイルを更新してください：

```
SPOTIFY_CLIENT_ID=ここに実際のClient IDを貼り付け
SPOTIFY_CLIENT_SECRET=ここに実際のClient Secretを貼り付け
```

## 準備できたら次のステップに進みます！