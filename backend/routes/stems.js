const express = require('express');
const router = express.Router();
const parseStems = require('../utils/parseStems');
const path = require('path');

// API endpoint to fetch song data
router.get('/songs', (req, res) => {
    const stemsFolderPath = path.join(__dirname, '../data/stems');
    try {
        const songs = parseStems(stemsFolderPath);
        res.json(songs);
    } catch (error) {
        console.error('Error reading stems folder:', error);
        res.status(500).json({ error: 'Failed to read stems folder' });
    }
});

module.exports = router;
