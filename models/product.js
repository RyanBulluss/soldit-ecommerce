const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5]
    },
    review: String
});

const productSchema = new Schema({
    name: String,
    price: Number,
    quality: {
        type: String,
        enum: ['Brand New', 'Excellent', 'Very Good', 'Good', 'Fair', 'Poor']
    },
    category: { 
        type: String,
        enum: ['Electronics', 'Fashion', 'Sports', 'Books', 'Home', 'Garden']
    },
    quantity: Number,
    reviews: [reviewSchema]
});



module.exports = mongoose.model('Product', productSchema);