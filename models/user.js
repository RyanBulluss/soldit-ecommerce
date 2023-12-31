const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./product');

const basketItemSchema = new Schema({
    product: Object,
    quantity: Number
})

const userSchema = new Schema({
    name: String,
    googleId: {
        type: String,
        required: true
    },
    email: String,
    avatar: String,
    selling: [Product.schema],
    basket: [basketItemSchema],
    orders: [basketItemSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);