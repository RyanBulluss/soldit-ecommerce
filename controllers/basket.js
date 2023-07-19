const { MongoDriverError } = require('mongodb');
const Product = require('../models/product');
const User = require('../models/user');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


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

async function checkout (req, res) {
  const basket = req.user.basket;

  // create array of all basket items
  let arr = []
  basket.forEach(item => arr.push({ 
    price_data: { 
      currency: "gbp", 
      product_data: { 
        name: item.product.name, 
      }, 
      unit_amount: item.product.price * 100, 
    }, 
    quantity: item.quantity, 
  }))

  // create session with those items
  const session = await stripe.checkout.sessions.create({ 
    payment_method_types: ["card"], 
    line_items: arr,
    mode: "payment", 
    success_url: "http://localhost:3000/success", 
    cancel_url: "http://localhost:3000/cancel" 
  });
  
  res.redirect(session.url);
};




module.exports = {
    deleteItem,
    checkout
}