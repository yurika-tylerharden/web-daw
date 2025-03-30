import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

const SongsPage = ({ songs, onSelectSong, onViewStems, fetchSongs }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [newKey, setNewKey] = useState('');

  const handleEdit = (song) => {
    setCurrentSong(song);
    setNewKey(song.key);
    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/songs/${currentSong.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key: newKey }),
      });
      if (response.ok) {
        fetchSongs();
        setShowEditModal(false);
      } else {
        console.error('Error updating song');
      }
    } catch (error) {
      console.error('Error updating song:', error);
    }
  };

  return (
    <div className="songs-page">
      <h2 className="songs-page-title">Songs</h2>
      <div className="songs-container">
        {songs.map((song) => (
          <Card key={song.id} className="song-card">
            <Card.Body>
              <Card.Title>{song.name}</Card.Title>
              <Card.Text>
                <strong>BPM:</strong> {song.bpm}<br />
                <strong>Key:</strong> {song.key}<br />
                <strong>Length:</strong> {song.length || 'N/A'}
              </Card.Text>
              <Button variant="primary" onClick={() => handleEdit(song)}>Edit</Button>
              <Button variant="secondary" className="ml-2" onClick={(e) => {
                e.stopPropagation();
                onViewStems(song);
              }}>View Stems</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSongKey">
              <Form.Label>Key</Form.Label>
              <Form.Control
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SongsPage;