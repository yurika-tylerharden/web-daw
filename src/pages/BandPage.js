import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const BandPage = ({ bandMembers, onUpdateMember }) => {
    const [members, setMembers***REMOVED*** = useState([***REMOVED***);
    const [showModal, setShowModal***REMOVED*** = useState(false);
    const [currentMember, setCurrentMember***REMOVED*** = useState(null);
    const [memberName, setMemberName***REMOVED*** = useState('');
    const [instrument, setInstrument***REMOVED*** = useState('');
    const [colour, setColour***REMOVED*** = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('http://localhost:5053/api/members');
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
        const memberData = {
            member_name: memberName,
            member_instrument: instrument,
            member_colour: colour,
        };

        try {
            if (currentMember) {
                await fetch(`http://localhost:5053/api/members/${currentMember.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(memberData),
                });
            } else {
                const response = await fetch('http://localhost:5053/api/members', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(memberData),
                });
                const newMember = await response.json();
                setMembers([...members, { ...memberData, id: newMember.id }***REMOVED***);
            }
            setShowModal(false);
        } catch (error) {
            console.error('Error saving band member:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5053/api/members/${id}`, {
                method: 'DELETE',
            });
            setMembers(members.filter((member) => member.id !== id));
        } catch (error) {
            console.error('Error deleting band member:', error);
        }
    };

    return (
        <div className="band-page">
            <h2>Band</h2>
            <Button onClick={() => handleOpenModal(null)}>Add Member</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Instruments</th>
                        <th>Colour</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td>{member.member_name}</td>
                            <td>{member.member_instrument}</td>
                            <td>{member.member_colour}</td>
                            <td>
                                <Button onClick={() => handleOpenModal(member)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(member.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentMember ? 'Edit Member' : 'Add Member'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={memberName}
                                onChange={(e) => setMemberName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Instrument</Form.Label>
                            <Form.Control
                                type="text"
                                value={instrument}
                                onChange={(e) => setInstrument(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
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
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BandPage;