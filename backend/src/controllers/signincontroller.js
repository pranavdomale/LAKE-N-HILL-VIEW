// const Login = require('../models/usermodels'); // Import the model
// const express = require('express');
// const router = express.Router();
// const dotenv = require('dotenv');

// dotenv.config();

// async function checkLogin(req, res) {
//     try {
//       const user = req.session.Login; // Assuming you're using sessions for authentication
//       if (Login) {
//         res.status(200).json({ success: true, Login });
//       } else {
//         res.status(401).json({ success: false, message: 'Not logged in' });
//       }
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
// };  

// async function signinUser(req, res) {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: "All fields are required" });
//     }
    
//     try {
//         // Fetch user from database
//         const user = await Login.findOne({ email, password });

//         if (!user) return res.status(400).json({ message: "User not found" });
    
//         // Direct password comparison (plaintext comparison)
//         if (password !== user.password) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }    

//         res.cookie('authToken', token, {
//           httpOnly: true, // Prevents client-side JS from accessing the cookie
//           secure: true, // Set true in production if using HTTPS
//           maxAge: 24 * 60 * 60 * 1000, // 1 day
//           sameSite: 'Strict', // Helps prevent CSRF attacks
//         });
        
//         res.status(200).json({ message: 'Login successful' });

//     } catch (err) {
//         console.error("Error during sign-in:", err);
//         res.status(500).json({ message: "Server error", error: err.message });
//     }
// }

// async function logout(req, res) {
//     req.session.destroy((err) => {
//       if (err) {
//         return res.status(500).json({ success: false, message: "Logout failed" });
//       }
  
//       res.clearCookie("connect.sid"); // Clear the session cookie
//       res.json({ success: true, message: "Logged out successfully" });
//     });
//   } 

// module.exports = { checkLogin, signinUser, logout };

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
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await Login.findOne({ email, password  });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Save user session
        req.session.user = {
            id: user._id,
            email: user.email,
            role: user.role,
        };
        await req.session.save();

        res.cookie('authToken', user.email.toString(),user._id.toString(), {
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
    const { email } = req.query;
    console.log('Deleting user with email:', email);

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const deletedUser = await Login.findOneAndDelete({ email: email });
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
    const { email } = req.body;  // Email to identify the user
    const { name, role } = req.body;  // Fields you want to update

    if (!email) {
        return res.status(400).json({ message: 'Email is required for updating user' });
    }

    try {
        const updatedUser = await Login.findOneAndUpdate(
            { email: email },  // Find user by email
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