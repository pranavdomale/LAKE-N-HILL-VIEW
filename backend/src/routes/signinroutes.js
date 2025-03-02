const express = require('express');
const signin = require('../controllers/signincontroller');
const router = express.Router();

router.post('/login', signin.signinUser);
router.post('/logout', signin.logout);
router.get('/checkLogin', signin.checkLogin);

module.exports = {router}