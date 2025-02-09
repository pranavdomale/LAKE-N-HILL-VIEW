// const Bike = require('../models/bikemodels');
// const express = require('express');
// const router = express.Router();
// const dotenv = require('dotenv');

// dotenv.config();

// // Create a new booking
// async function bookBike(req, res) {
//   const { model, guestName, rentalDate, returnDate } = req.body;

//   try {
//     const bike = await Bike.findOne({ model });

//     if (!bike || bike.status === 'unavailable') {
//       return res.status(400).json({ message: 'Bike unavailable' });
//     }

//     // Check for overlapping bookings
//     const isOverlapping = bike.bookings.some((booking) => {
//       const isRentalOverlap = new Date(rentalDate) < new Date(booking.returnDate) && new Date(returnDate) > new Date(booking.rentalDate);
//       return isRentalOverlap;
//     });

//     if (isOverlapping) {
//       return res.status(400).json({ message: 'Booking dates overlap with an existing booking' });
//     }

//     // Add the booking details
//     bike.bookings.push({ guestName, rentalDate, returnDate, paymentStatus: 'pending' });
//     bike.quantity -= 1; // Decrease the available quantity

//     // If no bikes are left, mark the bike as unavailable
//     if (bike.quantity === 0) {
//       bike.status = 'unavailable';
//     }

//     await bike.save();
//     res.status(200).json({ message: 'Bike booked successfully', bike });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Check bike availability
// async function checkAvailability_bike(req, res) {
//   const { rentalDate, returnDate, model } = req.body;

//   try {
//     console.log("Chevk Availability is called")
//     const bike = await Bike.findOne({ model });
//     console.log("Bike find:",bike);

//     if (!bike) {
//       return res.status(404).json({ message: 'Bike not found' });
//     }

//     // Check for overlapping bookings
//     const isAvailable = bike.bookings.every((booking) => {
//       // Check if the new booking's rental and return dates overlap with an existing booking
//       const isRentalOverlap = new Date(rentalDate) < new Date(booking.returnDate) && new Date(returnDate) > new Date(booking.rentalDate);
//       return !isRentalOverlap;
//     });
//     console.log("Is Available:",isAvailable)

//     if (isAvailable && bike.status !== 'unavailable') {
//       return res.status(200).json({ message: 'Bike is available' });
//     } else {
//       return res.status(400).json({ message: 'Bike is not available' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Cancel a booking
// async function cancelBooking_bike(req, res) {
//   const { bookingId } = req.params; // Use bookingId to identify the booking

//   try {
//     const bike = await Bike.findOne({ 'bookings._id': bookingId });

//     if (!bike) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     // Remove the booking
//     bike.bookings.id(bookingId).remove();
//     bike.quantity += 1; // Increase the available quantity

//     // Update the status to 'available' if there's at least one bike left
//     if (bike.quantity > 0) {
//       bike.status = 'available';
//     }

//     await bike.save();
//     res.status(200).json({ message: 'Booking cancelled successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// module.exports = { bookBike, checkAvailability_bike, cancelBooking_bike };

const Bike = require('../models/bikemodels');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

// Create a new booking
async function bookBike(req, res) {
  const { model, guestName, rentalDate, returnDate } = req.body;

  try {
    const bike = await Bike.findOne({ model });

    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }

    const startDate = new Date(rentalDate);
    const endDate = new Date(returnDate);

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
      guestName,
      rentalDate: startDate,
      returnDate: endDate,
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
  const { rentalDate, returnDate, model } = req.body;

  try {
    console.log("Check Availability is called");
    const bike = await Bike.findOne({ model });

    if (!bike) {
      return res.status(404).json({ message: 'Bike not found' });
    }

    const startDate = new Date(rentalDate);
    const endDate = new Date(returnDate);

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
  const { bookingId } = req.params;

  try {
    const bike = await Bike.findOne({ 'bookings._id': bookingId });

    if (!bike) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const booking = bike.bookings.id(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const startDate = new Date(booking.rentalDate);
    const endDate = new Date(booking.returnDate);

    // Increase availability for the cancelled dates
    for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
      const dateKey = d.toISOString().split('T')[0];
      if (bike.dates.get(dateKey)) {
        bike.dates.get(dateKey).availableRooms += 1;
      }
    }

    bike.bookings.id(bookingId).remove();
    await bike.save();
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { bookBike, checkAvailability_bike, cancelBooking_bike };