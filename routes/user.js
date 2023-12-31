const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const user = require('../models/user');


router.get('/orders', ensureLoggedIn, userCtrl.orders);

router.get('/selling', ensureLoggedIn, userCtrl.selling);

router.get('/edit/:id', ensureLoggedIn, userCtrl.edit);

router.post('/update/:id', ensureLoggedIn, userCtrl.updateItem);


module.exports = router;