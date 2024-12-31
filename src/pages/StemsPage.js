import React, { useEffect, useRef, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import WaveSurfer from 'wavesurfer.js';

const StemsPage = ({ stems, songName, bpm, bandMembers, onGroupChange }) => {
    const [waveSurfers, setWaveSurfers***REMOVED*** = useState([***REMOVED***);
    const [isPlaying, setIsPlaying***REMOVED*** = useState(false);
    const [muteStatus, setMuteStatus***REMOVED*** = useState({});
    const [soloStatus, setSoloStatus***REMOVED*** = useState({});
    const isSeekingRef = useRef(false); // Add a ref to prevent recursive seek calls

    useEffect(() => {
        const waveSurferInstances = stems.map((stem, index) => {
        const container = document.getElementById(`waveform-${index}`);
        const waveSurfer = WaveSurfer.create({
            container,
            waveColor: 'hsl(200, 50%, 70%)',
            progressColor: 'hsl(200, 50%, 50%)',
            height: 80,
        });
        
        // Just pass the direct URL to WaveSurfer (no JSON parsing):
        const fileUrl = `http://localhost:8787/api/stems/${stem.file_path}`;
        waveSurfer.load(fileUrl);
        waveSurfer.on('seek', (progress) => {
            if (isSeekingRef.current) return; // Prevent recursive seek calls
            isSeekingRef.current = true;
            const currentTime = waveSurfer.getCurrentTime();
            waveSurferInstances.forEach((ws) => {
                if (ws !== waveSurfer) {
                    ws.seekTo(progress);
                    ws.setCurrentTime(currentTime);
                }
            });
            isSeekingRef.current = false;
        });
        return waveSurfer;
        });
    
        setWaveSurfers(waveSurferInstances);
        return () => waveSurferInstances.forEach((ws) => ws.destroy());
    }, [stems***REMOVED***);

    const handlePlayPause = () => {
        if (isPlaying) {
            waveSurfers.forEach((waveSurfer) => waveSurfer.pause());
            setIsPlaying(false);
        } else {
            waveSurfers.forEach((waveSurfer) => waveSurfer.play());
            setIsPlaying(true);
        }
    };

    const handleMute = (index) => {
        const isMuted = !muteStatus[index***REMOVED***;
        setMuteStatus((prev) => ({ ...prev, [index***REMOVED***: isMuted }));
        waveSurfers[index***REMOVED***.setMute(isMuted);
    };

    const handleSolo = (index) => {
        const isSoloed = !soloStatus[index***REMOVED***;
        setSoloStatus((prev) => ({ ...prev, [index***REMOVED***: isSoloed }));
        // Implement solo logic here
    };

    const handleZoom = (value) => {
        waveSurfers.forEach((waveSurfer) => waveSurfer.zoom(value));
    };

    const handleAssign = (stemId, stemGroup) => {
        onGroupChange(stemId, stemGroup);
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
                        <div className="stem-controls">
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
                            <Dropdown onSelect={(stemGroup) => handleAssign(index, stemGroup)}>
                                <Dropdown.Toggle variant="info" id={`dropdown-${stem.stemName}`}>
                                    Assign
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Backing Track">
                                        Assign to Backing Track
                                    </Dropdown.Item>
                                    {bandMembers.map((member) => (
                                        <Dropdown.Item key={member.id} eventKey={member.member_name}>
                                            Assign to {member.member_name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="waveform" id={`waveform-${index}`}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StemsPage;