import React from 'react';
import { Button, Dropdown, Spinner } from 'react-bootstrap';

const StemChannel = ({
  stem,
  index,
  muteStatus,
  soloStatus,
  handleMute,
  handleSolo,
  handleAssign,
  bandMembers,
  hidden,
  isLoading,
}) => {
  return (
    <div
      className={`stem-channel stem-channel-${index}`}
      style={{
        display: hidden ? 'none' : 'flex',
      }}
    >
      <div className="stem-controls" style={{ marginRight: '1rem' }}>
        <h4>{stem.stem_name}</h4>
        <div className="stem-buttons">
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

          <Dropdown
            onSelect={(group) => handleAssign(index, group)}
            className="assign-dropdown"
          >
            <Dropdown.Toggle variant="info" id={`dropdown-${stem.stem_name}`}>
              Assign
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Track">Assign to Track</Dropdown.Item>
              <Dropdown.Item eventKey="Click">Assign to Click</Dropdown.Item>
              <Dropdown.Item eventKey="Band">Assign to Band</Dropdown.Item>
              {bandMembers.map((member) => (
                <Dropdown.Item key={member.id} eventKey={member.member_name}>
                  Assign to {member.member_name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {/* The waveform container remains in the DOM but simply hidden when 'hidden' is true */}
      <div className="waveform" id={`waveform-${index}`} style={{ flex: 1, minWidth: '300px' }}>
        {isLoading && <Spinner animation="border" variant="light" />}
      </div>
    </div>
  );
};

export default StemChannel;