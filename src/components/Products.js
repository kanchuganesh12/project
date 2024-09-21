import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/CartContext';
import './Products.css';

function Products() {
    const { addToCart } = useCart();
    const [fruitPlants, setFruitPlants] = useState([]);
    const [vegetablePlants, setVegetablePlants] = useState([]);
    const [ferns, setFerns] = useState([]);
    const [indoorPlants, setIndoorPlants] = useState([]);
    const [flowers, setFlowers] = useState([]);
    const navigate = useNavigate();

    // Fetch products from the backend API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();

                // Filter and limit products to display only 4 per category
                const fruitPlants = data.filter(product => product.category === 'Fruit Plants').slice(0, 4);
                const vegetablePlants = data.filter(product => product.category === 'Vegetable Plants').slice(0, 4);
                const ferns = data.filter(product => product.category === 'Ferns').slice(0, 4);
                const indoorPlants = data.filter(product => product.category === 'Indoor Plants').slice(0, 4);
                const flowers = data.filter(product => product.category === 'Flowers').slice(0, 4);

                // Set state with only the first 4 products for each category
                setFruitPlants(fruitPlants);
                setVegetablePlants(vegetablePlants);
                setFerns(ferns);
                setIndoorPlants(indoorPlants);
                setFlowers(flowers);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const renderCategory = (title, products, categoryLink) => (
        <section className="category-container">
            <h2 className="category-title">
                {title}
                <span className="view-all" onClick={() => navigate(categoryLink)}>View All</span>
            </h2>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img
                            src={product.image}
                            alt={product.name}
                            onClick={() => navigate(`/products/${product._id}`)}
                            style={{ cursor: 'pointer' }}
                        />
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price.toFixed(2)}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </section>
    );

    return (
        <div className="products-page">
            <h1>Our Products</h1>

            {/* Render each category with only 4 products */}
            {renderCategory("Fruit Plants", fruitPlants, '/category/fruit-plants')}
            {renderCategory("Vegetable Plants", vegetablePlants, '/category/vegetable-plants')}
            {renderCategory("Ferns", ferns, '/category/ferns')}
            {renderCategory("Indoor Plants", indoorPlants, '/category/indoor-plants')}
            {renderCategory("Flowers", flowers, '/category/flowers')}
        </div>
    );
}

export default Products;
