// /components/ProductDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details">
      <div className="product-gallery">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        {product.isTrending && <span className="trending-badge">Trending</span>} {/* Display Trending Badge */}
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h3>${product.price.toFixed(2)}</h3>
        <button className="add-to-cart" onClick={() => alert('Added to Cart!')}>Add to Cart</button>
        <button className="buy-now" onClick={() => alert('Proceed to Checkout')}>Buy Now</button>
      </div>
    </div>
  );
}

export default ProductDetails;
