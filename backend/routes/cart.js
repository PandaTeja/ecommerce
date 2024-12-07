const express = require('express');
const { addItem, checkout } = require('../controllers/cartController');

const router = express.Router();

router.post('/add', addItem);
router.post('/checkout', checkout);

module.exports = router;
