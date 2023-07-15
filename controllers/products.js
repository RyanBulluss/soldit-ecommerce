const Product = require('../models/product');



async function create(req, res) {
    try {
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
    product.reviews.push(req.body);
    try {
        await product.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/products/${product.id}`);
}

module.exports = {
    create,
    show,
    newReview,
    createReview
}