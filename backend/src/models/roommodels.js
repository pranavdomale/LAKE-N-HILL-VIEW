const mongoose = require('mongoose');

// Function to generate default availability for the next 30 days
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

const RoomSchema = new mongoose.Schema({
  roomId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  
  name: { 
    type: String, 
    required: true 
  },

  type: { 
    type: String, 
    required: true 
  }, 

  price: { 
    type: Number, 
    required: true 
  },

  capacity:{
    type: Number, 
    required: true
  },

  status: { 
    type: String,
    enum: ['available', 'booked'], 
    default: 'available' 
  }, 

  // Availability per date (auto-fills for the next 30 days)
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
      phoneno: { type: String, required: true }, 
      address: { type: String, required: true },
      checkIn: { type: Date, required: true },
      checkOut: { type: Date, required: true },
      guestCount: { type: Number, required: true }, 
      paymentStatus: { 
        type: String, 
        enum: ['cash', 'upi/netbanking', 'failed', 'pending'],
        default: 'pending'
      }, 
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
