const login = require('../models/usermodels'); // Import the model
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

async function signinUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    try {
        // Fetch user from database
        const data = await login.findOne({ email: req.body.email });

        if (!data) return res.status(400).json({ message: "User not found" });
    
        // Direct password comparison (plaintext comparison)
        if (password !== data.password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }    

        // If login is successful
        res.status(200).json({
            message: "Login successful",
            user: data, // Corrected variable name
        });
        console.log("Login Credentials:",data);
        console.log("Login Successful!!")

    } catch (err) {
        console.error("Error during sign-in:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

module.exports = { signinUser };