Here are the core APIs for the hotel website:

Authentication APIs
POST /api/auth/register: Create a new user.
POST /api/auth/login: Authenticate a user and return a token.

Room Management APIs
GET /api/rooms: Retrieve a list of available rooms.
POST /api/rooms: Add a new room (admin only).
PUT /api/rooms/:id: Update room details (admin only).
DELETE /api/rooms/:id: Delete a room (admin only).

Booking APIs
POST /api/bookings: Create a new booking.
GET /api/bookings/:id: Get booking details.
GET /api/bookings: List all bookings for a user.
DELETE /api/bookings/:id: Cancel a booking.

Payment APIs
POST /api/payments: Process a payment.
GET /api/payments/:id: Retrieve payment details.

Review APIs
POST /api/reviews: Submit a review for a room.
GET /api/reviews/:roomId: Get reviews for a specific room.