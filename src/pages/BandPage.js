import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const BandPage = ({ bandMembers, onUpdateMember }) => {
    const [showModal, setShowModal***REMOVED*** = useState(false);
    const [currentMember, setCurrentMember***REMOVED*** = useState(null);
    const [instrument, setInstrument***REMOVED*** = useState('');

    const handleOpenModal = (member) => {
        setCurrentMember(member);
        setInstrument('');
        setShowModal(true);
    };

    const handleSave = () => {
        onUpdateMember(currentMember.id, instrument);
        setShowModal(false);
    };

    return (
        <div className="band-page">
            <h2>Band</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Instruments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bandMembers.map((member) => (
                        <tr key={member.id}>
                            <td>{member.name}</td>
                            <td>{member.instruments.join(', ')}</td>
                            <td>
                                <Button onClick={() => handleOpenModal(member)}>Assign Instrument</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Instrument</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Instrument</Form.Label>
                            <Form.Control
                                type="text"
                                value={instrument}
                                onChange={(e) => setInstrument(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
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

export default BandPage;
