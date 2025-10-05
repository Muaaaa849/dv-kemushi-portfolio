-- Add production_date to works table
ALTER TABLE works ADD COLUMN production_date DATE;

-- Create settings table for global settings
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert default available date
INSERT OR IGNORE INTO settings (key, value) 
VALUES ('available_date', date('now', '+14 days'));

-- Create calendar events table for availability management
CREATE TABLE IF NOT EXISTS calendar_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  note TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index for calendar
CREATE INDEX IF NOT EXISTS idx_calendar_date ON calendar_events(date);