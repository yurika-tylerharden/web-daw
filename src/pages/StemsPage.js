import React, { useEffect, useRef, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import Multitrack from 'wavesurfer-multitrack';

const StemsPage = ({ stems, songName, bpm, onGroupChange }) => {
    const containerRef = useRef(null);
    const [multitrack, setMultitrack***REMOVED*** = useState(null);
    const [isPlaying, setIsPlaying***REMOVED*** = useState(false);
    const [muteStatus, setMuteStatus***REMOVED*** = useState({});
    const [soloStatus, setSoloStatus***REMOVED*** = useState({});

    useEffect(() => {
        if (containerRef.current && stems.length > 0) {
            const tracks = stems.map((stem, index) => ({
                id: index,
                url: stem.filePath,
                draggable: true,
                startPosition: 0,
                volume: 1,
                options: {
                    waveColor: 'hsl(200, 50%, 70%)',
                    progressColor: 'hsl(200, 50%, 50%)',
                },
            }));

            try {
                const mt = Multitrack.create(tracks, {
                    container: containerRef.current,
                    minPxPerSec: 20,
                    cursorWidth: 2,
                    cursorColor: '#D72F21',
                    trackBackground: '#2D2D2D',
                    trackBorderColor: '#7C7C7C',
                    height: 100, // Default height for each track
                });

                setMultitrack(mt);
            } catch (error) {
                console.error('Error initializing Multitrack:', error);
            }

            // Cleanup on unmount
            return () => {
                if (multitrack) {
                    multitrack.destroy();
                    setMultitrack(null);
                }
            };
        }
    }, [stems***REMOVED***);

    const handlePlayPause = () => {
        if (multitrack) {
            if (multitrack.isPlaying()) {
                multitrack.pause();
                setIsPlaying(false);
            } else {
                multitrack.play();
                setIsPlaying(true);
            }
        }
    };

    const handleMute = (stemId) => {
        if (multitrack) {
            const isMuted = !muteStatus[stemId***REMOVED***;
            setMuteStatus((prev) => ({ ...prev, [stemId***REMOVED***: isMuted }));
            multitrack.setTrackVolume(stemId, isMuted ? 0 : 1);
        }
    };

    const handleSolo = (stemId) => {
        if (multitrack) {
            const isSoloed = !soloStatus[stemId***REMOVED***;
            setSoloStatus((prev) => ({ ...prev, [stemId***REMOVED***: isSoloed }));
            // Implement solo logic here
        }
    };

    const handleZoom = (value) => {
        if (multitrack) {
            multitrack.zoom(value);
        }
    };

    const handleAssign = (stemId, group) => {
        onGroupChange(stemId, group);
    };

    return (
        <div className="stems-page">
            <h2>{`Stems for ${songName} (BPM: ${bpm})`}</h2>
            <div style={{ marginBottom: '1em' }}>
                <Button onClick={handlePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <input
                    type="range"
                    min="10"
                    max="100"
                    defaultValue="20"
                    onChange={(e) => handleZoom(e.target.valueAsNumber)}
                    style={{ marginLeft: '1em', width: '300px' }}
                />
            </div>
            <div className="stems-container">
                {stems.map((stem, index) => (
                    <div key={index} className="stem-channel">
                        <h4>{stem.stemName}</h4>
                        <Button
                            variant={muteStatus[index***REMOVED*** ? 'secondary' : 'danger'}
                            onClick={() => handleMute(index)}
                        >
                            {muteStatus[index***REMOVED*** ? 'Unmute' : 'Mute'}
                        </Button>
                        <Button
                            variant={soloStatus[index***REMOVED*** ? 'primary' : 'secondary'}
                            onClick={() => handleSolo(index)}
                        >
                            Solo
                        </Button>
                        <Dropdown onSelect={(group) => handleAssign(index, group)}>
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
            <div
                ref={containerRef}
                style={{
                    background: '#2D2D2D',
                    color: '#FFF',
                    borderRadius: '10px',
                    padding: '1em',
                    height: '500px', // Set a large enough height for visibility
                    overflowY: 'auto', // Allow scrolling for multiple tracks
                }}
            ></div>
        </div>
    );
};

export default StemsPage;