# SLEEVE - Spotify Album Art Gallery

## 概要
HTMLファイルをSpotify APIを使ったWebサービスに変換し、Vercel + Railwayでデプロイ

## アーキテクチャ
- **フロントエンド**: React + TypeScript (Vercel)
- **バックエンド**: Express + TypeScript (Railway)
- **API**: Spotify Web API (Client Credentials Flow)
- **スタイル**: Styled Components
- **フォント**: Google Fonts (Knewave)

## 開発履歴

### 初期構築
- `sleeve.html`の分析とWebサービス化の要件確認
- OAuth不要のClient Credentials Flowを採用
- React + Express構成でフロントエンド・バックエンド分離

### 主要機能
- **テーマ切り替え**: 新着アルバム、人気アルバム、ジャンル別、ムード別
- **Popularityフィルター**: アーティストの人気度30-100で品質向上
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **検索機能**: 特定アーティスト・アルバム検索

### デプロイメント
- **Vercel**: フロントエンドホスティング
- **Railway**: バックエンドAPI
- **GitHub**: ソースコード管理と自動デプロイ

### 技術的解決事項

#### CORS問題
- 複数のVercelドメインに対応
- 正規表現パターンで動的ドメイン許可

#### UI/UX改善
- ボタンの反応速度向上
- タッチイベント最適化
- Knewaveフォントの適用

#### API最適化
- Spotify APIレート制限対策
- Popularityフィルターの実装
- エラーハンドリングの強化

### 現在の課題
- Spotify APIの500エラー（アーティスト詳細取得時）
- Popularityフィルターの最適化が必要

### 環境変数
```bash
# Railway (Backend)
SPOTIFY_CLIENT_ID=xxx
SPOTIFY_CLIENT_SECRET=xxx

# Vercel (Frontend)  
REACT_APP_API_BASE_URL=https://sleeve-spotify-gallery-production.up.railway.app
```

### ローカル開発
```bash
# Backend
cd sleeve-backend
npm run dev

# Frontend
cd sleeve-frontend
npm start
```

### 本番URL
- **フロントエンド**: https://sleeve-spotify-gallery.vercel.app
- **バックエンド**: https://sleeve-spotify-gallery-production.up.railway.app

## 今後の改善案
- [ ] Popularityフィルターの最適化
- [ ] アルバムアートの遅延ロード
- [ ] ユーザーお気に入り機能
- [ ] カスタムドメイン設定