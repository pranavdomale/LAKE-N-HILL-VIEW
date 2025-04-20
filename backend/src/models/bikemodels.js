const mongoose = require('mongoose');

const generateAvailability = () => {
  let dates = {};
  let today = new Date();

  for (let i = 0; i < 30; i++) {
    let date = new Date(today);
    date.setDate(today.getDate() + i);

    let formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    dates[formattedDate] = { availableRooms: 3 };
  }
  return dates;
};

const BikeSchema = new mongoose.Schema({
  bikeId: { 
    type: String, 
    required: true, 
    unique: true 
  },

  type: {
    type: String,
    required: true
  },

  name: { 
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
  }, // available/booked

  dates: {
    type: Map,
    of: {
      availableRooms: { type: Number, required: true }
    },
    default: generateAvailability
  },
  
  bookings: [
    {
      Name: { type: String, required: true },
      checkIn: { type: Date, required: true },
      checkOut: { type: Date, required: true },
      paymentStatus: { 
        type: String, 
        enum: ['cash', 'upi/netbanking', 'failed', 'pending'],
        default: 'pending'
      },
    },
  ],
});

module.exports = mongoose.model('Bike', BikeSchema);