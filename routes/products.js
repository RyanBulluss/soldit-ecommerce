const express = require('express');
const router = express.Router();
const productsCtrl = require('../controllers/products');


router.get('/:id-new-review', productsCtrl.newReview);

router.get('/:id', productsCtrl.show);

router.post('/:id', productsCtrl.createReview);


module.exports = router;