const express = require('express');
const { getStats, generateDiscountCode } = require('../controllers/adminController');

const router = express.Router();

router.get('/stats', getStats);
router.post('/generate-discount', generateDiscountCode);

module.exports = router;
