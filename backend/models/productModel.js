// /models/productModel.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category: { 
        type: String, 
        enum: ['Fruit Plants', 'Vegetable Plants', 'Ferns', 'Indoor Plants', 'Flowers'], // Added 'Flowers'
        required: true 
    },
    isTrending: { type: Boolean, default: false } // New field for trending status
});

module.exports = mongoose.model('Product', productSchema);
