import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Toolbar.css'; // Import the CSS file

const Toolbar = ({ onTabChange }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mb-3">
            <Navbar.Brand eventKey="songs" href="#home">daste.tracks</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" onSelect={onTabChange}>
                    <Nav.Link eventKey="songs">Songs</Nav.Link>
                    {/* <Nav.Link eventKey="stems">Stems</Nav.Link> */}
                    <Nav.Link eventKey="band">Band</Nav.Link>
                    {/* <Nav.Link eventKey="testing">Testing</Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Toolbar;
