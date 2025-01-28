const login = require('../models/usermodels');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

async function signinUser(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await login.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        const pass = await login.findOne({ password });

        if (!pass) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const email = await login.findOne({ email });

        if (!email) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error('Error during sign-in:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {signinUser};