// /controllers/productController.js
const Product = require('../models/productModel');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new product
exports.addProduct = async (req, res) => {
    const { name, price, description, image } = req.body;

    try {
        const product = new Product({ name, price, description, image });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};