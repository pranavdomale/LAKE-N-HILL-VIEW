const express = require('express');
const payment_con = require('../controllers/paymentcontroller');
const router = express.Router();

// Payment route
router.post('/create-payment', payment_con.payment_method)
  
module.exports = {router}