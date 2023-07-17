const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/:id-new-review', ensureLoggedIn, productsCtrl.newReview);

router.get('/:id', productsCtrl.show);

// CREATE review (product id)
router.post('/:id', ensureLoggedIn, productsCtrl.createReview);

// DELETE review (review id)
router.delete('/:id', ensureLoggedIn, productsCtrl.deleteReview);

router.delete('/:id/delete', ensureLoggedIn, productsCtrl.deleteProduct);

// ADD to basket
router.post('/:id/add', ensureLoggedIn, productsCtrl.addToBasket);


module.exports = router;