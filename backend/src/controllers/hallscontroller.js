const Hall = require('../models/hallmodels');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

// Create a new booking
async function bookHall(req, res) {
    console.log("Booking function");
    const { hallType, guestName, eventDate, Capacity } = req.body;

    try {
        const hall = await Hall.findOne({ hallType });

        if (!hall || hall.status === 'unavailable') {
            return res.status(404).json({ message: 'Hall not found' });
        }

        // Update the status to 'unavailable' if quantity is zero
        if (hall.status === 'unavailable' || hall.quantity <= 0) {
            return res.status(400).json({ message: 'Hall is unavailable for booking' });
        }

        // Check if the requested date overlaps with any existing bookings
        const isBooked = hall.bookings.some(booking => {
            // Compare only the date part, ignoring time
            return new Date(booking.eventDate).toDateString() === new Date(eventDate).toDateString();
        });
        
        if (isBooked) {
            return res.status(400).json({ message: 'Hall is already booked for this date' });
        }

        // Ensure there's enough Capacity left
        if (hall.quantity < Capacity) {
            return res.status(400).json({ message: `Only ${hall.quantity} slots available.` });
        }

        // Add the booking
        hall.bookings.push({ guestName, eventDate, Capacity, paymentStatus: 'pending' });
        hall.quantity -= 1; // Decrement the available quantity

        if (hall.quantity === 0) {
            hall.status = 'unavailable';
        }

        await hall.save();
        res.status(200).json({ message: 'Hall booked successfully', hall });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Check hall availability
async function checkAvailability_hall(req, res) {
    const { eventDate, hallType, Capacity } = req.body;
  
    try {
      console.log("Chevk Availability is called")
      const hall = await Hall.findOne({ hallType });
      console.log("Hall find:",hall);
  
      if (!hall) {
        return res.status(404).json({ message: 'Hall not found' });
      }

      // Check if hall has enough quantity available
      if (hall.quantity <= 0) {
        return res.status(400).json({ message: 'Hall is unavailable due to no available slots' });
    }
  
      // Check for overlapping bookings
      const isAvailable = hall.bookings.every(booking => {
        // Compare only the date part, ignoring time
        const isDateOverlap = new Date(booking.eventDate).toDateString() === new Date(eventDate).toDateString();
        const isCapacitySufficient = booking.Capacity + Capacity <= hall.Capacity;
        return !isDateOverlap || isCapacitySufficient; // No overlap or enough space
    });
      console.log("Is Available:",isAvailable)
  
      if (isAvailable && hall.status !== 'unavailable') {
        return res.status(200).json({ message: 'Hall is available' });
      } else {
        return res.status(400).json({ message: 'Hall is not available' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


// Cancel a booking
async function cancelBooking_hall(req, res) {
    const { bookingId } = req.params;

    try {
        const hall = await Hall.findOne({ 'bookings._id': bookingId });

        if (!hall) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Remove the booking from the hall
        const booking = hall.bookings.id(bookingId);
        if (booking) {
            booking.remove();
            hall.quantity += 1; // Increment the available quantity

            // Update the status to 'available' if there are remaining bookings
            if (hall.quantity > 0) {
                hall.status = 'available';
            }

            await hall.save();
            res.status(200).json({ message: 'Booking cancelled successfully' });
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { bookHall, checkAvailability_hall, cancelBooking_hall };