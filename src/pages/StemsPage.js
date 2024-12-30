import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import Waveform from '../components/Waveform';

const StemsPage = ({ stems, songName, bpm, onGroupChange }) => {
    const [muteStatus, setMuteStatus***REMOVED*** = useState({});
    const [soloStatus, setSoloStatus***REMOVED*** = useState({});

    const handleMute = (stemId) => {
        setMuteStatus((prev) => ({ ...prev, [stemId***REMOVED***: !prev[stemId***REMOVED*** }));
    };

    const handleSolo = (stemId) => {
        const newSoloStatus = { [stemId***REMOVED***: true };
        setSoloStatus(newSoloStatus);
    };

    const handleAssign = (stemId, group) => {
        onGroupChange(stemId, group);
    };

    return (
        <div className="stems-page">
            <h2>{`Stems for ${songName} (BPM: ${bpm})`}</h2>
            <div className="stems-container">
                {stems.map((stem, index) => (
                    <div key={index} className="stem-channel">
                        <h4>{stem.stemName}</h4>
                        <Button
                            variant={muteStatus[stem.stemName***REMOVED*** ? 'secondary' : 'danger'}
                            onClick={() => handleMute(stem.stemName)}
                        >
                            {muteStatus[stem.stemName***REMOVED*** ? 'Unmute' : 'Mute'}
                        </Button>
                        <Button
                            variant={soloStatus[stem.stemName***REMOVED*** ? 'primary' : 'secondary'}
                            onClick={() => handleSolo(stem.stemName)}
                        >
                            Solo
                        </Button>
                        <Dropdown onSelect={(group) => handleAssign(stem.stemName, group)}>
                            <Dropdown.Toggle variant="info" id={`dropdown-${stem.stemName}`}>
                                Assign
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Backing Track">
                                    Assign to Backing Track
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Band Member 1">
                                    Assign to Band Member 1
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Band Member 2">
                                    Assign to Band Member 2
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    
                ))}
            </div>
        </div>
    );
};

export default StemsPage;
