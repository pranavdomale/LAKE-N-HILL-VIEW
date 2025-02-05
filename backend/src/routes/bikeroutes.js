const express = require('express');
const router = express.Router();
const bike = require('../controllers/bikescontroller');

router.post('/book_bike', bike.bookBike);
router.post('/availability_bike', bike.checkAvailability_bike);
router.delete('/cancelbike/:bookingId', bike.cancelBooking_bike);

module.exports = {router};