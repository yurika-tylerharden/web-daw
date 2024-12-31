const express = require('express');
const router = express.Router();

// Get all band members
router.get('/members', async (req, res) => {
  try {
    const { results } = await env.DB.prepare('SELECT * FROM band').all();
    res.json(results);
  } catch (error) {
    console.error('Error fetching band members:', error);
    res.status(500).json({ error: 'Failed to fetch band members' });
  }
});

// Add a new band member
router.post('/members', async (req, res) => {
  const { member_name, member_instrument, member_colour } = req.body;
  try {
    const result = await env.DB.prepare('INSERT INTO band (member_name, member_instrument, member_colour) VALUES (?, ?, ?)')
      .bind(member_name, member_instrument, member_colour)
      .run();
    res.json({ id: result.lastInsertRowid });
  } catch (error) {
    console.error('Error adding band member:', error);
    res.status(500).json({ error: 'Failed to add band member' });
  }
});

// Update a band member
router.put('/members/:id', async (req, res) => {
  const { id } = req.params;
  const { member_name, member_instrument, member_colour } = req.body;
  try {
    const result = await env.DB.prepare('UPDATE band SET member_name = ?, member_instrument = ?, member_colour = ? WHERE id = ?')
      .bind(member_name, member_instrument, member_colour, id)
      .run();
    res.json({ changes: result.changes });
  } catch (error) {
    console.error('Error updating band member:', error);
    res.status(500).json({ error: 'Failed to update band member' });
  }
});

// Delete a band member
router.delete('/members/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await env.DB.prepare('DELETE FROM band WHERE id = ?')
      .bind(id)
      .run();
    res.json({ changes: result.changes });
  } catch (error) {
    console.error('Error deleting band member:', error);
    res.status(500).json({ error: 'Failed to delete band member' });
  }
});

module.exports = router;