const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/lake-n-hill-view ',
     { 
      connectTimeoutMS: 10000,  // Increase timeout to 60 sec
      socketTimeoutMS: 10000,
     }
    );
    //console.log('MongoDB connected...');
    
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};    
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db');
}
);
mongoose.connection.on('error', (err) => {
  console.log(err.message);
});

module.exports = connectDB;