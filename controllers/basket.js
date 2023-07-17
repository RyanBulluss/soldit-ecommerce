const { MongoDriverError } = require('mongodb');
const Product = require('../models/product');
const User = require('../models/user');


async function deleteItem(req, res) {
    try {
      await User.updateOne({},
        { $pull: { basket: { _id: req.params.id } } }
      );
      res.redirect('/basket');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
}

// async function deleteProduct(req, res, next) {
//     await Product.deleteOne({ _id: req.params.id });
//     res.redirect('/');
// }


// Product.findOne({
//     'reviews._id': req.params.id,
//     'reviews.user': req.user._id
// }).then(function(product) {
//     if(!product) return res.redirect('/');
//     product.reviews.remove(req.params.id);
//     product.save().then(function() {
//         res.redirect(`/products/${product.id}`);
//     }).catch(function(err) {
//         return next(err);
//     });
// });


module.exports = {
    deleteItem
}