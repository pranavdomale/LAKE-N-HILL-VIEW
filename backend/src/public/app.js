// Import required modules
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

/*
const roomRoutes = require('./backend/routes/rooms.routes');
const hallRoutes = require('./backend/routes/hall.routes');
const bikeRoutes = require('./backend/routes/bike.routes');
const signinRoutes = require('./backend/routes/signin.routes');
const signupRoutes = require('./backend/routes/signup.routes');
*/

// Initialize app and middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
/*mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!')).catch(err => console.error(err));
*/

// Mount routes
/*app.use('/rooms', roomRoutes);
app.use('/halls', hallRoutes);
app.use('/bikes', bikeRoutes);
app.use('/signin', signinRoutes);
app.use('/signup', signupRoutes);
*/

// Root route
app.get('/', (req, res) => {
    //res.send('index.html'));
});
app.get('/signin', (req, res) => {
    res.sendFile(path.join(Frontend, 'src/components/Auth', 'login.jsx'));
});

/*// Rooms
app.get('/api/rooms', async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
});

app.post('/api/rooms', async (req, res) => {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
});

app.put('/api/rooms/:id', async (req, res) => {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(room);
});

app.delete('/api/rooms/:id', async (req, res) => {
    await Room.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Bikes
app.get('/api/bikes', async (req, res) => {
    const bikes = await Bike.find();
    res.json(bikes);
});

app.post('/api/bikes', async (req, res) => {
    const bike = new Bike(req.body);
    await bike.save();
    res.status(201).json(bike);
});

app.put('/api/bikes/:id', async (req, res) => {
    const bike = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(bike);
});

app.delete('/api/bikes/:id', async (req, res) => {
    await Bike.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

// Party Halls
app.get('/api/partyhalls', async (req, res) => {
    const halls = await PartyHall.find();
    res.json(halls);
});

app.post('/api/partyhalls', async (req, res) => {
    const hall = new PartyHall(req.body);
    await hall.save();
    res.status(201).json(hall);
});

app.put('/api/partyhalls/:id', async (req, res) => {
    const hall = await PartyHall.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(hall);
});

app.delete('/routes/partyhalls/:id', async (req, res) => {
    await PartyHall.findByIdAndDelete(req.params.id);
    res.status(204).send();
});
*/

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).send('Route not found!');
});

// Server listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});