const express = require('express');
const router = express.Router();
const parseStems = require('../utils/parseStems');
const path = require('path');

// API endpoint to fetch song data
router.get('/songs', async (req, res) => {
  try {
    const { results } = await env.DB.prepare('SELECT * FROM songs').all();
    res.json(results);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
});

// API endpoint to fetch stems
router.get('/stems/:key', async (req, res) => {
  const key = req.params.key;
  try {
    const object = await env.STEMS_BUCKET.get(key);
    if (!object) {
      return res.status(404).json({ error: 'Stem not found' });
    }

    res.setHeader('Content-Type', object.httpMetadata.contentType);
    res.send(object.body);
  } catch (error) {
    console.error('Error fetching stem:', error);
    res.status(500).json({ error: 'Failed to fetch stem' });
  }
});

// API endpoint to process and add stems to the database
router.post('/process-stems', async (req, res) => {
  try {
    const songs = await parseStems(env.STEMS_BUCKET);

    for (const song of songs) {
      const { name, bpm, key, stems } = song;

      // Check if the song already exists
      const existingSong = await env.DB.prepare('SELECT * FROM songs WHERE name = ? AND bpm = ?')
        .bind(name, bpm)
        .first();

      let songId;
      if (existingSong) {
        songId = existingSong.id;
      } else {
        // Insert new song
        const result = await env.DB.prepare('INSERT INTO songs (name, bpm, key) VALUES (?, ?, ?)')
          .bind(name, bpm, key)
          .run();
        songId = result.lastInsertRowid;
      }

      // Insert stems
      for (const stem of stems) {
        const { stemName, filePath, stemGroup, assigned_to, volume } = stem;

        // Check if the stem already exists
        const existingStem = await env.DB.prepare('SELECT * FROM stems WHERE song_id = ? AND stem_name = ?')
          .bind(songId, stemName)
          .first();

        if (!existingStem) {
          await env.DB.prepare('INSERT INTO stems (song_id, stem_name, file_path, stem_group, assigned_to, volume) VALUES (?, ?, ?, ?, ?, ?)')
            .bind(songId, stemName, filePath, stemGroup, assigned_to, volume)
            .run();
        }
      }
    }

    res.json({ message: 'Stems processed and added to the database successfully' });
  } catch (error) {
    console.error('Error processing stems:', error);
    res.status(500).json({ error: 'Failed to process stems' });
  }
});

module.exports = router;