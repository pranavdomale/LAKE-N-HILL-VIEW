const Room = require('../backend/src/models/room.model');

// Create a new booking
exports.bookRoom = async (req, res) => {
  try {
    const { roomId, guestName, checkIn, checkOut } = req.body;
    const room = await Room.findOne({ roomId });

    if (!room || room.status === 'booked') {
      return res.status(400).json({ message: 'Room unavailable' });
    }

    room.bookings.push({ guestName, checkIn, checkOut, paymentStatus: 'pending' });
    room.status = 'booked';
    await room.save();

    res.status(200).json({ message: 'Room booked successfully', room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check room availability
exports.checkAvailability = async (req, res) => {
  try {
    const rooms = await Room.find({ status: 'available' });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const room = await Room.findOne({ 'bookings._id': bookingId });

    if (!room) return res.status(404).json({ message: 'Booking not found' });

    room.bookings.id(bookingId).remove();
    room.status = 'available';
    await room.save();

    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};