const express = require('express');
const router = express.Router();
const navCtrl = require('../controllers/navigation');
const productCtrl = require('../controllers/products');

// Open home page
router.get('/', navCtrl.home);

// Open Basket page
router.get('/basket', navCtrl.basket);

// Open Sell page
router.get('/sell', navCtrl.sell);

// Add new product
router.post('/', productCtrl.create)


module.exports = router;