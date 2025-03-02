const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hallscontroller');

router.post('/book_hall', hallController.bookHall);
router.post('/availability_hall', hallController.checkAvailability_hall);
router.delete('/cancelhall/:bookingId', hallController.cancelBooking_hall);
router.get('/getHallDetails', hallController.getHallDetails);

module.exports = {router}