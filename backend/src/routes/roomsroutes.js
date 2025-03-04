const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomscontroller');
const {getToken}=require('../middlewares/auth');

router.post('/book_room',getToken,roomController.bookRoom);
router.get('/bookings',getToken,roomController.getMyBookings);
router.post('/availability_room', roomController.checkAvailability);
router.delete('/cancelroom/:bookingId', roomController.cancelBooking);

module.exports = {router}