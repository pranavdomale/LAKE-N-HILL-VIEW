const Hall = require('../models/hallmodels');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

async function getHallDetails(req, res){
    try {
        const hallDetails = await Hall.find({}, 'name hallType capacity price status');
        console.log("Hall Details: ",hallDetails); // Fetch specific fields
        res.status(200).json({ success: true, data: hallDetails });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function bookingHalldetails(req, res){
    try {
        const booking = await Hall.find({}, 'bookings');
        console.log("Hall Booking Details: ",booking); // Fetch specific fields
        res.status(200).json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Create a new booking
async function bookHall(req, res) {
    console.log("Booking function");
    const { hallType, guestName, phoneno, address, eventDate, Capacity } = req.body;

    try {
        const hall = await Hall.findOne({ hallType });
        console.log("Booking function called");

        if (!hall || hall.status === 'unavailable') {
            return res.status(404).json({ message: 'Hall not found or unavailable' });
        }

        // Check if the requested date overlaps with any existing bookings
        const isBooked = hall.bookings.some(booking => {
            return new Date(booking.eventDate).toDateString() === new Date(eventDate).toDateString();
        });
        
        if (isBooked) {
            return res.status(400).json({ message: 'Hall is already booked for this date' });
        }

        // Ensure there's enough capacity left
        const availableRooms = hall.dates.get(eventDate)?.availableRooms || 0;
        if (availableRooms < 1 || Capacity > hall.capacity) {
            return res.status(400).json({ message: 'Insufficient capacity or hall unavailable for the selected date' });
        }

        // Add the booking
        hall.bookings.push({ guestName, phoneno, address, hallType, eventDate, Capacity, paymentStatus: 'pending' });

        // Decrease available rooms for the selected date
        hall.dates.set(eventDate, { availableRooms: availableRooms - 1 });

        // Update status if no rooms are left
        if (availableRooms - 1 === 0) {
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
    const { eventDate, hallType } = req.body;

    try {
        console.log("Check Availability is called");
        const hall = await Hall.findOne({ hallType });

        if (!hall) {
            return res.status(404).json({ message: 'Hall not found' });
        }

        const availableRooms = hall.dates.get(eventDate)?.availableRooms || 0;
        if (availableRooms > 0 && hall.status !== 'unavailable') {
            return res.status(200).json({ message: 'Hall is available', availableRooms });
        } else {
            return res.status(400).json({ message: 'Hall is not available for the selected date' });
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

        // Find and remove the booking
        const booking = hall.bookings.id(bookingId);
        if (booking) {
            const { eventDate } = booking;
            booking.remove();

            // Increment available rooms for the specific date
            const availableRooms = hall.dates.get(eventDate)?.availableRooms || 0;
            hall.dates.set(eventDate, { availableRooms: availableRooms + 1 });

            // Update the status to 'available' if rooms are now available
            if (hall.status === 'unavailable') {
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

module.exports = { getHallDetails, bookingHalldetails ,bookHall, checkAvailability_hall, cancelBooking_hall };