const Hall = require('../models/hallmodels');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

// Create a new booking
async function bookHall(req, res){
  try {
    const { hallId, capacity, price, status } = req.body;
    const hall = await Hall.findOne({ hallId });

    if (!hall || hall.status === 'booked') {
      return res.status(400).json({ message: 'Hall unavailable' });
    }

    hall.bookings.push({ guestName, eventDate, numberOfGuests, paymentStatus: 'pending' });
    hall.status = 'booked';
    await hall.save();

    res.status(200).json({ message: 'Hall booked successfully', hall });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check room availability
async function checkAvailability_hall(req, res) {
  try {
    const halls = await Hall.find({ status: 'available' });
    res.status(200).json(halls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel a booking
async function cancelBooking_hall(req, res) {
  try {
    const { hallId } = req.params;
    const hall = await Hall.findOne({ 'hall._id': hallId });

    if (!hall) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    hall.bookings.id(hallId).remove();
    hall.status = 'available';
    await hall.save();

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {bookHall, checkAvailability_hall, cancelBooking_hall}