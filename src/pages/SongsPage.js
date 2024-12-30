import React from 'react';
import { Table, Button } from 'react-bootstrap';

const SongsPage = ({ songs, onSelectSong, onViewStems }) => {
    return (
        <div className="songs-page">
            <h2>Songs</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Tempo (BPM)</th>
                        <th>Key</th>
                        <th>Number of Stems</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song) => (
                        <tr key={song.name} onClick={() => onSelectSong(song)}>
                            <td>{song.name}</td>
                            <td>{song.bpm}</td>
                            <td>{song.key}</td>
                            <td>{song.stems.length}</td>
                            <td>
                                <Button variant="primary" onClick={onViewStems}>
                                    View Stems
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default SongsPage;
