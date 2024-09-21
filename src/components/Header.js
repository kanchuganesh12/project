import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Form, FormControl, Dropdown } from 'react-bootstrap';
import './Header.css';
import plantIcon from '../assets/plant-icon.png'; // Import the plant icon
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from './CartContext';

function Header() {
    const { cart } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [category, setCategory] = useState('All');
    const [searchHistory, setSearchHistory] = useState([]);
    const navigate = useNavigate();

    // Fetch suggestions when searchQuery or category changes
    useEffect(() => {
        if (searchQuery) {
            fetch(`http://localhost:5000/api/products/suggestions?query=${searchQuery}&category=${category}`)
                .then((response) => response.json())
                .then((data) => setSuggestions(data))
                .catch((error) => console.error('Error fetching suggestions:', error));
        } else {
            setSuggestions([]);
        }
    }, [searchQuery, category]);

    // Update search query as user types
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle form submission to navigate to the search results page
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            // Add the search query to search history
            setSearchHistory([...searchHistory, searchQuery]);

            // Redirect to search results page with query and category
            navigate(`/search?query=${searchQuery}&category=${category}`);
        }
    };

    // Handle category change
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };

    return (
        <Navbar bg="light" expand="lg" className="header">
            <Navbar.Brand href="/" className="logo">
                <img src={plantIcon} alt="Plant Icon" className="plant-icon" /> {/* Plant Icon */}
                <span className="brand-name">Green Trail</span> {/* Green Trail name */}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Form className="d-flex search-bar-form" onSubmit={handleSubmit} style={{ flex: 1, justifyContent: 'center' }}>
                        {/* Dropdown for Category Selection */}
                        <Dropdown onSelect={handleCategoryChange} style={{ marginRight: '10px' }}>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                {category}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="All">All Categories</Dropdown.Item>
                                <Dropdown.Item eventKey="Fruit Plants">Fruit Plants</Dropdown.Item>
                                <Dropdown.Item eventKey="Vegetable Plants">Vegetable Plants</Dropdown.Item>
                                <Dropdown.Item eventKey="Ferns">Ferns</Dropdown.Item>
                                <Dropdown.Item eventKey="Indoor Plants">Indoor Plants</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        {/* Search Input */}
                        <FormControl
                            type="text"
                            placeholder="Search for products..."
                            className="mr-2"
                            value={searchQuery}
                            onChange={handleInputChange}
                            style={{ minWidth: '400px' }} // Adjust size of the search bar
                        />

                        {/* Search Suggestions */}
                        {suggestions.length > 0 && (
                            <ul className="suggestions-list">
                                {suggestions.map((suggestion) => (
                                    <li
                                        key={suggestion._id}
                                        onClick={() => setSearchQuery(suggestion.name)}
                                        className="suggestion-item"
                                    >
                                        {suggestion.name}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* Search Button */}
                        <Button type="submit" variant="outline-success">Search</Button>
                    </Form>

                    {/* Cart Icon with Text */}
                    <NavLink to="/cart" className="nav-link cart-link">
                        <div className="cart-container">
                            <FaShoppingCart className="cart-icon" />
                            <span className="cart-text">Cart</span> {/* Cart label */}
                            <span className="cart-count">{cart.length}</span> {/* Number of items in cart */}
                        </div>
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
