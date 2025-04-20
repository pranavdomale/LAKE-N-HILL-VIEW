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

const HallSchema = new mongoose.Schema({
  hallId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  
  name: {
    type: String,
    required: true
  },

  hallType: { 
    type: String, 
    required: true, 
    unique: true 
  },
  
  capacity: { 
    type: Number, 
    
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
      name: { type: String, required: true },
      phoneno: { type: Number, required: true }, 
      address: { type: String, required: true },
      hallType: { type: String, required: true },
      checkIn: { type: Date, required: true },
      checkOut: { type: Date, required: true },
      Capacity: { type: Number, required: true },
      paymentStatus:  { 
        type: String, 
        enum: ['cash', 'upi/netbanking', 'failed', 'pending'],
        default: 'pending'
      },
    },
  ],
});

module.exports = mongoose.model('Hall', HallSchema);