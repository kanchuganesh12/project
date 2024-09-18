import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Header.css'; // Import custom styles
import plantIcon from '../assets/plant-icon.png'; // Import the plant icon

function Header() {
    return (
        <Navbar bg="light" expand="lg" className="header">
            <Navbar.Brand href="/" className="logo">
                <img src={plantIcon} alt="Plant Icon" className="plant-icon" /> {/* Plant Icon */}
                Sai Vegetable Nursery
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink to="/" className="nav-link">
                        <Button variant="link" className="nav-button">Home</Button>
                    </NavLink>
                    <NavLink to="/products" className="nav-link">
                        <Button variant="link" className="nav-button">Products</Button>
                    </NavLink>
                    <NavLink to="/gallery" className="nav-link">
                        <Button variant="link" className="nav-button">Gallery</Button>
                    </NavLink>
                    <NavLink to="/cart" className="nav-link">
                        <Button variant="link" className="nav-button">Cart</Button>
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
