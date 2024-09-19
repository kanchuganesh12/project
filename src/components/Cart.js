import React, { useEffect, useState } from 'react';
import './Cart.css';

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);  // Loading state

    // Fetch the cart from the backend
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cart');
                const data = await response.json();
                console.log("Fetched cart data:", data); // Debugging log
                setCart(data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            } finally {
                setLoading(false);  // Set loading to false after the request completes
            }
        };

        fetchCart();
    }, []);

    // Function to remove an item from the cart
    const removeFromCart = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/remove`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),  // Make sure productId is sent
            });
    
            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart);  // Update the cart state with the new data
            } else {
                console.error('Failed to remove item from cart.');
            }
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };
    
    // Calculate total price safely
    const totalPrice = cart 
        ? cart.items.reduce((total, item) => {
            const price = item.product?.price || 0;  // Fallback to 0 if price is missing
            return total + price * item.quantity;
        }, 0)
        : 0;

    if (loading) {
        return <p>Loading your cart...</p>;  // Display loading state
    }

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
                            <img 
                                src={item.product?.image || 'https://via.placeholder.com/150'} 
                                alt={item.product?.name || 'Product image'} 
                            />
                            <div>
                                <h3>{item.product?.name || 'Unknown product'}</h3>
                                {/* Ensure price is valid before calling toFixed */}
                                <p>
                                    ${item.product?.price ? item.product.price.toFixed(2) : '0.00'} x {item.quantity}
                                </p>
                                <button onClick={() => removeFromCart(item.product._id)}>Remove</button>
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
