import React from 'react';
import './OtherServices.css';

function OtherServices() {
    const services = [
        { name: 'plant rentals', img: 'https://via.placeholder.com/100', link: '/offers' },
        { name: 'interior plant design', img: 'https://via.placeholder.com/100', link: '/herbicides' },
        { name: 'B2B sales', img: 'https://via.placeholder.com/100', link: '/growth-promoters' },
        { name: 'Partner with restaurants or cafes to provide decorative plants or herbs they can use in their dishes or drinks.', img: 'https://via.placeholder.com/100', link: '/fungicides' },
        { name: 'Partner with suppliers', img: 'https://via.placeholder.com/100', link: '/vegetable-seeds' },
        { name: 'Gardening tools', img: 'https://via.placeholder.com/100', link: '/farm-machinery' },
        { name: 'Plant Care Products', img: 'https://via.placeholder.com/100', link: '/polyhouse-seeds' },
        { name: 'Seeds', img: 'https://via.placeholder.com/100', link: '/flower-seeds' },
        { name: 'plastic plants', img: 'https://via.placeholder.com/100', link: '/plastic plants' },
        { name: 'pots', img: 'https://via.placeholder.com/100', link: '/pots' },
        { name: 'Seeds', img: 'https://via.placeholder.com/100', link: '/flower-seeds' },
    ];

    return (
        <div className="services-container">
            <h1 className="services-title">Other Services</h1>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div key={index} className="service-item">
                        <a href={service.link}>
                            <img src={service.img} alt={service.name} className="service-image" />
                            <h3 className="service-name">{service.name}</h3>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OtherServices;
