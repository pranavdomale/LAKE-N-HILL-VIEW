const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hallscontroller');

router.post('/book_hall', hallController.bookHall);
router.post('/availability_hall', hallController.checkAvailability_hall);
router.delete('/cancelhall/:bookingId', hallController.cancelBooking_hall);
router.get('/halls', hallController.getHallDetails);
router.get('/bookingshall',hallController.bookingHalldetails);

module.exports = {router}