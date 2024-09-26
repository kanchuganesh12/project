import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useCart } from '../components/CartContext';
import Products from './Products';  // Import the Products component
import OtherServices from './OtherServices'; // Import the OtherServices component
import Contact from './Contact';  // Import the Contact component
import './Home.css';

function Home() {
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

            {/* Render OtherServices component after the Products */}
            <OtherServices />

            {/* Render the Contact form after OtherServices */}
            <Contact />
        </div>
    );
}

export default Home;
