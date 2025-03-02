// Import required modules
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("../src/config/db");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

// Load environment variables first
dotenv.config();

// Import routes
const register_route = require("../src/routes/signuproutes");
const login_route = require("../src/routes/signinroutes");
const room_route = require("../src/routes/roomsroutes");
const bike_route = require("../src/routes/bikeroutes");
const hall_route = require("../src/routes/hallroutes");
//const admin_route = require("../src/routes/adminroutes");
//const payment_route = require('../src/routes/paymentroutes');

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
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
app.use(
  session({
    secret: process.env.SESSION_SECRET  || "fallbackSecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
      httpOnly: true, // Protect against XSS
      secure: process.env.NODE_ENV === "production", // Enable only in production (HTTPS required)
      sameSite: "strict", // Prevent CSRF
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/Lake_n_Hill_view",
      collectionName: "sessions",
      ttl: 365 * 24 * 60 * 60, // 1 year (in seconds)
      autoRemove: "native",
    }),
  })
);

app.use("/", register_route.router);
app.use("/", login_route.router);
app.use("/", room_route.router);
app.use("/", bike_route.router);
app.use("/", hall_route.router);
//app.use("/", admin_route.router);
//app.use("/", payment_route.router);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});