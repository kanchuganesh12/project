import React from 'react';
import './Gallery.css';

function Gallery() {
  return (
    <main className="gallery">
      <h1>Our Nursery in Pictures</h1>
      <div className="gallery-grid">
        {/* Example gallery items */}
        <img src="https://via.placeholder.com/300" alt="Nursery" />
        <img src="https://via.placeholder.com/300" alt="Vegetables" />
        <img src="https://via.placeholder.com/300" alt="Plants" />
        {/* Add more images as needed */}
      </div>
    </main>
  );
}

export default Gallery;
