const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomscontroller');

router.post('/book_room', roomController.bookRoom);
router.get('/availability_room', roomController.checkAvailability);
router.delete('/cancelroom/:bookingId', roomController.cancelBooking);

module.exports = {router}