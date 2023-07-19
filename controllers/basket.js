const { MongoDriverError } = require('mongodb');
const Product = require('../models/product');
const User = require('../models/user');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


async function deleteItem(req, res) {
    try {
      await User.updateOne({ _id: req.user._id },
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
    success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}", 
    cancel_url: "http://localhost:3000/cancel" ,
    metadata: {
      basketId: `${basket._id}`
    },
  });
  
  res.redirect(session.url);
};


async function success(req, res) {
  const sessionID = req.query.session_id;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionID);
    const user = await User.findById(req.user.id);
    if (session && session.metadata && session.metadata.basketId) {
      const basketId = session.metadata.basketId;
      const purchasedItems = session.display_items || [];

      // Move items from basket to purchased orders
      await User.updateOne({ _id: req.user._id },
        { orders: [...req.user.basket] }
      );

      await User.updateOne({ _id: req.user._id },
        { basket: [] }
      );
      

      // Update stock or other database logic as needed
      for (const item of purchasedItems) {
        const { custom: { productId, quantity } } = item;
        // Implement your logic to update stock and other actions based on the purchased items
      }

      res.send('Payment successful! <br><br> <a href="/basket">Return to basket</a>');
    } else {
      throw new Error('Invalid or missing metadata in the Stripe session.');
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).send('An error occurred during payment processing.');
  }
}


module.exports = {
    deleteItem,
    checkout,
    success
}