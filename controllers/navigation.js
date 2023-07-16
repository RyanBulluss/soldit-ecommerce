const Product = require('../models/product');




async function home (req, res) {
    title = 'home';
    try {
        const products = await Product.find({});
        res.render('index', { products });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
};

function basket (req, res, location) {
    res.render('basket', { title: 'Basket' });
};

function sell (req, res) {
    res.render('sell', { title: 'New Product' });
};

module.exports = {
    sell,
    basket,
    home
}