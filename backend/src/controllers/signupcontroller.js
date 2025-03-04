const signup = require('../models/usermodels')
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

async function createUser(req,res) {
    const { username, password, email } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user= await signup.create({ username:username, password: password, email:email })
        console.log("User",user);
        res.status(201).json({ message: 'User registered successfully',
            data:user
         });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
}

module.exports={createUser}