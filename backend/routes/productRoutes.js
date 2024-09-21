// /routes/productRoutes.js
const express = require('express');
const { getProducts, addProduct, getProductById, deleteProduct,searchProducts } = require('../controllers/productController');
const router = express.Router();


router.get('/search', searchProducts); // Search products by query and category
router.get('/', getProducts);         // Get all products
router.post('/', addProduct);         // Add new product
router.get('/:id', getProductById);   // Get product by ID
router.delete('/:id', deleteProduct); // Route for deleting a product by ID


module.exports = router;
