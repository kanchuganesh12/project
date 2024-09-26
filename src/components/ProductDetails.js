import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // State for quantity

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

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const handleReviewSubmit = () => {
    alert('Review submitted! Thank you.');
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-details">
      {/* Product Image Gallery */}
      <div className="product-gallery">
        {product.images?.map((image, index) => (
          <img key={index} src={image} alt={product.name} />
        )) || <p>No images available</p>}
      </div>

      <div className="product-info">
        {/* Trending Badge */}
        {product.isTrending && <span className="trending-badge">Trending</span>}

        {/* Product Name */}
        <h1>{product.name}</h1>

        {/* Product Rating */}
        <div className="product-rating">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < product.rating ? 'star filled' : 'star'}>★</span>
          ))}
          <span>({product.rating}/5)</span>
        </div>

        {/* Price */}
        <h3>${product.price.toFixed(2)}</h3>

        {/* Offer Section */}
        {product.offer && <p className="product-offer">Offer: {product.offer}</p>}

        {/* Quantity Selector */}
        <div className="quantity-selector">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>

        {/* Add to Cart and Buy Now Buttons */}
        <div className="product-actions">
          <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
          <button className="buy-now" onClick={() => alert('Proceed to Checkout')}>Buy Now</button>
        </div>

        {/* About Product */}
        <div className="about-product">
          <h2>About the Product</h2>
          <p>{product.description}</p>
        </div>

        {/* Customer Reviews */}
        <div className="product-reviews">
          <h2>Customer Reviews</h2>
          {product.reviews?.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="review">
                <p><strong>{review.user}</strong> rated it {review.rating}/5</p>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>

        {/* Review Form */}
        <div className="review-form">
          <h3>Leave a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <label>
              Your Rating:
              <select>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </label>
            <textarea placeholder="Write your review here..." required></textarea>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>

      {/* Customers Also Bought */}
      <div className="also-bought">
        <h2>Customers Also Bought</h2>
        <div className="also-bought-products">
          {product.relatedProducts?.map((relatedProduct, index) => (
            <div key={index} className="related-product-card">
              <img src={relatedProduct.image} alt={relatedProduct.name} />
              <p>{relatedProduct.name}</p>
              <p>${relatedProduct.price.toFixed(2)}</p>
            </div>
          )) || <p>No related products available</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
