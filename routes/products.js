const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/:id-new-review', productsCtrl.newReview);

router.get('/:id', productsCtrl.show);

// CREATE review (product id)
router.post('/:id', productsCtrl.createReview);

// DELETE review (review id)
router.delete('/:id', productsCtrl.deleteReview);

router.delete('/:id/delete', productsCtrl.deleteProduct);


module.exports = router;