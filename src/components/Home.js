import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import './Home.css'; // Assuming you have some custom styles

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
            {/* Carousel Section */}
            <Carousel interval={2000} controls={true} indicators={true}>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/1200x400?text=First+Slide"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First Slide Label</h3>
                        <p>Description for the first slide.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/1200x400?text=Second+Slide"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second Slide Label</h3>
                        <p>Description for the second slide.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://via.placeholder.com/1200x400?text=Third+Slide"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third Slide Label</h3>
                        <p>Description for the third slide.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            {/* About Section */}
            <section id="about-section" className="about">
                <h1>About Us</h1>
                <p>
                    GreenLeaf Nursery is dedicated to providing fresh, organic vegetables to our community.
                    Our team works hard to grow the healthiest and tastiest vegetables.
                </p>
            </section>

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
