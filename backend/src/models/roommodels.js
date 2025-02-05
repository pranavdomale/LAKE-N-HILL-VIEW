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
  }, 

  price: { 
    type: Number, 
    required: true 
  },

  status: { 
      type: String,
      enum: ['available', 'booked'], 
      default: 'available' 
  }, // available/booked

  quantity: {
    type: Number, 
    required: true
  },
  
  bookings: [
    {
      name: { type: String, required: true },
      phoneno: { type: String, required: true }, 
      address: { type: String, required: true },
      checkIn: { type: Date, required: true },
      checkOut: { type: Date, required: true },
      guestCount: { type: Number, required: true }, 
      Type: { type: String, required: true},
      paymentStatus: { 
        type: String, 
        enum: ['pending', 'paid', 'failed'], 
        default: 'pending' 
      }, 
    }
  ],
});

module.exports = mongoose.model('Room', RoomSchema);