const express = require('express');
const router = express.Router();
const Bike = require('../models/bikemodels');
const bike = require('../controllers/bikescontroller');

router.post('/book_bike', bike.bookBike);
router.post('/availability_bike', bike.checkAvailability_bike);
router.get('/mybooking-bike',bike.bookingBikedetails_mybooking);
router.delete('/cancel/bike/:Id', bike.cancelBooking_bike);
router.get('/bikes', async (req, res) => {
    try {
        const bikeDetails = await Bike.find({}, 'name type price status'); // Fetch specific fields
        res.status(200).json({ success: true, data: bikeDetails });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});
router.get('/bookingsbike',bike.bookingBikedetails);
router.put("/update-bike", async (req, res) => {
    const { name, type, price, status } = req.body;
    // Find by name and update (change logic if you have unique _id)
    await Bike.updateOne({ name }, { $set: { type, price, status } });
    res.send({ message: "Bike updated successfully" });
});

module.exports = {router};