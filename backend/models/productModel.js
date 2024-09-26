const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Define the product schema
const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String 
    },
    image: { 
        type: String 
    },
    category: { 
        type: String, 
        enum: [
            'Fruit Plants', 
            'Vegetable Plants', 
            'Fern Plants', 
            'Indoor Plants', 
            'Flower Plants', 
            'Herbs and Medicinal Plants', 
            'Cacti and Succulents', 
            'Bonsai Plants', 
            'Aquatic and Air Plants'
        ], 
        required: true 
    },
    isTrending: { 
        type: Boolean, 
        default: false 
    },  // Field for trending status
    reviews: [reviewSchema],  // Array of reviews using reviewSchema
    offer: {
        type: String
    },
    relatedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]  // Array of related products
});

module.exports = mongoose.model('Product', productSchema);
