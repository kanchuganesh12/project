import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Products.css';

function SearchResults() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get the search query and category from URL parameters
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const category = queryParams.get('category');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `http://localhost:5000/api/products/search?query=${query}&category=${category}`
                );
                const data = await response.json();

                if (response.status === 404) {
                    setProducts([]); // No products found
                } else {
                    setProducts(data); // Set the products from the API response
                }
            } catch (error) {
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [query, category]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="products-page">
            <h1>Search Results for "{query}"</h1>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchResults;
