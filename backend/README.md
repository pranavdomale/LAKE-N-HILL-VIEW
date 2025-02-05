# Hotel Management Backend

## Description
This project is a backend for a hotel management system that allows users to book rooms, rent bikes, and reserve party halls. It includes user authentication and a RESTful API.

## Technologies Used
- Node.js
- Express
- MongoDB (NOSQL)
- Mongoose
- JWT for authentication
- bcrypt for password hashing

## Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret.
4. Run `node config/server.js` to start the server.

## API Endpoints
- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login a user

- **Rooms**
  - `POST /api/rooms` - Create a new room
  - `GET /api/rooms` - Get all rooms

- **Bikes**
  - `POST /api/bikes` - Create a new bike
  - `GET /api/bikes` - Get all bikes

- **Halls**
  - `POST /api/halls` - Create a new hall
  - `GET /api/halls` - Get all halls

- **Bookings**
  - `POST /api/bookings` - Create a new booking
  - `GET /api/bookings` - Get all bookings

## Testing
Run tests using Jest:
```bash
npm test