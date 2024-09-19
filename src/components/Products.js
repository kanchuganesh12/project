import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import './Products.css';

function Products() {
    const { addToCart } = useCart();
    const [fruitPlants, setFruitPlants] = useState([]);
    const [vegetablePlants, setVegetablePlants] = useState([]);
    const [ferns, setFerns] = useState([]);
    const [indoorPlants, setIndoorPlants] = useState([]);

    // Fetch products from the backend API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();

                // Categorize products based on their category property
                setFruitPlants(data.filter(product => product.category === 'Fruit Plants'));
                setVegetablePlants(data.filter(product => product.category === 'Vegetable Plants'));
                setFerns(data.filter(product => product.category === 'Ferns'));
                setIndoorPlants(data.filter(product => product.category === 'Indoor Plants'));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="products-page">
            <h1>Our Products</h1>

            {/* Fruit Plants Section */}
            <section className="category-section">
                <h2>Fruit Plants</h2>
                <div className="product-grid">
                    {fruitPlants.map(product => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price.toFixed(2)}</p>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Vegetable Plants Section */}
            <section className="category-section">
                <h2>Vegetable Plants</h2>
                <div className="product-grid">
                    {vegetablePlants.map(product => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price.toFixed(2)}</p>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Ferns Section */}
            <section className="category-section">
                <h2>Ferns</h2>
                <div className="product-grid">
                    {ferns.map(product => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price.toFixed(2)}</p>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Indoor Plants Section */}
            <section className="category-section">
                <h2>Indoor Plants</h2>
                <div className="product-grid">
                    {indoorPlants.map(product => (
                        <div key={product._id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${product.price.toFixed(2)}</p>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Products;
