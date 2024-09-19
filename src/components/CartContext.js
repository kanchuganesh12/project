import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a Cart Context
const CartContext = createContext();

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);

// CartProvider component to wrap your application
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null); // Initialize with null to differentiate between "loading" and "empty"

    // Fetch the initial cart from the backend when the component mounts
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cart');
                if (response.ok) {
                    const cartData = await response.json();
                    setCart(cartData);
                } else {
                    console.error('Failed to fetch cart');
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };
        fetchCart();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Function to add an item to the cart
    const addToCart = async (product) => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: 1, // Adjust quantity as needed
                }),
            });

            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart);
            } else {
                console.error('Failed to add item to cart.');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = async (productId) => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });

            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart); // Update the cart state after removing the item
            } else {
                console.error('Error removing item from cart.');
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    // If cart is still being fetched, return null or a loading state
    if (cart === null) {
        return <div>Loading cart...</div>;
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};
