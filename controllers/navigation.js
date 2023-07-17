const Product = require('../models/product');




async function home (req, res) {
    title = 'Home';
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

module.exports = {
    sell,
    basket,
    home,
    categories
}