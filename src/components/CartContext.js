import React, { createContext, useState, useContext } from 'react';

// Create a Cart Context
const CartContext = createContext();

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);

// CartContext.js
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = async (product) => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: 1, // Adjust this as needed
                }),
            });
            const updatedCart = await response.json();
            setCart(updatedCart);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

