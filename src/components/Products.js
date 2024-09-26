import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import './Products.css';

function Products() {
    const { addToCart } = useCart();
    const [categories, setCategories] = useState({
        "Fruit Plants": [],
        "Vegetable Plants": [],
        "Fern Plants": [],
        "Indoor Plants": [],
        "Flower Plants": [],
        "Herbs and Medicinal Plants": [],
        "Cacti and Succulents": [],
        "Bonsai Plants": [],
        "Aquatic and Air Plants": []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();

                if (response.ok) {
                    // Filter products into categories
                    setCategories({
                        "Fruit Plants": data.filter(product => product.category === 'Fruit Plants').slice(0, 4),
                        "Vegetable Plants": data.filter(product => product.category === 'Vegetable Plants').slice(0, 4),
                        "Fern Plants": data.filter(product => product.category === 'Fern Plants').slice(0, 4),
                        "Indoor Plants": data.filter(product => product.category === 'Indoor Plants').slice(0, 4),
                        "Flower Plants": data.filter(product => product.category === 'Flower Plants').slice(0, 4),
                        "Herbs and Medicinal Plants": data.filter(product => product.category === 'Herbs and Medicinal Plants').slice(0, 4),
                        "Cacti and Succulents": data.filter(product => product.category === 'Cacti and Succulents').slice(0, 4),
                        "Bonsai Plants": data.filter(product => product.category === 'Bonsai Plants').slice(0, 4),
                        "Aquatic and Air Plants": data.filter(product => product.category === 'Aquatic and Air Plants').slice(0, 4)
                    });
                } else {
                    setError('Failed to fetch products.');
                }
            } catch (error) {
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Category card component
    const renderCategory = (categoryName, products) => (
        <div className="category-card" key={categoryName}>
            <div className="category-header">
                <h2>{categoryName}</h2>
                <span className="see-more" onClick={() => navigate(`/category/${categoryName.toLowerCase().replace(" ", "-")}`)}>
                    See More
                </span>
            </div>
            <div className="category-content">
                <div className="category-products">
                    {products.length > 0 ? (
                        products.map(product => (
                            <div key={product._id} className="product-preview" onClick={() => navigate(`/products/${product._id}`)}>
                                <img src={product.image} alt={product.name} />
                            </div>
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
        </div>
    );

    if (loading) {
        return <p className="loading-message">Loading products...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="products-container">
            {renderCategory("Fruit Plants", categories["Fruit Plants"])}
            {renderCategory("Vegetable Plants", categories["Vegetable Plants"])}
            {renderCategory("Fern Plants", categories["Fern Plants"])}
            {renderCategory("Indoor Plants", categories["Indoor Plants"])}
            {renderCategory("Flower Plants", categories["Flower Plants"])}
            {renderCategory("Herbs and Medicinal Plants", categories["Herbs and Medicinal Plants"])}
            {renderCategory("Cacti and Succulents", categories["Cacti and Succulents"])}
            {renderCategory("Bonsai Plants", categories["Bonsai Plants"])}
            {renderCategory("Aquatic and Air Plants", categories["Aquatic and Air Plants"])}
        </div>
    );
}

export default Products;
