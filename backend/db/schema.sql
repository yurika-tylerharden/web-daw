DROP TABLE IF EXISTS songs;
CREATE TABLE IF NOT EXISTS songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    bpm INTEGER NOT NULL,
    key TEXT
);

DROP TABLE IF EXISTS stems;
CREATE TABLE IF NOT EXISTS stems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    song_id INTEGER NOT NULL,
    stem_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    stem_group TEXT,
    assigned_to INTEGER,
    volume REAL,
    FOREIGN KEY (song_id) REFERENCES songs(id),
    FOREIGN KEY (assigned_to) REFERENCES band(id)
);

DROP TABLE IF EXISTS band;
CREATE TABLE IF NOT EXISTS band (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_name TEXT NOT NULL,
    member_instrument TEXT,
    member_colour TEXT
);