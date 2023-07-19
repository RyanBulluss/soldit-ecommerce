const { MongoDriverError } = require('mongodb');
const Product = require('../models/product');
const User = require('../models/user');


async function orders (req, res) {
    title = `${req.user.name}'s Orders`
    res.render('user/orders');
}

async function selling (req, res) {
    title = `${req.user.name}'s Products`
    res.render('user/selling');
}




module.exports= {
    orders,
    selling
}