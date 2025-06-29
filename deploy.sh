#!/bin/bash

echo "🚀 SLEEVE デプロイスクリプト"
echo "=============================="

# 環境確認
if [ ! -f ".env.production" ]; then
    echo "❌ .env.production ファイルが見つかりません"
    echo "📝 .env.production ファイルを作成して本番用環境変数を設定してください"
    exit 1
fi

echo "✅ 環境変数ファイル確認完了"

# Git確認
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ Git リポジトリはクリーンです"
else
    echo "⚠️  未コミットの変更があります"
    read -p "続行しますか？ (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# ビルドテスト
echo "🔨 ローカルビルドテスト中..."

# バックエンドビルド
cd sleeve-backend
if npm run build; then
    echo "✅ バックエンドビルド成功"
else
    echo "❌ バックエンドビルド失敗"
    exit 1
fi
cd ..

# フロントエンドビルド
cd sleeve-frontend
if npm run build; then
    echo "✅ フロントエンドビルド成功"
else
    echo "❌ フロントエンドビルド失敗"
    exit 1
fi
cd ..

echo "🎉 ローカルビルドテスト完了"
echo ""
echo "📋 次のステップ:"
echo "1. GitHubにコードをプッシュ"
echo "2. バックエンド: Railway/Herokuにデプロイ"
echo "3. フロントエンド: Vercel/Netlifyにデプロイ"
echo "4. Spotify Developer DashboardでリダイレクトURIを更新"
echo ""
echo "詳細な手順は DEPLOYMENT.md を参照してください"