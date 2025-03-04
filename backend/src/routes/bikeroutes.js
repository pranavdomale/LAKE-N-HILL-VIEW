const express = require('express');
const router = express.Router();
const {getToken}=require('../middlewares/auth');
const bike = require('../controllers/bikescontroller');

router.post('/book_bike',getToken,bike.bookBike);
router.post('/availability_bike', bike.checkAvailability_bike);
router.delete('/cancelbike/:bookingId', bike.cancelBooking_bike);

module.exports = {router};