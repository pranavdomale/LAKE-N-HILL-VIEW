const express = require('express');
const router = express.Router();
const Room = require('../models/roommodels');
const roomController = require('../controllers/roomscontroller');

router.post('/book_room', roomController.bookRoom);
router.get('/rooms', async (req, res) => {
    try {
        const roomDetails = await Room.find({}, 'name type price status capacity'); // Fetch specific fields
        res.status(200).json({ success: true, data: roomDetails });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get('/bookingsroom',roomController.bookingRoomdetails);
router.get('/mybooking-room',roomController.bookingRoomdetails_mybookings);
router.get('/bookings',roomController.getMyBookings);
router.post('/availability_room', roomController.checkAvailability);
router.delete('/cancel/room/:Id', roomController.cancelBooking);
router.put("/update-room", async (req, res) => {
    const { name, type, capacity, price, status } = req.body;
    // Find by name and update (change logic if you have unique _id)
    await Room.updateOne({ name }, { $set: { type, capacity, price, status } });
    res.send({ message: "Room updated successfully" });
});
router.put('/update-room-booking',roomController.editRoomBooking);

module.exports = {router}