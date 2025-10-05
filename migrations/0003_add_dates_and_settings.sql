-- Create settings table for global settings (if not exists)
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default available date (2 weeks from now)
INSERT OR IGNORE INTO settings (key, value) 
VALUES ('available_date', date('now', '+14 days'));