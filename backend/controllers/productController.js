const Product = require('../models/productModel');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().select('-reviews'); // Exclude reviews when fetching all products for better performance
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    const { name, price, description, image, category, isTrending } = req.body;

    // Validate required fields
    if (!name || !price || !category) {
        return res.status(400).json({ message: 'Name, price, and category are required.' });
    }

    try {
        const product = new Product({
            name,
            price,
            description,
            image,
            category,
            isTrending: isTrending || false  // Default to false if not provided
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get product details by ID (including reviews and related products)
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).populate('relatedProducts');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
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

        const products = await Product.find(searchCriteria).select('-reviews');  // Exclude reviews for performance

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
    const category = req.query.category.replace('-', ' ');
    console.log(`Fetching products for category: ${category}`);

    try {
        const products = await Product.find({ category }).select('-reviews');  // Exclude reviews for performance

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found in this category' });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Submit a review for a product
exports.submitReview = async (req, res) => {
    const { rating, comment, user } = req.body;

    // Validate required fields
    if (!rating || !comment || !user) {
        return res.status(400).json({ message: 'Rating, comment, and user are required.' });
    }

    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Create new review
        const review = {
            user,
            rating,
            comment
        };

        // Add the review to the product
        product.reviews.push(review);

        // Recalculate the product's average rating
        product.rating = (
            product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
        ).toFixed(1);

        await product.save();

        res.status(201).json({ message: 'Review submitted successfully!', product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
