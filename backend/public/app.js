// Import required modules
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Routes
//const roomRoutes = require('./routes/room.routes');
//const hallRoutes = require('./routes/hall.routes');
//const bikeRoutes = require('./routes/bike.routes');

// Initialize app and middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hotel_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!')).catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('Hello from Server!');
    //res.json({ success: true, data: 'This is a JSON response' });
    //res.status(200).send('OK');
});

//app.get(, );

app.listen(3000, () => {
    console.log('Server running on port 3000');
});