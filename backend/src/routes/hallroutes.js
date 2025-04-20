const express = require('express');
const router = express.Router();
const Hall = require('../models/hallmodels');
const hallController = require('../controllers/hallscontroller');

router.post('/book_hall', hallController.bookHall);
router.post('/availability_hall', hallController.checkAvailability_hall);
router.delete('/cancel/hall/:Id', hallController.cancelBooking_hall);
router.get('/halls', hallController.getHallDetails);
router.get('/bookingshall',hallController.bookingHalldetails);
router.get('/mybooking-hall',hallController.bookingHalldetails_mybooking);
router.put("/update-hall", async (req, res) => {
    const { name, type, capacity, price, status } = req.body;
    // Find by name and update (change logic if you have unique _id)
    await Hall.updateOne({ name }, { $set: { type, capacity, price, status } });
    res.send({ message: "Hall updated successfully" });
});

module.exports = {router}