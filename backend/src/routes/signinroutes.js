const express = require('express');
const signin = require('../controllers/signincontroller');
const router = express.Router();

router.post('/login', signin.signinUser);
router.post('/logout', signin.logout);
router.get('/checkLogin', signin.checkLogin);
router.get('/users',signin.user);
router.delete('/deleteusers',signin.deleteuser);
router.put('/edituser', signin.edituser);

module.exports = {router}