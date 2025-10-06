# D1データベース設定手順

## オプション1: 新しいPagesプロジェクトとして作成

1. Cloudflare Pagesで新しいプロジェクトを作成
   - プロジェクト名: `dv-kemushi-portfolio-v2`（または別の名前）
   - GitHubリポジトリを再度接続
   
2. **初回セットアップ時**にD1バインディングを設定
   - Build設定の画面で「Environment variables」を展開
   - 「Add variable」でD1設定を追加

## オプション2: Wrangler CLIから直接デプロイ

ローカルでwrangler.tomlを設定後：
```bash
wrangler pages deploy dist --project-name dv-kemushi-portfolio
```

## オプション3: Workers として作成

Pagesの代わりにWorkersとして作成し、D1を接続：
```bash
wrangler deploy
```

