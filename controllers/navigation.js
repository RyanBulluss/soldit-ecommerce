const Product = require('../models/product');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);




async function home (req, res) {
    title = 'Popular Items';
    try {
        const products = await Product.find({});
        res.render('index', { products });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

async function categories (req, res) {
    title = req.params.category;
    try {
        const products = await Product.find({category: req.params.category});
        res.render('categories/category', { products });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

function basket (req, res, location) {
    title = 'Basket';
    res.render('basket', { Product });
};

function sell (req, res) {
    res.render('sell', { title: 'New Product' });
};

async function checkout (req, res) {

    res.json({ url: 'hi'})
  };


module.exports = {
    sell,
    basket,
    home,
    categories,
    checkout
}