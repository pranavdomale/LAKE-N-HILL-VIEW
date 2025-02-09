// 1st code
// const Room = require('../models/roommodels');
// const express = require('express');
// const router = express.Router();
// const dotenv = require('dotenv');

// dotenv.config();

// // Create a new booking
// async function bookRoom(req, res) {
//     const { name, phoneno, address, checkIn, checkOut, guestCount, Type } = req.body;

//     try {
//         const room = await Room.findOne({ type: Type });

//         if (!room) {
//             return res.status(404).json({ message: 'Room not found' });
//         }

//         if (room.quantity === 0) {
//             alert("Booking attempt for full room:", room);
//             return res.status(400).json({ message: 'Room is fully booked' });
//         }
//         // Ensure checkIn and checkOut are Date objects
//         const checkInDate = new Date(checkIn);
//         const checkOutDate = new Date(checkOut);

//         // Check if room is already booked
//         const isBooked = room.bookings.some(booking =>
//             (checkInDate >= new Date(booking.checkIn) && checkInDate < new Date(booking.checkOut)) ||
//             (checkOutDate > new Date(booking.checkIn) && checkOutDate <= new Date(booking.checkOut))
//         );

//         if (isBooked) {
//             return res.status(400).json({ message: 'Room unavailable for selected dates' });
//         }

//         // Add the booking
//         room.bookings.push({ name, phoneno, address, checkIn: checkInDate, checkOut: checkOutDate, guestCount, Type, paymentStatus: 'pending' });
//         room.quantity -= 1; // Decrement the quantity

//         // Update the status to 'unavailable' if quantity is zero
//         if (room.quantity == 0) {
//             room.status = 'unavailable';
//         }

//         await room.save();
//         return res.status(200).json({ message: 'Room booked successfully', room });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }

// // Check room availability
// async function checkAvailability(req, res) {
//     const { checkIn, checkOut, Type } = req.body;
//     console.log("Type:", Type);

//     try {
//         const room = await Room.findOne({ type: Type });
//         console.log("Room Detail: ", room);

//         if (!room) {
//             return res.status(404).json({ message: 'Room not found' });
//         }

//         // Convert to Date objects
//         const checkInDate = new Date(checkIn);
//         const checkOutDate = new Date(checkOut);

//         // Check if room is booked
//         const isBooked = room.bookings.some(booking =>
//             (checkInDate < new Date(booking.checkOut) && checkOutDate > new Date(booking.checkIn))
//         );

//         console.log("Is Booked:", isBooked);

//         if (isBooked) {
//             return res.status(400).json({ success: false, message: 'Room unavailable for selected dates' });
//         }

//         return res.status(200).json({
//             success: true,
//             message: 'Room available',
//             data: isBooked
//         });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }

// // Cancel a booking
// async function cancelBooking(req, res) {
//     const { bookingId } = req.params;

//     try {
//         const room = await Room.findOne({ 'bookings._id': bookingId });

//         if (!room) {
//             return res.status(404).json({ message: 'Booking not found' });
//         }

//         // Remove the booking
//         room.bookings.id(bookingId).remove();
//         room.quantity += 1; // Increment the quantity

//         // Update the status to 'available' if quantity is greater than zero
//         if (room.quantity > 0) {
//             room.status = 'available';
//         }

//         await room.save();
//         return res.status(200).json({ message: 'Booking canceled successfully' });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }

// // Fetch all bookings for a specific user
// async function getMyBookings(req, res) {
//     const { phoneno } = req.body;

//     try {
//         const rooms = await Room.find({
//             bookings: { $elemMatch: { phoneno } }
//         }, { "bookings.$": 1, type: 1 }); // Only return matching bookings

//         if (!rooms.length) {
//             return res.status(404).json({ message: 'No bookings found for this user' });
//         }

//         const userBookings = rooms.map(room => ({
//             roomType: room.type,
//             bookings: room.bookings
//         }));

//         return res.status(200).json({
//             success: true,
//             message: 'Bookings fetched successfully',
//             bookings: userBookings
//         });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }

// module.exports = { bookRoom, checkAvailability, cancelBooking, getMyBookings };

//2nd code
// const Room = require('../models/roommodels');
// const express = require('express');
// const router = express.Router();
// const dotenv = require('dotenv');

// dotenv.config();

// // Create a new booking
// async function bookRoom(req, res) {
//     const { name, phoneno, address, checkIn, checkOut, guestCount, Type } = req.body;

//     try {
//         const room = await Room.findOne({ type: Type });

//         if (!room) {
//             return res.status(404).json({ message: 'Room not found' });
//         }

//         const checkInDate = new Date(checkIn);
//         const checkOutDate = new Date(checkOut);

//         // Check room availability for each date in the range
//         let isAvailable = true;
//         let updatedDates = { ...room.dates };

//         for (let d = new Date(checkInDate); d < checkOutDate; d.setDate(d.getDate() + 1)) {
//             const dateKey = d.toISOString().split('T')[0];
//             if (!updatedDates[dateKey] || updatedDates[dateKey].availableRooms <= 0) {
//                 isAvailable = false;
//                 break;
//             }
//         }

//         if (!isAvailable) {
//             return res.status(400).json({ message: 'Room unavailable for selected dates' });
//         }

//         // Reduce room availability for booked dates
//         for (let d = new Date(checkInDate); d < checkOutDate; d.setDate(d.getDate() + 1)) {
//             const dateKey = d.toISOString().split('T')[0];
//             updatedDates[dateKey].availableRooms -= 1;
//         }

//         // Add booking entry
//         room.bookings.push({ name, phoneno, address, checkIn: checkInDate, checkOut: checkOutDate, guestCount, paymentStatus: 'pending' });
//         room.dates = updatedDates;

//         // Check if all dates are fully booked
//         const allDatesBooked = Object.values(updatedDates).every(date => date.availableRooms === 0);
//         if (allDatesBooked) {
//             room.status = 'unavailable';
//         }

//         await room.save();
//         return res.status(200).json({ message: 'Room booked successfully', room });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }

// // Check room availability
// async function checkAvailability(req, res) {
//     const { checkIn, checkOut, Type } = req.body;

//     try {
//         const room = await Room.findOne({ type: Type });

//         if (!room) {
//             return res.status(404).json({ message: 'Room not found' });
//         }

//         const checkInDate = new Date(checkIn);
//         const checkOutDate = new Date(checkOut);

//         // Check availability for each date in the range
//         let isAvailable = true;
//         for (let d = new Date(checkInDate); d < checkOutDate; d.setDate(d.getDate() + 1)) {
//             const dateKey = d.toISOString().split('T')[0];
//             if (!room.dates[dateKey] || room.dates[dateKey].availableRooms <= 0) {
//                 isAvailable = false;
//                 break;
//             }
//         }

//         return res.status(200).json({
//             success: isAvailable,
//             message: isAvailable ? 'Room available' : 'Room unavailable for selected dates'
//         });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }

// // Cancel a booking
// async function cancelBooking(req, res) {
//     const { bookingId } = req.params;

//     try {
//         const room = await Room.findOne({ 'bookings._id': bookingId });

//         if (!room) {
//             return res.status(404).json({ message: 'Booking not found' });
//         }

//         const booking = room.bookings.id(bookingId);

//         if (!booking) {
//             return res.status(404).json({ message: 'Booking not found' });
//         }

//         const checkInDate = new Date(booking.checkIn);
//         const checkOutDate = new Date(booking.checkOut);

//         // Restore room availability for canceled dates
//         let updatedDates = { ...room.dates };
//         for (let d = new Date(checkInDate); d < checkOutDate; d.setDate(d.getDate() + 1)) {
//             const dateKey = d.toISOString().split('T')[0];
//             if (updatedDates[dateKey]) {
//                 updatedDates[dateKey].availableRooms += 1;
//             }
//         }

//         // Remove booking entry
//         room.bookings = room.bookings.filter(b => b._id.toString() !== bookingId);
//         room.dates = updatedDates;

//         // Update room status
//         room.status = 'available';

//         await room.save();
//         return res.status(200).json({ message: 'Booking canceled successfully' });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }

// // Fetch all bookings for a specific user
// async function getMyBookings(req, res) {
//     const { phoneno } = req.body;

//     try {
//         const rooms = await Room.find({
//             bookings: { $elemMatch: { phoneno } }
//         }, { "bookings.$": 1, type: 1 });

//         if (!rooms.length) {
//             return res.status(404).json({ message: 'No bookings found for this user' });
//         }

//         const userBookings = rooms.map(room => ({
//             roomType: room.type,
//             bookings: room.bookings
//         }));

//         return res.status(200).json({
//             success: true,
//             message: 'Bookings fetched successfully',
//             bookings: userBookings
//         });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }

// module.exports = { bookRoom, checkAvailability, cancelBooking, getMyBookings };

const Room = require('../models/roommodels');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

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

// Create a new booking
// async function bookRoom(req, res) {
//     const { name, phoneno, address, checkIn, checkOut, guestCount, Type } = req.body;

//     try {
//         let room = await Room.findOne({ type: Type });

//         if (!room) {
//             return res.status(404).json({ message: 'Room not found' });
//         }

//         // Ensure dates are initialized
//         if (Object.keys(room.dates).length === 0) {
//             room.dates = generateAvailability();
//         }

//         const checkInDate = new Date(checkIn);
//         const checkOutDate = new Date(checkOut);

//         let isAvailable = true;
//         let updatedDates = { ...room.dates };

//         for (let d = new Date(checkInDate); d < checkOutDate; d.setDate(d.getDate() + 1)) {
//             const dateKey = d.toISOString().split('T')[0];
//             if (!updatedDates[dateKey] || updatedDates[dateKey].availableRooms <= 0) {
//                 isAvailable = false;
//                 break;
//             }
//         }

//         if (!isAvailable) {
//             return res.status(400).json({ message: 'Room unavailable for selected dates' });
//         }

//         // Reduce availability for booked dates
//         for (let d = new Date(checkInDate); d < checkOutDate; d.setDate(d.getDate() + 1)) {
//             const dateKey = d.toISOString().split('T')[0];
//             updatedDates[dateKey].availableRooms -= 1;
//         }

//         room.bookings.push({ name, phoneno, address, checkIn: checkInDate, checkOut: checkOutDate, guestCount, paymentStatus: 'pending' });
//         room.dates = updatedDates;

//         // Check if all dates are fully booked
//         const allDatesBooked = Object.values(updatedDates).every(date => date.availableRooms === 0);
//         room.status = allDatesBooked ? 'booked' : 'available';

//         await room.save();
//         return res.status(200).json({ message: 'Room booked successfully', room });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// }

async function bookRoom(req, res) {
    const { name, phoneno, address, checkIn, checkOut, guestCount, Type } = req.body;

    try {
        let room = await Room.findOne({ type: Type });

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
            name,
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
    const { checkIn, checkOut, Type } = req.body;

    try {
        let room = await Room.findOne({ type: Type });
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
    const { bookingId } = req.params;

    try {
        let room = await Room.findOne({ 'bookings._id': bookingId });

        if (!room) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const booking = room.bookings.id(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const checkInDate = new Date(booking.checkIn);
        const checkOutDate = new Date(booking.checkOut);

        let updatedDates = { ...room.dates };

        // Restore room availability for canceled dates
        for (let d = new Date(checkInDate); d < checkOutDate; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toISOString().split('T')[0];
            if (updatedDates[dateKey]) {
                updatedDates[dateKey].availableRooms += 1;
            }
        }

        room.bookings = room.bookings.filter(b => b._id.toString() !== bookingId);
        room.dates = updatedDates;

        // Update room status based on remaining availability
        const allDatesAvailable = Object.values(updatedDates).some(date => date.availableRooms > 0);
        room.status = allDatesAvailable ? 'available' : 'booked';

        await room.save();
        return res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

// Fetch all bookings for a specific user
async function getMyBookings(req, res) {
    const { phoneno } = req.body;

    try {
        const rooms = await Room.find({
            bookings: { $elemMatch: { phoneno } }
        }, { "bookings.$": 1, type: 1 });

        if (!rooms.length) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        const userBookings = rooms.map(room => ({
            roomType: room.type,
            bookings: room.bookings
        }));

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