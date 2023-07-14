const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quality: {
        type: String,
        enum: ['Brand New', 'Excellent', 'Very Good', 'Good', 'Fair', 'Poor'],
        required: true
    },
    category: { 
        type: String,
        enum: ['Electronics', 'Fashion', 'Sports', 'Books', 'Home', 'Garden'],
        required: true
    },
    image: {
        type: Image,
        required: true
    },
    location: {
        type: Location,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    },
    reviews: [reviewSchema]
});

const reviewSchema = new Schema({
    reviewer: ObjectId,
    rating: {
        type: Number,
        required: true
    },
    review: String
});

module.exports = mongoose.model('Product', productSchema);