const mongoose = require('mongoose');

const HallSchema = new mongoose.Schema({
  hallId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  
  capacity: { 
    type: Number, 
    required: true 
  },
  
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
      eventDate: Date,
      numberOfGuests: Number,
      paymentStatus: String,
    },
  ],
});

module.exports = mongoose.model('Hall', HallSchema);