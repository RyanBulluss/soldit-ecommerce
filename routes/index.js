const express = require('express');
const router = express.Router();
const navCtrl = require('../controllers/navigation');

// Open home page
router.get('/', navCtrl.home);

// Open Basket page
router.get('/basket', navCtrl.basket);

// Open Sell page
router.get('/sell', navCtrl.sell);

// Add new product
router.get('/', )

module.exports = router;