const mongoose = require('mongoose');

const HallSchema = new mongoose.Schema({
  hallId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  
  hallType: { 
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

  quantity:
  {
    type: Number, 
    required: true
  },
  
  bookings: [
    {
      guestName: String,
      phoneno: Number, 
      address: String,
      hallType: String,
      eventDate: Date,
      Capacity: Number,
      paymentStatus: String,
    },
  ],
});

module.exports = mongoose.model('Hall', HallSchema);