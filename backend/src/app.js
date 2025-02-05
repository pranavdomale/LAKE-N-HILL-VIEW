// // Import required modules
// const express = require("express");
// const session = require("express-session");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");
// const connectDB = require("../src/config/db");
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// // Load environment variables
// dotenv.config();

// // Import routes
// const register_route = require("../src/routes/signuproutes");
// const login_route = require("../src/routes/signinroutes");
// const room_route = require("../src/routes/roomsroutes");
// const bike_route = require("../src/routes/bikeroutes");
// const hall_route = require("../src/routes/hallroutes");
// const payment_route = require('../src/routes/paymentroutes');

// // Initialize app
// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow frontend requests
//     credentials: true, // Important if using cookies or sessions
//   })
// );
// app.use(cookieParser());

// // Database Connection
// connectDB();

// // Routes
// app.use("/", register_route.router);
// app.use("/", login_route.router);
// app.use("/", room_route.router);
// app.use("/", bike_route.router);
// app.use("/", hall_route.router);
// app.use("/", payment_route.router);

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// Import required modules
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("../src/config/db");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Load environment variables first
dotenv.config();

// Initialize Stripe after loading environment variables
//const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Import routes
const register_route = require("../src/routes/signuproutes");
const login_route = require("../src/routes/signinroutes");
const room_route = require("../src/routes/roomsroutes");
const bike_route = require("../src/routes/bikeroutes");
const hall_route = require("../src/routes/hallroutes");
//const payment_route = require('../src/routes/paymentroutes');

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend requests
    credentials: true, // Important if using cookies or sessions
  })
);
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
app.use("/", register_route.router);
app.use("/", login_route.router);
app.use("/", room_route.router);
app.use("/", bike_route.router);
app.use("/", hall_route.router);
//app.use("/", payment_route.router);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});