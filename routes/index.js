const express = require('express');
const router = express.Router();
const navCtrl = require('../controllers/navigation');
const productCtrl = require('../controllers/products');
const passport = require('passport');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const basketCtrl = require('../controllers/basket');


// Open home page
router.get('/', navCtrl.home);

// Open Basket page
router.get('/basket', ensureLoggedIn, navCtrl.basket);

// Open Sell page
router.get('/sell', ensureLoggedIn, navCtrl.sell);

// Open User page
router.get('/user', ensureLoggedIn, navCtrl.user);

// Add new product
router.post('/', ensureLoggedIn, productCtrl.create);


// Delete from basket
router.delete('/:id', basketCtrl.deleteItem);

router.get('/auth/google', passport.authenticate(
    'google',
    {
        scope: ['profile', 'email'],
        prompt: 'select_account'
    }
));

router.get('/oauth2callback', passport.authenticate(
    'google',
    {
        successRedirect: '/',
        failureRedirect: '/'
    }
));

router.get('/logout', function(req, res) {
    req.logout(function() {
        res.redirect('/');
    });
});

router.get('/success', (req, res) => {
    res.send('Payment successful! <br><br> <a href="/basket">Return to basket</a>');
});

router.get('/cancel', (req, res) => {
    res.send('Payment canceled. <br><br> <a href="/basket">Return to basket</a>');
});

// Go to stipe for checkout
router.post('/create-checkout-session', ensureLoggedIn, basketCtrl.checkout);


module.exports = router;