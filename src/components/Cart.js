import React, { useEffect, useState } from 'react';
import { useCart } from '../components/CartContext';
import './Cart.css';

function Cart() {
    const [cart, setCart] = useState(null);

    // Fetch the cart from the backend
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cart');
                const data = await response.json();
                setCart(data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    const totalPrice = cart ? cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0) : 0;

    if (!cart || cart.items.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            <ul className="cart-items">
                {cart.items.map(item => (
                    <li key={item.product._id}>
                        <div className="cart-item">
                            <img src={item.product.image} alt={item.product.name} />
                            <div>
                                <h3>{item.product.name}</h3>
                                <p>${item.product.price.toFixed(2)} x {item.quantity}</p>
                                {/* Add a button to remove items from the cart */}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button className="checkout-button" onClick={() => alert('Order placed!')}>Place Order</button>
        </div>
    );
}

export default Cart;
