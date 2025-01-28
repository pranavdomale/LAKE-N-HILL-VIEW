const Bike = require('../models/bikemodels');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

// Create a new booking
async function bookBike(req, res) {
  try {
    const { bikeId, guestName, rentalDate, returnDate } = req.body;
    const bike = await Bike.findOne({ bikeId });

    if (!bike || bike.status === 'booked') {
      return res.status(400).json({ message: 'Bike unavailable' });
    }

    bike.bookings.push({ guestName, rentalDate, returnDate, paymentStatus: 'pending' });
    bike.status = 'booked';
    await bike.save();

    res.status(200).json({ message: 'Bike booked successfully', bike });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Check room availability
async function checkAvailability_bike(req, res) {
  try {
    const bikes = await Bike.find({ status: 'available' });
    res.status(200).json(bikes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Cancel a booking
async function cancelBooking_bike(req, res) {
  try {
    const { bikeId } = req.params;
    const biker = await Bike.findOne({ 'bookings._id': bikeId });

    if (!biker) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    biker.bookings.id(bikeId).remove();
    biker.status = 'available';
    await biker.save();

    res.status(200).json({ message: 'Booking cancelled successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {bookBike, checkAvailability_bike, cancelBooking_bike}