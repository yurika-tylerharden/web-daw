// StemsPage.js

import { useEffect, useRef, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import WaveSurfer from 'wavesurfer.js';

const StemsPage = ({ stems, songName, bpm, bandMembers, onGroupChange }) => {
  const [waveSurfers, setWaveSurfers***REMOVED*** = useState([***REMOVED***);
  const [isPlaying, setIsPlaying***REMOVED*** = useState(false);
  const [muteStatus, setMuteStatus***REMOVED*** = useState({});
  const [soloStatus, setSoloStatus***REMOVED*** = useState({});
  const isSeekingRef = useRef(false);

  useEffect(() => {
    // Create an array of WaveSurfer instances:
    const waveSurferInstances = stems.map((stem, index) => {
      const container = document.getElementById(`waveform-${index}`);
      const waveSurfer = WaveSurfer.create({
        container,
        waveColor: 'hsl(200, 50%, 70%)',
        progressColor: 'hsl(200, 50%, 50%)',
        height: 80,
      });

      // Example: If your route is /api/stems/:key
      // and your worker script decodes the key, we can do:
      const encodedKey = encodeURIComponent(stem.filePath);
      // If you want to rely on the same domain:
      const fileUrl = `/api/stems/${encodedKey}`;

      waveSurfer.load(fileUrl);

      waveSurfer.on('seek', (progress) => {
        if (isSeekingRef.current) return;
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

    return () => {
      waveSurferInstances.forEach((ws) => ws.destroy());
    };
  }, [stems***REMOVED***);

  const handlePlayPause = () => {
    if (isPlaying) {
      waveSurfers.forEach((ws) => ws.pause());
      setIsPlaying(false);
    } else {
      waveSurfers.forEach((ws) => ws.play());
      setIsPlaying(true);
    }
  };

  const handleMute = (index) => {
    const isMuted = !muteStatus[index***REMOVED***;
    setMuteStatus((prev) => ({ ...prev, [index***REMOVED***: isMuted }));
    waveSurfers[index***REMOVED***?.setMute(isMuted);
  };

  const handleSolo = (index) => {
    const isSoloed = !soloStatus[index***REMOVED***;
    setSoloStatus((prev) => ({ ...prev, [index***REMOVED***: isSoloed }));
    // TODO: Implement actual solo logic
  };

  const handleZoom = (value) => {
    waveSurfers.forEach((ws) => ws.zoom(value));
  };

  const handleAssign = (stemIndex, stemGroup) => {
    // If you want to pass back changes to parent:
    if (onGroupChange) {
      onGroupChange(stemIndex, stemGroup);
    }
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
              <Dropdown onSelect={(group) => handleAssign(index, group)}>
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