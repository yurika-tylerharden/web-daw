const express = require('express');
const router = express.Router();
const parseStems = require('../utils/parseStems');
const path = require('path');
const { db } = require('../db/init');

// API endpoint to fetch song data
router.get('/songs', async (req, res) => {
    const stemsFolderPath = path.join(__dirname, '../data/stems');
    try {
        const songs = parseStems(stemsFolderPath);

        // Save new songs to the database
        for (const song of songs) {
            const { name, bpm, key, stems } = song;

            // Check if the song already exists
            const existingSong = await new Promise((resolve, reject) => {
                db.get('SELECT * FROM songs WHERE name = ? AND bpm = ?', [name, bpm***REMOVED***, (err, row) => {
                    if (err) reject(err);
                    resolve(row);
                });
            });

            let songId;
            if (existingSong) {
                songId = existingSong.id;
            } else {
                // Insert new song
                songId = await new Promise((resolve, reject) => {
                    db.run('INSERT INTO songs (name, bpm, key) VALUES (?, ?, ?)', [name, bpm, key***REMOVED***, function (err) {
                        if (err) reject(err);
                        resolve(this.lastID);
                    });
                });
            }

            // Insert stems
            for (const stem of stems) {
                const { stemName, filePath, stemGroup, assigned_to, volume } = stem;

                // Check if the stem already exists
                const existingStem = await new Promise((resolve, reject) => {
                    db.get('SELECT * FROM stems WHERE song_id = ? AND stem_name = ?', [songId, stemName***REMOVED***, (err, row) => {
                        if (err) reject(err);
                        resolve(row);
                    });
                });

                if (!existingStem) {
                    db.run('INSERT INTO stems (song_id, stem_name, file_path, stem_group, assigned_to, volume) VALUES (?, ?, ?, ?, ?, ?)', [songId, stemName, filePath, stemGroup, assigned_to, volume***REMOVED***);
                }
            }
        }

        // Fetch all songs with stems from the database
        const allSongs = await new Promise((resolve, reject) => {
            db.all(`
                SELECT songs.id, songs.name, songs.bpm, songs.key, stems.id AS stem_id, stems.stem_name, stems.file_path, stems.stem_group, stems.assigned_to, stems.volume
                FROM songs
                LEFT JOIN stems ON songs.id = stems.song_id
            `, (err, rows) => {
                if (err) reject(err);

                const songsMap = {};
                rows.forEach(row => {
                    if (!songsMap[row.id***REMOVED***) {
                        songsMap[row.id***REMOVED*** = {
                            id: row.id,
                            name: row.name,
                            bpm: row.bpm,
                            key: row.key,
                            stems: [***REMOVED***
                        };
                    }
                    songsMap[row.id***REMOVED***.stems.push({
                        id: row.stem_id,
                        stemName: row.stem_name,
                        filePath: row.file_path,
                        stemGroup: row.stem_group,
                        assigned_to: row.assigned_to,
                        volume: row.volume
                    });
                });

                resolve(Object.values(songsMap));
            });
        });

        res.json(allSongs);
    } catch (error) {
        console.error('Error reading stems folder:', error);
        res.status(500).json({ error: 'Failed to read stems folder' });
    }
});

module.exports = router;