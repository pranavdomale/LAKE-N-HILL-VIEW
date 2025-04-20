const express = require('express');
const signin = require('../controllers/signincontroller');
const User = require('../models/usermodels');
const router = express.Router();

router.post('/login', signin.signinUser);
router.post('/logout', signin.logout);
router.get('/checkLogin', signin.checkLogin);
router.get('/check-session', (req, res) => {
    if (req.session.user) {
      res.json({ loggedIn: true, user: req.session.user });
    } else {
      res.json({ loggedIn: false });
    }
  });  
router.get('/users',signin.user);
router.delete('/deleteusers',signin.deleteuser);
router.put('/edituser', signin.edituser);
router.put("/update-user", async (req, res) => {
    const { username, email, password, role } = req.body;
    // Find by name and update (change logic if you have unique _id)
    await User.updateOne({ username }, { $set: { email, password, role } });
    res.send({ message: "User updated successfully" });
});

module.exports = {router}