const express = require('express');
const signup = require('../controllers/signupcontroller');
const router = express.Router();

router.post('/register', signup.createUser);

module.exports = {router}; // Exporting router directly