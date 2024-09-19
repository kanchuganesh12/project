// /routes/cartRoutes.js
const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/add', addToCart);     // Add item to cart
router.get('/', getCart);           // Get cart details
router.post('/remove', removeFromCart); // Remove item from cart

module.exports = router;
