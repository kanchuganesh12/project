const dotenv = require('dotenv');
dotenv.config();  // Load environment variables at the top

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // Ensure this path is correct
const productRoutes = require('./routes/productRoutes');  // Ensure this path is correct
const cartRoutes = require('./routes/cartRoutes');  // Ensure this path is correct
const contactRoutes = require('./routes/contactRoutes'); // Ensure this path is correct
const errorHandler = require('./middleware/errorHandler');  // Ensure this path is correct


// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// API Routes
app.use('/api/products', productRoutes);  // Product routes
app.use('/api/cart', cartRoutes);  // Cart routes
app.use('/api/contact', contactRoutes); 

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
