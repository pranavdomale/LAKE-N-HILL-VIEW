const express = require('express');
const router = express.Router();
const roomController = require('../backend/src/controllers/room.controller.js');

router.post('/book', roomController.bookRoom);
router.get('/availability', roomController.checkAvailability);
router.delete('/cancel/:bookingId', roomController.cancelBooking);

module.exports = router;