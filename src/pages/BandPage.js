import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const BandPage = () => {
  const [members, setMembers***REMOVED*** = useState([***REMOVED***);
  const [showModal, setShowModal***REMOVED*** = useState(false);
  const [currentMember, setCurrentMember***REMOVED*** = useState(null);
  const [memberName, setMemberName***REMOVED*** = useState('');
  const [instrument, setInstrument***REMOVED*** = useState('');
  const [colour, setColour***REMOVED*** = useState('');

  useEffect(() => {
    // Fetch all band members from the new endpoint: /api/band
    const fetchMembers = async () => {
      try {
        const response = await fetch('/api/band'); // CHANGED
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching band members:', error);
      }
    };
    fetchMembers();
  }, [***REMOVED***);

  const handleOpenModal = (member) => {
    setCurrentMember(member);
    setMemberName(member ? member.member_name : '');
    setInstrument(member ? member.member_instrument : '');
    setColour(member ? member.member_colour : '');
    setShowModal(true);
  };

  const handleSave = async () => {
    // Collect form data into an object
    const memberData = {
      member_name: memberName,
      member_instrument: instrument,
      member_colour: colour,
    };

    try {
      if (currentMember) {
        // Update existing member with PUT /api/band/:id
        await fetch(`/api/band/${currentMember.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(memberData),
        });

        // Optimistically update local state
        setMembers((prev) =>
          prev.map((m) =>
            m.id === currentMember.id ? { ...m, ...memberData } : m
          )
        );
      } else {
        // Add a new member with POST /api/band
        const response = await fetch('/api/band', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(memberData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newMember = await response.json();
        // The server might return { id: x }, so combine with form data
        setMembers((prev) => [
          ...prev,
          { ...memberData, id: newMember.id },
        ***REMOVED***);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving band member:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete existing member with DELETE /api/band/:id
      await fetch(`/api/band/${id}`, {
        method: 'DELETE',
      });
      setMembers((prev) => prev.filter((member) => member.id !== id));
    } catch (error) {
      console.error('Error deleting band member:', error);
    }
  };

  return (
    <div className="band-page">
      <h2>Band</h2>
      <Button onClick={() => handleOpenModal(null)}>Add Member</Button>
      <Table striped bordered hover style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Instrument</th>
            <th>Colour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.length === 0 ? (
            <tr>
              <td colSpan="4">No band members found.</td>
            </tr>
          ) : (
            members.map((member) => (
              <tr key={member.id}>
                <td>{member.member_name}</td>
                <td>{member.member_instrument}</td>
                <td>{member.member_colour}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => handleOpenModal(member)}
                    style={{ marginRight: '0.5rem' }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(member.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentMember ? 'Edit Member' : 'Add Member'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMemberName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formInstrument">
              <Form.Label>Instrument</Form.Label>
              <Form.Control
                type="text"
                value={instrument}
                onChange={(e) => setInstrument(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formColour">
              <Form.Label>Colour</Form.Label>
              <Form.Control
                type="text"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {currentMember ? 'Update' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BandPage;