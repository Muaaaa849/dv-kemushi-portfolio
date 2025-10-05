# DVけむし - Portfolio Website

## プロジェクト概要
- **名前**: DVけむし ポートフォリオサイト
- **目的**: 映像制作サービスのプロモーションと作品展示
- **主な機能**: 作品ポートフォリオ、料金案内、お問い合わせ、管理機能

## URL
- **開発環境**: https://3000-ihcctq8hn9zb6ka02952y-6532622b.e2b.dev
- **本番環境**: https://dv-kemushi-portfolio.pages.dev (デプロイ後)
- **X (Twitter)**: https://x.com/dvKemushi
- **GitHub**: (未設定)

## 実装済み機能

### 公開ページ
1. **トップページ** (`/`)
   - 雨のアニメーション効果
   - オリジナルアイコン表示
   - クリック/タッチ波紋エフェクト
   - サービス紹介
   - 最新作品プレビュー
   - Twitter タイムライン埋め込み

2. **ポートフォリオページ** (`/portfolio`)
   - 作品ギャラリー表示
   - カテゴリーフィルター（MV/Lyric）
   - YouTube埋め込み再生
   - Twitter シェア機能

3. **料金・制作の流れページ** (`/pricing`)
   - 基本料金：10,000円〜
   - 納期：4週間
   - 支払い方法：PayPal/銀行振込
   - 6段階の制作フロー説明

4. **お問い合わせページ** (`/contact`)
   - X (Twitter) アカウントへのリンク
   - DMでのお問い合わせ案内
   - 最新ポストの表示

### 管理機能
1. **管理者ログイン** (`/admin`)
   - パスワード認証
   - JWT トークン発行

2. **管理ダッシュボード** (`/admin/dashboard`)
   - 作品の追加・削除
   - YouTube埋め込みコード管理

### API エンドポイント
- `POST /api/admin/login` - 管理者認証
- `GET /api/works` - 作品一覧取得
- `POST /api/works` - 作品追加
- `DELETE /api/works/:id` - 作品削除
- `GET /api/settings/:key` - 設定取得
- `POST /api/settings/:key` - 設定更新

## データアーキテクチャ

### データモデル
- **works**: 作品情報（タイトル、カテゴリー、YouTube埋め込み、説明）
- **contacts**: お問い合わせ情報

### ストレージサービス
- **Cloudflare D1**: SQLiteベースのデータベース（作品・お問い合わせ管理）

## 技術スタック
- **Backend**: Hono Framework
- **Frontend**: HTML + TailwindCSS + Vanilla JavaScript
- **Database**: Cloudflare D1
- **Deployment**: Cloudflare Pages
- **Runtime**: Cloudflare Workers

## デザイン特徴
- 雨のしとしと降る淡く儚いイメージ
- オリジナルキャラクターアイコン
- クリック/タッチで波紋が広がるインタラクティブ演出
- グラスモーフィズム効果
- レスポンシブデザイン
- スムーズなアニメーション効果

## 使用方法

### ローカル開発
```bash
# ビルド
npm run build

# ローカルサーバー起動
pm2 start ecosystem.config.cjs

# データベースリセット
npm run db:reset
```

### 管理画面へのアクセス
1. `/admin` にアクセス
2. パスワード `admin123` でログイン（初期設定）
3. 作品の追加・削除が可能

### Cloudflare Pages へのデプロイ
```bash
# プロジェクト作成（初回のみ）
npx wrangler pages project create dv-kemushi-portfolio

# デプロイ
npm run deploy:prod
```

## 環境変数設定（本番環境）
```bash
# 管理者パスワード設定
npx wrangler pages secret put ADMIN_PASSWORD --project-name dv-kemushi-portfolio

# JWT秘密鍵設定
npx wrangler pages secret put JWT_SECRET --project-name dv-kemushi-portfolio
```

## インタラクション機能
- **波紋エフェクト**: クリックやタッチした場所から水の波紋が広がる
- **モバイル対応**: タッチイベントに最適化、長押しで特別な波紋
- **ハプティックフィードバック**: 対応端末で触覚フィードバック
- **スクロール判定**: スクロール中は波紋を抑制

## 今後の改善案
1. 作品の表示順序カスタマイズ機能
2. 画像サムネイル対応（Cloudflare R2連携）
3. お問い合わせ管理画面
4. メール通知機能（SendGrid連携）
5. アクセス解析機能
6. 作品詳細ページ
7. ブログ機能

## デプロイステータス
- **Platform**: Cloudflare Pages
- **Status**: ❌ 未デプロイ
- **Last Updated**: 2025-10-05

## ファイル構成
```
public/
  icon-dvkemushi.png  # オリジナルアイコン
  static/
    app.js           # フロントエンドJavaScript
    style.css        # カスタムCSS
```