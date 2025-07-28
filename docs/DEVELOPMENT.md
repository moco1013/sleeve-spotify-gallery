# 開発ドキュメント

## セッション履歴 (2025-06-29)

### 問題解決の流れ

#### 1. HTMLからWebサービス化
- **要求**: `sleeve.html`をSpotify APIを使ったWebサービスに変換
- **解決**: React + Express構成でSPA化
- **期間**: セッション開始〜

#### 2. OAuth認証の簡素化
- **問題**: OAuth認証の複雑性
- **解決**: Client Credentials Flowで認証不要のアクセス
- **利点**: 一般ユーザーがログインなしで利用可能

#### 3. デプロイメント設定
- **選択**: Vercel (Frontend) + Railway (Backend)
- **課題**: 
  - CORSの設定
  - 環境変数の管理
  - ドメイン間通信

#### 4. UI/UXの改善
- **課題**: ボタンの反応が悪い
- **解決**: 
  - `useCallback`でイベント最適化
  - `touch-action: manipulation`でモバイル対応
  - CSS `transition`時間の短縮

#### 5. コンテンツ品質向上
- **要求**: マイナーアーティストを除外したい
- **実装**: Spotify Artist Popularity (30-100) フィルター
- **課題**: APIレート制限によるエラー

### 技術的学習事項

#### Spotify API制限
- 大量の並列リクエストでレート制限に触れる
- アーティスト詳細取得 (popularity) は重い処理
- 解決策: キャッシュ、バッチ処理、制限緩和

#### Vercelのドメイン管理
- デプロイごとに新しいドメインが生成される
- 正規表現パターンでCORS動的対応が必要

#### React State Management
- テーマ切り替えの状態管理
- API呼び出しの最適化
- ローディング状態の管理

### 現在の技術スタック

```
Frontend (Vercel)
├── React 18
├── TypeScript
├── Styled Components
├── Axios
└── React Router

Backend (Railway)  
├── Express
├── TypeScript
├── CORS
├── Axios (Spotify API)
└── Session管理

External Services
├── Spotify Web API
├── Google Fonts
└── GitHub (CI/CD)
```

### エラー解決履歴

#### CORS エラー
```
Access-Control-Allow-Origin header is missing
```
**解決**: allowedOrigins配列にVercelドメインを追加

#### TypeScript型エラー
```
Type 'string | undefined' is not assignable to type 'StaticOrigin'
```
**解決**: CORS設定で環境変数のundefinedチェック

#### API 500エラー
```
server responded with a status of 500
```
**現在調査中**: Spotify APIのレート制限が原因の可能性

### デバッグ手法
1. **ブラウザ開発者ツール**: Network, Console
2. **Railway ログ**: Deploy Logs, HTTP Logs  
3. **段階的無効化**: 機能を一時的に無効化して原因特定
4. **詳細ログ追加**: console.logで処理フロー追跡