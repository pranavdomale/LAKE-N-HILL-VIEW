const Login = require('../models/usermodels'); // User model
const express = require('express');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

async function user(req, res) {
    try {
        const users = await Login.find();
        console.log("Users Detail:",users);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Check if user is logged in
async function checkLogin(req, res) {
        if (req.session.user) {
          res.json({ isLoggedIn: true, user: req.session.user });
        } else {
          res.json({ isLoggedIn: false });
        }
};

// Sign-in user
async function signinUser(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await Login.findOne({ username, password  });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Save user session
        req.session.user = {
            id: user._id,
            username: user.username,
            role: user.role,
        };
        await req.session.save();

        res.cookie('authToken', user.username.toString(),user._id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'Strict',
        }); 

        console.log("Session after login:", req.session);

        res.status(200).json({ message: 'Login successful', user: req.session.user });
    } catch (err) {
        console.error('Error during sign-in:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

// Logout user
async function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Logout failed' });
        }

        res.clearCookie('authToken');
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
}

async function deleteuser (req, res){
    const { username } = req.query;
    console.log('Deleting user with username:', username);

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const deletedUser = await Login.findOneAndDelete({ username: username });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);  // Log the error for debugging
        res.status(500).json({ message: 'Error deleting user', error });
    }
}
async function edituser(req, res) {
    const { username } = req.body;  // Email to identify the user
    const { name, role } = req.body;  // Fields you want to update

    if (!username) {
        return res.status(400).json({ message: 'Username is required for updating user' });
    }

    try {
        const updatedUser = await Login.findOneAndUpdate(
            { username: username },  // Find user by email
            { name, role },  // Update fields
            { new: true }  // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

module.exports = { checkLogin, user, signinUser, logout, deleteuser,edituser };