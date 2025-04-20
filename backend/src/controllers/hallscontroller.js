const Hall = require('../models/hallmodels');
const express = require('express');
const hall1=require('../models/hallmodels')
const mongoose = require('mongoose');
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
        const { name } = req.query;

        if (!name) {
            return res.status(401).json({ success: false, message: "User not logged in" });
        }
            // Fetch only halls where bookings array is not empty
            const halls = await Hall.find(
                { "bookings.name": name }, // Find Halls where at least one booking matches this user
            'name price bookings' // Project the fields you want
        );

        // Extract only the bookings belonging to this user
        const userBookings = halls.flatMap(Hall => 
            Hall.bookings
                .filter(booking => booking.name === name)
                .map(booking => ({
                    ...booking,
                    propertyName: Hall.name // Add hall name to each booking for frontend display
                }))
        );

        res.status(200).json({ success: true, data: userBookings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

async function bookingHalldetails_mybooking(req, res){
  try {
          // Fetch only Bike where bookings array is not empty
          const halls = await Hall.find({ bookings: { $exists: true, $ne: [] } }, 'name price bookings');

        if (halls.length === 0) {
            return res.status(200).json({ success: true, message: "No bookings found", data: [] });
        }

        res.status(200).json({ success: true, data: halls });

} catch (error) {
    res.status(500).json({ success: false, error: error.message });
}
}

// Create a new booking
async function bookHall(req, res) {
    console.log("Booking function");
    const { name, phoneno, address, checkIn, checkOut, Capacity, hallType } = req.body;
    console.log("type",typeof(hallType))
    const hall="Conference  Hall";

    const data=await hall1.findOne({hallType});
    console.log("data:",data)

    try {
      

        console.log("hall type:")
        const hall = await Hall.findOne({hallType});
        console.log("Booking Hall:",hall);
        console.log("Hall Type:",hallType);
        console.log("Capacity:",Capacity);

        if (!hall || hall.status === 'unavailable') {
            return res.status(404).json({ message: 'Hall not found or unavailable' });
        }

        // Check if the requested date overlaps with any existing bookings
        const isBooked = hall.bookings.some(booking => {
            return new Date(booking.checkIn).toDateString() === new Date(checkIn).toDateString();
        });
        
        if (isBooked) {
            return res.status(400).json({ message: 'Hall is already booked for this date' });
        }

        // Ensure there's enough capacity left
        const availableRooms = hall.dates.get(checkIn)?.availableRooms || 0;
        if (availableRooms < 1 || Capacity > hall.Capacity) {
            return res.status(400).json({ message: 'Insufficient capacity or hall unavailable for the selected date' });
        }

        // Add the booking
        hall.bookings.push({ name, phoneno, address, hallType, checkIn, checkOut, Capacity: Capacity, paymentStatus: 'pending' });

        // Decrease available rooms for the selected date
        hall.dates.set(checkIn, { availableRooms: availableRooms - 1 });

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
    const { checkIn, hallType } = req.body;

    try {
        console.log("Check Availability is called");
        const hall = await Hall.findOne({ hallType });

        if (!hall) {
            return res.status(404).json({ message: 'Hall not found' });
        }

        const availableRooms = hall.dates.get(checkIn)?.availableRooms || 0;
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
    const { Id } = req.params;

    try {
        const booking_id = new mongoose.Types.ObjectId(Id);

        console.log("Booking Id:", booking_id);

        const hall = await Hall.findOne({ 'bookings._id': booking_id });

        if (!hall) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Find the booking
        const booking = hall.bookings.find(b => b._id.toString() === booking_id.toString());
        if (booking) {
            const { checkIn } = booking;

            // Remove the booking manually
            hall.bookings = hall.bookings.filter(b => b._id.toString() !== booking_id.toString());

            // Update available rooms for the date
            if (hall.dates.has(checkIn)) {
                const dateData = hall.dates.get(checkIn);
                hall.dates.set(checkIn, {
                    availableRooms: dateData.availableRooms + 1
                });
            }

            // Optionally update status if necessary
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

module.exports = { getHallDetails, bookingHalldetails ,bookHall, checkAvailability_hall, cancelBooking_hall, bookingHalldetails_mybooking };