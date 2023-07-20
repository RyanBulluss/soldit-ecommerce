const { MongoDriverError } = require('mongodb');
const Product = require('../models/product');
const User = require('../models/user');


async function orders (req, res) {
    title = `${req.user.name}'s Orders`
    res.render('user/orders');
}

async function selling (req, res) {
    title = `${req.user.name}'s Products`
    const user = await User.findById(req.user.id)
    const id = user._id
    const products = await Product.find({user: id});
    res.render('user/selling', { products });
}

async function edit (req, res) {
    title = 'Edit Product'
    const product = await Product.findById(req.params.id)
    res.render('user/edit', { product });
}

async function updateItem (req, res) {
    try {
        // Assigning user-related data to the request body
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        console.log(req.params.id)
    
        // Updating the product in the database with the form data
        await Product.updateOne({ _id: req.params.id }, req.body);
    
        // Redirecting to the selling page after the update
        res.redirect('/user/selling');
      } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).send('An error occurred during product update.');
      }
}

module.exports= {
    orders,
    selling,
    edit,
    updateItem
}