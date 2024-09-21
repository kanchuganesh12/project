import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';

function CategoryPage() {
    const { category } = useParams();  // Get the category from the URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                // Send a request to the backend with the category filter
                const response = await fetch(`http://localhost:5000/api/products?category=${category}`);
                const data = await response.json();

                if (response.ok) {
                    setProducts(data);
                } else {
                    setProducts([]);  // Handle no products found
                }
            } catch (error) {
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [category]);  // Rerun the effect when the category changes

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="category-page">
            <h1>{category} Products</h1>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price.toFixed(2)}</p>
                        </div>
                    ))
                ) : (
                    <p>No products available in this category.</p>
                )}
            </div>
        </div>
    );
}

export default CategoryPage;
