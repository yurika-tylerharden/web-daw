import React from 'react';
import { Button } from 'react-bootstrap';

const PlayerControls = ({
  isPlaying,
  handlePlayPause,
  handleRewind,
  handleSkip,
  currentTime,
  duration,
  bpm,
  handleZoom,
}) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handlePause = () => {
    if (isPlaying) {
      handlePlayPause(); // simply call the toggle if playing
    }
  };

  const handlePlay = () => {
    if (!isPlaying) {
      handlePlayPause(); // toggle if not playing
    }
  };

  return (
    <div className="player-controls-footer">
      {/* Left side: BPM */}
      <div className="player-controls-left">
        <span className="bpm-label">{bpm} bpm</span>
      </div>

      {/* Center area: Rewind, Play, Pause, Skip */}
      <div className="player-controls-center">
        <Button variant="secondary" onClick={handleRewind}>
          -15s
        </Button>

        <Button variant="primary" onClick={handlePlay}>
          Play
        </Button>

        <Button variant="warning" onClick={handlePause}>
          Pause
        </Button>

        <Button variant="secondary" onClick={handleSkip}>
          +15s
        </Button>
      </div>

      {/* Right side: Time Display and Zoom Slider */}
      <div className="player-controls-right">
        <span className="time-label">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
        <div className="zoom-slider">
          <label htmlFor="zoom">Zoom</label>
          <input
            type="range"
            id="zoom"
            name="zoom"
            min="1"
            max="200"
            defaultValue="100"
            onChange={(e) => handleZoom(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;