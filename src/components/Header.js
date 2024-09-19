import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Header.css';
import plantIcon from '../assets/plant-icon.png'; // Import the plant icon
import { FaShoppingCart } from 'react-icons/fa'; // Import FontAwesome icon for cart
import { useCart } from './CartContext'; // Assume CartContext is providing cart state

function Header() {
    const { cart } = useCart(); // Use cart from context to show the number of items

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
                    <NavLink to="/cart" className="nav-link">
                        <FaShoppingCart />
                        <span className="cart-count">{cart.length}</span> {/* Number of items in cart */}
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
