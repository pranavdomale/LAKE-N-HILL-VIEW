const express = require('express');
const router = express.Router();
const hallController = require('../backend/src/controllers/room.controller.js');

router.post('/book', hallController.bookRoom);
router.get('/availability', hallController.checkAvailability);
router.delete('/cancel/:bookingId', hallController.cancelBooking);

module.exports = router;