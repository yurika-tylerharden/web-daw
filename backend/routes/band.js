const express = require('express');
const router = express.Router();
const { db } = require('../db/init');

// Get all band members
router.get('/members', (req, res) => {
    db.all('SELECT * FROM band', (err, rows) => {
        if (err) {
            console.error('Error fetching band members:', err);
            res.status(500).json({ error: 'Failed to fetch band members' });
        } else {
            res.json(rows);
        }
    });
});

// Add a new band member
router.post('/members', (req, res) => {
    const { member_name, member_instrument, member_colour } = req.body;
    db.run(
        'INSERT INTO band (member_name, member_instrument, member_colour) VALUES (?, ?, ?)',
        [member_name, member_instrument, member_colour***REMOVED***,
        function (err) {
            if (err) {
                console.error('Error adding band member:', err);
                res.status(500).json({ error: 'Failed to add band member' });
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

// Update a band member
router.put('/members/:id', (req, res) => {
    const { id } = req.params;
    const { member_name, member_instrument, member_colour } = req.body;
    db.run(
        'UPDATE band SET member_name = ?, member_instrument = ?, member_colour = ? WHERE id = ?',
        [member_name, member_instrument, member_colour, id***REMOVED***,
        function (err) {
            if (err) {
                console.error('Error updating band member:', err);
                res.status(500).json({ error: 'Failed to update band member' });
            } else {
                res.json({ changes: this.changes });
            }
        }
    );
});

// Delete a band member
router.delete('/members/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM band WHERE id = ?', [id***REMOVED***, function (err) {
        if (err) {
            console.error('Error deleting band member:', err);
            res.status(500).json({ error: 'Failed to delete band member' });
        } else {
            res.json({ changes: this.changes });
        }
    });
});

module.exports = router;