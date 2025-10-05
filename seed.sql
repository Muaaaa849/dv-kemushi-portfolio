-- Sample works data
INSERT OR IGNORE INTO works (title, category, embed_code, description, is_featured, display_order) VALUES 
  ('夜空に願いを', 'mv', 'dQw4w9WgXcQ', 'ボカロオリジナル楽曲のMV制作。星空をテーマにした幻想的な映像表現。', TRUE, 1),
  ('雨音のメロディ', 'lyric', 'dQw4w9WgXcQ', 'しっとりとしたバラード曲のリリックビデオ。雨をモチーフにした演出。', TRUE, 2),
  ('桜の約束', 'mv', 'dQw4w9WgXcQ', '歌ってみた動画のMV制作。春の情景を描いた温かみのある映像。', FALSE, 3),
  ('深海の声', 'lyric', 'dQw4w9WgXcQ', 'ディープな世界観のリリックモーション。水中をイメージした演出。', FALSE, 4),
  ('月光ソナタ', 'mv', 'dQw4w9WgXcQ', 'クラシックアレンジ楽曲のMV。月明かりの下での幻想的な物語。', FALSE, 5),
  ('風の記憶', 'lyric', 'dQw4w9WgXcQ', 'ノスタルジックな楽曲のリリックビデオ。風景の移り変わりを表現。', FALSE, 6);

-- Sample contact (optional)
INSERT OR IGNORE INTO contacts (name, email, type, message) VALUES 
  ('テスト太郎', 'test@example.com', 'mv', 'MVの制作をお願いしたいです。詳細についてご相談させてください。');