const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Add item to cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the user's cart (assumed to be one cart; modify as needed)
        let cart = await Cart.findOne();
        if (!cart) {
            // Create a new cart if none exists
            cart = new Cart({
                items: [],
                totalPrice: 0
            });
        }

        // Check if the item already exists in the cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex !== -1) {
            // Item already exists, update the quantity
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Item does not exist, add a new item to the cart
            cart.items.push({
                product: productId,
                quantity: quantity
            });
        }

        // Update the total price
        cart.totalPrice += product.price * quantity;

        // Save the updated cart
        await cart.save();

        res.status(200).json(cart); // Return the updated cart
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove item from cart

exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        let cart = await Cart.findOne();  // Assuming there's only one cart or you fetch the correct one
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the item in the cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Ensure that the product's price and quantity exist
        const productPrice = cart.items[itemIndex].product.price || 0;  // Fallback to 0 if price is missing
        const productQuantity = cart.items[itemIndex].quantity || 0;  // Fallback to 0 if quantity is missing

        console.log('Removing product with price:', productPrice, 'and quantity:', productQuantity);

        // Check if price or quantity is invalid (this can prevent NaN errors)
        if (isNaN(productPrice) || isNaN(productQuantity)) {
            return res.status(400).json({ message: 'Invalid product price or quantity' });
        }

        // Update totalPrice safely
        cart.totalPrice = (cart.totalPrice || 0) - (productPrice * productQuantity);

        // Ensure totalPrice doesn't go below zero
        if (cart.totalPrice < 0) {
            cart.totalPrice = 0;
        }

        // Remove the item from the cart
        cart.items.splice(itemIndex, 1);

        // Save the updated cart
        await cart.save();

        res.status(200).json(cart);  // Return the updated cart
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get cart details (this is already defined correctly)
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty' });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
