const mongoose = require('mongoose');

const BikeSchema = new mongoose.Schema({
  bikeId: { 
    type: String, 
    required: true, 
    unique: true 
  },

  model: { 
    type: String, 
    required: true 
  },

  price: { 
    type: Number, 
    required: true 
},

  status: { 
    type: String, 
    default: 'available' 
  }, // available/rented
  
  bookings: [
    {
      guestName: String,
      rentalDate: Date,
      returnDate: Date,
      paymentStatus: String,
    },
  ],
});

module.exports = mongoose.model('Bike', BikeSchema);