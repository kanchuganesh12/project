import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './CategoryPage.css';

function CategoryPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const location = useLocation(); // Use this to get the current URL location
    const queryParams = new URLSearchParams(location.search); // Get query parameters
    const category = queryParams.get('category'); // Get the 'category' query parameter

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const response = await fetch(`http://localhost:5000/api/products?category=${category}`);
                const data = await response.json();
                
                if (response.ok) {
                    setProducts(data);
                } else {
                    setError('No products found in this category.');
                }
            } catch (error) {
                setError('Failed to fetch products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        // Fetch products when the component mounts or when the category changes
        if (category) {
            fetchProductsByCategory();
        }
    }, [category]); // Re-run useEffect if category changes

    // Loading state
    if (loading) {
        return <p className="loading-message">Loading products...</p>;
    }

    // Error state
    if (error) {
        return <p className="error-message">{error}</p>;
    }

    // Render no products message
    if (products.length === 0) {
        return <p className="no-products-message">No products available in this category.</p>;
    }

    // Render products
    return (
        <div className="category-page">
            <h1>{category} Products</h1>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p className="price">${product.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;
