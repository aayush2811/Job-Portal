const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authentication = require('../auth/authentication');


router.get('/payment', authentication.recruiter , paymentController.payment);
router.post('/payment', paymentController.paymentPost);

module.exports = router;