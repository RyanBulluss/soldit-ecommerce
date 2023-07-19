const Product = require('../models/product');
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;



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

async function user (req, res) {
    title = `${req.user.name}'s Orders`
    res.render('user');
}

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

function basket (req, res) {
    title = 'Basket';
    res.render('basket', { 
        Product,
        key: stripePublicKey
     });
};

function sell (req, res) {
    res.render('sell', { title: 'New Product' });
};




module.exports = {
    sell,
    basket,
    home,
    categories,
    user
}