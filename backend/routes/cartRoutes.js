// /routes/cartRoutes.js
const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/add', addToCart);     // Add item to cart
router.get('/', getCart);           // Get cart details

module.exports = router;
