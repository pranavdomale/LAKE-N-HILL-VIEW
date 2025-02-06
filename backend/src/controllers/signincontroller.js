const login = require('../models/usermodels'); // Import the model
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const jwt=require('jsonwebtoken')

dotenv.config();
const key="user_key"
async function generateToken(id) {
    const token=await jwt.sign({userId:id},
        key
    
    )
    return {token}
    
}

async function signinUser(req, res) {
    const key="SECRET_KEY"
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

        // Generate JWT Token
        
        const {token}=await generateToken(data._id);
        console.log("token",token)
        // If login is successful
        const options={
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }
        res.
        status(200).
        cookie("userToken",token,options)
        .json({
            message: "Login successful",
            user: data, // Corrected variable name
        });
        console.log("Login Successful!!")

    } catch (err) {
        console.error("Error during sign-in:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

module.exports = { signinUser };