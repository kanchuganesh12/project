import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useCart } from '../components/CartContext';
import Products from './Products';  // Import the Products component
import './Home.css';

function Home() {
    // State to handle form data and submission status
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const { addToCart } = useCart();

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true); // Mark form as successfully submitted
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } else {
                throw new Error('Failed to submit the form');
            }
        } catch (error) {
            setError('Failed to submit the form. Please try again.');
            console.error('Form submission error:', error);
        }
    };

    return (
        <div className="home">
            {/* Hero Carousel Section */}
            <div className="carousel-container">
                <Carousel interval={2000} controls={true} indicators={true}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://via.placeholder.com/1200x400?text=Lowest+Fares+or+5x+Refund"
                            alt="First banner"
                        />
                        <Carousel.Caption className="carousel-caption">
                            <h3>Lowest Fares or 5x Refund</h3>
                            <p>Use code FLYFK to get a special discount.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://via.placeholder.com/1200x400?text=Great+Deals+on+Plants"
                            alt="Second banner"
                        />
                        <Carousel.Caption className="carousel-caption">
                            <h3>Exclusive Offers on Plants</h3>
                            <p>Get discounts on indoor and outdoor plants.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://via.placeholder.com/1200x400?text=Organic+Vegetables+on+Sale"
                            alt="Third banner"
                        />
                        <Carousel.Caption className="carousel-caption">
                            <h3>Organic Vegetables on Sale</h3>
                            <p>Fresh, organic vegetables delivered to your door.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* Insert the Products section after the carousel */}
            <Products />

            {/* Contact Section */}
            <section id="contact-section" className="contact">
                <h1>Contact Us</h1>
                {submitted ? (
                    <p>Thank you for your message! We'll get back to you soon.</p>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label>Subject:</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />

                        <label>Message:</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>

                        <button type="submit">Send Message</button>
                    </form>
                )}

                {error && <p className="error-message">{error}</p>}
            </section>
        </div>
    );
}

export default Home;
