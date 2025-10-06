# データベースバックアップ・復元ガイド

## バックアップ方法

### 方法1: Cloudflare D1 Console でエクスポート

1. Cloudflare Dashboard → D1 → `dv-kemushi-portfolio-db`
2. Console タブで以下を実行：

```sql
-- CSV形式でエクスポート（コピーして保存）
SELECT * FROM works;
SELECT * FROM settings;
```

### 方法2: Wrangler CLIでバックアップ（ローカル環境）

```bash
# 全データをエクスポート
npx wrangler d1 execute dv-kemushi-portfolio-db \
  --command="SELECT * FROM works" > works_backup.json

npx wrangler d1 execute dv-kemushi-portfolio-db \
  --command="SELECT * FROM settings" > settings_backup.json
```

## 復元方法

### SQLファイルとして保存しておく

`backup_data.sql`:
```sql
-- 作品データの復元
INSERT INTO works (title, category, embed_code, description, production_date) VALUES
('作品タイトル1', 'mv', 'YouTubeID1', '説明1', '2024-01-15'),
('作品タイトル2', 'lyric', 'YouTubeID2', '説明2', '2024-02-20');

-- 設定の復元
INSERT OR REPLACE INTO settings (key, value) VALUES
('available_date', '2024-12-31');
```

### 復元コマンド

```bash
# SQLファイルから復元
npx wrangler d1 execute dv-kemushi-portfolio-db \
  --file=./backup_data.sql
```

## 自動バックアップの推奨

1. **重要な作品を追加した後は必ずバックアップ**
2. **週1回程度の定期バックアップ**
3. **バックアップファイルは別の場所（Google Drive等）にも保存**

## データが消えないケース

以下の操作では**データは消えません**：
- ✅ コードの更新（HTML/CSS/JS）
- ✅ デザインの変更
- ✅ 新機能の追加
- ✅ GitHub経由のデプロイ
- ✅ Environment Variablesの変更
- ✅ Custom Domainの設定

## データが消える可能性があるケース

以下の操作は**注意が必要**：
- ⚠️ D1データベースの削除
- ⚠️ `DROP TABLE` コマンドの実行
- ⚠️ Cloudflare Pagesプロジェクトの削除
- ⚠️ データベースIDの変更（別のDBに切り替え）