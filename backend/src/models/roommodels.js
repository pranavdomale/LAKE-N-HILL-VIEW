const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  roomId: { 
      type: String, 
      required: true, 
      unique: true 
  },

  type: { 
      type: String, 
      required: true 
  }, // e.g., Single, Double

  price: { 
      type: Number,
      required: true
  },

  status: { 
      type: String,
      default: 'available' 
  }, // available/booked
  
  bookings: [
    {
      guestName: String,
      checkIn: Date,
      checkOut: Date,
      paymentStatus: String,
    },
  ],
});

module.exports = mongoose.model('Room', RoomSchema);