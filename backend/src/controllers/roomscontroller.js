const Room = require('../models/roommodels');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

// Create a new booking
async function bookRoom(req, res) {
    const { name, phoneno, address, checkIn, checkOut, guestCount, Type } = req.body;

    try {
        const room = await Room.findOne({ type: Type });

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        if (room.quantity === 0) {
            alert("Booking attempt for full room:", room);
            return res.status(400).json({ message: 'Room is fully booked' });
        }
        // Ensure checkIn and checkOut are Date objects
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        // Check if room is already booked
        const isBooked = room.bookings.some(booking =>
            (checkInDate >= new Date(booking.checkIn) && checkInDate < new Date(booking.checkOut)) ||
            (checkOutDate > new Date(booking.checkIn) && checkOutDate <= new Date(booking.checkOut))
        );

        if (isBooked) {
            return res.status(400).json({ message: 'Room unavailable for selected dates' });
        }

        // Add the booking
        room.bookings.push({ name, phoneno, address, checkIn: checkInDate, checkOut: checkOutDate, guestCount, Type, paymentStatus: 'pending' });
        room.quantity -= 1; // Decrement the quantity

        // Update the status to 'unavailable' if quantity is zero
        if (room.quantity == 0) {
            room.status = 'unavailable';
        }

        await room.save();
        return res.status(200).json({ message: 'Room booked successfully', room });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Check room availability
async function checkAvailability(req, res) {
    const { checkIn, checkOut, Type } = req.body;
    console.log("Type:", Type);

    try {
        const room = await Room.findOne({ type: Type });

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Convert to Date objects
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        // Check if room is booked
        const isBooked = room.bookings.some(booking =>
            (checkInDate < new Date(booking.checkOut) && checkOutDate > new Date(booking.checkIn))
        );

        console.log("Is Booked:", isBooked);

        if (isBooked) {
            return res.status(400).json({ success: false, message: 'Room unavailable for selected dates' });
        }

        return res.status(200).json({
            success: true,
            message: 'Room available',
            data: isBooked
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Cancel a booking
async function cancelBooking(req, res) {
    const { bookingId } = req.params;

    try {
        const room = await Room.findOne({ 'bookings._id': bookingId });

        if (!room) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Remove the booking
        room.bookings.id(bookingId).remove();
        room.quantity += 1; // Increment the quantity

        // Update the status to 'available' if quantity is greater than zero
        if (room.quantity > 0) {
            room.status = 'available';
        }

        await room.save();
        return res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Fetch all bookings for a specific user
async function getMyBookings(req, res) {
    const { phoneno } = req.body;
    console.log("Get Booking Function")

    try {
        // Find all rooms where the user's phone number matches any booking
        const rooms = await Room.find({
            'bookings.phoneno': phoneno
        });

        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        // Extract only the relevant bookings for the user
        const userBookings = rooms.map(room => {
            return {
                roomType: room.type,
                bookings: room.bookings.filter(booking => booking.phoneno === phoneno)
            };
        });

        return res.status(200).json({
            success: true,
            message: 'Bookings fetched successfully',
            bookings: userBookings
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { bookRoom, checkAvailability, cancelBooking, getMyBookings };