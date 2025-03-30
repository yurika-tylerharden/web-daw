import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import StemChannel from '../components/StemChannel';
import PlayerControls from '../components/PlayerControls';

const StemsPage = ({ stems, songName, bpm, bandMembers, onGroupChange }) => {
  const [waveSurfers, setWaveSurfers] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muteStatus, setMuteStatus] = useState({});
  const [soloStatus, setSoloStatus] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [assignedStems, setAssignedStems] = useState({ Band: [], Track: [], Click: [] });
  const [loadingStatus, setLoadingStatus] = useState({});

  // State to track which groups are collapsed
  // If true = collapsed, false = expanded
  const [groupCollapsed, setGroupCollapsed] = useState({
    Band: false,
    Track: false,
    Click: false,
  });

  const isSeekingRef = useRef(false);

  useEffect(() => {
    // Initialize assigned stems
    const initialAssignedStems = { Band: [], Track: [], Click: [] };
    stems.forEach((stem, index) => {
      const group = stem.stem_group || 'Band';
      initialAssignedStems[group].push({ ...stem, index });
    });
    setAssignedStems(initialAssignedStems);
  }, [stems]);

  useEffect(() => {
    // Create an array of WaveSurfer instances after the DOM elements are rendered
    const waveSurferInstances = [];
    const initialLoadingStatus = {};

    // Flatten all stems from the three groups into one array
    const allStems = [...assignedStems.Band, ...assignedStems.Track, ...assignedStems.Click];

    allStems.forEach((stem) => {
      const container = document.getElementById(`waveform-${stem.index}`);
      if (!container) {
        console.error(`Container element not found for waveform-${stem.index}`);
        return;
      }
      const waveSurfer = WaveSurfer.create({
        container,
        waveColor: '#999',          // wave color
        progressColor: '#4DA2FF',   // progress color
        backgroundColor: '#1b1b1b', // background behind the wave
        cursorColor: '#fff',        // cursor color
        height: 64,                 // wave height
        responsive: true,           // wave resizes with container
        minWidth: 50,
      });
      const encodedKey = encodeURIComponent(stem.file_path);
      const fileUrl = `/api/stems/${encodedKey}`;

      waveSurfer.load(fileUrl);

      initialLoadingStatus[stem.index] = true;

      // Sync seeking across waveSurfers
      waveSurfer.on('seek', (progress) => {
        if (isSeekingRef.current) return;
        isSeekingRef.current = true;
        const currentTime = waveSurfer.getCurrentTime();
        waveSurferInstances.forEach((ws) => {
          if (ws && ws !== waveSurfer) {
            ws.seekTo(progress);
            ws.setCurrentTime(currentTime);
          }
        });
        isSeekingRef.current = false;
      });

      // Update the "global" currentTime
      waveSurfer.on('audioprocess', () => {
        setCurrentTime(waveSurfer.getCurrentTime());
      });

      // Update the "global" duration
      waveSurfer.on('ready', () => {
        setDuration((prevDuration) => {
          // If multiple stems have different durations, pick the max
          return Math.max(prevDuration, waveSurfer.getDuration());
        });
        setLoadingStatus((prevStatus) => ({
          ...prevStatus,
          [stem.index]: false,
        }));
      });

      waveSurferInstances[stem.index] = waveSurfer;
    });

    setWaveSurfers(waveSurferInstances);
    setLoadingStatus(initialLoadingStatus);

    return () => {
      waveSurferInstances.forEach((ws) => ws && ws.destroy());
    };
  }, [assignedStems]);

  // Toggle collapsible group
  const toggleGroupCollapse = (group) => {
    setGroupCollapsed((prev) => ({
      ...prev,
      [group]: !prev[group],
    }));
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      waveSurfers.forEach((ws) => ws && ws.pause());
      setIsPlaying(false);
    } else {
      waveSurfers.forEach((ws) => ws && ws.play());
      setIsPlaying(true);
    }
  };

  const handleRewind = () => {
    waveSurfers.forEach((ws) => {
      if (!ws) return;
      ws.skip(15)
    });
  };

  const handleSkip = () => {
    waveSurfers.forEach((ws) => {
      if (!ws) return;
      ws.skip(15)
    });
    // setCurrentTime((prevTime) => Math.min(prevTime + 15, duration));
  };

  const handleMute = (index) => {
    const isMuted = !muteStatus[index];
    setMuteStatus((prev) => ({ ...prev, [index]: isMuted }));

    if (waveSurfers[index]) {
      waveSurfers[index].setMute(isMuted);
    }
  };

  const handleSolo = (index) => {
    setSoloStatus((prev) => {
      const newSolo = { ...prev, [index]: !prev[index] };
      const soloedTracks = Object.keys(newSolo).filter((key) => newSolo[key]);

      if (soloedTracks.length > 0) {
        // Mute all non-solo tracks
        waveSurfers.forEach((ws, i) => {
          if (!ws) return;
          if (soloedTracks.includes(i.toString())) {
            ws.setMute(false);
          } else {
            ws.setMute(true);
          }
        });
      } else {
        // If no solos, restore to "muteStatus"
        waveSurfers.forEach((ws, i) => {
          if (!ws) return;
          ws.setMute(!!muteStatus[i]);
        });
      }

      return newSolo;
    });
  };

  const handleZoom = (value) => {
    waveSurfers.forEach((ws) => ws.zoom(Number(value)));
  };

  const handleAssign = async (stemIndex, stemGroup) => {
    const updatedStems = { ...assignedStems };
    const stem = stems[stemIndex];

    // Remove stem from its current group
    Object.keys(updatedStems).forEach((group) => {
      updatedStems[group] = updatedStems[group].filter((s) => s.index !== stemIndex);
    });

    // Add stem to the new group
    updatedStems[stemGroup].push({ ...stem, index: stemIndex });

    setAssignedStems(updatedStems);

    // Update the stem group in the database
    try {
      const response = await fetch(`/api/stems/update-group`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_path: stem.file_path, stem_group: stemGroup }),
      });
      if (!response.ok) {
        throw new Error('Failed to update stem group');
      }
    } catch (error) {
      console.error('Error updating stem group:', error);
    }

    if (onGroupChange) {
      onGroupChange(stemIndex, stemGroup);
    }
  };

  const allLoaded = Object.values(loadingStatus).every((status) => !status);

  return (
    <div className="stems-page">
      <h2 className="stems-page-title">{`${songName}`}</h2>
      <div className="stems-container">
        {['Band', 'Track', 'Click'].map((group) => (
          <div key={group} className="stems-group">
            <div className="stems-group-header" onClick={() => toggleGroupCollapse(group)}>
              <h3>{group}</h3>
              {/* <span className="collapse-icon">
                {groupCollapsed[group] ? '▸' : '▾'}
              </span> */}
            </div>
            {!groupCollapsed[group] && (
              <div className="stems-group-body">
                {assignedStems[group].map((stem) => (
                  <StemChannel
                    key={stem.index}
                    stem={stem}
                    index={stem.index}
                    muteStatus={muteStatus}
                    soloStatus={soloStatus}
                    handleMute={handleMute}
                    handleSolo={handleSolo}
                    handleAssign={handleAssign}
                    bandMembers={bandMembers}
                    hidden={groupCollapsed[group]} // <--- pass this down
                    isLoading={loadingStatus[stem.index]} // Pass loading status
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sticky Footer Player Controls */}
      <PlayerControls
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        handleRewind={handleRewind}
        handleSkip={handleSkip}
        currentTime={currentTime}
        duration={duration}
        bpm={bpm}
        handleZoom={handleZoom}
        allLoaded={allLoaded} // Pass loading status
      />
    </div>
  );
};

export default StemsPage;