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

// Add a new product
exports.addProduct = async (req, res) => {
    const { name, price, description, image, category, isTrending } = req.body;

    try {
        const product = new Product({
            name,
            price,
            description,
            image,
            category,
            isTrending // Ensure isTrending is being passed and saved properly
        });
        
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Search products by query and category
exports.searchProducts = async (req, res) => {
    const { query, category } = req.query;

    try {
        let searchCriteria = {};

        // If a search query is provided, add it to the search criteria
        if (query) {
            searchCriteria.name = { $regex: query, $options: 'i' }; // Case-insensitive search
        }

        // If a category is provided, add it to the search criteria
        if (category && category !== 'All') {
            searchCriteria.category = category;
        }

        const products = await Product.find(searchCriteria);

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};