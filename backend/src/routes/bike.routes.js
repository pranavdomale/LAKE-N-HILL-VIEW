const express = require('express');
const router = express.Router();
const bikeController = require('../backend/src/controllers/bike.controller.js');

router.post('/book', bikeController.bookBike);
router.get('/availability', bikeController.checkAvailability);
router.delete('/cancel/:bookingId', bikeController.cancelBooking);

module.exports = router;