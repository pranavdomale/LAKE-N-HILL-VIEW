const express = require('express');
const signup = require('../controllers/signupcontroller');
const signin = require('../controllers/signincontroller');
const router = express.Router();

router.post('/register', signup.createUser);
router.post('/login', signin.signinUser);


module.exports = {router}