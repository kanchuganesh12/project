// /models/cartModel.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model('Cart', cartSchema);
