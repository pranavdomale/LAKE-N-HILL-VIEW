// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('../src/config/db');
const { port } = require('./config/config');
const userauthentication = require('../src/routes/signuproutes');
const bookroom_route = require('../src/routes/roomsroutes');
const bookbike_route = require('../src/routes/bikeroutes');
const bookhall_route = require('../src/routes/hallroutes');
//const payment_route = require('../src/routes/paymentroutes');

require('dotenv').config();

// Initialize app and middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDB();

// Server listening
app.use('/',userauthentication.router);
app.use('/', bookroom_route.router);
app.use('/', bookbike_route.router);
app.use('/', bookhall_route.router);
//app.use('/', payment_route.router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);

});