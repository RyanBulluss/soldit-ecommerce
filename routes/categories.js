const express = require('express');
const router = express.Router();
const navCtrl = require('../controllers/navigation');


// Open Categories page
router.get('/:category', navCtrl.categories);



module.exports = router;