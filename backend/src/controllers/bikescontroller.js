const Bike = require('../models/bikemodels');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

async function bookingBikedetails(req, res){
    try {
            const { name } = req.query;

            if (!name) {
                return res.status(401).json({ success: false, message: "User not logged in" });
            }

            // Fetch only Bike where bookings array is not empty
            const bikes = await Bike.find(
              { "bookings.Name": name }, // Find bike where at least one booking matches this user
              'name price bookings' // Project the fields you want
          );

          // Extract only the bookings belonging to this user
        const userBookings = bikes.flatMap(Bike => 
          Bike.bookings
              .filter(booking => booking.Name === name)
              .map(booking => ({
                  ...booking,
                  propertyName: Bike.name // Add bike name to each booking for frontend display
              }))
      );

      res.status(200).json({ success: true, data: userBookings });
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
}

async function bookingBikedetails_mybooking(req, res){
  try {
                // Fetch all bikes that have at least one booking
                const bikes = await Bike.find(
                    { bookings: { $exists: true, $ne: [] } }, // Only bikes with bookings
                    'name price bookings' // Only fetch these fields
                );
        
        
                if (bikes.length === 0) {
                    return res.status(200).json({ success: true, message: "No bookings found", data: [] });
                }
        
                res.status(200).json({ success: true, data: bikes });
        
            } catch (error) {
                console.error("Error fetching all bookings:", error);
                res.status(500).json({ success: false, error: error.message });
            }
        }        

// Create a new booking
async function bookBike(req, res) {
  const { Name, checkIn, checkOut, name } = req.body;

  try {
    const bike = await Bike.findOne({ name: name });

    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    let isAvailable = true;

    // Check if the bike is available on all selected dates
    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().split('T')[0];
      if (!bike.dates.get(dateKey) || bike.dates.get(dateKey).availableRooms <= 0) {
        isAvailable = false;
        break;
      }
    }

    if (!isAvailable) {
      return res.status(400).json({ message: 'Bike unavailable for selected dates' });
    }

    // Reduce availability for the booked dates
    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().split('T')[0];
      bike.dates.get(dateKey).availableRooms -= 1;
    }

    // Add booking details
    bike.bookings.push({
      Name,
      checkIn: startDate,
      checkOut: endDate,
      paymentStatus: 'pending'
    });

    await bike.save();
    res.status(200).json({ message: 'Bike booked successfully', bike });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Check bike availability
async function checkAvailability_bike(req, res) {
  const { checkIn, checkOut, name } = req.body;

  try {
    console.log("Check Availability is called");
    const bike = await Bike.findOne({ name });
    console.log("Bike:",bike);

    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    let isAvailable = true;

    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().split('T')[0];
      if (!bike.dates.get(dateKey) || bike.dates.get(dateKey).availableRooms <= 0) {
        isAvailable = false;
        break;
      }
    }

    console.log("Is Available:", isAvailable);

    if (isAvailable) {
      return res.status(200).json({ message: 'Bike is available' });
    } else {
      return res.status(400).json({ message: 'Bike is not available' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Cancel a booking
async function cancelBooking_bike(req, res) {
  const { id } = req.params;
  console.log("Id:",id);

  try {
      if (!id) {
          return res.status(400).json({ message: "Invalid booking ID" });
      }

      const bookingId = new mongoose.Types.ObjectId(id);
      console.log("Booking Id:",bookingId)  // Create ObjectId for matching

      const bike = await Bike.findOne({ 'bookings._id': bookingId});
      console.log("Bike Details:",bike)

      if (!bike) {
          return res.status(404).json({ message: 'Booking not found' });
      }

      // Find booking in array (optional, but useful for safety/logging)
      const booking = bike.bookings.find(b => b._id.toString() === bookingId.toString());
      if (!booking) {
          return res.status(404).json({ message: 'Booking not found' });
      }

      const startDate = new Date(booking.checkIn);
      const endDate = new Date(booking.checkOut);

      // Clone dates object (if needed for safety, depending on schema type)
      let updatedDates = { ...bike.dates };

      // Increase availability for each date between checkIn and checkOut
      for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
          const dateKey = d.toISOString().split('T')[0];
          if (updatedDates[dateKey] && updatedDates[dateKey].availableRooms !== undefined) {
              updatedDates[dateKey].availableRooms += 1;
          }
      }

      // Remove the booking using filter (remove() does not work directly on subdocs array)
      bike.bookings = bike.bookings.filter(b => b._id.toString() !== bookingId.toString());

      // Update bike dates
      bike.dates = updatedDates;

      await bike.save();

      res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
      console.error("Error cancelling bike booking:", error);
      res.status(500).json({ error: error.message });
  }
}

module.exports = { bookBike, bookingBikedetails ,checkAvailability_bike, cancelBooking_bike, bookingBikedetails_mybooking };