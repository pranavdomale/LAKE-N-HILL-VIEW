// Load environment variables first
require('dotenv').config();

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    port: process.env.PORT || 5001,
    //STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
};
