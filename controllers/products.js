const { MongoDriverError } = require('mongodb');
const Product = require('../models/product');
const User = require('../models/user');



async function create(req, res) {
    try {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        await Product.create(req.body);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.render('/', { errorMsg: err.message });
    }
}

async function show(req, res) {
    title = 'Product Details';
    try {
        const product = await Product.findById(req.params.id);
        res.render('./products/show', { product });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
}

async function newReview(req, res) {
    title = 'New Review';
    try {
        const product = await Product.findById(req.params.id);
        res.render('./products/review', { product });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
}

async function createReview(req, res) {
    const product = await Product.findById(req.params.id);

    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;

    product.reviews.push(req.body);
    try {
        await product.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/products/${product.id}`);
}

function deleteReview(req, res, next) {
    Product.findOne({
        'reviews._id': req.params.id,
        'reviews.user': req.user._id
    }).then(function(product) {
        if(!product) return res.redirect('/');
        product.reviews.remove(req.params.id);
        product.save().then(function() {
            res.redirect(`/products/${product.id}`);
        }).catch(function(err) {
            return next(err);
        });
    });
};

async function deleteProduct(req, res, next) {
    await Product.deleteOne({ _id: req.params.id });
    res.redirect('/user/selling');
}

async function addToBasket(req, res) {
    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user._id);
    req.body.product = product;
    user.basket.push(req.body);

    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/`);
}

module.exports = {
    create,
    show,
    newReview,
    createReview,
    deleteReview,
    deleteProduct,
    addToBasket
}