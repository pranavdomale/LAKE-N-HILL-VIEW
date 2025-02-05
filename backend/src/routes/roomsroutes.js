const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomscontroller');

router.post('/book_room', roomController.bookRoom);
router.get('/bookings',roomController.getMyBookings);
router.post('/availability_room', roomController.checkAvailability);
router.delete('/cancelroom/:bookingId', roomController.cancelBooking);

module.exports = {router}