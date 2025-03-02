const express = require('express');
const router = express.Router();
const Room = require('../models/roommodels');
const roomController = require('../controllers/roomscontroller');

router.post('/book_room', roomController.bookRoom);
router.get('/getRoomDetails', async (req, res) => {
    try {
        const roomDetails = await Room.find({}, 'hallType price discount'); // Fetch specific fields
        res.status(200).json({ success: true, data: roomDetails });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get('/bookings',roomController.getMyBookings);
router.post('/availability_room', roomController.checkAvailability);
router.delete('/cancelroom/:bookingId', roomController.cancelBooking);

module.exports = {router}