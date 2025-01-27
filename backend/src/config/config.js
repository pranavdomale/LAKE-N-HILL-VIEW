// /config/config.js
require('dotenv').config();

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    port: process.env.PORT || 5000,
};