// /routes/productRoutes.js
const express = require('express');
const { getProducts, addProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/', getProducts);       // Get all products
router.post('/', addProduct);       // Add a new product

module.exports = router;
