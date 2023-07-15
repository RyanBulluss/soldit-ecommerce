const express = require('express');
const router = express.Router();
const navCtrl = require('../controllers/navigation');
const productCtrl = require('../controllers/products');
const passport = require('passport');

// Open home page
router.get('/', navCtrl.home);

// Open Basket page
router.get('/basket', navCtrl.basket);

// Open Sell page
router.get('/sell', navCtrl.sell);

// Add new product
router.post('/', productCtrl.create)

router.get('/auth/google', passport.authenticate(
    'google',
    {
        scope: ['profile', 'email'],
        prompt: 'selected_account'
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



module.exports = router;