const Room = require('../models/roommodels');
const user=require('../models/usermodels');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

// Create a new booking
async function bookRoom(req, res) {
    const { name, phoneno, address, checkIn, checkOut, guestCount, Type } = req.body;
    const token = req.cookies;
    console.log("token in room",token)
    console.log(Type)

    try {
        const room = await Room.findOne({ type: Type });
        console.log("Room:", room);

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        if (room.quantity === 0) {
            console.log("Booking attempt for full room:", room);
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
        console.log("Is Booked:", isBooked);

        if (isBooked) {
            return res.status(400).json({ message: 'Room unavailable for selected dates' });
        }

        // Add the booking
        room.bookings.push({ name, phoneno, address, checkIn: checkInDate, checkOut: checkOutDate, guestCount, Type, paymentStatus: 'pending' });
        console.log("Room after booking:", room.bookings);
        room.quantity -= 1; // Decrement the quantity

        // Update the status to 'unavailable' if quantity is zero
        if (room.quantity == 0) {
            room.status = 'booked';
        }

        await room.save();
        console.log("Room after saving:", room);

        const userInfo=req.user;
        console.log("user",userInfo);

        
     

        const userData=await user.findByIdAndUpdate(userInfo.userId,{$push:{room:room._id}});
        console.log("userData",userData);
        
          
          
        return res.status(200).json({ message: 'Room booked successfully', room });
    } catch (error) {
        return res.status(500).json({ 
            message:"error in booking",
            
            error: error.message });
    }
}

// Check room availability
async function checkAvailability(req, res) {
    const { checkIn, checkOut, Type } = req.body;
    console.log("Type:", Type);

    try {
        const room = await Room.findOne({}).catch(err => { 
            console.log("Error",err);
        }
        );

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
   
    let halls=[];
    let bikes=[];
    let rooms=[];
    const data=req.user;
    console.log("token",data)
    const User=await user.findById(data.userId);
    const getUserWithRooms = async (id) => {
        try {
          const userD = await user.findById(id).populate('room')
          .select('room');
          console.log("rooms",userD);
          return userD
        } catch (error) {
          console.error(error);
        }
      };

      const getUserWithHalls = async (id) => {
        try {
          const userD = await user.findById(id).populate('hall')
          .select('hall');
          console.log("halls:",userD);
          return userD
        } catch (error) {
          console.error(error);
        }
      };

      const getUserWithBikes = async (id) => {
        try {
          const userD = await user.findById(id).populate('bike')
          .select('bike');
          console.log("Bikes:",userD);
          return userD
        } catch (error) {
          console.error(error);
        }
      };
      
     if(User.room.length>0){
        rooms=await getUserWithRooms(data.userId);
    }
     if(User.hall.length>0){
         halls=await getUserWithHalls(data.userId);
     }

     if(User.bike.length>0){
            bikes=await getUserWithBikes(data.userId);
        }

    return res.status(200).json({
        success: true,
        message: 'Token fetched successfully',
        bookings: rooms,halls,bikes
    });
}

module.exports = { bookRoom, checkAvailability, cancelBooking, getMyBookings };