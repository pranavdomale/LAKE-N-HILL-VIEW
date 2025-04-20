const Room = require('../models/roommodels');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

async function editRoomBooking(req, res) {
    const { roomName, checkIn, checkOut, paymentStatus, gname } = req.body;

    if (!roomName || !gname) {
        return res.status(400).json({ message: 'Room name and guest name (gname) are required' });
    }

    try {
        const room = await Room.findOne({ name: roomName });
        
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        const bookingIndex = room.bookings.findIndex(b => b.gname === gname);
        console.log("Booking Index:", bookingIndex);

        if (bookingIndex === -1) {
            return res.status(404).json({ message: 'Booking not found in this room' });
        }

        // Update booking fields (only update if they are provided)
        if (checkIn) room.bookings[bookingIndex].checkIn = checkIn;
        if (checkOut) room.bookings[bookingIndex].checkOut = checkOut;
        if (paymentStatus) room.bookings[bookingIndex].paymentStatus = paymentStatus;
        if (gname) room.bookings[bookingIndex].gname = gname;

        await room.save();

        res.json({ message: 'Room booking updated successfully', room });
    } catch (error) {
        res.status(500).json({ message: 'Error updating room booking', error: error.message });
    }
}

async function bookingRoomdetails(req, res) {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(401).json({ success: false, message: "User not logged in" });
        }
        // Assuming your booking data has a `userName` field to match with the session user
        const rooms = await Room.find(
            { "bookings.name": name }, // Find rooms where at least one booking matches this user
            'name type price bookings' // Project the fields you want
        );

        // Extract only the bookings belonging to this user
        const userBookings = rooms.flatMap(Room => 
            Room.bookings
                .filter(booking => booking.name === name)
                .map(booking => ({
                    ...booking,
                    propertyName: Room.name // Add room name to each booking for frontend display
                }))
        );

        res.status(200).json({ success: true, data: userBookings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function bookingRoomdetails_mybookings(req, res) {
    try {
        // Assuming your booking data has a `userName` field to match with the session user
        const rooms = await Room.find({ bookings: { $exists: true, $ne: [] } }, 'name price bookings');

        // Extract only the bookings belonging to this user
        if (rooms.length === 0) {
            return res.status(200).json({ success: true, message: "No bookings found", data: [] });
        }

        res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Function to generate default availability for the next 30 days
const generateAvailability = () => {
    let dates = {};
    let today = new Date();

    for (let i = 0; i < 30; i++) {
        let date = new Date(today);
        date.setDate(today.getDate() + i);

        let formattedDate = date.toISOString().split('T')[0]; // Format YYYY-MM-DD
        dates[formattedDate] = { availableRooms: 3 };
    }
    return dates;
};

async function bookRoom(req, res) {
    const { gname, phoneno, address, checkIn, checkOut, guestCount, name } = req.body;

    try {
        let room = await Room.findOne({ name: name });
        console.log("Room details:",room);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // Ensure dates are initialized
        if (!room.dates || room.dates.size === 0) {
            room.dates = generateAvailability();
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        let isAvailable = true;
        let updatedDates = new Map(room.dates);

        for (let d = new Date(checkInDate); d < checkOutDate; d.setUTCDate(d.getUTCDate() + 1)) {
            const dateKey = d.toISOString().split('T')[0];

            const dateData = updatedDates.get(dateKey);
            if (!dateData || dateData.availableRooms <= 0) {
                console.log(`Room unavailable on ${dateKey}`);
                isAvailable = false;
                break;
            }
        }

        if (!isAvailable) {
            return res.status(400).json({ message: 'Room unavailable for selected dates' });
        }

        // Reduce availability for booked dates
        for (let d = new Date(checkInDate); d < checkOutDate; d.setUTCDate(d.getUTCDate() + 1)) {
            const dateKey = d.toISOString().split('T')[0];

            const dateData = updatedDates.get(dateKey);
            if (dateData) {
                dateData.availableRooms -= 1;
                updatedDates.set(dateKey, dateData);
            }
        }

        // Add booking
        room.bookings.push({
            name: gname,
            phoneno,
            address,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            guestCount,
            paymentStatus: 'pending'
        });

        // Update room dates
        room.dates = updatedDates;

        // Check if all dates are fully booked
        const allDatesBooked = [...updatedDates.values()].every(date => date.availableRooms === 0);
        room.status = allDatesBooked ? 'booked' : 'available';

        await room.save();
        return res.status(200).json({ message: 'Room booked successfully', room });
    } catch (error) {
        console.error("Error booking room:", error);
        return res.status(500).json({ error: error.message });
    }
}

async function checkAvailability(req, res) {
    const { checkIn, checkOut, name } = req.body;

    try {
        let room = await Room.findOne({ name: name });
        const roomDates = room.dates instanceof Map ? Object.fromEntries(room.dates) : room.dates;
        console.log("All keys in roomDates:", Object.keys(roomDates));

        if (!room) {
            console.log("Room not found for type:", Type);
            return res.status(404).json({ message: 'Room not found' });
        }

        console.log("Room Details:", room);

        if (!roomDates || Object.keys(roomDates).length === 0) {
            console.log("Initializing room availability...");
            roomDates = generateAvailability();
        }
        
        // Log room availability data for debugging
        console.log("Room availability data:", room.dates);
        
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        let isAvailable = true;

        for (let d = new Date(checkInDate); d < checkOutDate; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split('T')[0];
            console.log("Looking for key:", dateKey);
            console.log("Room data for this key:", roomDates[dateKey]);

            console.log(`Checking availability for date: ${dateKey}`);

            if (!roomDates[dateKey] || roomDates[dateKey].availableRooms <= 0) {
                console.log(`Room unavailable on ${dateKey}`);
                isAvailable = false;
                break;
            }
        }

        return res.status(200).json({
            success: isAvailable,
            message: isAvailable ? 'Room available' : 'Room unavailable for selected dates'
        });

    }catch (error) {
        console.error("Error checking availability:", error);
        return res.status(500).json({ error: error.message });
    }
}        

// Cancel a booking
async function cancelBooking(req, res) {
    console.log("Request params:",req.params)
    const { Id } = req.params;

    console.log('Booking ID received:', Id);

    try {

        let room = await Room.findOne({ 'bookings._id':Id});
        console.log('Searching for booking with ID:', Id);
        console.log('Room found:', room);

        if (!room) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const checkInDate = new Date(room.checkIn);
        const checkOutDate = new Date(room.checkOut);

        let updatedDates = { ...room.dates };

        for (let d = new Date(checkInDate); d < checkOutDate; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split('T')[0];
            if (updatedDates[dateKey] && updatedDates[dateKey].availableRooms !== undefined) {
                updatedDates[dateKey].availableRooms += 1;
            }
        }

        room.bookings = room.bookings.filter(b => b._id.toString() !== Id.toString());
        room.dates = new Map(Object.entries(updatedDates));

        const anyDatesAvailable = Object.values(updatedDates).some(date => date.availableRooms > 0);
        room.status = anyDatesAvailable ? 'available' : 'booked';

        await room.save();

        return res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        console.error("Error canceling booking:", error);
        return res.status(500).json({ error: error.message });
    }
}

// Fetch all bookings for a specific user
async function getMyBookings(req, res) {
    const userName = req.session.user?.userName; 

    try {
        const rooms = await Room.find(
            { "bookings.name": userName },
            { "bookings.$": 1, type: 1, roomID: 1 });

        if (!rooms.length) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        const userBookings = rooms.map(room => {
            const booking = room.bookings[0];
            return {
                roomID: room.roomId,
                roomType: room.type,
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                guestCount: booking.guestCount,
                paymentStatus: booking.paymentStatus
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

module.exports = { bookRoom, bookingRoomdetails ,checkAvailability, cancelBooking, getMyBookings, editRoomBooking, bookingRoomdetails_mybookings };