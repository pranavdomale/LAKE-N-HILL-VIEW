// authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/'); // Your application config file

const authMiddleware = async (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.header('Authorization');

    // Check if the authorization header is present
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Extract the JWT token from the authorization header
    const token = authHeader.split(' ')[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Set the user ID in the request object
    req.userId = decoded.userId;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Handle JWT verification errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Handle other errors
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = authMiddleware;